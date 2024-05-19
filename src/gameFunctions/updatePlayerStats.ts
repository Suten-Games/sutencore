import { Item } from "src/gameObjects/item";
import { Npc } from "src/gameObjects/npc";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import { apikey, local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function updatePlayerStats(player: Player, stats:any) {
    log(`in updatePlayerStats`)

    const statBundle = {
        stats
    }
    const options = {
        method: "PATCH",
        body: JSON.stringify(stats),
        headers: {
            "Content-Type": "application/json",
            'x-api-key': apikey
        },
    };

    log(`updatePlayerStats: calling server with: ${JSON.stringify(stats)}`)

    try {
        let obj = Singleton.getInstance()
        let response = await fetch(apiUrl + "/player/" + player.address + "/object", options);
        let json = await response.json();
        log(`updatePlayerStats server response: ${JSON.stringify(json)}`)

        //log(`setting strength to: ${json.strength}`)
        obj.strength = json.strength
        //log(`setting agility to ${json.agility}`)
        obj.agility = json.agility
        //log(`settin stamina to ${json.stamina}`)
        obj.stamina = json.stamina
        //log(`setting wisdom to ${json.wisdom}`)
        obj.wisdom = json.wisdom
        //log(`setting charisma to ${json.charisma}`)
        obj.charisma = json.charisma
        //log(`setting armor to ${json.armor}`)
        obj.armor = json.armor

        //log(`Now need to trigger a visual update in CharWindow`)
        let ui = UI.getInstance()
        let cw = ui.cw
        //log(`calling characterwindow.updateStats()`)
        cw.updateStats(json)
        

        return json;
    } catch (error) {
        log(`updatePlayerStats.ts:30: Remove Discovered NPC from Searched For list failed ${error} `);
    }
}