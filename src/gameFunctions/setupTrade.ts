import { Player } from "src/gameObjects/player";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { UI } from "src/gameUI/ui";
import resources from "src/resources";

export async function setupTrade(ui: UI, player: Player) {
    //log(`debug: 3 Inside setupTrade`)

    const tradeWindow = new TradeWindow(
        ui.gc,
        resources.interface.blueMerchantInterface,
        ui.ab,
        ui.bp,
        player,
        ui.cl
    );

    return tradeWindow
}