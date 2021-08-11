// import { MobState } from "./mobState";
// import { TimeOut } from "./timeOut";
// import { SecondaryTimeOut } from "../components/secondaryTimeOut";
// import { NpcId, NpcName } from "../itemflags/npcId";
// import { ChaseSystem } from "./chaseSystem";
// import { FollowSystem } from "./followSystem";
// import { SoundBox } from "./soundbox";
// import resources from "../resources";
// import { SpawnTimeOut } from "./spawnTimer";
// import { Singleton } from "./playerDetail";
// import { chase } from "../gameObjects/chase";

// const mobs = engine.getComponentGroup(MobState);
// const TURN_TIME = 0.5;
// const PUNCH_TIME = 2.2;
// let following = false;
// //const IDLE_TIME = 10;
// const soundbox3 = new SoundBox(
//   new Transform({ position: new Vector3(7, 0, 8) }),
//   resources.sounds.playerHit2,
//   false
// );
// const soundbox4 = new SoundBox(
//   new Transform({ position: new Vector3(7, 0, 8) }),
//   resources.sounds.playerHit,
//   false
// );

// export class MobStateSystem implements ISystem {
//   private _life = true;

//   set life(val) {
//     this._life = val;
//   }

//   get life() {
//     return this._life;
//   }

//   update(dt: number) {
//     if (this.life) {
//       let obj = Singleton.getInstance();
//       for (let mob of mobs.entities) {
//         let state = mob.getComponent(MobState);
//         //let dead = mob.getComponentOrNull(SpawnTimeOut);
//         let animator = mob.getComponent(Animator);

//         let walk = animator.getClip("a-walking");
//         let walk_ = animator.getClip("walking");

//         let idle = animator.getClip("b-idle");
//         let idle_ = animator.getClip("idle");

//         let fight = animator.getClip("c-punch");
//         let fight_ = animator.getClip("punch");

//         let kick = animator.getClip("d-kick");
//         let kick_ = animator.getClip("kick");

//         let hit1 = animator.getClip("e-hitInHead");
//         let hit1_ = animator.getClip("hitInHead");

//         let hit2 = animator.getClip("f-hitInKidney");
//         let hit2_ = animator.getClip("hitInKidney");

//         let turn = animator.getClip("g-turnAround");
//         let turn_ = animator.getClip("turnAound");

//         let death1 = animator.getClip("h-death1");
//         let death1_ = animator.getClip("death1");

//         let death2 = animator.getClip("i-death2");
//         let death2_ = animator.getClip("death2");

//         //dead will have a timer object or be a null value
//         //if it has a timer vlue dead will be true
//         //the timer represents a dead object doing a a countdown
//         //if dead is true then the mob is dead
//         //if the mob is !dead then it is alive
//         //log('dead ', dead)

//         if (!state.mobdead) {
        
//           let transform = mob.getComponent(Transform);
//           //log(`Attempting to set the rotation: ${transform.rotation} and position: ${transform.position} `)
//           // transform.rotation = Quaternion.Euler(state.rotation.x, state.rotation.y, state.rotation.z)
//           // transform.position = new Vector3(state.position.x, state.position.y, state.position.z)

//           //let chaser = new ChaseSystem(mob, 5)
//           let chaser = new FollowSystem(mob);
//           const camera = Camera.instance;
//           //let chaseorigin = mob.getComponent(Transform).position;
//           //log('state ', state)
//           //log(`${mob.getComponent(NpcId).id} STATE  ${state}`)

//           //log('state.battle ', state.battle)
//           if (state.mobdead) {
//             //log("mob is dead, play the death animation");
//             idle.playing = false;
//             idle_.playing = false;
//             fight.playing = false;
//             fight_.playing = false;
//             death2.playing = false;
//             death2_.playing = false;
//             walk.playing = false;
//             walk_.playing = false;
//             turn.playing = false;
//             turn_.playing = false;
//             hit1.playing = false;
//             hit1_.playing = false;
//             hit2.playing = false;
//             hit2_.playing = false;
//             death1.playing = true;
//             death1_.playing = true;
//           } else if (state.battle == false) {
//             if (state.trackplayer) {
//               ////////////////
//               // CHASE MODE //
//               ////////////////

//               //log(`${mob.getComponent(NpcId).id} CHASE MODE `)
//               idle.playing = false;
//               idle_.playing = false;
//               fight.playing = false;
//               fight_.playing = false;
//               death1.playing = false;
//               death1_.playing = false;
//               death2.playing = false;
//               death2_.playing = false;
//               walk.playing = true;
//               walk_.playing = true;
//               turn.playing = false;
//               turn_.playing = false;
//               hit1.playing = false;
//               hit1_.playing = false;
//               hit2.playing = false;
//               hit2_.playing = false;

//               if (following) {
//                 break;
//               }

//               following = true;
//               engine.addSystem(chaser);
//             } else {
//               ////////////////
//               // PATROL MODE //
//               ////////////////

//               if (following) {
//                 //log("patrolling, removing chaser");
//                 engine.removeSystem(chaser);
//                 following = false;
//               }

//               //log(`${mob.getComponent(NpcId).id} PATROL MODE `)

