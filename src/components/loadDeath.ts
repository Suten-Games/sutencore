// import { DeathScene } from "../gameObjects/deathScene";
// import { PeasantDialog } from "../ui/index";
// import resources from "../resources";
// import { reloadGame, unloadSystems } from "./reloadGame";
// import { MobState } from "./mobState";
// import { Orc } from "../gameObjects/orc";
// import { Player } from "../gameObjects/player";
// import { LifeItem, DeathItem, VictoryItem } from "../itemflags/deathItem";
// import { TradeWindow } from "../gameObjects/tradeWindow";
// import * as ui from '../../node_modules/@dcl/ui-utils/index'
// import { movePlayerTo } from "@decentraland/RestrictedActions";
// import { UpperDuat } from "../gameObjects/upperDuat";
// import utils from '../../node_modules/decentraland-ecs-utils/index'
// import { SoundBox } from "./soundbox";
// import { Singleton } from "./playerDetail";
// import { NoEthScene } from "../noEthScene";

// const TURN_TIME = 0.3;

// export function unloadLife() {
//   log('loadDeath.ts: Unloading Life 1')
//     unloadSystems()
//     const items = engine.getComponentGroup(LifeItem);
//     while (items.entities.length) {
//       engine.removeEntity(items.entities[0]);
//     }
// }

// export function unloadVictory() {
//   log('loadDeath.ts: Unloading Victory')
//   unloadSystems()
//   const items = engine.getComponentGroup(VictoryItem);
//   while (items.entities.length) {
//     engine.removeEntity(items.entities[0]);
//   } 
// }

// export function loadDeath(gameCanvas,player:Player,combatLog, actionbar, backpack, tradewindow:TradeWindow) {
//     var obj = Singleton.getInstance();

//     new NoEthScene();

//     let soundbox = new SoundBox(
//       new Transform({ position: new Vector3(8, 0, 8) }),
//       resources.sounds.deathzone,
//       true
//     );
//     soundbox.addComponent(new DeathItem());
//     soundbox.play();

//     const items = engine.getComponentGroup(LifeItem);
//     while (items.entities.length) {
//       engine.removeEntity(items.entities[0]);
//     }

//     const orcs = engine.getComponentGroup(MobState);
//     while (orcs.entities.length > 0) {
//       engine.removeEntity(orcs.entities[0])
//     }

//     player.hidehpbar()

//     let deathNotice = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, 8000, 8000, true)
//     deathNotice.addText('You have died.', 0, 130, Color4.Red(), 30)
//     deathNotice.addText("Seek Redemption in the Duat.", 0, 100)
//     deathNotice.addButton(
//       'Go Now',
//       0,
//       -30,
//       () => {
//         log('Sending player to the Duat')
//         deathNotice.hide()
//         teleportTo('-26,78')
//       },
//       ui.ButtonStyles.E
//     )

//     deathNotice.addButton(
//       'Go Later',
//       0,
//       -90,
//       () => {
//        deathNotice.hide()
//     },
//     ui.ButtonStyles.F
//     )

//     deathNotice.show()
  

//   }
  