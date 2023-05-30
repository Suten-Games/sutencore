import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";



export function setHp(json: PlayerState, player: Player) {
    var obj = Singleton.getInstance();

    if (json.percentage == 100 && json.hp == undefined) {
        obj.playerhp = json.maxhp;
    } else {
        var obj = Singleton.getInstance();
        obj.playerhp = json.hp;
    }

    obj.player = player;
}