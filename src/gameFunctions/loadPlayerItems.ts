import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import resources from "src/resources";

export function loadPlayerItems(ui:UI,json:PlayerState ) {
    log(`debug: 11 Inside loadPlayerItems`)

    var obj = Singleton.getInstance();

    ui.bp.playerclass = obj.playerclass

    ui.bp.resetCharWindow()

    let sb = [
        { image: "images/spells/protect-red-3.png", slot: 51, srcw: 122, srch: 120, desc: "Minor Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/protect-eerie-1.png", slot: 52, srcw: 122, srch: 120, desc: "Amun's Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/fireball-sky-3.png", slot: 53, srcw: 122, srch: 120, desc: "Fire Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-acid-3.png", slot: 54, srcw: 122, srch: 120, desc: "Acid Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-orange-2.png", slot: 55, srcw: 122, srch: 120, desc: "Fire Blade", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/evil-eye-eerie-3.png", slot: 56, srcw: 122, srch: 120, desc: "Evil Eye", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell }
    ]

    let actions = [
        { image: "images/spells/protect-red-3.png", slot: 1, srcw: 122, srch: 120, desc: "Minor Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 8,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },
        {
            "image": "images/looticons/sandbeetle.png",
            "slot": 4,
            "srcw": 345,
            "srch": 400,
            "desc": "Sand Beetle Husk",
            "type": null,
            "itemtype": "trinket",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },
        {
            "image": "images/looticons/rustydagger.png",
            "slot": 5,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Rusty Dagger",
            "type": "piercing",
            "itemtype": "weapon",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },
        {
            "image": "images/looticons/manavial.png",
            "slot": 6,
            "srcw": 122,
            "srch": 120,
            "desc": "Mana Vial",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },
        {
            "image": "images/looticons/rustyaxe.png",
            "slot": 3,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Rusty Axe",
            "type": "1H slash",
            "price": 6,
            "itemtype": "weapon",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": ""
        },
        {
            "image": "images/looticons/spellscroll.png",
            "slot": 7,
            "srcw": 122,
            "srch": 120,
            "desc": "Minor Shielding",
            "type": "shield",
            "price": 5,
            "itemtype": "scroll",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }
    ]

    //log('in loadPlayerItems - spellbook ', json.spellbook)
        

    //ui.bp.bootLoadBackPack(json.backpack);
    //ui.ab.bootLoadActionBar(json.actionbar);
    ui.ab.bootLoadActionBar(actions)
    //ui.sb.bootLoadSpellBook(json.spellbook)
    ui.sb.bootLoadSpellBook(sb)
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp;
    obj.spellbook = ui.sb;

}