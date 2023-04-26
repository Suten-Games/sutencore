import { MobState } from "../components/mobStateComponent";

@Component("followData")
export class followData {
    target: Vector3 = Vector3.Zero();
    origin: Vector3 = Vector3.Zero();
    fraction: number = 0;
}

const MOVE_SPEED = .08
const ROT_SPEED = 1
const player = Camera.instance


// walk
export class FollowSystem implements ISystem {
    mob;
    camera = Camera.instance;
    player = Camera.instance

    constructor(mob: any) {
        this.mob = mob;
        const transform = this.mob.getComponent(Transform)
    }

    update(dt: number) {
        //log('following')
        let walk = this.mob.getComponent(followData);
        let transform = this.mob.getComponent(Transform);
        let chase = this.mob.getComponent(MobState).trackplayer;
        if (chase) {

            const lookAtTarget = new Vector3(
                player.position.x,
                transform.position.y,
                player.position.z
            )

            const direction = lookAtTarget.subtract(transform.position)
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                dt * ROT_SPEED
            )

            const distance = Vector3.DistanceSquared(
                transform.position,
                player.position
            ) // Check distance squared as it's more optimized
            if (distance >= 8) {
                // Note: Distance is squared so a value of 4 is when the zombie is standing 2m away
                //zombie.walk()
                const forwardVector = Vector3.Forward().rotate(transform.rotation)
                const increment = forwardVector.scale(dt * MOVE_SPEED)
                transform.translate(increment)
            } else {
                log('followSystem:57 else - pause and fight')
                //zombie.attack()
            }

            // const forwardVector = Vector3.Forward().rotate(transform.rotation)
            // const increment = forwardVector.scale(dt * MOVE_SPEED)
            // transform.translate(increment)

        }
    }
}

// check if the target is inside the scene's bounds
export function isInBounds(position: Vector3): boolean {
    return (
        position.x > 75 && position.x < 14 && position.z > 71 && position.z < 8
    );
}
