// import { QuestNpc } from "../itemflags/questnpc";
// import { NPC } from "../../node_modules/@dcl/npc-utils/npc/npc";
// import { NpcId, NpcName } from "../itemflags/npcId";

// const local: boolean = false;
// const apiUrl = local
//     ? "http://localhost:8080/questnpc"
//     : "https://sutenquestapi.azurewebsites.net/questnpc/loc/-148,-124";

// export class spawnNpcs {
//     private _npc

//     constructor() {
//         log('calling from spawnNPCs')
//         let npcscale;
//         let found = false;

//         executeTask(async () => {
//             const options = {
//                 method: "GET",
//             };

//             const npcs = engine.getComponentGroup(QuestNpc);

//             try {
//                 fetch(apiUrl, options).then((res) => res)
//                     .then((res) => res.json())
//                     .then((res) => {
//                         //log('res ', res)
//                         res.forEach(npc => {
//                             found = false;
//                             //log(`${npc.name} is being evaluated`)
//                             npcs.entities.forEach(visiblenpc => {
//                                 //log(`Check id against ${visiblenpc.getComponent(NpcName).name}`)
//                                 if (npc.id == visiblenpc.getComponent(NpcId).id) {
//                                     //log(`id matches so ${visiblenpc.getComponent(NpcName).name} is visible already`)
//                                     //log('TBD: Check to see if values match')
//                                     //log('TBD: Remove NPC or update as required')
//                                     found = true;
//                                     return
//                                 }
//                             })

//                             npc.portaitheight =  132;
//                             npc.portraitwidth = 148;

//                             if (!found) {
//                                 //log('Continuing past the RETURN')

//                                 if (npc.shape.indexOf('remetch') !== -1) {
//                                     npcscale = .1
//                                 } else {
//                                     npcscale = 1
//                                 }

//                                 log(`Creating ${npc.name}`)
//                                 this._npc = new NPC(
//                                     { position: new Vector3(npc.spawnloc[0], npc.spawnloc[1], npc.spawnloc[2]), scale: new Vector3(npcscale, npcscale, npcscale), },
//                                     npc.shape,
//                                     () => {
//                                         this._npc.talk(npc.quest, 0)
//                                     },
//                                     {
//                                         portrait: {
//                                             path: npc.portrait,
//                                             height: 132,
//                                             width: 148,
//                                         },
//                                         faceUser: true,
//                                         darkUI: true,
//                                         onWalkAway: () => {
//                                             log("walked away");
//                                         },
//                                     }
//                                 );
//                                 this._npc.addComponent(new QuestNpc())
//                                 this._npc.addComponent(new NpcName())
//                                 this._npc.addComponent(new NpcId())
//                                 this._npc.getComponent(NpcName).name = npc.name
//                                 this._npc.getComponent(NpcId).id = npc.id
                                
//                             }


//                         });
//                     })
//             } catch (error) {
//                 log("failed to delete npc ", error);
//             }

//         });
//     }
// }