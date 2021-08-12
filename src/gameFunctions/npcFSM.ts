import { SoundBox } from "../gameUtils/soundbox";
import resources from "../resources";
import { Player } from "../gameObjects/player";
import { Orc } from "../gameObjects/orc";

import { CombatLog } from "../gameUI/combatLog";
import { MobState } from "../components/mobStateComponent";
import { BattleId } from "../components/battleIdComponent";
import { chase } from "./chase";
import { patrol } from "./patrol";
import { attack } from "./attack";
import { Singleton } from "../gameUtils/playerDetail";
import { otherplayerattack } from "./otherplayerattack";

const orclaugh = new SoundBox(
  new Transform({ position: new Vector3(7, 0, 8) }),
  resources.sounds.orclaugh,
  false
);

const levelupbox = new SoundBox(
  new Transform({ position: new Vector3(7, 0, 8) }),
  resources.sounds.levelup,
  false
);

@Component("orcFSM")
export class OrcFSM extends Entity {
  private _player: Player;
  private _npc: Orc;
  private _clicked = false;
  private _battlepause: number;
  private _punchpause: number = 2;

  private _combatLog: CombatLog;
  private canvas;
  private showHealthBar = false;
  public endFight: () => void;
  private transform;
  private trackplayer;
  private playerdead;
  private mobdead;
  private battlestate;
  private clicked;
  private playerPos;
  private _startPos;
  private _startRot;
  private _patrol = true;

  constructor(
    canvas,
    player: Player,
    npc: Orc,
    startPos: number[],
    startRot: number[],
    clicked: boolean,
    battlepause: number,
    combatlog: CombatLog
  ) {
    super();
    this.addComponent(new BattleId());
    this.getComponent(BattleId).id = npc.id;
    this._player = player;
    this._npc = npc;
    // this._clicked = clicked;
    // this._battlepause = battlepause;
    // this.canvas = canvas;
    this._combatLog = combatlog;

    this._startPos = startPos;
    this._startRot = startRot;


    this._npc.addComponentOrReplace(
      new OnPointerDown(
        (e) => {
          this._npc.getComponent(OnPointerDown).showFeedback = true;
          //this._clicked = true;
          let mobstate = this._npc.getComponent(MobState) 
          mobstate.battle = true;
          mobstate.clicked = true;
          mobstate.playerdead = false;
          mobstate.timeout = false;
          mobstate.trackplayer = false;
        },
        {
          button: ActionButton.PRIMARY,
          showFeedback: true,
          hoverText: "Punch",
        }
      )
    );
  }

  orcid() {
  }

  update(dt: number) {
    if (this._player.alive) {
      this.transform = this._npc.getComponent(Transform);
      let dist = ydistance(this.transform.position, camera.position);
      let state = this._npc.getComponent(MobState);
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

      //log(`npcFSM playerPos: ${playerPos}`)

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

      this.levelupcheck();

      if(state.anotherplayer) {
        otherplayerattack(scene, this._combatLog)
      } else {
        if (dist < 8) {
          attack(scene, this._combatLog);
        } else if (dist < 30 && dist > 8) {
          chase(scene);
        } else if (dist > 30 && dist < 14000) {
          patrol(scene);
        }  else {
          log(`too far away ${dist}, closing socket`)
          //log('trying to close the socket')
          if(!obj.inDuat) {
            obj.closeSocket()
          }
          
        }
      }
     
    }
  }

  levelupcheck() {
    if (this._player.levelup) {
      levelupbox.play();
      levelupbox.play();
      this._combatLog.text = `You have reached a new level! You are now level ${this._player.level}`;
      this._combatLog.text = `You have gotten stronger and tougher!`
      this._player.levelup = false;
    }
  }
}

function distance(pos1: Vector3, pos2: Vector3) {
  const a = pos1.x - pos2.x;
  const b = pos1.z - pos2.z;
  return a * a + b * b; 
}

function ydistance(pos1: Vector3, pos2: Vector3): number {
  //Mob Position - Player Position
  const y = pos1.y - pos2.y
  if(y > -2) {
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
  npc: Orc;
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
