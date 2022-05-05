import { getUserAccount } from "@decentraland/EthereumController";
import { getUserData } from "@decentraland/Identity";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { matic } from "../node_modules/@suten-games/l2-scene-utils/dist/index"
import * as crypto from "../node_modules/@suten-games/suten-scene-utils/dist/index"
import resources from "./resources";
import { BaseScene } from "./baseScene";

import { CombatLog } from "./gameUI/combatLog";
import { ActionBar } from "./gameUI/actionBar";
import { BackPack } from "./gameUI/backPack";
import { Khepra } from "./gameUI/khepra";
import { TradeWindow } from "./gameUI/tradeWindow";

import { joinSocketsServer } from "./gameFunctions/wsConnection";
import { connect } from "./gameFunctions/connections"
import { spawnNpcs } from "./gameFunctions/spawnNpcs";
import { reloadGame } from "./gameFunctions/reloadGame";

import { Player } from "./gameObjects/player";

import { Singleton } from "./gameUtils/playerDetail";

import { Mob } from './gameObjects/mob';
import { Cone, cubeColor } from './gameObjects/cones';
import { Cube, cubes } from './gameObjects/cube';

import { NPC } from "../node_modules/@suten-games/npc-utils/npc/npc";
import { Orc } from "./gameObjects/orc";
import { OrcFSM } from "./gameFunctions/npcFSM";


import { loadDeath } from "./components/loadDeath";
import { NoEthScene } from "./noEthScene";
import { BuilderHUD } from "./modules/BuilderHUD";


const local: boolean = false;

const apiUrl = local
  ? "http://localhost:8080/player"
  : "https://sutenquestapi.azurewebsites.net/player";

const gameCanvas = new UICanvas();
const combatLog = new CombatLog(gameCanvas);

// //SETUP UI
const actionBar = new ActionBar(gameCanvas, resources.interface.blueActionBar);
const backPack = new BackPack(gameCanvas, resources.interface.blueBackpack);
const khepra = new Khepra(gameCanvas, resources.interface.khepra, backPack);
let lowerCaseAddress: string = "";

log('basescene type ', typeof BaseScene)
if (typeof BaseScene == 'function') {
  new BaseScene()
}

let player = new Player(
  lowerCaseAddress,
  42,
  gameCanvas,
  combatLog,
  actionBar,
  backPack
);

let _npc: Orc

let failedstart = false;
let registered = false;
let _buybutton;

const tradeWindow = new TradeWindow(
  gameCanvas,
  resources.interface.blueMerchantInterface,
  actionBar,
  backPack,
  player,
  combatLog
);

//END SETUP UI

function startGame() {
  executeTask(async () => {
    if (!failedstart) {
      log('running registerPlayer()')
      registered = await !registerPlayer();
    }
  });
}

