
import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";

export function killPlayer(json:PlayerState, player:Player, ui:UI) {
    var obj = Singleton.getInstance();
    player.level = json.level;
    player.basedamage = json.basedamage;
    player.name = json.name;
    player.alive = false;
    //ui.bp.bootLoadBackPack(json.backpack);
    //actionBar.bootLoadActionBar(json.actionbar);
    if (json.characterclass == undefined) {
        obj.playerclass = "Adventurer";
    } else {
        obj.playerclass = json.characterclass;
    }
    obj.playerhp = 0;
    ui.bp.playerclass = obj.playerclass
}