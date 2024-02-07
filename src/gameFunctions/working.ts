import { TimeOut } from "src/components/timeOutComponent";
import { MobState } from "../components/mobStateComponent";

export function working(s: any, dt: number) {
    const mob = s.npc;
    const TURN_TIME = 0.5;
    // Adjusting PAUSE to be more frequent and potentially longer
    const PAUSE_MIN = 60; // Minimum idle time in seconds
    const PAUSE_MAX = 300; // Maximum idle time in seconds
    const mobstate = mob.getComponent(MobState);
    let transform = mob.getComponent(Transform);

    if (mob.battle) {
        mob.hidehpbar();
        mobstate.battle = false;
    }

    // If mob is in 'idle' state, decrease the timeout
    if (mobstate.idle) {
        mobstate.idletimeout -= dt;
        if (mobstate.idletimeout <= 0) {
            mobstate.idle = false;
            mobstate.idletimeout = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN); // Randomly decide next idle duration
        } else {
            mob.mobidle(); // Run idle behavior
            return; // Skip the rest of the working function
        }
    }

    if (!mobstate.idle) {
        if (mobstate.array && mobstate.array.length > 0) {
            mob.mobwalk();
            if (mobstate.fraction < 1) {
                mobstate.fraction += dt / 12;
                transform.position = Vector3.Lerp(
                    mobstate.array[mobstate.origin],
                    mobstate.array[mobstate.target],
                    mobstate.fraction
                );
            } else {
                // At each waypoint, go idle
                mobstate.idle = true;
                mobstate.idletimeout = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN); // Idle for a set time between PAUSE_MIN and PAUSE_MAX

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
                mob.mobwalkpause();
                mob.mobturn();
                mob.addComponent(new TimeOut(TURN_TIME));
            }
        } else {
            mobstate.idle = true;
            mobstate.idletimeout = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN);
        }
    }
}