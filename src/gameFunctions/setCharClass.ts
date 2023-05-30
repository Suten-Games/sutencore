import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";


export function setCharClass(json: PlayerState) {
    var obj = Singleton.getInstance();

    if (json.characterclass == undefined) {
        obj.playerclass = "Adventurer";
    } else {
        obj.playerclass = json.characterclass;
    } 
}