import { PlayerState } from 'src/components/playerStateComponent'
import { Player } from 'src/gameObjects/player'
import { UI } from 'src/gameUI/ui'
import { killPlayer } from './killPlayer'
import { populatePlayer } from './populatePlayer'
import { setCharClass } from './setCharClass'
import { setHp } from './setHp'
import { writeToCl } from './writeToCL'
import { sutenBase } from 'suten'

export function deathCheck(ui: UI, json: PlayerState, player: Player) {
    // log(`debug: 9 Inside deathCheck`)

    if (sutenBase === '30,30') {
        if (json.hp === 0) {
            void writeToCl(`Welcome back to SutenQuest ${json.name}!`)
            void writeToCl(`You have entered The Duat, the land of the dead.`, `Search for Anpu, the Ruler of the Nine Bows`)
            void writeToCl(`Beseech him to return to the land of the living`)
            setHp(json, player)
            setCharClass(json)
            populatePlayer(player, json)
        } else {
            void writeToCl(`Welcome back to SutenQuest ${json.name}!`)
            void writeToCl(`The Duat is for the dead. Leave this place mortal.`)
        }
    } else {
        if (json.hp === 0) {
            void writeToCl(
                `Welcome back to SutenQuest ${json.name}!`,
                `You remain dead.`,
                `Make your way to the Duat.`,
                `Find and speak with Anpu.`
            )
            killPlayer(json, player, ui)
        } else {
            void writeToCl(`Welcome back!`, `You are a level ${json.level} ${json.characterclass}`)
            setHp(json, player)
            setCharClass(json)
            populatePlayer(player, json)
        }
    }
}
