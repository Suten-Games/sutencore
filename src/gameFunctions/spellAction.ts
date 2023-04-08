import { Item } from "src/gameObjects/item";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";

export function spellAction(spell:Item, completespell:any) {
    let ps: ParticleSystem


    //let soundstring = "sounds/" + this._sound + ".mp3"
    //let sound = new AudioClip(soundstring)
    //let sound = new AudioClip(completespell.sound)
    //log('spell sound: ', completespell.sound)
    // log('spellAction.ts:12 - spell shape: ', completespell.spellshape)
    // log('spellAction,ts:13 - spell shape 2: ', spell.spellshape())
    // log('spellAction.ts:14 - spellstart: ', completespell.spellstart)
    //let sound = new AudioClip("sounds/279103-Magic-Game-Protection-Ward-Buff.wav")
    //log('spell sound 2 ', sound)
    let shape = new BoxShape()

    switch (completespell.shape) {
        case "BoxShape":
            shape = new BoxShape()
            break;
        case "SphereShape":
            shape = new SphereShape()
            break;
        default:
            shape = new BoxShape();
            break;
    }

    ps = new ParticleSystem(2, 2, shape, completespell.sound)
    engine.addSystem(ps)

    //log('spellAction.ts:33 - Setting spell onClick')

    spell.lootimage.onClick = new OnPointerDown(() => {
        ps.turnOn(shape, completespell.spellstart, completespell.spellend)
        //log("spellAction.ts:415 - calling activateSpell()")
        //this.activateSpell()
        spell.activateSpell(completespell)
    })
}