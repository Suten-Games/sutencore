import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { playerSearch } from "./playerSearch";
import { local } from "suten";
import { writeToCl } from "./writeToCL";

const apiUrl = local
    ? "http://localhost:8080/player"
    : "https://sutenquestapi.azurewebsites.net/player";

export async function fetchPlayer(lowerCaseAddress: string, ui: UI, player: Player) {
    //log(`debug: 5 Inside fetchPlayer`)
    
    try {
        let response = await fetch(apiUrl + "/" + lowerCaseAddress);
        let json = await response.json();
        playerSearch(json, ui, lowerCaseAddress, player)

    } catch (error) {
        writeToCl(`Player search by ether address failed ${JSON.stringify(error)}`)
        log(`game.ts:21: Player search by ether address failed ${error} `);
    }

}