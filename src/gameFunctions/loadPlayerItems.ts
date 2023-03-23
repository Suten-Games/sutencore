import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import resources from "src/resources";

export function loadPlayerItems(ui:UI,json:PlayerState ) {
    log(`debug: 11 Inside loadPlayerItems`)

    var obj = Singleton.getInstance();

    ui.bp.playerclass = obj.playerclass

    ui.bp.resetCharWindow()

    // let sb = [
    //     { image: "images/spells/painterly-spell-icons-3/explosion-magenta-1.png", slot: 3, srcw: 256, srch: 256, desc: "Minor Shielding", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    //     { image: "images/spells/painterly-spell-icons-1/protect-eerie-1.png", slot: 3, srcw: 256, srch: 256, desc: "Amun's Shielding", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    //     { image: "images/spells/painterly-spell-icons-1/fireball-sky-3.png", slot: 3, srcw: 256, srch: 256, desc: "Fire Strike", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    //     { image: "images/spells/painterly-spell-icons-1/enchant-acid-3.png", slot: 3, srcw: 256, srch: 256, desc: "Acid Strike", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    //     { image: "images/spells/painterly-spell-icons-1/enchant-orange-2.png", slot: 3, srcw: 256, srch: 256, desc: "Fire Blade", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    //     { image: "images/spells/painterly-spell-icons-1/evil-eye-eerie-3.png", slot: 3, srcw: 256, srch: 256, desc: "Evil Eye", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell }
    // ]

    log('in loadPlayerItems - spellbook ', json.spellbook)
        

    ui.bp.bootLoadBackPack(json.backpack);
    ui.ab.bootLoadActionBar(json.actionbar);
    ui.sb.bootLoadSpellBook(json.spellbook)
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp;
    obj.spellbook = ui.sb;

}