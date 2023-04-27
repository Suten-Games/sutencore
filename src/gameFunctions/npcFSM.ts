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
    // private _clicked = false;
    // private _battlepause: number;
    // private _punchpause: number = 2;

    private _combatLog: CombatLog;
    private _canvas: UICanvas;
    private showHealthBar = false;
    public endFight: () => void;
    private transform: Transform;
    private _startPos;
    private _startRot;
    private _patrol = true;

    constructor(
        npc: Npc,
        startPos: number[],
        startRot: number[],
        clicked: boolean,
        battlepause: number,
    ) {
        //log(`npcFSM:ts - Loading up npcFSM`)
        super();
        var obj = Singleton.getInstance();
        this.addComponent(new BattleId(npc.id));
        this.getComponent(BattleId).id = npc.id;
        // this._player = player;
        this._player = obj.player
        this._npc = npc;
        // // this._clicked = clicked;
        // // this._battlepause = battlepause;
        // this._canvas = canvas;
        //this._combatLog = combatlog;

        let mobstate = this._npc.getComponent(MobState)
        let hoverText

        if(mobstate.faction > 0) {
            hoverText = "Talk"
        } else {
            hoverText = "Attack"
        }

        this._startPos = startPos;
        this._startRot = startRot;

        //log(`npcFSM:76 - Adding OnPointerDown (attack)`)
        this._npc.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    this._npc.getComponent(OnPointerDown).showFeedback = true;
                    let mobstate = this._npc.getComponent(MobState)
                    let faction = mobstate.faction
                    if(faction > 0) {
                        writeToCl("Lets have a conversation")
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

    orcid() {
    }

    update(dt: number) {
        let state = this._npc.getComponent(MobState);
        this.transform = this._npc.getComponent(Transform);
        //let dist = ydistance(this.transform.position, camera.position, this._npc);

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
                if(state.faction < 0) {
                    attack(scene, this._combatLog);
                     //log('npcFSM.ts:145 - attack (skipping for testing)')
                } else {
                    idle(scene, dt)
                }
            } else if (state.trackplayer || dist < 30 && dist > 8 && state.faction < 0) {
                //log(`npcFSM.ts:147 - chase ${dist}`)
                chase(scene, dt, dist);
            } else if (dist > 30) {
                //log(`npcFSM.ts:150 ${this._npc.id} - patrol ${dist}`)
                patrol(scene,dt);
             } 
        }
    }

    levelupcheck() {
        if (this._player.levelup) {
            levelupbox.play();
            levelupbox.play();
            writeToCl(`You have reached a new level! You are now level ${this._player.level}`)
            writeToCl(`You have gotten stronger and tougher!`)
            this._player.levelup = false;
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