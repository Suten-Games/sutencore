import resources from "../resources";
import { Player } from "../gameObjects/player";
import { CombatLog } from "../gameUI/combatLog";
import { MobState } from "../components/mobStateComponent";
import { SoundBox } from "src/gameObjects/soundBox";
import { Npc } from "src/gameObjects/npc";
import { Singleton } from "src/gameObjects/playerDetail";
import { BattleId } from "src/components/battleIdComponent";
import { chase } from "./chase";
import { patrol } from "./patrol";
import { attack } from "./attack";
import { otherplayerattack } from "./otherplayerattack";
import { writeToCl } from "./writeToCL";
import { idle } from "./idle";
import { acceptQuest, checkQuestCompletion, chunkSentence, fetchQuest, writeChunks } from "./fetchQuest";
import { UI } from "src/gameUI/ui";
import { StartupTimeOut } from "src/components/startupTimer";
import { createSoundBox } from "./createSoundBox";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { working } from "./working";

const npclaugh = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.orclaugh,
    false
);

const killbox = createSoundBox(7, 0, 8, resources.sounds.killping, false);

const levelupbox = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.levelup,
    false
);

@Component("npcFSM")
export class NpcFSM extends Entity {
    private _player: Player;
    private _npc: Npc;
    private _combatLog: CombatLog;
    //private _canvas: UICanvas;
    private showHealthBar = false;
    public endFight: () => void;
    private transform: Transform;
    private _startPos;
    private _startRot;
    //private _patrol = true;
    public factionvalue: number;
    //private _playerfaction: any;
    private _factionCheckTimer = 0; // Timer to control faction check frequency
    private readonly _factionCheckInterval = 5; // Interval in seconds between checks

