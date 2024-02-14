import { Item } from "src/gameObjects/item";
import { Npc } from "src/gameObjects/npc";
import { Player } from "src/gameObjects/player";
import { local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function handleNpcInteraction(player: Player, npc: Npc) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        let response = await fetch(apiUrl + "/playerquest/" + player.address + "/interact/" + npc.id, options);
        let json = await response.json();
        log(`this is the response from npc interaction: ${JSON.stringify(json)}`)

        return json;
    } catch (error) {
        log(`purchasedItem.ts:30: Remove Discovered NPC from Searched For list failed ${error} `);
    }
}