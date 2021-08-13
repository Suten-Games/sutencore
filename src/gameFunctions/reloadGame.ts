//import { BaseScene } from "../baseScene";
import { MobStateSystem } from "../gameSystems/mobStateSystem";
import { Player } from "../gameObjects/player";
import { CombatLog } from "../gameUI/combatLog";
import { BackPack } from "../gameUI/backPack";
import { ActionBar } from "../gameUI/actionBar";
import { TradeWindow } from "../gameUI/tradeWindow";
import { WaitSystem } from "../gameSystems/waitSystem";
import { LoadShopKeeper } from "../gameObjects/shopkeeper";

let mss: MobStateSystem;
let ws: WaitSystem
let shopkeeper

export function reloadGame(gamecanvas: UICanvas, actionbar: ActionBar, backpack: BackPack, player: Player, combatlog: CombatLog, tradewindow: TradeWindow) {
  executeTask(async () => {
    try {
      //new BaseScene();

      mss = new MobStateSystem();
      ws = new WaitSystem();

      engine.addSystem(mss);
      engine.addSystem(ws)

      // shopkeeper = new LoadShopKeeper(gamecanvas, tradewindow, combatlog)
      // engine.addEntity(shopkeeper)
    } catch (e) {
      log("error ", e);
    }
  });
}

export function unloadSystems() {
  //log('reloadGame.ts: trying to unload systems')
  executeTask(async () => {
    engine.removeSystem(mss)
    engine.removeSystem(ws)
  })
}