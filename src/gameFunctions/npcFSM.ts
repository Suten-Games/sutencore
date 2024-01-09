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

const npclaugh = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.orclaugh,
    false
);

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
    private _canvas: UICanvas;
    private showHealthBar = false;
    public endFight: () => void;
    private transform: Transform;
    private _startPos;
    private _startRot;
    private _patrol = true;
    public factionvalue: number;
    private _playerfaction: any;

    constructor(
        npc: Npc,
        startPos: number[],
        startRot: number[],
        clicked: boolean,
        battlepause: number,
    ) {
        super();
        //log(`npcFSM.ts: In the npcFSM constructor`)

        var obj = Singleton.getInstance();
        this.addComponent(new BattleId(npc.id));
        this.getComponent(BattleId).id = npc.id;
        this._player = obj.player
        this._npc = npc;
        let mobfaction = this._npc.faction


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


        let mobstate = this._npc.getComponent(MobState)
        let hoverText

        if (this.factionvalue >= 0) {
            hoverText = "Hail"
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

                    let factionvalue = this.checkFaction()
                    if (factionvalue >= 0) {
                        hoverText = "Hail"
                    } else {
                        hoverText = "Attack"
                    }
                    log(`name: ${this._npc.name} faction: ${this._npc.faction} factionvalue: ${factionvalue}`)

                    if (factionvalue >= 0) {
                        writeToCl(`You hail an ${this._npc.name}`)
                        fetchQuest(this._npc, this._player).then(res => {
                            log(`back from get quest call, this is the dialogue: ${res.dialogue}`)
                            let chunks
                            chunks = chunkSentence(res.dialogue, 7)
                            if(res.status === 'NOT_STARTED') {
                                writeChunks(chunks).then(() => {
                                    writeToCl(
                                        "I accept!",
                                        "",
                                        "",
                                        "",
                                        () => {
                                            log(`I accept clicked`)
                                            //this.acceptQuest(res)
                                            acceptQuest(res.id, this._player, this._npc.id).then(acceptres => {
                                                log(`back from the accept quest call, this is the dialogue: ${acceptres.dialogue}`)
                                                chunks = chunkSentence(acceptres.dialogue, 7)
                                                writeChunks(chunks)
                                                this.openQuestWindow(acceptres.dialogue)  // replace with actual function and arguments
                                            })
                                        }
                                    );
                                })
                            } else if(res.status === 'IN_PROGRESS') {
                                checkQuestCompletion(res.id, this._player.address).then(checkcompletionres => {
                                    chunks = chunkSentence(checkcompletionres.dialogue, 7)
                                    writeChunks(chunks)
                                    if(checkcompletionres.status === 'COMPLETED') {
                                        // Play a quest completion sound. 
                                        // Grant some experience to the player
                                        // Need to delete the loot used for the quest. Probably best to send the loot
                                        // Open the Loot Window and Fetch the Loot
                                        this.openQuestWindow(checkcompletionres.dialogue, res.id, this._player.address)
                                    }
                                })
                            } else {
                                writeChunks(chunks)
                            }
                            
                        })

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
        //log(`npcFSM:ts - npcFSM is now added`)
    }

    openQuestWindow(val: string, questId: string|null = null, playerAddress:string|null = null) {
        log(`passing ${val} to the questLog`)
        //log(`the full res ${res} is here and not being sent to the questlog`)
        //fetch the reward from res.rewards[0]
        //log(`fetch the reward using ${res.rewards[0]}`)
        var ui = UI.getInstance();
        ui.ql.openQuestWindow(val, questId, playerAddress)

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
        if (this._npc.hasComponent(StartupTimeOut)) {
            log("Don't update anything, lets START all the way up first")
            return
        } else {
            //log(`In the update loop for ${this._npc.name}`)
            let state = this._npc.getComponent(MobState);
            this.transform = this._npc.getComponent(Transform);
            //let dist = ydistance(thiso.transform.position, camera.position, this._npc);

            log(`CAMERA: ${camera.position}`)

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

// function distance(pos1: Vector3, pos2: Vector3) {
//   const a = pos1.x - pos2.x;
//   const b = pos1.z - pos2.z;
//   return a * a + b * b; 
// }

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