import { MobState } from "../components/mobStateComponent";
import resources from "../resources";
import { sutenBase, local } from "../../suten"
import { Player } from "../gameObjects/player";
import { CombatLog } from "../gameUI/combatLog";
import { Item } from "../gameObjects/item";
import { SoundBox } from "src/gameObjects/soundBox";
import { Singleton } from "src/gameObjects/playerDetail";
import { Npc } from "src/gameObjects/npc";
import { NpcFSM } from "src/gameFunctions/npcFSM";
import { NpcId } from "src/components/npcIdComponent";
import { SpawnTimeOut } from "src/components/spawnTimerComponent";
import { StartupTimeOut } from "src/components/startupTimer";


const updateInterval = 5; //10
const PUNCH_TIME = 2.2;
let clicked = false;

const victory = new SoundBox(
    new Transform({ position: new Vector3(25, 26, 31) }),
    resources.sounds.victory,
    false,
    210000
);

export enum dataType {
    REGISTER,
    PING,
    PICK,
    MOBLIST,
    SYNC,
}

const server = local
    ? "ws://localhost:8080/"
    : "wss://sutenquestapi.azurewebsites.net/";

export async function joinSocketsServer(
    player: Player,
    combatLog: CombatLog
) {

    const socket = new WebSocket(server)

    socket.onopen = async function (e) {
        let good = "good";
    };

    socket.onmessage = async function (event) {
        try {
            let msg
            if(!player.alive) {
                msg = []
            } else {
                msg = JSON.parse(event.data);
            }
            
            const mobs = engine.getComponentGroup(MobState);
            //log("in wsConnection - msg: ", msg);

            const newMobIds:any = {};
            msg.forEach((element: any) => {
                newMobIds[element.id] = true;
            });

            // Iterate over existing mobs and remove those not in the new data
            mobs.entities.forEach((mob) => {
                const mobId = mob.getComponent(NpcId).id;
                if (!newMobIds[mobId]) {
                    engine.removeEntity(mob);
                }
            });
           

            if (mobs.entities.length == 0) {
                //log(`Calling handleGame Message, length is 0`)
                handleGameMessage(msg);
            } else {
                //log(`Not calling handleGameMessage`)
                for (let item in msg) {
                    //log(`In choice for gameover`)
                    if (msg[item].gameover) {
                        processGameoverMessage(msg[item]);
                    } else {
                        //log(`Calling processNonGameOverMessage`)
                        processNonGameoverMessage(msg, mobs);
                    }
                }
            }
        } catch (error) {
            //log("ws error ", error);
            //log("ws error event: ", event)
        }
    };

    socket.onerror = (res) => {
        log("wss ERR ", res);
    };

    socket.onclose = (res) => {
        log("DISCONNECTED FROM SERVER", socket.readyState);
        if (obj.gameover) {
            //unloadVictory()
        } else if (obj.inDuat) {
            log('Wait for reconnection')
        } else {
            log('calling reconnect')
            combatLog.text = `The socket has disconnected`
        }
    };

    let obj = Singleton.getInstance();
    engine.addSystem(new pingSystem(socket));
    engine.addSystem(new updateSystem(socket));

    return socket;
}



export class closeSocket {
    socket: WebSocket

    close() {
        log('Closing web socket')
        this.socket.close();
    }

    constructor(socket: WebSocket) {
        this.socket = socket
    }
}

class pingSystem implements ISystem {
    timer: number = 0;
    npctimer: number = 0;
    socket: WebSocket;
    camera = Camera.instance;

    update(dt: number): void {
        let obj = Singleton.getInstance();
        this.npctimer += dt;
        this.timer += dt;

        //log(`pingSystem: Calling updateSoundPositions`)
        obj.updateSoundPositions();

        log(`CAMERA: ${this.camera.position}`)

        if (this.npctimer >= 20) {
            this.npctimer = 0;
        }

        if (this.timer >= 10) {
            this.timer = 0;

            if (obj.bpack.length == 0 && obj.abar.length == 0 && obj.sbook.length == 0) {
                //log(`wsConnection: Syncing HP Only`)
                this.socket.send(
                    JSON.stringify({
                        event: "events",
                        data: {
                            type: sutenBase,
                            hp: obj.playerhp,
                            address: obj.playeraddress,
                        },
                    })
                );
            } else {
                //log(`wsConnection: Syncing ALL`)
                let backpack = obj.bpack.map((lootitem: Item) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    }
                });

                let actionbar = obj.abar.map((lootitem) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    }
                });
                
                let character = obj.cwin.map((lootitem) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    } 
                })

                let spellbook = obj.sbook.map((lootitem) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    }
                });

                let warriorstome = obj.wtome.map((lootitem) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    } 
                })

                let roguestoolbelt = obj.rtoolbelt.map((lootitem) => {
                    return {
                        image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                        desc: lootitem.lootdesc(), type: lootitem.spelltype(), price: lootitem.itemprice(), itemtype: lootitem.itemtype,
                        spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                        spellend: lootitem.spellend(), sound: lootitem.sound()
                    }
                })

                this.socket.send(
                    JSON.stringify({
                        event: "events",
                        data: {
                            type: sutenBase,
                            hp: obj.playerhp,
                            address: obj.playeraddress,
                            backpack: backpack,
                            actionbar: actionbar,
                            character: character,
                            spellbook: spellbook,
                            warriorstome: warriorstome,
                            roguestoolbelt: roguestoolbelt
                        },
                    })
                );
            }


        }
    }
    constructor(socket: WebSocket) {
        this.socket = socket;
    }
}


