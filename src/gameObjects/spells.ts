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

const barricade: Ispell = {
    "mana": 12,
    "casttime": 3,
    "fizzleadj": 2,
    "fizzletime": 1,
    "location": "self",
    "blockable": false,
    "dispellable": false,
    "name": "Barricade",
    "spelltype": "Defense",
    "skill": "Conjuration",
    "recasttime": 3,
    "range": 3,
    "size": 3,
    "class": "Mage",
    "level": 4,
    "timeofdate": "any",
    "deletable": false,
    "focusable": false,
    "interruptable": false,
    "targettype": "self",
    "desc": "Barricade",
    "levelmsg": [{ "line1": "msg 2" }],
    "oncastmsg": [{ "line1": "You summon a barricade" }],
    "ondropmsg": [{ "line1": "Your barricade fades" }],
    "duration": 50000,
    "image": new Texture("images/spells/vines-plain-2.png"),
    "itemtype": "spell",
    "spellshape": "BoxShape",
    "spellstart": 5,
    "spellend": 200,
    "sound": resources.sounds.wardspell,
    "srcw": 122,
    "srch": 120,
    "price": 6
}

const blizzard: Ispell = {
    "mana": 12,
    "casttime": 10,
    "fizzleadj": 2,
    "fizzletime": 1,
    "location": "self",
    "blockable": false,
    "dispellable": true,
    "name": "Blizzard",
    "spelltype": "Weather",
    "skill": "Conjuration",
    "recasttime": 3,
    "range": 3,
    "size": 3,
    "class": "Mage",
    "level": 4,
    "timeofdate": "any",
    "deletable": false,
    "focusable": false,
    "interruptable": false,
    "targettype": "self",
    "desc": "Blizzard",
    "levelmsg": [{ "line1": "msg 2" }],
    "oncastmsg": [{ "line1": "You summon a snowstorm" }],
    "ondropmsg": [{ "line1": "The storm blows away" }],
    "duration": 20000,
    "image": new Texture("images/spells/ice-sky-3.png"),
    "itemtype": "spell",
    "spellshape": "BoxShape",
    "spellstart": 5,
    "spellend": 200,
    "sound": resources.sounds.wardspell,
    "srcw": 122,
    "srch": 120,
    "price": 60
}

//let scores: Record<string, number> = {};
//scores.bill = 10; // ✔️ - no type error
//scores.trevor = "10"; // 💥 - Type 'string' is not assignable to type 'number'

let allspells: Record<string, Ispell> = {}

allspells["Minor Shielding"] = minorShielding
allspells["Minor Shielding I"] = minorShielding
allspells["Amun's Shielding"] = amunsShielding
allspells["Barricade"] = barricade
allspells["Blizzard"] = blizzard

export function getspells() {
    return allspells
}

export function getspell(val: string) {
    //log('spells.ts:100 - inside get spell with spell val: ', val)
    //log('allspells ', allspells)
    //log('with parens ', allspells[val])
    return allspells[val]
}

