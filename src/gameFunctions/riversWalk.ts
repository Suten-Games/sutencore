import { SutenNpc } from "../gameObjects/sutennpc";
import { TimeOut } from "../components/timeOutComponent";
import { DerpData } from "../components/lerpDataComponent";
import { SecondaryTimeOut } from "../components/secondaryTimeOutComponent";
import { Orc } from "../gameObjects/orc";
import { MobState } from "../components/mobStateComponent";

export class Walk {
  private _npc: SutenNpc | Orc;
  private _turntime: number;
  private _walk: AnimationState;
  private _turn: AnimationState;

  constructor(npc: SutenNpc | Orc, turntime: number) {
    this._npc = npc;
    this._turntime = turntime;
    // let animator = npc.getComponent(Animator);
    // this._walk = animator.getClip("walk");
    // this._turn = animator.getClip("turnAround");
    this._walk = this._npc.walk;
    this._turn = this._npc.turnLeft;
  }

  update(dt: number) {
    // let animator = this._npc.getComponent(Animator);
    // let walk = animator.getClip("walk");
    // let turn = animator.getClip("turnAround");
    if (!this._npc.getComponent(MobState).battle) {
      if (
        !this._npc.hasComponent(TimeOut) &&
        !this._npc.hasComponent(SecondaryTimeOut)
      ) {
        let transform = this._npc.getComponent(Transform);
        let path = this._npc.getComponent(DerpData);
        this._walk.playing = true;
        this._turn.playing = false;
        // walk.playing = true;
        // turn.playing = false;
        if (path.fraction < 1) {
          path.fraction += dt / 12;
          transform.position = Vector3.Lerp(
            path.array[path.origin],
            path.array[path.target],
            path.fraction
          );
        } else {
          path.origin = path.target;
          path.target += 1;
          if (path.target >= path.array.length) {
            path.target = 0;
          }
          path.fraction = 0;
          transform.lookAt(path.array[path.target]);
          // walk.pause()
          // turn.play()
          this._walk.pause();
          this._turn.play();
          this._npc.addComponent(new TimeOut(this._turntime));
        }
      }
    } else {
      this._walk.pause();
    }
  }
}
