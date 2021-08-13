import { getUserData } from "@decentraland/Identity";
import { getCurrentRealm } from "@decentraland/EnvironmentAPI";
import { MobState } from "../components/mobStateComponent";
import { NpcId } from "../components/npcIdComponent";
import { Orc } from "../gameObjects/orc";
import { OrcFSM } from "../gameFunctions/npcFSM";
import { Singleton } from "../gameUtils/playerDetail";
import { loadDeath, unloadLife, unloadVictory } from "./loadDeath";
//import { NoEthScene } from "../noEthScene";
import { SoundBox } from "../gameUtils/soundbox";
import resources from "../resources";
//import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { spawnNpcs } from "../gameFunctions/spawnNpcs";
import { sutenBase } from "../../suten"
import { Player } from "../gameObjects/player";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { CombatLog } from "../gameUI/combatLog";
import { Item } from "../gameObjects/item";


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
  const socket = new WebSocket(server + realm.displayName + "-rivers");
  //log("socket connection to: ", server + realm.displayName + "-rivers");

  socket.onopen = async function (e) {
    log("wsConnection successful ", e);
  };

  // for each ws message that arrives
  socket.onmessage = async function (event) {
    try {
      const msg = JSON.parse(event.data);
      const mobs = engine.getComponentGroup(MobState);

      log("in wsConnection - msg: ", msg);

      if (mobs.entities.length == 0) {
        msg.forEach((element: { gameover: any; winnerslist: any[]; path: string | any[]; id: string; name: string; xp: number; mobdead: boolean; damage: number; sound: string; shape: string; hp: number; percentage: number; spawnloc: (number)[]; spawnrot: number[]; }) => {
          if (element.gameover) {
            obj.gameover = true;
            obj.winner = element.winnerslist[0]
            //log(`topside socket close`)
            //log(`this element's ${element.id} gameover is true: ${element.winnerslist}`)
            log(`${element.winnerslist[0]} has captured the flag!`)
            ui.displayAnnouncement(`${element.winnerslist[0]} is victorious!!!! The Sand Orcs have fled the Ruins of Saqarra!!!!`, 180)
            victory.play()
            socket.close()
          } else {
            let mob;
            if (element.path.length == 3) {
              mob = new Orc(
                element.id,
                element.name,
                element.xp,
                element.mobdead,
                element.damage,
                new AudioClip(element.sound),
                new GLTFShape(element.shape),
                element.hp,
                element.percentage,
                new Vector3(
                  element.spawnloc[0],
                  element.spawnloc[1],
                  element.spawnloc[2]
                ),
                Quaternion.Euler(
                  element.spawnrot[0],
                  element.spawnrot[1],
                  element.spawnrot[2]
                ),
                [
                  new Vector3(
                    element.path[0][0],
                    element.path[0][1],
                    element.path[0][2]
                  ),
                  new Vector3(
                    element.path[1][0],
                    element.path[1][1],
                    element.path[1][2]
                  ),
                  new Vector3(
                    element.path[2][0],
                    element.path[2][1],
                    element.path[2][2]
                  ),
                ],
                gameCanvas,
                actionBar,
                backPack,
                player
              );

              engine.addSystem(
                new OrcFSM(
                  gameCanvas,
                  player,
                  mob,
                  element.spawnloc,
                  element.spawnrot,
                  clicked,
                  PUNCH_TIME,
                  combatLog
                )
              );
              mob.name = element.name;
            } else if (element.path.length == 4) {
              mob = new Orc(
                element.id,
                element.name,
                element.xp,
                element.mobdead,
                element.damage,
                new AudioClip(element.sound),
                new GLTFShape(element.shape),
                element.hp,
                element.percentage,
                new Vector3(
                  element.spawnloc[0],
                  element.spawnloc[1],
                  element.spawnloc[2]
                ),
                Quaternion.Euler(
                  element.spawnrot[0],
                  element.spawnrot[1],
                  element.spawnrot[2]
                ),
                [
                  new Vector3(
                    element.path[0][0],
                    element.path[0][1],
                    element.path[0][2]
                  ),
                  new Vector3(
                    element.path[1][0],
                    element.path[1][1],
                    element.path[1][2]
                  ),
                  new Vector3(
                    element.path[2][0],
                    element.path[2][1],
                    element.path[2][2]
                  ),
                  new Vector3(
                    element.path[3][0],
                    element.path[3][1],
                    element.path[3][2]
                  ),
                ],
                gameCanvas,
                actionBar,
                backPack,
                player
              );
              engine.addSystem(
                new OrcFSM(
                  gameCanvas,
                  player,
                  mob,
                  element.spawnloc,
                  element.spawnrot,
                  clicked,
                  PUNCH_TIME,
                  combatLog
                )
              );
              mob.name = element.name;
            }
          }
        });
      } else {
        for (let item in msg) {
          if (msg[item].gameover) {
            obj.gameover = true;
            obj.winner = msg[item].winnerslist[0]
            //log(`bottomside socket close`)
            //log(`this element's ${msg[item].id} gameover is true: ${msg[item].winnerslist}`)
            log(`${msg[item].winnerslist[0]} has captured the flag!`)
            ui.displayAnnouncement(`${msg[item].winnerslist[0]} is victorious!!!! The Sand Orcs have fled the Ruins of Saqarra!!!!`, 180)
            socket.close()
          } else {
            for (let mob of mobs.entities) {
              let mobstate = mob.getComponent(MobState);
              let obj = Singleton.getInstance();

              if (msg[item].id == mob.getComponent(NpcId).id) {
                if (msg[item].mosthated == null || msg[item].mosthated == obj.playeraddress) {
                  mobstate.anotherplayer = false;
                  //log(`${msg[item].id} Manage updates of this mob: ${msg[item].id} locally`);
                  if (obj.localmobstate.length > 0) {
                    let exists = obj.localmobstate.map(x => x.id).indexOf(msg[item].id)
                    if (exists > -1) {
                      log(`${msg[item].id} Deleting ${exists} from ${obj.localmobstate} now.`)
                      obj.localmobstate.splice(exists, 1)
                    }
                  }
                  if (msg[item].mobdead == false && mobstate.mobdead == true && mobstate.orcdead == false) {
                    log(`${msg[item].id} Setting MobDead to False`)
                    mobstate.mobdead = msg[item].mobdead
                    log(`${msg[item].id} Setting MobRespawned to True`)
                    mobstate.respawned = true
                  } else if (msg[item].mobdead == false && mobstate.mobdead == true && mobstate.orcdead == true) {
                    //Added to Give the loop another tick to keep the orc from respawning too soon
                    mobstate.orcdead = false
                  }
                } else {
                  mobstate.anotherplayer = true;
                  //This mob is unengagable due to another player
                  let mobid = msg[item].id;
                  //log(`${mobid} in the else block since someone else is engaged`)

                  if (msg[item].mobdead == true) {
                    log(`Setting mobdead for ${mobid} to ${msg[item].mobdead}`);
                    mob.getComponent(MobState).mobdead = msg[item].mobdead;
                    mob.getComponent(MobState).clicked = msg[item].clicked;
                    mob.getComponent(MobState).playerdead = msg[item].playerdead;
                    mob.getComponent(MobState).timeout = msg[item].timeout;
                    //log(`${mobid} forcing battle to false`)
                    mob.getComponent(MobState).battle = false;
                    mob.getComponent(MobState).trackplayer = msg[item].trackplayer;
                    mob.getComponent(MobState).playerpos = msg[item].playerpos;

                    if (msg[item].currentloc == 3) {
                      //log(`${mobid} wsConnection.ts -> currentloc: ${msg[item].currentloc}`);
                      mobstate.position = msg[item].currentloc;
                      //log`${mobid} wsConnection.ts -> currentrot: ${msg[item].currentrot}`);
                      mobstate.rotation = msg[item].currentrot;
                    }

                    let exists = obj.localmobstate
                      .map((x) => x.id)
                      .indexOf(mobid);
                    if (exists > -1) {
                      obj.localmobstate.splice(exists, 1, mobstate);
                    } else {
                      obj.localmobstate.push(mobstate);
                    }

                  } else {
                    //log(`mobdead is currently false ${mobid} Item : ${JSON.stringify(msg[item])}`)
                    //log(`${mobid} someone else is engaged and mob is not dead.. update position: ${msg[item].currentloc} and battle: ${msg[item].battle}`)
                    //log(`${mobid} someone else is engaged and mob is not dead.. update position: ${msg[item].currentloc}`) 
                    mobstate.battle = msg[item].battle
                    //log(`${mobid} set battle to ${msg[item].battle}`)
                    //mobstate.battle = true;

                    if (msg[item].currentloc.length == 3) {
                      //log(`${mobid} wsConnection.ts -> currentloc: ${msg[item].currentloc}`);
                      mobstate.position = msg[item].currentloc;
                      //log(`${mobid} wsConnection.ts -> currentrot: ${msg[item].currentrot}`);
                      mobstate.rotation = msg[item].currentrot;
                    } else {
                      log(`Unable to set position cause currentloc: ${msg[item].currentloc} is too short ${msg[item].currentloc.length}`)
                    }
                  }
                }
              }
            }
          }
          //log(`Item : ${JSON.stringify(msg[item])}`)

        }
      }


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
      unloadVictory()
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
      unloadLife()
      //new NoEthScene(); 
    }
  };

  let obj = Singleton.getInstance();
  engine.addSystem(new pingSystem(socket));
  engine.addSystem(new updateSystem(socket));
  obj.closesock = new closeSocket(socket)

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
      log('Quest NPC Check')
      new spawnNpcs()
    }

    if (this.timer >= 10) {
      this.timer = 0;

      let m3 = obj.playerbackpack.map((lootitem: Item) => {
        //return { image: lootitem.image().src, slot: lootitem.slot() };
        return {
          image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
          desc: lootitem.lootdesc(), type: null, price: lootitem.itemprice(), itemtype: lootitem.itemtype(),
          spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
          spellend: lootitem.spellend(), sound: lootitem.sound()
        }
      });

      let m4 = obj.playeractionbar.map((lootitem) => {
        //return { image: lootitem.image().src, slot: lootitem.slot() };
        return {
          image: lootitem.image().src, slot: lootitem.slot(), srcw: lootitem.lootwidth(), srch: lootitem.lootheight(),
          desc: lootitem.lootdesc(), type: null, price: lootitem.itemprice(), itemtype: lootitem.itemtype(),
          spellshape: lootitem.spellshape(), spellstart: lootitem.spellstart(),
          spellend: lootitem.spellend(), sound: lootitem.sound()
        }
      });

      log('m3 ', m3)
      log('m4 ', m4)

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
        log(`sending an updateSystem call to the server`)
        log(`sending obj.localmobstate ${JSON.stringify(obj.localmobstate)}`)

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