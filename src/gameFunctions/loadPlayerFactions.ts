import { PlayerState } from "../components/playerStateComponent";
import { Player } from "../gameObjects/player"

export function loadPlayerFactions(player: Player, json: PlayerState) {
    player.factions = json.factions
    log(`In loadPlayerFactions: ${JSON.stringify(player.factions)}`)
}
