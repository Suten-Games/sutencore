import { PlayerState } from 'src/components/playerStateComponent'
import { Player } from 'src/gameObjects/player'
import { UI } from 'src/gameUI/ui'
import { connectToServer } from '../gameServer/connectToServer'
import { deathCheck } from './deathCheck'
import { loadPlayerItems } from './loadPlayerItems'
import { newPlayer } from './newPlayer'
import { populateObj } from './populateObj'
import { loadPlayerFactions } from './loadPlayerFactions'
import { fetchPlayerQuests } from './fetchPlayerQuests'

export async function playerSearch(json: PlayerState, ui: UI, lowerCaseAddress: string, player: Player) {
    //log(`debug: 7 Inside playerSearch`)

    if (json.message === 'Could not find player by address') {
        newPlayer(ui, lowerCaseAddress, player)
        void connectToServer(ui, json, player)
    } else {
        const playerdead = deathCheck(json, player)
        if (!playerdead) {
            populateObj(json, player)
            loadPlayerItems(ui, json)
            loadPlayerFactions(player, json)
            void fetchPlayerQuests(player)
            void connectToServer(ui, json, player)
        }
    }
}
