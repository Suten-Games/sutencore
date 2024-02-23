import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import resources from "src/resources";

export function loadPlayerItems(ui:UI,json:PlayerState ) {
    //log(`debug: 11 Inside loadPlayerItems`)

    var obj = Singleton.getInstance();

    ui.bp.playerclass = obj.playerclass

    ui.bp.resetCharWindow()

    let bp = [
        {"image": "images/looticons/blueHealthPotion.png", "slot": 10, "srcw": 1219, "srch": 2154, "desc": "Major Healing Potion", "type": "potion", "itemtype": "consumable", "spellshape": null, "spellstart": null, "spellend": null, "sound": null }, 
        {"image": "images/looticons/blueHealthPotion.png","slot": 11, "srcw": 1219,"srch": 2154, "desc": "Major Healing Potion","type": "potion", "itemtype": "consumable","spellshape": null, "spellstart": null,"spellend": null, "sound": null }, 
    ]

    let sb = [
        { image: "images/spells/protect-red-3.png", slot: 51, srcw: 122, srch: 120, desc: "Minor Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/protect-eerie-1.png", slot: 52, srcw: 122, srch: 120, desc: "Amun's Shielding", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/fireball-sky-3.png", slot: 53, srcw: 122, srch: 120, desc: "Fire Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-acid-3.png", slot: 54, srcw: 122, srch: 120, desc: "Acid Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-orange-2.png", slot: 55, srcw: 122, srch: 120, desc: "Fire Blade", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    ]

    let cw = [
        { image: "images/looticons/fulminous-hood.png", slot: 80, srcw: 800, srch: 800, desc: "Fulminous Hood", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell }, 
        { image: "images/looticons/fulminous-robe.png", slot: 81, srcw: 800, srch: 800, desc: "Fulminous Robe", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/looticons/fulminous-boots.png", slot: 82, srcw: 800, srch: 800, desc: "Fulminous Boots", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/fireball-sky-3.png", slot: 83, srcw: 122, srch: 120, desc: "Fire Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
        { image: "images/spells/enchant-acid-3.png", slot: 84, srcw: 122, srch: 120, desc: "Acid Strike", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell },
    ]

    let wt = [
        { image: "images/spells/protect-red-3.png", slot: 51, srcw: 122, srch: 120, desc: "Shield Bash", type: "abjuration", price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell }, 
    ]

    let actions = [
        { image: 'images/looticons/adventurers-boots.png',slot:5,srcw:413,srch:452,desc:"Adventurers Boots",type:"server",price:20,buybackprice:10, itemtype:"clothing",itemdetail:"Boots", stats: {"agility":10}, weaponaction:null, spellshape:null, spellstart:null, spellend:null, sound:null, tradewindow:null, lootwindow:null, npc:null, questwindow:null},
        { image: 'images/looticons/adventurers-garb.png', slot: 6, srcw: 561, srch: 612, desc: "Adventurers Garb", type: "server", price: 20, buybackprice: 10, itemtype: "clothing", itemdetail: "Torso", stats: { "charisma": 10 }, weaponaction: null, spellshape: null, spellstart: null, spellend: null, sound: null, tradewindow: null, lootwindow: null, npc: null, questwindow: null },
        { image: "images/looticons/spellscroll.png", slot: 1, srcw: 122, srch: 120, desc: "Shield Bash", type: "abjuration", price: 10, itemtype: "scroll", spellshape: "BoxShape", spellstart: 20, spellend: 26, sound: resources.sounds.wardspell }, 
        { image: "images/looticons/rustysword.png", slot: 2, srcw: 1219, srch: 2154, desc: "Rusty Sword", type: "abjuration", price: 10, itemdetail:"1H Slashing",weaponaction:"slash",itemtype: "weapon", spellshape: "BoxShape", spellstart: 20, spellend: 26, sound: resources.sounds.wardspell }, 
    ]

    // ui.bp.bootLoadBackPack(bp)
    //ui.ab.bootLoadActionBar(actions)
    // ui.sb.bootLoadSpellBook(sb)
    // ui.wt.bootLoadWarriorsTome(wt)
    // ui.cw.bootLoadCharWindow(cw)
    
    ui.bp.bootLoadBackPack(json.backpack);
    ui.ab.bootLoadActionBar(json.actionbar);
    ui.sb.bootLoadSpellBook(json.spellbook);
    ui.wt.bootLoadWarriorsTome(json.warriorstome);
    ui.rt.bootLoadRoguesToolbelt(json.roguestoolbelt);
    ui.cw.bootLoadCharWindow(json.character);
    
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp;
    obj.spellbook = ui.sb;
    obj.warriorstome = ui.wt;
    obj.roguestoolbelt = ui.rt;
    obj.characterwindow = ui.cw;
}