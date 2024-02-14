
import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { DeathScene } from "src/gameUI/loadDeathScape";

export function killPlayer(json: PlayerState, player: Player) {
    player.level = json.level;
    player.basedamage = json.basedamage;
    player.name = json.name;
    player.alive = false;
    player.unloadLife()
    player.showDuatPrompt("Search Now", "You have died. Seek Anpu in the Duat. Perhaps if you are worthy you may be reborn.");
    let deathscene = new DeathScene()
}