import { Item } from "src/gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { getspell } from "src/gameObjects/spells";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";
import { spellAction } from "./spellAction";
//import { UI } from "src/gameUI/ui";

export function addSpellClick(image:UIImage, name:string) {
    log('inside addSpellClick function')
    //var ui = UI.getInstance();
    
    let obj = Singleton.getInstance()
    image.onClick = new OnPointerDown(
        (e) => {

            //let ps: ParticleSystem
            let myactionbarcontents = obj.fetchactionbar()
            log('Clicked in addSpellClick function')
            log('First Check if the first slot in the AB is a spell or not')
            let slot = querySlot()
            setSlot(slot)

            log(`looks like slot: ${slot} is open for a new spell`)
            
            log('Now I need to create a new object, a spell object in the ActionBar slot selected')
            log('lets check the spell library to see how to fetch the spell data')
            log(`fetching spell called ${name} from the Spell Library`)
            let completespell = getspell(name);
            
            let newspell = new Item(
                completespell.image, slot, completespell.srcw, completespell.srch, completespell.desc,
                completespell.spelltype, completespell.price, completespell.itemtype, completespell.spellshape, completespell.spellstart,
                completespell.spellend, completespell.sound
            );
            //ui.ab.setSlot(slot)
            
            myactionbarcontents.push(newspell)
            newspell.show()
            spellAction(newspell,completespell)
        },
        {
            button: ActionButton.PRIMARY,
            hoverText: "Add to ActionBar",
        }
    );
}

function querySlot(): number {
    log('in the querySlot method');
    const obj = Singleton.getInstance();
    let myactionbarcontents = obj.fetchactionbar()
    let found = 0
    for (let i = 0; i < 9; i++) {
        log(` On loop: ${i} - Checking ${obj.actionbarslots[i]} against ${myactionbarcontents[i].itemtype}`)
        if (obj.actionbarslots[i] === 'filled' && myactionbarcontents[i].itemtype !== 'spell') {
            const poppeditem = myactionbarcontents.shift();
            obj.actionbarslots[i] = null;
            //this._myactionbarcontents.push(poppeditem);
            log(`in the querySlot method returning 1 ${i + 1}`)
            return i + 1;
        } else if (obj.actionbarslots[i] !== 'filled') {
            log(`in the querySlot method returning 2 ${i + 1}`)
            return i + 1;
        }
    }
    log(`in the querySlot method returning 4 ${found}`)
    return found

}

function setSlot(slot: number) {
    log('calling obj setSlot in spellClick')
    const obj = Singleton.getInstance();
    obj.actionbarslots[slot - 1] = 'filled';
}