async function registerPlayer() {
  executeTask(async () => {
    try {
      log('calling getUserAccount()')
      let address = await getUserAccount();
      let userdata = await getUserData();
      if (userdata == null) {
        combatLog.text = ``;
        combatLog.text = ``;
        combatLog.text = `Welcome to SutenQuest!`;
        combatLog.text = `:(  Userdata failed to load  :(`;
        combatLog.text = `Please refresh/reload the scene`;
        failedstart = true;

        return;
      } else if (!userdata.hasConnectedWeb3) {
        combatLog.text = ``;
        combatLog.text = ``;
        combatLog.text = `Welcome to SutenQuest!`;
        combatLog.text = `Web3 Must be connected to play`;
        combatLog.text = `Please add '&ENABLE_WEB3' to URL`;
        failedstart = true;

        return;
      }
      // //const balance = await matic.balance(address)
      const balance = 0
      var obj = Singleton.getInstance();
      // obj.maticbalance = balance.l2
      obj.maticbalance = 0
      if (address) {
        lowerCaseAddress = address.toLowerCase();
      } else {
        lowerCaseAddress = userdata.userId.toLowerCase();
        address = lowerCaseAddress;
      }

      let playerName = userdata.displayName;
      player.address = address;
      player.name = playerName;
      obj.playeraddress = address;
      obj.playername = player.name;
      obj.player = player;
      obj.actionbar = actionBar;
      obj.backpack = backPack;

      try {
        let response = await fetch(apiUrl + "/" + lowerCaseAddress);
        let json = await response.json();
        if (json.message == "Could not find player by address") {
          log('could not find player')
          try {
            player.configuretrade(tradeWindow)
          } catch (error) {
            combatLog.text = `Welcome to SutenQuest!`;
            combatLog.text = `:(  Game failed to complete setup  :(`;
            combatLog.text = `Please refresh/reload the scene`;
            //new NoEthScene();
            failedstart = true;
            return;
          }

          combatLog.text = `Welcome to SutenQuest!`;
          combatLog.text = `You are a level 1 Adventurer`;
          combatLog.text = `Press 'esc' to lock/unlock your mouse.`;

          obj.playerhp = 43;
          obj.playerclass = "Adventurer";
          backPack.playerclass = "Adventurer"

          reloadGame(gameCanvas, actionBar, backPack, player, combatLog, tradeWindow);

          const newplayer = {
            address: lowerCaseAddress,
            hp: 44,
            maxhp: 44,
            percentage: 100,
            name: playerName,
            level: 1,
            currentxp: 0,
            basedamage: 1,
            strength: 5,
            agility: 5,
            stamina: 5,
            wisdom: 5,
            charisma: 5,
            armor: 0,
            characterclass: 'Adventurer'
          };

          const options = {
            method: "POST",
            body: JSON.stringify(newplayer),
            headers: {
              "Content-Type": "application/json",
            },
          };

          fetch(apiUrl, options)
            .then((res) => res.json())
            .then(() => {
              player.level = 1;
              player.basedamage = 1;
              player.hp = 45;
              player.maxhp = 45;
            });
        } else {
          log('The player has been found')

          try {
            log('joining socket server')
            let socket = await joinSocketsServer(
              gameCanvas,
              actionBar,
              backPack,
              player,
              combatLog
            );
            // connect('my_realm').then((room) => {
            //         log('CONNECTED!')
            //         log('cubes ', room.state.cubes)

            //         room.state.mobs.onAdd = (mobData) => {
            //               log("Added mob =>", mobData.name)
            //               log("Added mob loc =>", mobData.spawnloc)
            //               log('mobData ', mobData)

            //           // let mob = new Mob(
            //           //   mobData.id, room, mobData.name, mobData.spawnloc
            //           // )
            //           // _npc = new NPC(
            //           //   { 
            //           //     position: new Vector3(mobData.spawnloc[0], mobData.spawnloc[1], mobData.spawnloc[2]), 
            //           //     rotation: Quaternion.Euler(0,90,0),
            //           //     scale: new Vector3(1, 1, 1), 
            //           //   },
            //           //   "models/" + mobData.shape,
            //           //   () => {
            //           //     _npc.talk(mobData.quest, 0)
            //           //   },
            //           //   {
            //           //     portrait: {
            //           //       path: mobData.portrait,
            //           //       height: 132,
            //           //       width: 148,
            //           //     },
            //           //     faceUser: true,
            //           //     darkUI: true,
            //           //     onWalkAway: () => {
            //           //       log("walked away");
            //           //     },
            //           //   }
            //           // );
            //           _npc = new Orc(
            //             "1",
            //             mobData.name,
            //             300,
            //             false,
            //             1,
            //             new AudioClip("somesound"),
            //             new GLTFShape("models/" + mobData.shape),
            //             10,
            //             100,
            //             new Vector3(
            //               mobData.spawnloc[0],
            //               mobData.spawnloc[1],
            //               mobData.spawnloc[2]
            //             ),
            //             Quaternion.Euler(
            //               0, 90, 0
            //             ),
            //             [
            //               new Vector3(
            //                 4, 0, 6
            //               ),
            //               new Vector3(
            //                 6, 0, 3
            //               ),
            //               new Vector3(
            //                 3, 0, 8
            //               ),
            //             ],
            //             gameCanvas,
            //             actionBar,
            //             backPack,
            //             player
            //           );

            //           engine.addSystem(
            //             new OrcFSM(
            //               gameCanvas,
            //               player,
            //               _npc,
            //               [6, 1, 14],
            //               [0, 90, 0],
            //               false,
            //               10,
            //               combatLog
            //             )
            //           );

            //         }

            // })
          } catch (error) {
            combatLog.text = `Welcome to SutenQuest!`;
            combatLog.text = `:(  Game socket failed to load  :(`;
            combatLog.text = `Please refresh/reload the scene`;
            failedstart = true;

            return;
          }

          log('after socket server')
          log('json ', json)

          log('json.percentage ', json.percentage)
          if (json.percentage != 100 || json.hp == 0 || !json.hp && json.level > 1 || json.hp == undefined) {
            log('json.percentage is not 100')
          } else {
            log('json.percentage is 100 1')
          }


          if (json.percentage == 0) {
            log('json.hp is 0 or not defined ', json.hp)
            combatLog.text = `Welcome back to SutenQuest!`;
            combatLog.text = `${json.name} is a level ${json.level} ${json.characterclass}`;
            combatLog.text = `You have died.`;
            combatLog.text = `Make your way to the Duat.`
            combatLog.text = `Find and speak with Anpu.`;
            player.level = json.level;
            player.basedamage = json.basedamage;
            player.name = json.name;
            player.alive = false;
            backPack.bootLoadBackPack(json.backpack);
            //actionBar.bootLoadActionBar(json.actionbar);
            if (json.characterclass == undefined) {
              obj.playerclass = "Adventurer";
            } else {
              obj.playerclass = json.characterclass;
            }
            obj.playerhp = 0;
            backPack.playerclass = obj.playerclass
          } else {
            //log(`json.hp: ${json.hp} is greater than 0`)
            combatLog.text = ` `;
            combatLog.text = `Welcome back!`;
            combatLog.text = `You are a level ${json.level} ${json.characterclass}`;
            //combatLog.text = `Mana Balance: ${JSON.stringify(balance.l1)}`
            //combatLog.text = `Matic Mana Balance: ${JSON.stringify(balance.l2)}`
            //combatLog.text = `Press 'esc' to lock/unlock your mouse.`;
            //combatLog.text = `Have fun and try not to die!`;
            if (json.percentage == 100 && json.hp == undefined) {
              //log('setting playerhp to json.maxhp')
              obj.playerhp = json.maxhp;
            } else {
              //log('setting playerhp to json.hp cause its not   undefined')
              obj.playerhp = json.hp;
            }
            obj.player = player;

            if (json.characterclass == undefined) {
              log('setting obj.playerclass to Adventurer')
              obj.playerclass = "Adventurer";
            } else {
              log(`exists, so setting obj.playerclass to ${json.characterclass}`)
              obj.playerclass = json.characterclass;
            }

            player.level = json.level;
            player.basedamage = json.basedamage;

            //player.initialhp(json.percentage / 100);
            player.hp = json.hp;
            player.startinghp = json.hp;
            player.maxhp = json.maxhp;
            player.currentxp = json.currentxp;
            player.levelmax = json.levelmax;
            //player.xpcheck();
            reloadGame(gameCanvas, actionBar, backPack, player, combatLog, tradeWindow);
          }

          obj.strength = json.strength;
          obj.level = json.level;
          obj.agility = json.agility;
          obj.stamina = json.stamina;
          obj.wisdom = json.wisdom;
          obj.charisma = json.charisma;
          obj.armor = json.armor;
          log(`setting obj.weapon to ${json.primaryweapon}`)
          obj.weapon = json.primaryweapon;
          backPack.playerclass = obj.playerclass
          log('calling backpack resetCharWindow')
          backPack.resetCharWindow()

          //       // obj.manal1 = balance.l1
          obj.manal1 = 0

          const testArray = [
            { image: "images/looticons/rustyaxe.png", slot: 1, srcw: 1219, srch: 2154, desc: "Rusty Sword", type: null, price: 20, itemtype: "weapon", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell, lootwindow: null, npc: null },
            { image: "images/looticons/manavial.png", slot: 2, srcw: 1219, srch: 2154, desc: "Mana Vial", type: null, price: 50, itemtype: null, spellshape: null, spellstart: null, spellend: null, sound: null, lootwindow: null, npc: null },
            { image: "images/spells/painterly-spell-icons-3/explosion-magenta-1.png", slot: 3, srcw: 256, srch: 256, desc: "Minor Shielding", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell, lootwindow: null, npc: null },
            { image: "images/spells/painterly-spell-icons-1/protect-royal-1.png", slot: 4, srcw: 256, srch: 256, desc: "Spike Shield", type: null, price: 10, itemtype: "spell", spellshape: "BoxShape", spellstart: 1, spellend: 50, sound: resources.sounds.elementalspell, lootwindow: null, npc: null },
            { image: "images/looticons/redHealthPotion.png", slot: 5, srcw: 1219, srch: 2154, desc: "Minor Heal", type: null, price: 50, itemtype: "consumable", spellshape: null, spellstart: null, spellend: null, sound: null, lootwindow: null, npc: null },
            { image: "images/looticons/blueHealthPotion.png", slot: 6, srcw: 1219, srch: 2154, desc: "Heal", type: null, price: 50, itemtype: "consumable", spellshape: null, spellstart: null, spellend: null, sound: null, lootwindow: null, npc: null },
            { image: "images/spells/painterly-spell-icons-1/enchant-acid-2.png", slot: 7, srcw: 256, srch: 256, desc: "Spike Shield", type: null, price: 10, itemtype: "spell", spellshape: "BoxShape", spellstart: -20, spellend: 15, sound: resources.sounds.levelup, lootwindow: null, npc: null },
            { image: "images/looticons/redHealthPotion.png", slot: 8, srcw: 1219, srch: 2154, desc: "Minor Heal", type: null, price: 50, itemtype: "consumable", spellshape: null, spellstart: null, spellend: null, sound: null, lootwindow: null, npc: null },
            { image: "images/looticons/redHealthPotion.png", slot: 9, srcw: 1219, srch: 2154, desc: "Minor Heal", type: null, price: 50, itemtype: "consumable", spellshape: null, spellstart: null, spellend: null, sound: null, lootwindow: null, npc: null },
          ]

          log('json.actionbar ', json.actionbar)
          log('json.backpack ', json.backpack)

          backPack.bootLoadBackPack(json.backpack);
          //actionBar.bootLoadActionBar(json.actionbar);
          actionBar.bootLoadActionBar(testArray);
          obj.actionbar = actionBar;
          obj.backpack = backPack
        }
      } catch (error) {
        log("game.ts: Player search by ether address failed ", error);
      }
    } catch (error) {
      log('in the catch block')
      if (error.toString().includes("Could not access eth_accounts")) {
        //log('Could not access ETH Accounts 2')
        combatLog.text = `Welcome to SutenQuest!`;
        combatLog.text = `Unable to access ETH Accounts!`;
        combatLog.text = `Web3 Must be connected to play`;
        combatLog.text = `Please add '&ENABLE_WEB3' to URL`;
        //new NoEthScene();
      } else {
        log("error: ", error.toString());
      }
    }
  });
}

startGame();
new spawnNpcs()

// // Uncomment the below model and BuilderHUD to find positions to use in the scene code
// // User the BuilderHUD to move the model to the desired position/rotaion
// // The positions show up in the Dev console

// let orc1 = new Entity("orc1");
// orc1.addComponent(new GLTFShape("models/remetchmagician2.glb"));
// orc1.addComponent(
//   new Transform({
//     position: new Vector3(5, 0, 5),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(.01, .01, .01),
//   })
// );
// orc1.addComponentOrReplace(
//   new OnPointerDown(
//     (e) => {
//       orc1.getComponent(OnPointerDown).showFeedback = true;
//     },
//     {
//       button: ActionButton.PRIMARY,
//       showFeedback: true,
//       hoverText: "Punch",
//     }
//   )
// );

// engine.addEntity(orc1);
// // const hud: BuilderHUD = new BuilderHUD();
// // hud.attachToEntity(orc1);