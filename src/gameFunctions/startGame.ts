import { UI } from "src/gameUI/ui";
import { createPlayer } from "./createPlayer";
import { registerPlayer } from "./registerPlayer";
import { setupTrade } from "./setupTrade";

export function startGame(ui: UI) {
    log(`debug: 1 Inside startGame`)
    
    executeTask(async () => {
        let player = await createPlayer(ui)
        let tradeWindow = await setupTrade(ui, player)
        await registerPlayer(ui, player, tradeWindow)
    });
}