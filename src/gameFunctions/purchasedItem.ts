import { Item } from "src/gameObjects/item";
import { Npc } from "src/gameObjects/npc";
import { local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function purchasedItem(npc: Npc, item: Item) {
    log(`in ${npc.name} purchasedItem: ${item.lootdesc()}`)
    // try {
    //     let response = await fetch(apiUrl + "/merchant/" + npc.id + item.id);
    //     let json = await response.json();

    //     return json;
    // } catch (error) {
    //     log(`fetchQuests.ts:22: Fetch Quests by npc and player failed ${error} `);
    // }
}