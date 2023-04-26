import { UI } from "src/gameUI/ui";
import { createDefaultPlayer } from "./createPlayer";
import { registerPlayer } from "./registerPlayer";
import { setupTrade } from "./setupTrade";
import { MobStateSystem } from "src/gameSystems/mobStateSystem";
import { WaitSystem } from "src/gameSystems/waitSystem";

let mss: MobStateSystem;
let ws: WaitSystem

export function loadSutenQuest(ui: UI) {
    log(`debug: 1 Inside startGame`)
    
    executeTask(async () => {
        let player = await createDefaultPlayer(ui)
        let tradeWindow = await setupTrade(ui, player)
        await registerPlayer(ui, player, tradeWindow)
        //mss = new MobStateSystem()
        ws = new WaitSystem()
        //engine.addSystem(mss)
        engine.addSystem(ws);

    });
}

export function unloadSystems() {
    log('reloadGame.ts: trying to unload systems')
    executeTask(async () => {
        //engine.removeSystem(mss)
        engine.removeSystem(ws)
    })
}