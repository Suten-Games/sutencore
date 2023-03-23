import { Item } from "src/gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";

export class ActionBar {
    private _canvas;
    private _image;
    private _ab;
    private _slot1: string | null = "";
    private _slot2: string | null = "";
    private _slot3: string | null = "";
    private _slot4: string | null = "";
    private _slot5: string | null = "";
    private _slot6: string | null = "";
    private _slot7: string | null = "";
    private _slot8: string | null = "";
    private _slot9: string | null = "";
    private _myactionbarcontents: Array<Item>;

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
        // log(' in selectSlot')
        if (!this._slot1) {
            this._slot1 = 'filled'
            item.updateLoc(1)
            this._myactionbarcontents.push(item)
            return 1
        } else if (!this._slot2) {
            this._slot2 = 'filled'
            item.updateLoc(2)
            this._myactionbarcontents.push(item)
            return 2
        } else if (!this._slot3) {
            this._slot3 = 'filled'
            item.updateLoc(3)
            this._myactionbarcontents.push(item)
            return 3
        } else if (!this._slot4) {
            this._slot4 = 'filled'
            item.updateLoc(4)
            this._myactionbarcontents.push(item)
            return 4
        } else if (!this._slot5) {
            this._slot5 = 'filled'
            item.updateLoc(5)
            this._myactionbarcontents.push(item)
            return 5
        } else if (!this._slot6) {
            this._slot6 = 'filled'
            item.updateLoc(6)
            this._myactionbarcontents.push(item)
            return 6
        } else if (!this._slot7) {
            this._slot7 = 'filled'
            item.updateLoc(7)
            this._myactionbarcontents.push(item)
            return 7
        } else if (!this._slot8) {
            this._slot8 = 'filled'
            item.updateLoc(8)
            this._myactionbarcontents.push(item)
            return 8
        } else if (!this._slot9) {
            this._slot9 = 'filled'
            item.updateLoc(9)
            this._myactionbarcontents.push(item)
            return 9
        } else {
            return 0
        }
    }


    public bootLoadActionBar(data: any[]) {
        //log(`debug: 13 Inside bootLoadActionBar`)

        let obj = Singleton.getInstance();
        data.forEach(element => {
            if (element.slot) {
                //log('actionBar:90 element ', JSON.stringify(element))
                // let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                //     element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,
                //     element.lootwindow, element.npc)

                let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                    element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,
                )

                //log(`actionBar:99 class: ${obj.playerclass}`)

                if (element.itemtype != "spell" || element.itemtype == "spell" && obj.playerclass == "Magician") {
                    this.setSlot(element.slot)
                    item.setslot = element.slot
                    item.updateLoc(element.slot)
                    this._myactionbarcontents.push(item)
                }

            }
        });
    }

    public setSlot(slot: number) {
        if (slot == 1) {
            this._slot1 = 'filled'
        } else if (slot == 2) {
            this._slot2 = 'filled'
        } else if (slot == 3) {
            this._slot3 = 'filled'
        } else if (slot == 4) {
            this._slot4 = 'filled'
        } else if (slot == 5) {
            this._slot5 = 'filled'
        } else if (slot == 6) {
            this._slot6 = 'filled'
        } else if (slot == 7) {
            this._slot7 = 'filled'
        } else if (slot == 8) {
            this._slot8 = 'filled'
        } else if (slot == 9) {
            this._slot9 = 'filled'
        }
    }

    public resetSlot(slot: number) {
        if (slot == 1) {
            this._slot1 = null
        } else if (slot == 2) {
            this._slot2 = null
        } else if (slot == 3) {
            this._slot3 = null
        } else if (slot == 4) {
            this._slot4 = null
        } else if (slot == 5) {
            this._slot5 = null
        } else if (slot == 6) {
            this._slot6 = null
        } else if (slot == 7) {
            this._slot7 = null
        } else if (slot == 8) {
            this._slot8 = null
        } else if (slot == 9) {
            this._slot9 = null
        }

        let i = this._myactionbarcontents.map(x => x.slot()).indexOf(slot)
        this._myactionbarcontents.splice(i, 1)
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