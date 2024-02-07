
import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { DeathScene } from "src/gameUI/loadDeathScape";
import { UI } from "src/gameUI/ui";

export function killPlayer(json: PlayerState, player: Player, ui: UI) {
    let obj = Singleton.getInstance();
    player.level = json.level;
    player.basedamage = json.basedamage;
    player.name = json.name;
    player.alive = false;
    // player.hp = 0;
    // obj.playerhp = 0;
    //ui.bp.bootLoadBackPack(json.backpack);
    //actionBar.bootLoadActionBar(json.actionbar);
    // if (json.characterclass == undefined) {
    //     obj.playerclass = "Adventurer";
    // } else {
    //     obj.playerclass = json.characterclass;
    // }
    //ui.bp.playerclass = obj.playerclass

    player.unloadLife()
    player.showDuatPrompt("Search Now", "You have died. Seek Anpu in the Duat. Perhaps if you are worthy you may be reborn.");
    let deathscene = new DeathScene()
}