
import { ObjectTimeOut } from "src/components/TempObjectTimeOut";
import { Item } from "src/gameObjects/item";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";
import { openHeavens } from "src/gameSystems/precipitation";
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
                        //log(`spell.spelltype: ${spell.spelltype()}`)
                        //log(`completespell.spelltype ${completespell.spelltype}`)
                        if(completespell.spelltype === "Shield") {
                            ps.turnOn(shape, completespell.spellstart, completespell.spellend)
                            spell.activateSpell(completespell) 
                        } else if (completespell.spelltype === "Defense") {
                            let origin = Camera.instance.feetPosition.clone();
                            let rotation = Camera.instance.rotation;

                            // Calculate the forward direction from the rotation
                            let forward = Vector3.Forward().rotate(rotation);

                            // Move the origin 2 units in the direction the camera is facing
                            let newPosition = origin.add(forward.scale(2));

                            const myEntity = new Entity();
                            myEntity.addComponent(new BoxShape());

                            // Create material and configure its fields
                            const myMaterial = new Material();
                            if (completespell.blockable) {
                                myMaterial.albedoColor = Color3.Blue();
                                myMaterial.metallic = 0.2;
                                myMaterial.roughness = 0.5;
                            } else {
                                //myMaterial.albedoColor = Color3.Magenta();
                                myMaterial.albedoColor = Color3.FromHexString("#FFD700");
                                myMaterial.metallic = 1;
                                myMaterial.roughness = 0.1;
                            }

                            // Set the position of the entity
                            myEntity.addComponent(new Transform({ position: newPosition }));
                            myEntity.addComponentOrReplace(new ObjectTimeOut(20));

                            // Assign the material to the entity
                            myEntity.addComponent(myMaterial);
                            engine.addEntity(myEntity);

                        } else if (completespell.spelltype === "Weather") {
                            //writeToCl(completespell.oncastmsg[0].line1,'')
                            openHeavens(completespell, completespell.sound)   
                            spell.activateSpell(completespell) 
                        }
                        
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
