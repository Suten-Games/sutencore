import { MobState } from "../components/mobStateComponent";

@Component("followData")
export class followData {
  target: Vector3 = Vector3.Zero();
  origin: Vector3 = Vector3.Zero();
  fraction: number = 0;
}

// walk
export class FollowSystem implements ISystem {
  mob;
  camera = Camera.instance;

  constructor(mob) {
    this.mob = mob;
  }
  update(dt: number) {
    //log('following')
    let walk = this.mob.getComponent(followData);
    let transform = this.mob.getComponent(Transform);
    let chase = this.mob.getComponent(MobState).trackplayer;
    if (chase) {
      let newTarget = this.camera.feetPosition.clone();
      //newTarget.y = newTarget.y - 1.75;
      newTarget.x = newTarget.x + 1;
      if(newTarget.x >= 79) {
        //log('resetting to x border')
        newTarget.x = 79
      }

      newTarget.z = newTarget.z + 1;
      if(newTarget.z >= 79) {
        //log('resetting to z border')
        newTarget.z = 79
      }

      walk.target = newTarget;
      walk.origin = transform.position;
      //walk.fraction = 0

      //this made the orc face the wrong way for some reason
      //transform.lookAt(newTarget)

      if (walk.fraction < 1) {
        //if (!isInBounds(walk.target)) return;
        transform.position = Vector3.Lerp(
          walk.origin,
          walk.target,
          walk.fraction
        );
        //walk.fraction += 1 / 90;
        walk.fraction += 1 / 50000;
      } else {
        walk.fraction = 0;
      }
    }
  }
}

// check if the target is inside the scene's bounds
export function isInBounds(position: Vector3): boolean {
  return (
    position.x > 75 && position.x < 14 && position.z > 71 && position.z < 8
  );
}
