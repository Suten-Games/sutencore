import { Item } from "src/gameObjects/item";
import { Npc } from "src/gameObjects/npc";
import { apikey, local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function purchasedItem(npc: Npc, item: Item) {
    log(`in ${npc.name} purchasedItem: ${item.lootdesc()}`)

    const lootname = {
        "lootName": item.lootdesc()
    }

    const options = {
        method: "PATCH",
        body: JSON.stringify(lootname),
        headers: {
            "Content-Type": "application/json",
            'x-api-key': apikey
        },
    };

    try {
        let response = await fetch(apiUrl + "/merchant/" + npc.id + "/inventory/removebyname", options);
        let json = await response.json();

        return json;
    } catch (error) {
        log(`purchasedItem.ts:30: Remove Merchant Inventory by name failed ${error} `);
    }
}