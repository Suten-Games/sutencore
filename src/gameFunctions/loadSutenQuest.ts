import { UI } from "src/gameUI/ui";
import { createDefaultPlayer } from "./createPlayer";
import { registerPlayer } from "./registerPlayer";
import { setupTrade } from "./setupTrade";
import { WaitSystem } from "src/gameSystems/waitSystem";

let ws: WaitSystem

export function loadSutenQuest(ui: UI) {
    //log(`debug: 1 Inside startGame`)
    
    executeTask(async () => {
        let player = await createDefaultPlayer(ui)
        let tradeWindow = await setupTrade(ui, player)
        await registerPlayer(ui, player, tradeWindow)
        ws = new WaitSystem()
        engine.addSystem(ws);
    });
}

export function unloadSystems() {
    log('reloadGame.ts: trying to unload systems')
    executeTask(async () => {
        engine.removeSystem(ws)
    })
}