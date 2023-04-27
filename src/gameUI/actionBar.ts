import { Item } from "src/gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";

export class ActionBar {
    private _canvas;
    private _image;
    private _ab;
    private _slots: (string | null)[] = new Array(9).map(() => null);
    private _myactionbarcontents: Item[] = [];
    

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
    }

    public selectSlot(item: Item): number {
        let obj = Singleton.getInstance()
        const index = this._slots.indexOf(null);
        log(`actionBar.ts:29 - index ${index}`)

        if (index !== -1) {
            const slot = index + 1;
            this._slots[index] = 'filled';
            obj.actionbarslots[index] = 'filled'
            item.updateLoc(slot);
            this._myactionbarcontents.push(item);
            return slot;
        } else {
            return 0;
        }
    }


    public bootLoadActionBar(data: any[]) {
        const obj = Singleton.getInstance();
        data.forEach(element => {
            //log('actionBar:45 - in bootLoadActionBar slot: ', element.slot)
            if (element.slot) {
                let item = new Item(
                    new Texture(element.image), element.slot, element.srcw, element.srch, element.desc,
                    element.type, element.price, element.itemtype, element.spellshape, element.spellstart,
                    element.spellend, element.sound,null,null
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

                if (element.itemtype != "spell" || (element.itemtype == "spell" && obj.playerclass == "Magician")) {
                    this.setSlot(element.slot);
                    item.setslot = element.slot;
                    item.updateLoc(element.slot);
                    this._myactionbarcontents.push(item);
                }
            } else {
                log('actionBar:111 slot is not set');
            }
        });
    }



    public setSlot(slot: number) {
        //log(`actionBar.ts:82 - setSlot() setting ${slot} to filled`)
        //log(`in setSlot, slot is: ${slot} will subtract 1 for some reason and make that filled`)
        const obj = Singleton.getInstance();
        this._slots[slot] = 'filled';
        obj.actionbarslots[slot] = 'filled';
    }


    public resetSlot(slot: number) {
        const obj = Singleton.getInstance();
        this._slots[slot - 1] = null;
        obj.actionbarslots[slot - 1] = null;
        let i = this._myactionbarcontents.map(x => x.slot()).indexOf(slot)
        if (i !== -1) {
            this._myactionbarcontents.splice(i, 1)
        }
        // const index = this._myactionbarcontents.findIndex(item => item.slot() === slot);
        // if (index !== -1) {
        //     this._myactionbarcontents.splice(index, 1);
        // }
    }

    public checkSlot(): number {
        //log('in the checkSlot method');
        const obj = Singleton.getInstance();
        let found = 0
        for (let i = 1; i < 10; i++) {
            //log(`actionBar.ts:109 - checkSlot() - i: ${i} this._slots[i]: ${this._slots[i]}`)
            //log(` On loop: ${i} - Checking ${this._slots[i]} against ${this._myactionbarcontents[i].itemtype}`)
            // if (this._slots[i] === 'filled') {
            //     log(`actionBar.ts:112 - checkSlot() ${i} is filled, so changing i to: ${i + 1}`)
            // } else if (this._slots[i] !== 'filled') {
            //     log(`actionBar.ts:114 - checkSlot() ${i} is not filled so returning i: ${i}`)
            //     return i;
            // }
            if (this._slots[i] !== 'filled') {
                return i;
            }
        }
        log(`in the checkSlot method returning found: ${found}`)
        return found

    }


    public querySlot(): number {
        log('in the querySlot method');
        const obj = Singleton.getInstance();
        let found = 0
        for (let i = 0; i < 9; i++) {
            log(` On loop: ${i} - Checking ${this._slots[i]} against ${this._myactionbarcontents[i].itemtype}`)
            if (this._slots[i] === 'filled' && this._myactionbarcontents[i].itemtype !== 'spell') {
                const poppeditem = this._myactionbarcontents.shift();
                this._slots[i] = null;
                //this._myactionbarcontents.push(poppeditem);
                log(`in the querySlot method returning 1 ${i + 1}`)
                return i + 1;
            } else if (this._slots[i] !== 'filled') {
                log(`in the querySlot method returning 2 ${i + 1}`)
                return i + 1;
            }
        }
        log(`in the querySlot method returning 3 ${found}`)
        return found
        
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