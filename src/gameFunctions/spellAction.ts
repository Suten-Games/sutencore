import { Item } from "src/gameObjects/item";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";
import { setTimeout } from "src/gameUtils/timeOut";
import resources from "src/resources";

export function spellAction(spell:Item, completespell:any) {
    let ps: ParticleSystem
    let shape = new BoxShape()
    const xOffset = calculateXOffset(spell);
    let spellCanvas = new UICanvas
    let deleteSpell = new UIImage(spellCanvas, resources.interface.deleteSpellBG);
    deleteSpell.hAlign = "center"
    deleteSpell.vAlign = "bottom";
    deleteSpell.width = "2%";
    deleteSpell.height = "5%";
    deleteSpell.positionY = "-5%";
    deleteSpell.positionX = xOffset;
    deleteSpell.sourceWidth = 110;
    deleteSpell.sourceHeight = 123;
    deleteSpell.visible = false;

    let deleteSpellIcon = new UIImage(spellCanvas, resources.interface.deleteSpell);
    deleteSpellIcon.hAlign = "center"
    deleteSpellIcon.vAlign = "bottom";
    deleteSpellIcon.width = "2%";
    deleteSpellIcon.height = "5%";
    deleteSpellIcon.positionY = "-5%";
    deleteSpellIcon.positionX = xOffset;
    deleteSpellIcon.sourceWidth = 66;
    deleteSpellIcon.sourceHeight = 67;
    deleteSpellIcon.visible = false;
    deleteSpellIcon.onClick = new OnPointerDown(
        (e) => {
            //log('clicked the spell delete button')
            spell.removeItem()
            deleteSpell.visible = false;
            deleteSpellIcon.visible = false;
        }
    )

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

    // spell.lootimage.onClick = new OnPointerDown(() => {
    //     ps.turnOn(shape, completespell.spellstart, completespell.spellend)
    //     //log("spellAction.ts:415 - calling activateSpell()")
    //     //this.activateSpell()
    //     spell.activateSpell(completespell)
    // })

    let lastClickTime: number = 0;
    let doubleClickDuration: number = 300; // milliseconds
    let singleClickTimeout: Entity | null = null;

    //log("inside addSpellClick");
    spell.lootimage.onClick = new OnPointerDown(
            (e) => {
                const currentTime = Date.now();
                if (currentTime - lastClickTime < doubleClickDuration) {
                    // Handle double-click
                    if (singleClickTimeout) {
                        engine.removeEntity(singleClickTimeout); // Cancel the single-click timeout
                    }
                    // log("Double-clicked in addSpellClick");
                    // log("Show the Delete")
                    lastClickTime = 0;
                    
                    deleteSpell.visible = true
                    deleteSpellIcon.visible = true;
                } else {
                    singleClickTimeout = setTimeout(doubleClickDuration, () => {
                        // Handle single-click
                        //log("Single-clicked in addSpellClick");
                        deleteSpell.visible = false;
                        deleteSpellIcon.visible = false;
                        ps.turnOn(shape, completespell.spellstart, completespell.spellend) 
                        spell.activateSpell(completespell) 
                    });
                }
                lastClickTime = currentTime;
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Add to ActionBar",
            }
        );
    


}

function calculateXOffset(spell: { slot: () => number }): string {
    const mod = calculateMod(spell);
    const realmod = -14 + mod;
    return realmod.toString() + "%";
}

function calculateMod(spell: { slot: () => number }): number {
    const slot = spell.slot();
    if (slot > 1 && slot <= 8) {
        return (slot - 1) * 3.5;
    }
    return 0;
}
