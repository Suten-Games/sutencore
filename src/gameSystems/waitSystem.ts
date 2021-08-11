import { TimeOut } from "../components/timeOutComponent";
import { SecondaryTimeOut } from "../components/secondaryTimeOutComponent";
import { SpawnTimeOut } from "../components/spawnTimerComponent";

export const paused = engine.getComponentGroup(TimeOut);
export const secondarypaused = engine.getComponentGroup(SecondaryTimeOut)
export const spawntimer = engine.getComponentGroup(SpawnTimeOut)

export class WaitSystem {
  private _life = true;

  set life(val) {
    this._life = val;
  }

  get life() {
    return this._life;
  }

  update(dt: number) {
    if(this.life) {
      for (let ent of paused.entities) {
        let time = ent.getComponentOrNull(TimeOut);
        if (time) {
          if (time.timeLeft > 0) {
            time.timeLeft -= dt;
          } else {
            ent.removeComponent(TimeOut);
          }
        }
      }
      
      for (let ent of secondarypaused.entities) {
        let time = ent.getComponentOrNull(SecondaryTimeOut);
        if (time) {
          if (time.timeLeft > 0) {
            time.timeLeft -= dt;
          } else {
            ent.removeComponent(SecondaryTimeOut);
          }
        }
      }
  
      for (let ent of spawntimer.entities) {
        let time = ent.getComponentOrNull(SpawnTimeOut);
        if (time) {
          if (time.timeLeft > 0) {
            time.timeLeft -= dt;
          } else {
            log('removing spawntimeout')
            ent.removeComponent(SpawnTimeOut);
          }
        }
      }
    }
  }
}