import { ObjState } from 'src/components/objStateComponent'
import { Player } from 'src/gameObjects/player'
import { Singleton } from 'src/gameObjects/playerDetail'

export function populateObj(json: ObjState, player: Player) {
    log(`debug: 10 Inside populateObj`)

    const obj = Singleton.getInstance()

    obj.strength = json.strength
    obj.level = json.level
    obj.agility = json.agility
    obj.stamina = json.stamina
    obj.wisdom = json.wisdom
    obj.charisma = json.charisma
    obj.armor = json.armor
    obj.weapon = json.primaryweapon
    obj.player = player
    obj.playerhp = json.hp
}

