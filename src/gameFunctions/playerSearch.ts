import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { connectToServer } from "./connectToServer";
import { deathCheck } from "./deathCheck";
import { loadPlayerItems } from "./loadPlayerItems";
import { newPlayer } from "./newPlayer";
import { populateObj } from "./populateObj";



export async function playerSearch(json: PlayerState, ui: UI, lowerCaseAddress: string, player: Player) {
    log(`debug: 6 Inside playerSearch`)

    if (json.message == "Could not find player by address") {
        newPlayer(ui, lowerCaseAddress, player)
    } else {
        connectToServer(ui,json,player)
        deathCheck(ui,json,player)
        populateObj(json)
        loadPlayerItems(ui,json)
    }
}