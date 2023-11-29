import { TimeOut } from "src/components/timeOutComponent";
import { MobState } from "../components/mobStateComponent";
//import { TimeOut } from "../components/timeOutComponent";

export function patrol(s: any, dt: number) {
    //log(`${s.npc.id} patrolling`)
    const mob = s.npc
    const TURN_TIME = 0.5;
    const PAUSE = 2.2;
    const mobstate = mob.getComponent(MobState);
    let transform = mob.getComponent(Transform);

    // If mob is in 'idle' state, decrease the timeout
    if (mobstate.idle) {
        mobstate.idletimeout -= dt;
        // If timeout has reached 0, resume patrolling and stop idling
        if (mobstate.idletimeout <= 0) {
            mobstate.idle = false;
            mobstate.idletimeout = 0;
        } else {
            mob.mobidle();  // Run idle behavior
            return;  // Skip the rest of the patrol function
        }
    }

    if (!mobstate.idle) {
        if (mobstate.array && mobstate.array.length > 0) {
            //log(`calling mob.mobwalk in the patrol.ts`)
            mob.mobwalk();
            // The rest of the patrolling code...
            if (mobstate.fraction < 1) {
                mobstate.fraction += dt / 12;
                transform.position = Vector3.Lerp(
                    mobstate.array[mobstate.origin],
                    mobstate.array[mobstate.target],
                    mobstate.fraction
                );
            } else {
                // When reaching a waypoint, randomly decide whether to go idle
                if (Math.random() < 0.2) {  // 20% chance to go idle
                    mobstate.idle = true;
                    mobstate.idletimeout = Math.random() * 2 * 60;  // Random timeout up to 2 minutes
                    return;
                }

                if (mobstate.target > mobstate.origin) {
                    mobstate.origin = mobstate.target;
                    mobstate.target += 1;
                } else {
                    mobstate.origin = mobstate.target;
                    mobstate.target -= 1;
                }

                if (mobstate.target >= mobstate.array.length) {
                    if (mobstate.array.length % 2 > 0) {
                        mobstate.target = 1;
                    } else {
                        mobstate.target = 0;
                    }
                }

                if (mobstate.target < 0) {
                    mobstate.origin = 0;
                    mobstate.target = 1;
                }

                mobstate.fraction = 0;
                transform.lookAt(mobstate.array[mobstate.target]);
                mob.mobwalkpause()
                mob.mobturn()
                mob.addComponent(new TimeOut(TURN_TIME));
            }
        } else {
            // If mobstate.array is not set or blank, make the NPC stand idle
            mobstate.idle = true;
            mobstate.idletimeout = Math.random() * 2 * 60;  // Random timeout up to 2 minutes
        }
    }

    //mob.mobwalk()
}
