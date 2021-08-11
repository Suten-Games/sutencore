// import { MobState } from "../components/mobState";
// import { TimeOut } from "../components/timeOut";

// export function patrol(s) {
//   //log(`${s.npc.id} patrolling`)
//   const PAUSE = 2.2;
//   const mobstate = s.npc.getComponent(MobState);
//   // if(s.npc.vischeck()) {
//   //   s.npc.hidehpbar();
//   // }
  

//   if (
//     mobstate.battle ||
//     mobstate.clicked ||
//     mobstate.timeout ||
//     mobstate.trackplayer
//   ) {
    
//     //log(`updating ${s.npc.id} patrol state and clearing aggro list`)

//     mobstate.battle = false
//     mobstate.clicked = false;
//     mobstate.playerdead = false;
//     mobstate.timeout = false;
//     mobstate.trackplayer = false;

//     let aggarray = [];
//     aggarray = s.player.aggro;
//     if (aggarray != undefined && aggarray.length > 0) {
//       if (aggarray.indexOf(s.npc.id) > -1) {
//         s.player.updateaggro("remove", s.npc.id);
//       }
//     } 
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
//   } 
//   // else {
//   //   if(s.npc.percentage < 100) {
//   //     log(`patrol.ts: healing ${s.npc.id} ${s.npc.percentage} for 1 point of damage`)
//   //     s.npc.heal(.01)
//   //   }
//   // }
// }
