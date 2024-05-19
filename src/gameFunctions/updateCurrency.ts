import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import { apikey, local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function updateCurrency(copper: number, silver: number, 
    gold: number, platinum:number, player: string) {

    const totalCopper = copper + (silver * 10) + (gold * 100) + (platinum * 1000);

    log(`Calling updateCurrent with totalCopper: ${totalCopper}`)

    const copperGained = {
        "copperGained": totalCopper
    }

    const options = {
        method: "PATCH",
        body: JSON.stringify(copperGained),
        headers: {
            "Content-Type": "application/json",
            'x-api-key': apikey
        },
    };

    try {
        let response = await fetch(apiUrl + "/player/" + player + "/currency", options);
        let json = await response.json();
        let obj = Singleton.getInstance()

        log(`Back from updateCurrency: ${JSON.stringify(json)}`)

        obj.copper = json.copper
        obj.silver = json.silver
        obj.gold = json.gold
        obj.platinum = json.platinum

        log(`Now need to trigger a visual update in CharWindow`)
        let ui = UI.getInstance()
        let cw = ui.cw
        log(`calling characterwindow.updateStats()`)
        cw.updateStats(json)

    } catch (error) {
        log(`purchasedItem.ts:30: Add Merchant Inventory by name failed ${error} `);
    }
}