import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { connectToServer } from "../gameServer/connectToServer";
import { deathCheck } from "./deathCheck";
import { loadPlayerItems } from "./loadPlayerItems";
import { newPlayer } from "./newPlayer";
import { populateObj } from "./populateObj";
import { loadPlayerFactions } from "./loadPlayerFactions";
import { fetchPlayerQuests } from "./fetchPlayerQuests";
import { setupTrade } from "./setupTrade";

export async function playerSearch(json: PlayerState, ui: UI, lowerCaseAddress: string, player: Player) {
    log(`debug: 7 Inside playerSearch`)
    //let tradeWindow

    if (json.message == "Could not find player by address") {
        //log(`Could not find player, calling newPlayer`)
        newPlayer(ui, lowerCaseAddress, player)
        connectToServer(ui, json, player)
        //tradeWindow = await setupTrade(ui, player)
    } else {
        //log(`playerSearch.ts: 23`)
        //connectToServer(ui, json, player)
        let playerdead = deathCheck(ui, json, player)
        if(!playerdead) {
            connectToServer(ui, json, player)
            //tradeWindow = await setupTrade(ui, player)
            populateObj(json, player)
            loadPlayerItems(ui, json)
            loadPlayerFactions(player, json)
            fetchPlayerQuests(player)
        }
    }
}