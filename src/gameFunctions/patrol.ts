import { TimeOut } from "src/components/timeOutComponent";
import { MobState } from "../components/mobStateComponent";
//import { TimeOut } from "../components/timeOutComponent";

export function patrol(s:any,dt:number) {
    //log(`${s.npc.id} patrolling`)
    const mob = s.npc
    const TURN_TIME = 0.5;
    const PAUSE = 2.2;
    const mobstate = mob.getComponent(MobState);
    let transform = mob.getComponent(Transform);
    // if(s.npc.vischeck()) {
    //   s.npc.hidehpbar();
    // }

    //log(`patrolts:12 - mobstate: ${JSON.stringify(mobstate)}`)

    //log(`patrol.ts:12 - Calling mobwalk`)
    mob.mobwalk()

    if (mobstate.fraction < 1) {
        mobstate.fraction += dt / 12;
        transform.position = Vector3.Lerp(
            mobstate.array[mobstate.origin],
            mobstate.array[mobstate.target],
            mobstate.fraction
        );
    } else {
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
        //walk.pause();
        mob.mobwalkpause()
        //walk_.pause();
        mob.mobturn()
        //turn.play();
        //turn_.play();
        mob.addComponent(new TimeOut(TURN_TIME));
    }


    // if (
    //     mobstate.battle ||
    //     mobstate.clicked ||
    //     mobstate.timeout ||
    //     mobstate.trackplayer
    // ) {

    //     //log(`updating ${s.npc.id} patrol state and clearing aggro list`)

    //     mobstate.battle = false
    //     mobstate.clicked = false;
    //     mobstate.playerdead = false;
    //     mobstate.timeout = false;
    //     mobstate.trackplayer = false;

    //     let aggarray = [];
    //     // aggarray = s.player.aggro;
    //     // if (aggarray != undefined && aggarray.length > 0) {
    //     //     if (aggarray.indexOf(s.npc.id) > -1) {
    //     //         s.player.updateaggro("remove", s.npc.id);
    //     //         s.npc.hidehpbar()
    //     //     }
    //     // }
    //     // else if (aggarray != undefined && aggarray.length == 0) {
    //     //   if (!s.npc.hasComponent(TimeOut)) {
    //     //     if(!mobstate.playerdead) {
    //     //       if (s.player.hp < s.player.maxhp) {
    //     //         s.player.heal(1, false);
    //     //         s.npc.addComponentOrReplace(new TimeOut(PAUSE));
    //     //       }
    //     //     }
    //     //   }
    //     // }
    // }
    // else {
    //   if(s.npc.percentage < 100) {
    //     log(`patrol.ts: healing ${s.npc.id} ${s.npc.percentage} for 1 point of damage`)
    //     s.npc.heal(.01)
    //   }
    // }
}
