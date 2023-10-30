import { Item } from "src/gameObjects/item";
import { setTimeout } from "src/gameUtils/timeOut";
import resources from "src/resources";

export function trinketAction(trinket: Item) {
    const xOffset = calculateXOffset(trinket);
    let trinketCanvas = new UICanvas
    let deleteTrinket = new UIImage(trinketCanvas, resources.interface.deleteSpellBG);
    deleteTrinket.hAlign = "center"
    deleteTrinket.vAlign = "bottom";
    deleteTrinket.width = "2%";
    deleteTrinket.height = "5%";
    deleteTrinket.positionY = "-5%";
    deleteTrinket.positionX = xOffset;
    deleteTrinket.sourceWidth = 110;
    deleteTrinket.sourceHeight = 123;
    deleteTrinket.visible = false;

    let deleteTrinketIcon = new UIImage(trinketCanvas, resources.interface.deleteSpell);
    deleteTrinketIcon.hAlign = "center"
    deleteTrinketIcon.vAlign = "bottom";
    deleteTrinketIcon.width = "2%";
    deleteTrinketIcon.height = "5%";
    deleteTrinketIcon.positionY = "-5%";
    deleteTrinketIcon.positionX = xOffset;
    deleteTrinketIcon.sourceWidth = 66;
    deleteTrinketIcon.sourceHeight = 67;
    deleteTrinketIcon.visible = false;
    deleteTrinketIcon.onClick = new OnPointerDown(
        () => {
            //log('clicked the trinket delete button')
            trinket.removeItem()
            deleteTrinket.visible = false;
            deleteTrinketIcon.visible = false;
        }
    )

    let lastClickTime: number = 0;
    let doubleClickDuration: number = 300; // milliseconds
    let singleClickTimeout: Entity | null = null;

    //log("inside addTrinketClick");
    trinket.lootimage.onClick = new OnPointerDown(
        (e) => {
            const currentTime = Date.now();
            if (currentTime - lastClickTime < doubleClickDuration) {
                // Handle double-click
                if (singleClickTimeout) {
                    engine.removeEntity(singleClickTimeout); // Cancel the single-click timeout
                }
                // log("Double-clicked in addTrinketClick");
                // log("Show the Delete")
                lastClickTime = 0;

                deleteTrinket.visible = true
                deleteTrinketIcon.visible = true;
            } else {
                singleClickTimeout = setTimeout(doubleClickDuration, () => {
                    // Handle single-click
                    log("Single-clicked trinket");
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

function calculateXOffset(trinket: { slot: () => number }): string {
    const mod = calculateMod(trinket);
    const realmod = -14 + mod;
    return realmod.toString() + "%";
}

function calculateMod(trinket: { slot: () => number }): number {
    const slot = trinket.slot();
    if (slot > 1 && slot <= 8) {
        return (slot - 1) * 3.5;
    }
    return 0;
}
