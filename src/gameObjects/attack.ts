// import resources from "../resources";
// import { SoundBox } from "../components/soundbox";
// import { SecondaryTimeOut } from "../components/secondaryTimeOut";
// import { TimeOut } from "../components/timeOut";
// import { MobState } from "../components/mobState";
// import { SpawnTimeOut } from "../components/spawnTimer";
// import { SceneState } from "./npcFSM";
// import { CombatLog } from "./combatLog";
// import { Singleton } from "../components/playerDetail";
// //import { BossBattle } from "../components/deathItem";
// import * as ui from '../../node_modules/@dcl/ui-utils/index'
// import { loadDeath, unloadLife, unloadVictory } from "../components/loadDeath";

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

// const killbox = new SoundBox(
//   new Transform({ position: new Vector3(7, 0, 8) }),
//   resources.sounds.killping,
//   false
// );

// const obj = Singleton.getInstance();
// let localstate = obj.localmobstate;

// const fist = new Entity("fist");
// fist.addComponent(resources.models.fist);
// fist.addComponent(
//   new Transform({
//     position: new Vector3(0,-0.2,1),
//     rotation: Quaternion.Euler(0, -90, 0),
//     scale: new Vector3(.6, .6, .6),
//   })
// )

// const PAUSE = 2.2;

// export function attack(s: SceneState, cl: CombatLog) {
//   const mobstate = s.npc.getComponent(MobState);
//   const mobvisible = s.npc.getComponent(GLTFShape).visible;

//   if (mobstate.mosthated == null) {
//     log(
//       `Battle (${mobstate?.id}) is joined! Setting mosthated to me because he doesn't hate anyone yet.`
//     );

//     mobstate.mosthated = obj.playeraddress;
//     //mobstate.mobdead = false;
//     mobstate.clicked = false;
//     mobstate.playerdead = false;
//     mobstate.timeout = false;
//     mobstate.trackplayer = false;

//     let id = mobstate?.id;
//     let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

//     if (exists > -1) {
//       //log("exists 1: ", exists);
//       obj.localmobstate.splice(exists, 1, mobstate);
//     } else {
//       obj.localmobstate.push(mobstate);
//     }
//   } else if ((mobstate.mosthated = obj.playeraddress)) {
//     //He hates me so we battlin'
//     if (mobstate.mobdead || mobstate.playerdead || mobvisible == false) {
//       // log(
//       //   "attack.ts: escaping out of attack.ts because the mob or the player is dead"
//       // );
//       return;
//     }

//     if (!mobstate.battle) {
//       //Check to see if this is the boss fight
//       if(mobstate.mobname == 'Orc Chief') {
//         cl.text = `The Sand Orc Chief has noticed you. Defend yourself!!`; 
//       }
//       // try {
//       //   const bossbattle = s.npc.getComponent(BossBattle);
//       //   if(bossbattle) {
//       //     cl.text = `The Sand Orc Chief has noticed you. Defend yourself!!`;
//       //   }
//       // } catch {
//       //   log(`Mob is not a boss`)
//       // }
      

//       //log(`${mobstate.id} turning on showhpbar1`);
//       s.npc.showhpbar();
//       //log(`Setting intial mob location`)
//       mobstate.position = s.transform.position;
//       mobstate.rotation = s.transform.rotation;

//       let id = mobstate?.id;
//       let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

//       if (exists > -1) {
//         //log(`${mobstate?.id} exists 1 ${exists}`);
//         obj.localmobstate.splice(exists, 1, mobstate);
//       } else {
//         obj.localmobstate.push(mobstate);
//       }
//     }

//     //Keeping mobstate location synced

//     if (!s.clicked) {
//       if (
//         !s.npc.hasComponent(SecondaryTimeOut) &&
//         s.npc.getComponent(OnPointerDown).showFeedback === false
//       ) {
//         s.npc.getComponent(OnPointerDown).showFeedback = true;
//       }

//       if (!s.npc.hasComponent(SecondaryTimeOut)) {
//         //adding a timeout for click delay, old one expired
//         //This is a setting that should be tweaked depending on player class and level

//         mobstate.battle = true;
//         //mobstate.mobdead = false;
//         mobstate.clicked = false;
//         mobstate.playerdead = false;
//         mobstate.timeout = true;

//         soundbox3.play();
//         s.player.damage(mobstate.damage);

//         if(s.npc.mobname == 'Orc Shaman') {
//           cl.text = `Your blood BOILS!! You take ${mobstate.damage} points of damage`
//         } else {
//           cl.text = `An ${s.npc.mobname} hits YOU for ${mobstate.damage} points of damage`;
//         }

        
//         //log(`currently being hit by ${s.npc.id}`)
//         //log(`got popped for ${mobstate.damage} hp`)
//         //log(`adding a timeout of ${PAUSE} for punch delay to ${s.npc.id}`);
//         s.npc.addComponentOrReplace(new SecondaryTimeOut(PAUSE));
//       }
//     } else if (s.clicked) {
//       //log(`attack.ts ${s.npc.id} has been clicked`);
//       if (!s.npc.hasComponent(SecondaryTimeOut)) {
//         soundbox4.play();
//         let nowloc = [
//           s.transform.position.x,
//           s.transform.position.y,
//           s.transform.position.z,
//         ];
//         let nowrot = [
//           s.transform.rotation.x,
//           s.transform.rotation.y,
//           s.transform.rotation.z,
//         ];

