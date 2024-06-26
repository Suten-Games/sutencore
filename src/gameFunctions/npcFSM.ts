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
import { handleNpcInteraction } from "./handleNpcInteraction";

const npclaugh = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.orclaugh,
    false, 3600
);

const killbox = createSoundBox(7, 0, 8, resources.sounds.killping, false, 600);

const levelupbox = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.levelup,
    false,
    2400
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
        startRot: number[],
        // clicked: boolean,
        // battlepause: number
    ) {
        super();
        //log(`npcFSM.ts: In the npcFSM constructor`)

        var obj = Singleton.getInstance();
        this.addComponent(new BattleId(npc.id));
        this.getComponent(BattleId).id = npc.id;
        this._player = obj.player
        this._npc = npc;
        let mobfaction = this._npc.faction
        const ui = UI.getInstance();

        this._player.aggressive = false;


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

        //log(`npcFSM.ts: ABout to add the pointer clicky for: ${this._npc.id}`)
        this._npc.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    log(`Pressed 'E' on the NPC`)
                    this._npc.getComponent(OnPointerDown).showFeedback = true;
                    let mobstate = this._npc.getComponent(MobState)

                    log(`Checking faction with ${this._npc.name}`)
                    let factionvalue = this.checkFaction()
                    log(`name: ${this._npc.name} faction: ${this._npc.faction} factionvalue: ${factionvalue}`)

                    if (factionvalue > 0) {
                        hoverText = "Hail"
                    } else {
                        hoverText = "Attack"
                    }

                    if (factionvalue >= 0) {
                        //this._npc.showhpbar();
                        writeToCl(`You hail an ${this._npc.name}`)

                        if(this._player.searching) {
                            log(`inFlightNPCFSM.ts: Player.searching: ${this._player.searching}`)
                        } else {
                            log(`player.searching is empty right now`)
                        }

                        if (this._player.searching && this._player.searching.indexOf(this._npc.id) !== -1) {
                            // Remove NPC ID from searchingFor array
                            this._player.searching = this._player.searching.filter(id => id !== this._npc.id);

                            handleNpcInteraction(this._player, this._npc).then(response => {
                                if (response.xpGained) {
                                    log(`xpgained: ${JSON.stringify(response.xpGained)}`);
                                    writeToCl(`gained ${response.xpGained} xp `);
                                }
                            }).catch(error => {
                                log("Error handling NPC interaction:", error);
                            });

                            log('Removed the NPC ID from searching and called interaction on the server');
                            log(`This is the client searching array now: ${this._player.searching}`)
                        }


                        if (this._npc.mobclass == "merchant") {
                            writeToCl(`${this._npc.mobname} says "Well met! Please browse my wares.`)
                            tradeWindow.show(this._npc)
                        } else {
                            fetchQuest(this._npc, this._player).then(res => {
                                log(`back from get quest call, this is the dialogue: ${res.dialogue}`)
                                let chunks
                                chunks = chunkSentence(res.dialogue, 7)
                                if (res.status === 'NOT_STARTED') {
                                    log(`in the not started block`)
                                    this.openQuestGivingWindow(res.dialogue, res.id, this._player, this._npc.id)
                                    // writeChunks(chunks).then(() => {
                                    //     writeToCl(
                                    //         "I accept!",
                                    //         "",
                                    //         "",
                                    //         "",
                                    //         () => {
                                    //             log(`I accept clicked`)
                                    //             acceptQuest(res.id, this._player, this._npc.id).then(acceptres => {
                                    //                 log(`back from the accept quest call, this is the dialogue: ${acceptres.dialogue}`)
                                    //                 log(`Setting the searchingfor results to: ${acceptres.searchingfor}`)
                                    //                 this._player.searching = acceptres.searchingfor
                                    //                 chunks = chunkSentence(acceptres.dialogue, 7)
                                    //                 writeChunks(chunks)
                                    //                 this.openQuestAcceptedWindow(acceptres.dialogue)
                                    //             })
                                    //         }
                                    //     );
                                    // })
                                } else if (res.status === 'IN_PROGRESS') {
                                    log(`in the IN_PROGRESS STATUS, id: ${res.id}`)
                                    checkQuestCompletion(res.id, this._player.address).then(checkcompletionres => {
                                        if (checkcompletionres.status === 'COMPLETED') {
                                            log(`in the checkcompletion COMPLETED`)
                                            let foundone = false
                                            this._player.achievementcheck(checkcompletionres.xp, this._player.level)
                                            let desc = checkcompletionres.objectives[0].description
                                            const firstSentence = checkcompletionres.dialogue.match(/[^.!?]*[.!?]/)?.[0].trim();
                                            chunks = chunkSentence(firstSentence, 7)
                                            writeChunks(chunks)
                                            killbox.play();
                                            writeToCl(`You have gained ${checkcompletionres.xp} experience!`)

                                            for (let item of obj.fetchactionbar()) {
                                                if (desc === item.lootdesc()) {
                                                    foundone = true
                                                    obj.actionbar.resetSlot(item.slot())
                                                    item.hide()
                                                }
                                            }

                                            if (foundone == false) {
                                                for (let item of obj.fetchbackpack()) {
                                                    if (desc === item.lootdesc()) {
                                                        obj.backpack.resetSlot(item.slot())
                                                        item.hide()
                                                    }
                                                }
                                            }
                                            this.openQuestWindow(checkcompletionres.dialogue, res.id, this._player.address)
                                        }
                                    })
                                } else if (res.status === 'PENDING') {
                                    log(`in the PENDING STATUS`)
                                    checkQuestCompletion(res.id, this._player.address).then(checkcompletionres => {
                                        if (checkcompletionres.status === 'COMPLETED') {
                                            log(`in PENDING COMPLETED`)
                                            let foundone = false
                                            this._player.achievementcheck(checkcompletionres.xp, this._player.level)
                                            let desc = checkcompletionres.objectives[0].description
                                            const firstSentence = checkcompletionres.dialogue.match(/[^.!?]*[.!?]/)?.[0].trim();
                                            writeToCl(firstSentence)
                                            killbox.play();
                                            writeToCl(`You have gained ${checkcompletionres.xp} experience!`)

                                            for (let item of obj.fetchactionbar()) {
                                                if (desc === item.lootdesc()) {
                                                    foundone = true
                                                    obj.actionbar.resetSlot(item.slot())
                                                    item.hide()
                                                }
                                            }

                                            if (foundone == false) {
                                                for (let item of obj.fetchbackpack()) {
                                                    if (desc === item.lootdesc()) {
                                                        obj.backpack.resetSlot(item.slot())
                                                        item.hide()
                                                    }
                                                }
                                            }
                                            this.openQuestWindow(checkcompletionres.dialogue, res.id, this._player.address)
                                        } else {
                                            log(`in the else else block`)
                                            this.openQuestAcceptedWindow(res.dialogue)
                                        }
                                    })
                                } else {
                                    writeChunks(chunks)
                                }

                            })
                        }
                    } else {
                        mobstate.battle = true;
                        mobstate.clicked = true;
                        mobstate.playerdead = false;
                        mobstate.timeout = false;
                        mobstate.trackplayer = false;
                    }
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: hoverText,
                }
            )
        );
    }

    openQuestGivingWindow(val: string, questId: string, player: Player, npcid: string) {
        var ui = UI.getInstance();
        ui.qg.openQuestGivingWindow(val, questId, player, npcid)
    }

    openQuestAcceptedWindow(val:string){
        var ui = UI.getInstance();
        ui.qa.openQuestAcceptedWindow(val);
    }

    openQuestWindow(val: string, questId: string | null = null, playerAddress: string | null = null) {
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

        const pointerDownComponent = this._npc.getComponent(OnPointerDown);
        if (pointerDownComponent) {
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
                this.factionvalue = -1
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
            //log("Don't update anything, lets START all the way up first")
            return
        } else {
            let state = this._npc.getComponent(MobState);
            this.transform = this._npc.getComponent(Transform);

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

            if (state.anotherplayer) {
                otherplayerattack(scene, this._combatLog)
            } else if (this._npc.mobclass == "merchant") {
                working(scene, dt);
            } else {
                if (dist < 8) {
                    if (this.factionvalue < 0) {
                        attack(scene, this._combatLog);
                    } else {
                        idle(scene, dt)
                    }
                } else if (state.trackplayer || dist < 30 && dist > 8 && this.factionvalue < 0) {
                    chase(scene, dt, dist);
                } else if (dist > 30) {
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