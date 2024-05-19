import { Npc } from "src/gameObjects/npc";
import { apikey, local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function fetchInventory(npc: Npc) {
    try {
        const response = await fetch(apiUrl + "/merchant/" + npc.id + "/items-for-sale", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apikey
            }
        });
        //let response = await fetch(apiUrl + "/merchant/" + npc.id + "/items-for-sale");
        let json = await response.json();

        return json;
    } catch (error) {
        log(`fetchQuests.ts:22: Fetch Quests by npc and player failed ${error} `);
    }
}