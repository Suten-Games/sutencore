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



export async function playerSearch(json: PlayerState, ui: UI, lowerCaseAddress: string, player: Player) {
    //log(`debug: 6 Inside playerSearch`)

    if (json.message == "Could not find player by address") {
        //log(`Could not find player, calling newPlayer`)
        newPlayer(ui, lowerCaseAddress, player)
        connectToServer(ui, json, player)
    } else {
        //log(`playerSearch.ts: 23`)
        connectToServer(ui, json, player)
        deathCheck(ui, json, player)
        populateObj(json, player)
        loadPlayerItems(ui, json)
        loadPlayerFactions(player, json)
        fetchPlayerQuests(player)
    }
}