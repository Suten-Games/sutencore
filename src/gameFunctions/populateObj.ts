import { ObjState } from "src/components/objStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";

export function populateObj(json: ObjState) {
    log(`debug: 10 Inside populateObj`)

    var obj = Singleton.getInstance();

    obj.strength = json.strength;
    obj.level = json.level;
    obj.agility = json.agility;
    obj.stamina = json.stamina;
    obj.wisdom = json.wisdom;
    obj.charisma = json.charisma;
    obj.armor = json.armor;
    obj.weapon = json.primaryweapon;
}