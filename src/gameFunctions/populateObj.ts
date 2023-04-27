import { ObjState } from "src/components/objStateComponent";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";

export function populateObj(json: ObjState, player: Player) {
    // log(`debug: 10 Inside populateObj`)

    // log(`populateObj:8 - player.name: ${player.name}`)

    var obj = Singleton.getInstance();

    obj.strength = json.strength;
    obj.level = json.level;
    obj.agility = json.agility;
    obj.stamina = json.stamina;
    obj.wisdom = json.wisdom;
    obj.charisma = json.charisma;
    obj.armor = json.armor;
    obj.weapon = json.primaryweapon;
    //log(`loading player with obj`)
    obj.player = player
    //log(`obj.player ${JSON.stringify(obj.player)}`)
}