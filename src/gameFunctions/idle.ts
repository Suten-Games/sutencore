import { MobState } from "../components/mobStateComponent";

const ROT_SPEED = 1
const player = Camera.instance

export function idle(s: any, dt: number) {
    //log(`${s.npc.id} idling`)
    const mob = s.npc
    const TURN_TIME = 0.5;
    const PAUSE = 2.2;
    const mobstate = mob.getComponent(MobState);
    let transform = mob.getComponent(Transform);

    mobstate.battle = false;
    s.player.disengageFromBattle(mob.id)
    mobstate.dead = false;
    mobstate.clicked = false;
    mobstate.playerdead = false;
    mobstate.timeout = false;

    mob.mobidle()

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

}