//               if (
//                 !mob.hasComponent(TimeOut) ||
//                 !mob.hasComponent(SecondaryTimeOut)
//               ) {
//                 //log(`${mob.getComponent(NpcId).id} MobState Should be patrolling`);
//                 idle.playing = false;
//                 idle_.playing = false;
//                 fight.playing = false;
//                 fight_.playing = false;
//                 death1.playing = false;
//                 death1_.playing = false;
//                 death2.playing = false;
//                 death2_.playing = false;
//                 walk.playing = true;
//                 walk_.playing = true;
//                 turn.playing = false;
//                 turn_.playing = false;
//                 hit1.playing = false;
//                 hit1_.playing = false;
//                 hit2.playing = false;
//                 hit2_.playing = false;

//                 if (state.fraction < 1) {
//                   state.fraction += dt / 12;
//                   transform.position = Vector3.Lerp(
//                     state.array[state.origin],
//                     state.array[state.target],
//                     state.fraction
//                   );
//                 } else {
//                   if (state.target > state.origin) {
//                     state.origin = state.target;
//                     state.target += 1;
//                   } else {
//                     state.origin = state.target;
//                     state.target -= 1;
//                   }

//                   if (state.target >= state.array.length) {
//                     if (state.array.length % 2 > 0) {
//                       state.target = 1;
//                     } else {
//                       state.target = 0;
//                     }
//                   }

//                   if (state.target < 0) {
//                     state.origin = 0;
//                     state.target = 1;
//                   }

//                   state.fraction = 0;
//                   transform.lookAt(state.array[state.target]);
//                   walk.pause();
//                   walk_.pause();
//                   turn.play();
//                   turn_.play();
//                   mob.addComponent(new TimeOut(TURN_TIME));
//                 }
//               }
//             }
//             //}
//           } else {
//             ////////////////
//             // ATTACK MODE //
//             ////////////////

//             //log(`${mob.getComponent(NpcId).id} ATTACK MODE `);
           
//             if (state.mosthated !== obj.playeraddress) {
//               // I'm not engaged with this Orc so Move him to where the server says he should be
//               //log(`${mob.getComponent(NpcId).id} Attack Mode position ${state.position}`)
//               if (state.position !== undefined) {
//                 //Move Mob to the latest Transform Position from localmobstate
//                 //log(`${mob.getComponent(NpcId).id} Moving mob from ${transform.position} to ${state.position}`)
//                 transform.position.set(state.position[0],state.position[1],state.position[2])

//                 //log(`${mob.getComponent(NpcId).id} Showing battle animation`)
//                 fight.playing = true;
//                 fight_.playing = true;
                
                
//                 // state.fraction += dt / 12;
//                 // transform.position = Vector3.Lerp(
//                 //   transform.position,
//                 //   state.position,
//                 //   state.fraction
//                 // );

//                 //Rotate Mob to latest transform Position from localmobstate
//                 //log(`${mob.getComponent(NpcId).id} Rotating mob from ${transform.rotation} to ${state.rotation}`)
//                 transform.rotation.setEuler(state.rotation[0],state.rotation[1],state.rotation[2])
//               }
//             } else {
//               //Enter Battle Mode
//               if (following) {
//                 //log("attacking removing chaser");
//                 engine.removeSystem(chaser);
//                 following = false;
//               }
  
//               let newTarget = camera.position.clone();
//               newTarget.y = newTarget.y - 1.75;
//               transform.lookAt(newTarget);

//               if (!state.clicked) {
//                 if (!mob.hasComponent(TimeOut)) {
//                   idle.playing = false;
//                   idle_.playing = false;
//                   fight.playing = true;
//                   fight_.playing = true;
//                   death1.playing = false;
//                   death1_.playing = false;
//                   death2.playing = false;
//                   death2_.playing = false;
//                   walk.playing = false;
//                   walk_.playing = false;
//                   turn.playing = false;
//                   turn_.playing = false;
//                   hit1.playing = false;
//                   hit1_.playing = false;
//                   hit2.playing = false;
//                   hit2_.playing = false;
//                   mob.addComponentOrReplace(new TimeOut(PUNCH_TIME));
//                 }
//               } else if (state.clicked) {
//                 //log("mobstatesystem: has been clicked");
//                 idle.playing = false;
//                 idle_.playing = false;
//                 fight.playing = true;
//                 fight_.playing = true;
//                 death1.playing = false;
//                 death1_.playing = false;
//                 death2.playing = false;
//                 death2_.playing = false;
//                 walk.playing = false;
//                 walk_.playing = false;
//                 turn.playing = false;
//                 turn_.playing = false;
//                 hit1.playing = true;
//                 hit1_.playing = true;
//                 hit2.playing = false;
//                 hit2_.playing = false;
//               }
//             }
//           }
//         } else {
//           //log('mob should be dead in death section')
//           idle.playing = false;
//           idle_.playing = false;
//           fight.playing = false;
//           fight_.playing = false;
//           death2.playing = false;
//           death2_.playing = false;
//           walk.playing = false;
//           walk_.playing = false;
//           turn.playing = false;
//           turn_.playing = false;
//           hit1.playing = false;
//           hit1_.playing = false;
//           hit2.playing = false;
//           hit2_.playing = false;
//           death1.playing = true;
//           death1_.playing = true;
//           death1.looping = false;
//           death1_.looping = false;
//         }
//       }
//     }
//   }
// }