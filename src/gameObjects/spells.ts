import { Ispell } from "src/components/spellComponent";
import resources from "src/resources";


const amunsShielding:Ispell = {
    "mana": 12,
    "casttime": 3,
    "fizzleadj": 2,
    "fizzletime": 1,
    "location":"self",
    "blockable":false,
    "dispellable":false,
    "name":"Amun's Shielding",
    "spelltype":"Shield",
    "skill":"Abjuration",
    "recasttime":3,
    "range":3,
    "size":3,
    "class":"Mage",
    "level":1,
    "timeofdate":"any",
    "deletable":false,
    "focusable":false,
    "interruptable":false,
    "targettype":"self",
    "desc": "Shield of Amun",
    "levelmsg":[{"line1":"msg 2"}],
    "oncastmsg":[{"line1":"You feel armored"}],
    "ondropmsg":[{"line1":"Your shielding fades away"}],
    "duration":50000,
    "image": new Texture("images/spells/painterly-spell-icons-3/explosion-magenta-1.png"),
    "itemtype":"spell",
    "spellshape": "SphereShape",
    "spellstart":5,
    "spellend":200,
    "sound":resources.sounds.wardspell,
    "srcw": 122,
    "srch": 120,
    "price":6

}

const minorShielding: Ispell = {
    "mana": 12,
    "casttime": 3,
    "fizzleadj": 2,
    "fizzletime": 1,
    "location": "self",
    "blockable": false,
    "dispellable": false,
    "name": "Minor Shielding",
    "spelltype": "Shield",
    "skill": "Abjuration",
    "recasttime": 3,
    "range": 3,
    "size": 3,
    "class": "Mage",
    "level": 1,
    "timeofdate": "any",
    "deletable": false,
    "focusable": false,
    "interruptable": false,
    "targettype": "self",
    "desc": "Minor Shielding I",
    "levelmsg": [{ "line1": "msg 2" }],
    "oncastmsg": [{ "line1": "Your skin shines" }],
    "ondropmsg": [{ "line1": "Your skin loses its luster" }],
    "duration": 60000,
    "image": new Texture("images/spells/painterly-spell-icons-3/explosion-magenta-1.png"),
    "itemtype": "spell",
    "spellshape": "SphereShape",
    "spellstart": 5,
    "spellend": 200,
    "sound": resources.sounds.wardspell,
    "srcw":122,
    "srch":120,
    "price":5

}

//let scores: Record<string, number> = {};
//scores.bill = 10; // ✔️ - no type error
//scores.trevor = "10"; // 💥 - Type 'string' is not assignable to type 'number'

let allspells: Record<string, Ispell> = {}

allspells["Minor Shielding"] = minorShielding
allspells["Minor Shielding I"] = minorShielding
allspells["Amun's Shielding"] = amunsShielding

//const allspells = Map({"amunsShielding":amunsShielding});

// { image: "images/spells/painterly-spell-icons-3/explosion-magenta-1.png", slot: 3, srcw: 256, srch: 256, desc: "Minor Shielding", type: null, price: 10, itemtype: "spell", spellshape: "SphereShape", spellstart: 5, spellend: 200, sound: resources.sounds.wardspell, lootwindow: null, npc: null },

export function getspells() {
    return allspells
}

export function getspell(val: string) {
    //log('spells.ts:100 - inside get spell with spell val: ', val)
    //log('allspells ', allspells)
    //log('with parens ', allspells[val])
    return allspells[val]
}