class updateSystem implements ISystem {
    interval: number = updateInterval;
    socket: WebSocket;

    update(dt: number): void {
        //send updated to server at a regular interval

        this.interval -= dt;
        if (this.interval < 0) {
            let obj = Singleton.getInstance();
            if (obj.localmobstate && obj.localmobstate.length > 0) {
                //Only send a sync if there is something in localmobstate to send
                log(`wsConnection.ts: localmobstate: ${JSON.stringify(obj.localmobstate)}`)
                this.interval = updateInterval;
                this.socket.send(
                    JSON.stringify({
                        event: "battle",
                        data: {
                            user: "myuserid",
                            type: dataType.SYNC,
                            address: obj.playeraddress,
                            orcs: obj.localmobstate,
                        },
                    })
                );

                if (obj.localmobstate.length > 0) {
                    let exists = obj.localmobstate.map(x => x.mobdead).indexOf(true)
                    if (exists > -1) {
                        log(`wsConnection.ts - removing from localmobstate`)
                        obj.localmobstate.splice(exists, 1)
                    }
                }

            }
        }
    }

    constructor(socket: WebSocket) {
        this.socket = socket;
    }
}


export function createNpc(element: any, path: any) {
    return new Npc(
        element.id,
        element.name,
        element.class,
        element.xp,
        element.damage,
        element.maxhp,
        element.hp,
        element.percentage,
        new AudioClip(element.sound),
        new GLTFShape(element.shape),
        new Vector3(
            element.currentloc[0],
            element.currentloc[1],
            element.currentloc[2]
        ),
        Quaternion.Euler(
            element.currentrot[0],
            element.currentrot[1],
            element.currentrot[2]
        ),
        path,
        element.level,
        element.boss,
        element.portrait,
        element.width,
        element.height,
        element.personality,
        element.wallet,
        element.deity,
        element.goaltree,
        element.currentgoal,
        element.patron,
        element.faction,
        element.mobdead
    );
}

export function createNpcFSM(npc: any, element: any) {
    //log(`wsConnection.ts: 322 -> calling new NpcFSM`)
    return new NpcFSM(
        npc,
        element.spawnloc,
        element.spawnrot,
    );
}

export function processGameoverMessage(item: Item) {
    //log('I won')
    victory.play();
}

let currentNpcs: { [id: string]: Npc } = {};
export function processNonGameoverMessage(msg: any, mobs: any) {
    //log(`NPC: In processNonGameoverMessage mobs`)
    //log('NPC: msg: ', msg)

    for (let item in msg) {
        //log(`NPC: Entered for loop`)
        let isMobExists = mobs.entities.some((mob: any) => mob.getComponent(NpcId).id === msg[item].id);

        if (!isMobExists && msg[item].mobdead == false) {
            //log(`NPC: Should be creating this mob: ${JSON.stringify(msg[item])} `)
            handleGameMessage([msg[item]]); // Pass only the current message item as an array
            continue; // Skip processing this item further as it's a new mob
        }

        // Process existing mobs
        for (let mob of mobs.entities) {
            //log(`NPC: Process mob: ${mob.id}`)
            let mobstate = mob.getComponent(MobState);
            let obj = Singleton.getInstance();

            if(mob.hasComponent(SpawnTimeOut)) {
                //log(`Don't process anything, mob has a SpawnTimeOut set`)
            } else {
                if (msg[item].id === mob.getComponent(NpcId).id) {
                    //log(`NPC: IDs Match`)
                    const isMostHatedPlayer = msg[item].mosthated == null || msg[item].mosthated === obj.playeraddress;
                    mobstate.anotherplayer = !isMostHatedPlayer;

                    if (isMostHatedPlayer) {
                        //log(`NPC: calling handleLocalMobUpdates`)
                        handleLocalMobUpdates(msg[item], mobstate, obj);
                    } else {
                        //log(`NPC: Calling handleOtherPlayerEngaged`)
                        handleOtherPlayerEngaged(msg[item], mobstate, obj);
                    }
                }
            }

            
        }
    }
}


