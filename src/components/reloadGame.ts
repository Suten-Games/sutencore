// import { BaseScene } from "../baseScene";
// import { MobStateSystem } from "./mobStateSystem";
// import { Player } from "../gameObjects/player";
// import { CombatLog } from "../gameObjects/combatLog";
// import { BackPack } from "../gameObjects/backPack";
// import { ActionBar } from "../gameObjects/actionBar";
// import { WaitSystem } from "./waitSystem";
// import { LoadShopKeeper } from "../gameObjects/shopkeeper";
// import { TradeWindow } from "../gameObjects/tradeWindow";
// import { DeathScene } from "../gameObjects/deathScene";
// import { UpperDuat } from "../gameObjects/upperDuat";

// let mss: MobStateSystem;
// let ws: WaitSystem
// let shopkeeper

// //export function reloadGame(gamecanvas:UICanvas, actionbar:ActionBar,backpack:BackPack, player:Player, combatlog:CombatLog) {
// export function reloadGame(gamecanvas:UICanvas, actionbar:ActionBar,backpack:BackPack, player:Player, combatlog:CombatLog, tradewindow:TradeWindow) {
// //export function reloadGame(gamecanvas:UICanvas, actionbar:ActionBar,backpack:BackPack, player:Player, combatlog:CombatLog, shopkeeper, tradewindow:TradeWindow) {
//   //log('reloadGame.ts: in reloadGame()')
//   executeTask(async () => {
//     try {
//       new BaseScene();
//       //new DeathScene()
//       //new UpperDuat()

//       mss = new MobStateSystem();
//       ws = new WaitSystem();

//       engine.addSystem(mss);
//       engine.addSystem(ws)
      
//       shopkeeper = new LoadShopKeeper(gamecanvas, tradewindow, combatlog)
//       engine.addEntity(shopkeeper)
//     } catch (e) {
//       log("error ", e);
//     }
//   });
// }

// export function unloadSystems() {
//   //log('reloadGame.ts: trying to unload systems')
//   executeTask(async () => {
//     engine.removeSystem(mss)
//     engine.removeSystem(ws)
//   })
// }