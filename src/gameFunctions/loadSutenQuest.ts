import { UI } from "src/gameUI/ui";
import { createDefaultPlayer } from "./createPlayer";
import { registerPlayer } from "./registerPlayer";
import { setupTrade } from "./setupTrade";
import { WaitSystem } from "src/gameSystems/waitSystem";

let ws: WaitSystem

export function loadSutenQuest(ui: UI) {
    executeTask(async () => {
        let player = await createDefaultPlayer(ui)
        await setupTrade(ui, player)
        await registerPlayer(ui, player)
        ws = new WaitSystem()
        engine.addSystem(ws);
    });
}

export function unloadSystems() {
    executeTask(async () => {
        engine.removeSystem(ws)
    })
}