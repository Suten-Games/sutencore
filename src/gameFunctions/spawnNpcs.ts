import { NPC } from "../../node_modules/@sutenquest/npc-utils/npc/npc";
import { Dialog } from "../../node_modules/@sutenquest/npc-utils/utils/types";
import { QuestNpc } from "../components/questnpcComponent";
import { NpcId } from "../components/npcIdComponent";
import { NpcName } from "../components/npcNameComponent";
import resources from '../resources';

interface questNPCInterface {
    name: string;
    spawnloc: Array<number>;
    shape: string;
    portrait: string;
    portraitheight: number;
    portraitwidth: number;
    quest: Array<object>;
    base: string;
}


const local: boolean = false;
const apiUrl = local
    ? "http://localhost:8080/questnpc"
    : "https://sutenquestapi.azurewebsites.net/questnpc/loc/-148,-124";

export class spawnNpcs {
    private _npc: NPC = new NPC(
        { position: new Vector3(0, 0, 0), scale: new Vector3(1, 1, 1), }, "",
        () => {
        },
    {
    portrait: {
        path: "",
        height: 132,
        width: 148,
    },
    faceUser: true,
    darkUI: true,
    onWalkAway: () => {
        log("walked away");
    },
}
                                );

    constructor() {
        log('calling from spawnNPCs')
        let npcscale;
        let found = false;

        executeTask(async () => {
            const options = {
                method: "GET",
            };

            const npcs = engine.getComponentGroup(QuestNpc);

            try {
                fetch(apiUrl, options).then((res) => res)
                    .then((res) => res.json())
                    .then((res) => {
                        //log('res ', res)
                        res.forEach((servernpc: { id: string; portaitheight: number; portraitwidth: number; shape: string; name: string; spawnloc: (number | undefined)[]; quest: Dialog[]; portrait: any; }) => {
                            found = false;
                            //log(`${npc.name} is being evaluated`)
                            npcs.entities.forEach(visiblenpc => {
                                //log(`Check id against ${visiblenpc.getComponent(NpcName).name}`)
                                if (servernpc.id == visiblenpc.getComponent(NpcId).id) {
                                    //log(`id matches so ${visiblenpc.getComponent(NpcName).name} is visible already`)
                                    //log('TBD: Check to see if values match')
                                    //log('TBD: Remove NPC or update as required')
                                    found = true;
                                    return
                                }
                            })

                            servernpc.portaitheight =  132;
                            servernpc.portraitwidth = 148;

                            if (!found) {
                                //log('Continuing past the RETURN')

                                if (servernpc.shape.indexOf('remetch') !== -1) {
                                    npcscale = .1
                                } else {
                                    npcscale = 1
                                }

                                log(`Creating ${servernpc.name}`)
                                this._npc = new NPC(
                                    { position: new Vector3(servernpc.spawnloc[0], servernpc.spawnloc[1], servernpc.spawnloc[2]), scale: new Vector3(npcscale, npcscale, npcscale), },
                                    servernpc.shape,
                                    () => {
                                        this._npc.talk(servernpc.quest, 0)
                                    },
                                    {
                                        portrait: {
                                            path: servernpc.portrait,
                                            height: 132,
                                            width: 148,
                                        },
                                        faceUser: true,
                                        darkUI: true,
                                        onWalkAway: () => {
                                            log("walked away");
                                        },
                                    }
                                );
                                this._npc.addComponent(new QuestNpc())
                                this._npc.addComponent(new NpcName())
                                this._npc.addComponent(new NpcId())
                                this._npc.getComponent(NpcName).name = servernpc.name
                                this._npc.getComponent(NpcId).id = servernpc.id
                                
                            }


                        });
                    })
            } catch (error) {
                log("failed to delete npc ", error);
            }

        });
    }
}