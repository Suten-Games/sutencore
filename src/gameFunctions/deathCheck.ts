import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { killPlayer } from "./killPlayer";
import { populatePlayer } from "./populatePlayer";
import { setCharClass } from "./setCharClass";
import { setHp } from "./setHp";
import { writeToCl } from "./writeToCL";

export function deathCheck(ui: UI,json: PlayerState,player: Player) {
    log(`debug: 9 Inside deathCheck`)
    log(`deathCheck:12 - player.name: ${player.name}`)

    if (json.percentage == 0) {
        writeToCl(`${json.name} is a level ${json.level} ${json.characterclass}`, `You have died.`, `Make your way to the Duat.`, `Find and speak with Anpu.`)
        killPlayer(json,player,ui)
    } else {
        writeToCl(`Welcome back!`, `You are a level ${json.level} ${json.characterclass}`)
        setHp(json, player)
        setCharClass(json)
        populatePlayer(player, json)

        //player.xpcheck();
        //reloadGame(gameCanvas, actionBar, backPack, player, combatLog, tradeWindow);
    }
}