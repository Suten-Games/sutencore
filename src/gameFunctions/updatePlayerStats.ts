import { Item } from "src/gameObjects/item";
import { Npc } from "src/gameObjects/npc";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { local } from "suten";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function updatePlayerStats(player: Player, stats:any) {

    const statBundle = {
        stats
    }
    const options = {
        method: "PATCH",
        body: JSON.stringify(statBundle),
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        let obj = Singleton.getInstance()
        let response = await fetch(apiUrl + "/player/" + player.address + "/object", options);
        let json = await response.json();

        obj.strength = json.strength
        obj.agility = json.agility
        obj.stamina = json.stamina
        obj.wisdom = json.wisdom
        obj.charisma = json.charisma
        obj.armor = json.armor

        return json;
    } catch (error) {
        log(`updatePlayerStats.ts:30: Remove Discovered NPC from Searched For list failed ${error} `);
    }
}