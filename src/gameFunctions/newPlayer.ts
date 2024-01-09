import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import { writeToCl } from "./writeToCL";
import { local } from "suten";

const apiUrl = local
    ? "http://localhost:8080/player"
    : "https://sutenquestapi.azurewebsites.net/player";

export function newPlayer(ui: UI, lowerCaseAddress: string, player:Player) {
    log('could not find player')
    //log(`debug: 7 Inside  newPlayer`)
    
    var obj = Singleton.getInstance();

    writeToCl(`Welcome to SutenQuest!`, `You have entered the Ruins of Saqarra.`)
    writeToCl(`Fight mobs or complete quests for experience and loot.`, `You are a level 1 Adventurer`)
    writeToCl(`Press 'E' to attack, Press 'F' to loot.`, `Dbl click to delete items.`)
    //writeToCl(`Good luck ${player.name}, may you prosper and become strong.`,`Perhaps when your days are done, you will become Maa Kheru enter the Field of Reeds`)

    

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
                "value": -1
            }
        ]
    };

    const options = {
        method: "POST",
        body: JSON.stringify(newplayer),
        headers: {
            "Content-Type": "application/json",
        },
    };

    log(`CREATING A NEW PLAYER`)

    fetch(apiUrl, options)
        .then((res) => res.json())
        .then(() => {
            player.level = 1;
            player.basedamage = 1;
            player.hp = 40;
            player.maxhp = 40;
        });

    obj.playerhp = 40;
    obj.playerclass = "Adventurer";
    ui.bp.playerclass = "Adventurer"
}