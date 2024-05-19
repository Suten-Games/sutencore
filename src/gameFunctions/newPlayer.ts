import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import { writeToCl } from "./writeToCL";
import { apikey, local } from "suten";

const apiUrl = local
    ? "http://localhost:8080/player"
    : "https://sutenquestapi.azurewebsites.net/player";

export async function newPlayer(ui: UI, lowerCaseAddress: string, player:Player) {
    //log('could not find player')
    
    var obj = Singleton.getInstance();

    writeToCl(`Welcome to SutenQuest!`, `You have entered the Ruins of Saqarra.`)
    writeToCl(`Fight mobs or complete quests for experience and loot.`, `You are a level 1 Adventurer`)
    writeToCl(`Press 'E' to attack, Press 'F' to loot.`, `Dbl click to delete items.`)

    const newplayer = {
        address: lowerCaseAddress,
        maxhp: 40,
        hp: 40,
        percentage: 100,
        name: obj.player.name,
        level: 1,
        currentxp: 0,
        levelmax: 40,
        basedamage: 1,
        strength: 5,
        agility: 5,
        stamina: 5,
        wisdom: 5,
        charisma: 5,
        armor: 0,
        characterclass: 'Adventurer',
        factions: [
            {
                "name": "Elven Alliance",
                "value": -1
            },
            {
                "name": "Orcish Empire",
                "value": -1
            },
            {
                "name": "Human Amalgam",
                "value": 1
            }
        ]
    };

    const options = {
        method: "POST",
        body: JSON.stringify(newplayer),
        headers: {
            "Content-Type": "application/json",
            'x-api-key': apikey
        },
    };

    log(`CREATING A NEW PLAYER`)

    player.level = newplayer.level;
    player.basedamage = newplayer.basedamage;
    player.hp = newplayer.hp;
    player.maxhp = newplayer.maxhp;
    player.factions = newplayer.factions;
    obj.playerhp = newplayer.hp;
    obj.playerclass = newplayer.characterclass;
    ui.bp.playerclass = newplayer.characterclass
    obj.strength = newplayer.strength;
    obj.level = newplayer.level;
    obj.agility = newplayer.agility;
    obj.stamina = newplayer.stamina;
    obj.wisdom = newplayer.wisdom;
    obj.charisma = newplayer.charisma;
    obj.armor = newplayer.armor;
    obj.player = player

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Assuming the server responds with JSON
        return data; // Return the parsed JSON data
    } catch (error:any) {
        log(`Error in newPlayer function: ${error.message}`);
        return null; // Handle errors or invalid responses
    }
}