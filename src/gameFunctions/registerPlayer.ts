import { Player } from "src/gameObjects/player";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { UI } from "src/gameUI/ui";
import { fetchPlayer } from "./fetchPlayer";
import { getEthData } from "./getEthData";
import { writeToCl } from "./writeToCL";


export async function registerPlayer(ui: UI, player:Player, tradeWindow: TradeWindow) {
    log(`debug: 4 Inside registerPlayer`)

    executeTask(async () => {
        try {
            let lowerCaseAddress = await getEthData(ui, player);
            if(!lowerCaseAddress) { lowerCaseAddress = '12345678'}
            fetchPlayer(lowerCaseAddress, ui, player) 
          
        } catch (error:any) {
            writeToCl(`Unable to access ETH Accounts!`, `Web3 Must be connected to play`, `Please add '&ENABLE_WEB3' to URL`);
        }
    });
}