export function handleLocalMobUpdates(msgItem: any, mobstate: any, obj: any) {
    //log(`handlLocalMobUpdates.ts:320 msgItem.mobded ${msgItem.mobdead} mobstate.mobdead: ${mobstate.mobdead}`)
    //log(`handlLocalMobUpdates.ts:320 msgItem.id ${msgItem.id} mobstate.mobdead: ${mobstate.id}`)
    //log(`commenting from handleLocalMobUpdates to test - 2/23/24`)
    // if (obj.localmobstate.length > 0) {
    //     let exists = obj.localmobstate.map((x: { id: any; }) => x.id).indexOf(msgItem.id);
    //     if (exists > -1) {
    //         log(`wsConnection handleLocalMobUpdates removing item from localmobstate`)
    //         obj.localmobstate.splice(exists, 1);
    //     }
    // }

    if(msgItem.mobdead == false && mobstate.mobdead == true) {
        
        if(msgItem.id !== mobstate.id) {
            //log(`The IDs do not match, so sending ${JSON.stringify(msgItem)} to handleGameMessage(msgItem) to make a new mob`)
            handleGameMessage(msgItem)
        } else {
            //log(`handleLocalMobUpdates: SHOULD RESPAWN: wsConnection.ts:329 - Setting respawned to true on mobstate`)
            //log(`ID CHECK ID: msgItem.id ${msgItem.id} mobstate.mobdead: ${mobstate.id}`)
            mobstate.mobdead = false;
            mobstate.respawned = true;
        }
        
    }
}



export function handleOtherPlayerEngaged(msgItem: any, mobstate: any, mob: any) {
    log(`CHECK:::::   In handlOtherPlayerEngaged`)
    let mobid = msgItem.id;
    let obj = Singleton.getInstance()

    if (msgItem.mobdead === true) {
        //log(Setting mobdead for ${ mobid } to ${ msgItem.mobdead });
        mob.getComponent(MobState).mobdead = msgItem.mobdead;
        mob.getComponent(MobState).clicked = msgItem.clicked;
        mob.getComponent(MobState).playerdead = msgItem.playerdead;
        mob.getComponent(MobState).timeout = msgItem.timeout;
        mob.getComponent(MobState).battle = false;
        mob.getComponent(MobState).trackplayer = msgItem.trackplayer;
        mob.getComponent(MobState).playerpos = msgItem.playerpos;
        if (msgItem.currentloc === 3) {
            log(`CHECK 1:::::  Setting position to: ${msgItem.currentloc} `)
            mobstate.position = msgItem.currentloc;
            mobstate.rotation = msgItem.currentrot;
        }

        let exists = obj.localmobstate
            .map((x) => x.id)
            .indexOf(mobid);
        if (exists > -1) {
            log(`wsConnection.ts - removing from localmobstate: 440`)
            obj.localmobstate.splice(exists, 1, mobstate);
        } else {
            obj.localmobstate.push(mobstate);
        }
    } else {
        mobstate.battle = msgItem.battle;
        if (msgItem.currentloc.length === 3) {
            log(`CHECK 2:::::  Setting position to: ${msgItem.currentloc} `)
            mobstate.position = msgItem.currentloc;
            mobstate.rotation = msgItem.currentrot;
        } else {
            log(`Unable to set position cause currentloc: ${msgItem.currentloc} is too short ${msgItem.currentloc.length}`);
        }

    }
}



export function handleGameMessage(msg: any) {
    //log(`In Handle Game Message`)
    msg.forEach((element: any) => {
        if (element.gameover) {
            processGameoverMessage(element);
        } else {
            let mob;
            if(!element.mobdead) {
                if (element.path.length == 3) {
                    mob = createNpc(element, [
                        new Vector3(element.path[0][0], element.path[0][1], element.path[0][2]),
                        new Vector3(element.path[1][0], element.path[1][1], element.path[1][2]),
                        new Vector3(element.path[2][0], element.path[2][1], element.path[2][2]),
                    ]);
                    mob.addComponentOrReplace(new StartupTimeOut(4))
                } else if (element.path.length == 4) {
                    mob = createNpc(element, [
                        new Vector3(element.path[0][0], element.path[0][1], element.path[0][2]),
                        new Vector3(element.path[1][0], element.path[1][1], element.path[1][2]),
                        new Vector3(element.path[2][0], element.path[2][1], element.path[2][2]),
                        new Vector3(element.path[3][0], element.path[3][1], element.path[3][2]),
                    ]);
                    mob.addComponentOrReplace(new StartupTimeOut(5))
                } else {
                    mob = createNpc(element, [])
                }
                if (mob) {
                    engine.addSystem(createNpcFSM(mob, element));
                    mob.name = element.name;
                }
            }
        }
    });
}