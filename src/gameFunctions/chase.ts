import { MobState } from "../components/mobStateComponent";

const ROT_SPEED = 1
const MOVE_SPEED = .9
const player = Camera.instance

export function chase(s: any, dt: number, dist: number) {
    //log(`Inside chase, dist: ${dist}`)

    const mob = s.npc
    const mobstate = mob.getComponent(MobState);
    let transform = mob.getComponent(Transform);

    mob.mobwalk()

    mobstate.battle = false;
    mobstate.dead = false;
    mobstate.clicked = false;
    mobstate.playerdead = false;
    mobstate.timeout = false;

    if (dist > 200) {
        log(`Ditched the mob, turning off chase`)
        mobstate.trackplayer = false;
        mobstate.battle = false;
        s.player.disengageFromBattle(mob.id);
        mob.hidehpbar()
    } else {
        mobstate.trackplayer = true;
        s.player.engageInBattle(mob.id)
    }

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

    const forwardVector = Vector3.Forward().rotate(transform.rotation)
    const increment = forwardVector.scale(dt * MOVE_SPEED)
    transform.translate(increment)
}