import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";


export function setCharClass(json: PlayerState) {
    var obj = Singleton.getInstance();

    if (json.characterclass == undefined) {
        //log('setting obj.playerclass to Adventurer')
        obj.playerclass = "Adventurer";
    } else {
        //log(`exists, so setting obj.playerclass to ${json.characterclass}`)
        obj.playerclass = json.characterclass;
    } 
}