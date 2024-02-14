import { Item } from "src/gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";

export class ActionBar {
    private _canvas;
    private _image;
    private _ab;
    private _myactionbarcontents: Item[] = [];
    private _mybackpackcontents: any;
    

    constructor(canvas: UICanvas, image: Texture) {
        let obj = Singleton.getInstance()
        this._canvas = canvas;
        this._image = image;
        this._ab = new UIImage(this._canvas, this._image);
        this._ab.hAlign = "bottom"
        this._ab.vAlign = "bottom";
        this._ab.width = "32%";
        this._ab.height = "10%";
        this._ab.sourceWidth = 1324;
        this._ab.sourceHeight = 150;
        this._myactionbarcontents = obj.fetchactionbar()
        this._mybackpackcontents = obj.showbackpack()
    }


    public selectSlot(item: Item): number {
        let obj = Singleton.getInstance();
        const index = obj.actionbarslots.indexOf(null);
        if (index !== -1) {
            const slot = index + 1;
            obj.actionbarslots[index] = 'filled';
            item.updateLoc(slot);
            this._myactionbarcontents.push(item);
            //log(`actionBar.ts:selectSlot(): all of the actionbar slots: ${obj.actionbarslots}`)
            return slot;
        }
        //log(`actionBar.ts:selectSlot(): all of the actionbar slots: ${obj.actionbarslots}`)
        return 0;
    }


    public bootLoadActionBar(data: any[]) {
        const obj = Singleton.getInstance();
        data.forEach(element => {
            //log('actionBar:45 - in bootLoadActionBar slot: ', element.slot)
            if (element.slot) {
                let item = new Item(
                    new Texture(element.image), element.slot, element.srcw, element.srch, element.desc,
                    element.type, element.price, element.buybackprice, element.itemtype, element.spellshape, element.spellstart,
                    element.spellend, element.sound,null,null, null, null
                );

                if (element.desc == "Cracked Staff" && element.itemtype == null) {
                    element.itemtype = "weapon";
                }

                if (element.desc == "Rusty Dagger" && element.itemtype == null) {
                    element.itemtype = "weapon";
                }

                if (element.desc == "Sand Beetle Husk" && element.itemtype == null) {
                    element.itemtype = "questloot";
                }

                this.setSlot(element.slot);
                item.setslot = element.slot;
                item.updateLoc(element.slot);

                if (element.slot == 10 || element.slot == 11 || element.slot == 12) {
                    this._mybackpackcontents.push(item)
                    item.hide()
                } else {
                    this._myactionbarcontents.push(item);
                }

               
            } else {
                log('actionBar:111 slot is not set');
            }
        });
    }


    public setSlot(slot: number) {
        //log(`STEP 5 - setting the actionbar Slot`)
        //log(`now in actionBar.ts:82 - setSlot() setting ${slot} to filled`)

        const obj = Singleton.getInstance();
        obj.actionbarslots[slot] = 'filled';

        //log(`actionBar.ts: setSlot() - this slot ${slot} is now: ${obj.actionbarslots[slot]}`)
        //log(`actionBar.ts: setSlot() - all of the actionbar slots (obj.actionbarslots): ${obj.actionbarslots}`)
    }


    public resetSlot(slot: number) {
        let obj = Singleton.getInstance();
        obj.actionbarslots[slot] = null;
        let i = this._myactionbarcontents.map(x => x.slot()).indexOf(slot);
        if (i !== -1) {
            this._myactionbarcontents.splice(i, 1);
        }
        //log(`this slot ${slot} is now: ${obj.actionbarslots[slot]}`)
        //log(`all of the actionbar slots: ${obj.actionbarslots}`)
    }


    public checkSlot(): number {
        //log('STEP TWO: actionBar.ts: in the checkSlot method');
        let obj = Singleton.getInstance();
        for (let i = 1; i < 10; i++) {
            if (obj.actionbarslots[i] !== 'filled') {
                //log(`actionBar.ts: checkSlot() all of the actionbar slots: ${obj.actionbarslots}`)
                return i;
            }
        }

        //log(`actionBar.ts: checkSlot() all of the actionbar slots: ${obj.actionbarslots}`)
        return 0;
    }

    public exist() {
        log('The actionBar exists')
    }

    public show() {
        this._ab.visible = true;
    }

    public hide() {
        log('inside actionbarhide')
    }
}