//         if (s.player.basedamage === undefined) {
//           //log('attack.ts: setting default basedamage for player ', s.player)
//           s.player.basedamage = 1;
//         }

//         let damage = s.player.basedamage * Math.round(Math.random() * 3);
//         //let damage = Math.floor(Math.random() * s.player.basedamage) + 2
//         //let damage = 1;
//         //////////////////
//         // Set Damage to 1 for testing purposes
//         //////////////////

//         let mobhp = s.npc.takedamage(damage, nowloc, nowrot);

//         //fist.getComponent(GLTFShape).visible = true

//         let actionverb
//         if(obj.playerclass == 'Warrior') {
//           actionverb = 'slash'
//         } else if(obj.playerclass == 'Rogue') {
//           actionverb = 'pierce'
//         } else if(obj.playerclass == 'Berzerker') {
//           actionverb = 'chop'
//         } else {
//           actionverb = 'hit'
//         }

//         if (damage == 0) {
//           cl.text = `You MISS a ${s.npc.mobname}`;
//         } else {
//           cl.text = `You ${actionverb} a ${s.npc.mobname} for ${s.player.basedamage} points of damage`;
//         }

//         mobstate.clicked = false;

//         if (mobhp <= 0) {
//           //const bossbattle = s.npc.getComponent(BossBattle);
//           //log(`Mob is dead: ${mobstate.mobname}`)
//           if(mobstate.mobname == 'Orc Chief') {
//           //if(bossbattle) {
//             //log(`mobstate.mobname: ${mobstate.mobname}`)
//             cl.text = `You have defeated the Sand Orc Chief!!`;
//             cl.text = `You have captured the Sand Orc flag!!`
//             // ui.displayAnnouncement(`${obj.playername} is victorious!!!! The Sand Orcs have fled the Ruins of Saqarra!!!!`, 180)
//             mobstate.gameover = true
//             mobstate.winner = obj.playername
//             // unloadVictory()
//           }
//           //log("hiding fist cause mob is dead");
//           //engine.removeEntity(fist)
//           //fist.getComponent(GLTFShape).visible = false
//           mobstate.battle = false;
//           log('setting mobdead to true')
//           mobstate.mobdead = true;
//           mobstate.clicked = false;
//           mobstate.playerdead = false;
//           mobstate.timeout = false;
//           mobstate.trackplayer = false;
//           log('setting orcdead to true')
//           mobstate.orcdead = true;

//           let id = mobstate?.id;
//           let exists = obj.localmobstate.map((x) => x.id).indexOf(id);
//           log(`id: ${s.npc.id} battle decided, pushing to mobstate`);

//           if (exists > -1) {
//             log(`id: ${s.npc.id} exists 2: ${exists}`);
//             obj.localmobstate.splice(exists, 1, mobstate);
//           } else {
//             obj.localmobstate.push(mobstate);
//           }

//           //log(`in attack mob ${s.npc.id} hp is 0, setting SpawnTimeout to 90`)
//           s.npc.addComponentOrReplace(new SpawnTimeOut(9000));
//           let aggarray = [];
//           aggarray = s.player.aggro;
//           if (aggarray != undefined && aggarray.length > 0) {
//             if (aggarray.indexOf(s.npc.id) > -1) {
//               s.player.updateaggro("remove", s.npc.id);
//             }
//           }

//           cl.text = `You have slain an ${s.npc.mobname}`;
//           //cl.text = "You have gained experience!";

//           killbox.play();

//           s.npc.addlootclick();

//           if (s.player.level === undefined) {
//             s.player.level = 1;
//           }

//           //log(`calling achievement check with 20 and ${s.player.level}`)
//           //This is a setting that shouuld change from NPC to NPC. The XP Gained from a kill.
//           if(s.npc.xp) {
//             s.player.achievementcheck(s.npc.xp, s.player.level); 
//             cl.text = `You have gained ${s.npc.xp} experience!`;
//           } else {
//             s.player.achievementcheck(20, s.player.level);
//             cl.text = `You have gained 20 experience!`;
//           }
          
//           s.npc.hidehpbar();
//         } else {
//           mobstate.battle = true;
//           mobstate.clicked = false;
//           mobstate.playerdead = false;
//           mobstate.timeout = true;
//           mobstate.trackplayer = false;
//         }
//       }
//     }
//   } else { 
//     if(mobstate.battle == false) {
//       log(
//         `Battle (${mobstate?.id}) is rejoined! Setting mosthated to me because the old player is missing or dead.`
//       );
  
//       mobstate.mosthated = obj.playeraddress;
//       mobstate.clicked = false;
//       mobstate.playerdead = false;
//       mobstate.timeout = false;
//       mobstate.trackplayer = false;

//       let id = mobstate?.id;
//       let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

//       if (exists > -1) {
//         log(`${mobstate?.id} exists 1 ${exists}`);
//         obj.localmobstate.splice(exists, 1, mobstate);
//       } else {
//         obj.localmobstate.push(mobstate);
//       }
//     } else {
//       //He hates someone else so we're locked out
//       log(`Exiting attack loop because he hates someone else`);
//       return;
//     }
//   }
// }
