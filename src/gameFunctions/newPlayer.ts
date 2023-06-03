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

    writeToCl(`You are a level 1 Adventurer`, `Press 'esc' to lock/unlock your mouse.`)
    //writeToCl(ui, `You are a level 1 Adventurer`, `Press 'esc' to lock/unlock your mouse.`)

    obj.playerhp = 43;
    obj.playerclass = "Adventurer";
    ui.bp.playerclass = "Adventurer"

    //reloadGame(gameCanvas, actionBar, backPack, player, combatLog, tradeWindow);

    const newplayer = {
        address: lowerCaseAddress,
        hp: 44,
        maxhp: 44,
        percentage: 100,
        name: obj.player.name,
        level: 1,
        currentxp: 0,
        basedamage: 1,
        strength: 5,
        agility: 5,
        stamina: 5,
        wisdom: 5,
        charisma: 5,
        armor: 0,
        characterclass: 'Adventurer'
    };

    const options = {
        method: "POST",
        body: JSON.stringify(newplayer),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(apiUrl, options)
        .then((res) => res.json())
        .then(() => {
            player.level = 1;
            player.basedamage = 1;
            player.hp = 45;
            player.maxhp = 45;
        });
}