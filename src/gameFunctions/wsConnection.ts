import { getUserData } from "@decentraland/Identity";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";
import { MobState } from "../components/mobStateComponent";
import resources from "../resources";
import { sutenBase } from "../../suten"
import { Player } from "../gameObjects/player";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { CombatLog } from "../gameUI/combatLog";
import { Item } from "../gameObjects/item";
import { SoundBox } from "src/gameObjects/soundBox";
import { Singleton } from "src/gameObjects/playerDetail";


const updateInterval = 5; //10

const local: boolean = false;
const PUNCH_TIME = 2.2;
let clicked = false;

const victory = new SoundBox(
    new Transform({ position: new Vector3(25, 26, 31) }),
    resources.sounds.victory,
    false
);

// types of data sent over websockets
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
    gameCanvas: UICanvas,
    actionBar: ActionBar,
    backPack: BackPack,
    player: Player,
    combatLog: CombatLog
) {

    // keep players in different realms in separate rooms for the ws server
    //userData = await getUserData()
    //alteredUserName = userData.displayName + Math.floor(Math.random() * 10000)

    let realm = await getCurrentRealm(); // { displayName: 'pepito' } //

    //    log(`You are in the realm: `, realm.displayName);
    // connect to websockets server
    //const socket = new WebSocket(server + realm.displayName + "-rivers");
    const socket = new WebSocket(server)
    //log("socket connection to: ", server + realm.displayName + "-rivers");

    socket.onopen = async function (e) {
        //log("wsConnection successful ", e);
        let good = "good";
    };

    // for each ws message that arrives
    socket.onmessage = async function (event) {
        try {
            const msg = JSON.parse(event.data);
            const mobs = engine.getComponentGroup(MobState);
            //log("in wsConnection - msg: ", msg);

        } catch (error) {
            log("ws error ", error);
        }
    };

    socket.onerror = (res) => {
        log("wss ERR ", res);
    };

    socket.onclose = (res) => {
        log("DISCONNECTED FROM SERVER", socket.readyState);
        if (obj.gameover) {
            //log(`Calling unloadVictory from wsConnection`)
            //unloadVictory()
        } else if (obj.inDuat) {
            log('Wait for reconnection')
        } else {
            log('calling reconnect')
            // reconnect(gameCanvas,
            //   actionBar,
            //   backPack,
            //   player,
            //   combatLog)
            //joinSocketsServer()
            combatLog.text = `The socket has disconnected`
            //unloadLife()
            //new NoEthScene(); 
        }
    };

    let obj = Singleton.getInstance();
    engine.addSystem(new pingSystem(socket));
    engine.addSystem(new updateSystem(socket));
    //obj.closesock = new closeSocket(socket)

    return socket;
}

function intialize() { }


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

    update(dt: number): void {
        let obj = Singleton.getInstance();
        this.npctimer += dt;
        this.timer += dt;

        if (this.npctimer >= 20) {
            this.npctimer = 0;
            //Causing a bug where spawned mobs are not able to battle
            //Commented out on 4/12/22 for now
            //log('Quest NPC Check')
            //new spawnNpcs()
        }

        if (this.timer >= 10) {
            this.timer = 0;

            let m3 = obj.bpack.map((lootitem: Item) => {
                //return { image: lootitem.image().src, slot: lootitem.slot() };
                return {
                    image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                    desc: lootitem.lootdesc(), type: null, price: lootitem.itemprice(), itemtype: lootitem.itemtype(),
                    spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                    spellend: lootitem.spellend(), sound: lootitem.sound()
                }
            });

            let m4 = obj.abar.map((lootitem) => {
                //return { image: lootitem.image().src, slot: lootitem.slot() };
                return {
                    image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                    desc: lootitem.lootdesc(), type: null, price: lootitem.itemprice(), itemtype: lootitem.itemtype(),
                    spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                    spellend: lootitem.spellend(), sound: lootitem.sound()
                }
            });

            let m5 = obj.sbook.map((lootitem) => {
                return {
                    image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
                    desc: lootitem.lootdesc(), type: null, price: lootitem.itemprice(), itemtype: lootitem.itemtype(),
                    spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
                    spellend: lootitem.spellend(), sound: lootitem.sound() 
                }
            });

            log('sutenBase ', sutenBase)
            log('hp ', obj.playerhp)
            log('address ', obj.playeraddress)
            log('m3 ', m3)
            log('m4 ', m4)
            log('m5 ', m5) 

            //log(`sending player hp ${obj.playerhp} to playerdetailservice`)

            this.socket.send(
                JSON.stringify({
                    event: "events",
                    data: {
                        type: sutenBase,
                        hp: obj.playerhp,
                        address: obj.playeraddress,
                        backpack: m3,
                        actionbar: m4,
                        spellbook: m5
                    },
                })
            );
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
                // log(`sending an updateSystem call to the server`)
                // log(`sending obj.localmobstate ${JSON.stringify(obj.localmobstate)}`)

                this.interval = updateInterval;
                //log('sending  ', JSON.stringify(obj.localmobstate))

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
                        //log(`Sent death update. Deleting ${exists} from ${JSON.stringify(obj.localmobstate)} now.`)
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