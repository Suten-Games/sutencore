import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { playerSearch } from "./playerSearch";

const local: boolean = false;
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
        log("game.ts: Player search by ether address failed ", error);
    }

}