    constructor(
        npc: Npc,
        startPos: number[],
        startRot: number[]
    ) {
        super();
        

        var obj = Singleton.getInstance();
        this.addComponent(new BattleId(npc.id));
        this.getComponent(BattleId).id = npc.id;
        this._player = obj.player
        this._npc = npc;
        let mobfaction = this._npc.faction
        const ui = UI.getInstance();

        this._player.aggressive = false;

        log(`npcFSM.ts: In the npcFSM constructor for: ${this._npc.name}`)


        const tradeWindow = new TradeWindow(
            ui.gc,
            resources.interface.blueMerchantInterface,
            ui.ab,
            ui.bp,
            this._player,
            ui.cl
        );

        let playerfaction = this._player.factions

        if (playerfaction) {
            let matchingFaction = playerfaction.find((faction: { name: string; }) => faction.name === mobfaction);

            if (matchingFaction) {
                this.factionvalue = matchingFaction.value
            } else {
                this.factionvalue = 0
            }
        } else {
            this.factionvalue = -1
        }

        //let mobstate = this._npc.getComponent(MobState)
        let hoverText

        if (this.factionvalue >= 0) {
            hoverText = "Hail" 
        } else if (this.factionvalue >= 200) {
            hoverText = "Trade"
        } else {
            hoverText = "Attack"
        }

        this._startPos = startPos;
        this._startRot = startRot;

        this._npc.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    let factionValue = this.checkFaction();

                    if (this._player.aggressive || factionValue < 0) {
                        // Attack logic
                        this.initiateCombat();
                    } else if (factionValue >= 200) {
                        // Trade logic
                        this.initiateTrade();
                    } else {
                        // Hail logic
                        this.initiateDialogue();
                    }
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: this.getHoverText(),
                }
            )
        );
    }

    getHoverText() {
        if (this._player.aggressive) {
            return "Attack";
        } else if (this.factionvalue >= 200) {
            return "Trade";
        } else if (this.factionvalue >= 0) {
            return "Hail";
        } else {
            return "Attack";
        }
    }

    initiateCombat() {
        let mobstate = this._npc.getComponent(MobState);
        mobstate.battle = true;
        mobstate.clicked = true;
        mobstate.playerdead = false;
        mobstate.timeout = false;
        mobstate.trackplayer = false;
    }

    initiateTrade() {
        if (this._npc.mobclass == "merchant") {
            writeToCl(`${this._npc.mobname} says "Well met! Please browse my wares.`)
            //tradeWindow.show(this._npc)
        }
    }

    initiateDialogue() {
        // Dialogue logic here
    }

    openQuestWindow(val: string, questId: string|null = null, playerAddress:string|null = null) {
        var ui = UI.getInstance();
        ui.ql.openQuestWindow(val, questId, playerAddress)

    }

    performFactionCheckAndUpdateHoverText() {
        let factionValue = this.checkFaction();
        let hoverText = "Attack"; // Default

        if (factionValue >= 200) {
            hoverText = "Trade";
        } else if (factionValue >= 0) {
            hoverText = "Hail";
        }

        // Assuming this._npc is your entity with the OnPointerDown component
        const pointerDownComponent = this._npc.getComponent(OnPointerDown);
        if (pointerDownComponent) {
            // Directly updating hoverText should work in Decentraland
            pointerDownComponent.hoverText = hoverText;
        }
    }

    checkFaction() {
        let playerfaction = this._player.factions

        if (playerfaction) {
            let matchingFaction = playerfaction.find((faction: { name: string; }) => faction.name === this._npc.faction);

            if (matchingFaction) {
                this.factionvalue = matchingFaction.value
            } else {
                this.factionvalue = 0
            }
        } else {
            this.factionvalue = -1
        }

        return this.factionvalue
    }


    update(dt: number) {
        this._factionCheckTimer += dt;

        if (this._factionCheckTimer >= this._factionCheckInterval) {
            this.performFactionCheckAndUpdateHoverText();
            this._factionCheckTimer = 0; // Reset the timer
        }

        if (this._npc.hasComponent(StartupTimeOut)) {
            log("Don't update anything, lets START all the way up first")
            return
        } else {
            //log(`In the update loop for ${this._npc.name}`)
            let state = this._npc.getComponent(MobState);
            this.transform = this._npc.getComponent(Transform);
            //let dist = ydistance(thiso.transform.position, camera.position, this._npc);

            //log(`CAMERA: ${camera.position}`)

            const dist = Vector3.DistanceSquared(
                this.transform.position,
                camera.position
            )

            var obj = Singleton.getInstance();

            if (state.mobdead) {
                return;
            }

            if (state.respawned) {
                this._npc.respawn();
            }

            let playerPos = new Vector3(
                camera.position.x,
                camera.position.y,
                camera.position.z
            );

            let scene: SceneState = {
                showhealthbar: this.showHealthBar,
                npc: this._npc,
                player: this._player,
                mobdead: state.mobdead,
                playerdead: state.playerdead,
                battlestate: state.battle,
                clicked: state.clicked,
                trackplayer: state.trackplayer,
                playerpos: playerPos,
                transform: this.transform,
                startPos: this._startPos,
                startRot: this._startRot,
            };

            //this.levelupcheck();

            if (state.anotherplayer) {
                otherplayerattack(scene, this._combatLog)
            } else if (this._npc.mobclass == "merchant") {
                // if (dist < 4) {
                //     idle(scene, dt)
                // } else {
                working(scene, dt);
                //}
            } else {
                if (dist < 8) {
                    if (this.factionvalue < 0) {
                        attack(scene, this._combatLog);
                        //log('npcFSM.ts:145 - attack (skipping for testing)')
                    } else {
                        idle(scene, dt)
                    }
                } else if (state.trackplayer || dist < 30 && dist > 8 && this.factionvalue < 0) {
                    //log(`npcFSM.ts:147 - chase ${dist}`)
                    chase(scene, dt, dist);
                } else if (dist > 30) {
                    //log(`npcFSM.ts:150 ${this._npc.id} - patrol ${dist}`)
                    patrol(scene, dt);
                }
            }
        }
    }

}

function ydistance(pos1: Vector3, pos2: Vector3, npc: Npc): number {
    //Mob Position - Player Position
    const y = pos1.y - pos2.y
    //Floor 1 0 - 1.75 = -1.75 ; Archer 10 - 1.75 = 
    //Floor 2 5.1 - 6.75 = 
    //log(`${npc.mobname} y: ${pos1.y} Player y: ${pos2.y} - ${y} `)
    if (y > -1.8 && y < -1.6) {
        const a = pos1.x - pos2.x;
        const b = pos1.z - pos2.z;
        return a * a + b * b;
    } else {
        return 50
    }
}

const camera = Camera.instance;

export interface SceneState {
    showhealthbar: boolean;
    npc: Npc;
    player: Player;
    mobdead: boolean;
    playerdead: boolean;
    battlestate: boolean;
    clicked: boolean;
    trackplayer: boolean;
    playerpos?: Vector3;
    transform?: any;
    startPos?: any;
    startRot?: any;
}