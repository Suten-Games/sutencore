import { UI } from "src/gameUI/ui";
import { createDefaultPlayer } from "./createPlayer";
import { registerPlayer } from "./registerPlayer";
import { setupTrade } from "./setupTrade";

export function loadSutenQuest(ui: UI) {
    log(`debug: 1 Inside startGame`)
    
    executeTask(async () => {
        let player = await createDefaultPlayer(ui)
        let tradeWindow = await setupTrade(ui, player)
        await registerPlayer(ui, player, tradeWindow)
    });
}