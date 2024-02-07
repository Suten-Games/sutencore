import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import resources from "src/resources";

export function loadPlayerItems(ui:UI,json:PlayerState ) {
    log(`debug: 11 Inside loadPlayerItems`)

    var obj = Singleton.getInstance();

    //log(`loadPlayerItems:11: ${obj.player.name}`)

    ui.bp.playerclass = obj.playerclass

    ui.bp.resetCharWindow()

    let bp = [
       {
        "image": "images/looticons/blueHealthPotion.png",
            "slot": 10,
                "srcw": 1219,
                    "srch": 2154,
                        "desc": "Major Healing Potion",
                            "type": "potion",
                                "itemtype": "consumable",
                                    "spellshape": null,
                                        "spellstart": null,
                                            "spellend": null,
                                                "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 11,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 12,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 13,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 14,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },{
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 15,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 16,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 17,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 18,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 19,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 20,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }, {
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 21,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        },{
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 22,
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
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 23,
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
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 24,
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
            "image": "images/looticons/blueHealthPotion.png",
            "slot": 25,
            "srcw": 1219,
            "srch": 2154,
            "desc": "Major Healing Potion",
            "type": "potion",
            "itemtype": "consumable",
            "spellshape": null,
            "spellstart": null,
            "spellend": null,
            "sound": null
        }
    ]

    let sb = [
        { image: "images/spells/protect-red-3.png", slot: 51, srcw: 122, srch: 120, desc: "Minor Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/protect-eerie-1.png", slot: 52, srcw: 122, srch: 120, desc: "Amun's Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/fireball-sky-3.png", slot: 53, srcw: 122, srch: 120, desc: "Fire Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-acid-3.png", slot: 54, srcw: 122, srch: 120, desc: "Acid Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-orange-2.png", slot: 55, srcw: 122, srch: 120, desc: "Fire Blade", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    ]

    let wt = [
        { image: "images/spells/protect-red-3.png", slot: 51, srcw: 122, srch: 120, desc: "Shield Bash", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell }, 
    ]

    let actions = [
        {
            "image": "images/looticons/spellscroll.png",
            "slot": 7,
            "srcw": 122,
            "srch": 120,
            "desc": "Barricade",
            "type": "defense",
            "price": 5,
            "itemtype": "scroll",
            "spellshape": "BoxShape",
            "spellstart": 10,
            "spellend": 100,
            "sound": resources.sounds.wardspell
        },
        {
            "image": "images/looticons/spellscroll.png",
            "slot": 8,
            "srcw": 122,
            "srch": 120,
            "desc": "Blizzard",
            "type": "weather",
            "price": 5,
            "itemtype": "scroll",
            "spellshape": "BoxShape",
            "spellstart": 10,
            "spellend": 100,
            "sound": resources.sounds.elementalspell
        },
        {
            "image": "images/looticons/spellscroll.png",
            "slot": 9,
            "srcw": 122,
            "srch": 120,
            "desc": "Sprinkle",
            "type": "weather",
            "price": 5,
            "itemtype": "scroll",
            "spellshape": "BoxShape",
            "spellstart": 10,
            "spellend": 100,
            "sound": resources.sounds.elementalspell
        }
    ]

    //log('in loadPlayerItems - spellbook ', json.spellbook)
        

    // ui.bp.bootLoadBackPack(bp)
    //ui.ab.bootLoadActionBar(actions)
    // ui.sb.bootLoadSpellBook(sb)
    // ui.wt.bootLoadWarriorsTome(wt)

    ui.bp.bootLoadBackPack(json.backpack);
    ui.ab.bootLoadActionBar(json.actionbar);
    ui.sb.bootLoadSpellBook(json.spellbook);
    ui.wt.bootLoadWarriorsTome(json.warriorstome);
    ui.rt.bootLoadRoguesToolbelt(json.roguestoolbelt);
    
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp;
    obj.spellbook = ui.sb;
    obj.warriorstome = ui.wt;
    obj.roguestoolbelt = ui.rt;


}