import { DeathItem } from "src/components/deathItemComponent";
import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { DeathScene } from "src/gameUI/loadDeathScape";
import { UI } from "src/gameUI/ui";
import { sutenBase } from "suten";
import { populatePlayer } from "./populatePlayer";
import { setCharClass } from "./setCharClass";
import { setHp } from "./setHp";
import { writeToCl } from "./writeToCL";
import { killPlayer } from "./killPlayer";

export function deathCheck(ui: UI, json: PlayerState, player: Player) {
    log(`debug: 9 Inside deathCheck`)
    let dead = false

    if (json.hp === 0) {
        player.alive = false
        dead = true;
        player.hidehpbar()
        if (sutenBase === '30,30') {
            void writeToCl(
                `Welcome back to SutenQuest ${json.name}!`,
                `You are in the Duat.`,
                `Seach for Anpu, the Ruler of the Nine Bows.`
            )
        } else {
            void writeToCl(
                `Welcome back to SutenQuest ${json.name}!`,
                `You remain dead.`,
                `Make your way to the Duat.`,
                `Find and speak with Anpu.`
            )
            killPlayer(json, player)
        }
    } else {
        player.alive = true

        if (sutenBase === '30,30') {
            void writeToCl(`Welcome back to SutenQuest ${json.name}!`, `The Duat is for the dead. Leave this place mortal.`)
            const items = engine.getComponentGroup(DeathItem)
            while (items.entities.length) {
                engine.removeEntity(items.entities[0])
            }
            new DeathScene()
        } else {
            void writeToCl(`Welcome back ${json.name}!`, `You are a level ${json.level} ${json.characterclass}`)
            setHp(json, player)
            setCharClass(json)
            populatePlayer(player, json)
        }
    }
    
    return dead
}