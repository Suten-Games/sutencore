import resources from "../resources";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { getspell } from "src/gameObjects/spells";
import { addSpellClick } from "src/gameFunctions/spellClick";

export class RoguesToolbelt {
    private _canvas;
    private _image;
    private _cl: any;
    private _bp;
    private _closebutton;
    private _buybutton;
    private _buytext;
    private _slot1: any;
    private _slot2: any;
    private _slot3: any;
    private _slot4: any;
    private _slot5: any;
    private _slot6: any;
    private _slot7: any;
    private _slot8: any;
    private _myroguestoolbeltcontents: Array<Item>;
    private obj = Singleton.getInstance();


    constructor(canvas: any, image: any) {
        //log('in the roguestoolbelt constructor')
        let obj = Singleton.getInstance()
        this._canvas = canvas;
        this.obj.canvas = canvas;
        this._image = image;
        //this._myroguestoolbeltcontents = obj.playerroguestoolbelt;
        this._myroguestoolbeltcontents = obj.fetchroguestoolbelt();
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "left";
        this._bp.vAlign = "center";
        this._bp.width = "23%"
        this._bp.height = "41%";
        this._bp.positionY = "10.2%";
        this._bp.positionX = "12.5%";
        this._bp.sourceWidth = 2032; //Old Style
        this._bp.sourceHeight = 1324; //Old Style
        this._bp.visible = false;

        this._closebutton = new UIImage(this._canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "left";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "5%";
        this._closebutton.height = "8%";
        this._closebutton.positionX = "31%";
        this._closebutton.positionY = "26%";
        this._closebutton.sourceWidth = 168;
        this._closebutton.sourceHeight = 164;
        this._closebutton.visible = false;
        this._closebutton.onClick = new OnPointerDown(
            (e) => {
                this.hide()
            }
        )

        this._buybutton = new UIImage(this._canvas, resources.interface.buybutton);
        this._buybutton.hAlign = "left";
        this._buybutton.vAlign = "center";
        this._buybutton.width = "5%";
        this._buybutton.height = "5.3%";
        this._buybutton.positionY = "-22.1%";
        this._buybutton.positionX = "20.7%";
        this._buybutton.sourceWidth = 390;
        this._buybutton.sourceHeight = 170;
        this._buybutton.visible = false;

        this._buytext = new UIText(this._canvas);
        this._buytext.fontSize = 14;
        this._buytext.width = 120;
        this._buytext.height = 30;
        this._buytext.hAlign = "left";
        this._buytext.vAlign = "center";
        this._buytext.positionY = "-21%";
        this._buytext.positionX = "31%";
        this._buytext.visible = false;


    }

    public selectSlot() {
        if (!this._slot1) {
            this._slot1 = 'filled';
            return 51
        } else if (!this._slot2) {
            this._slot2 = 'filled';
            return 52
        } else if (!this._slot3) {
            this._slot3 = 'filled';
            return 53
        } else if (!this._slot4) {
            this._slot4 = 'filled';
            return 54
        } else if (!this._slot5) {
            this._slot5 = 'filled';
            return 55
        } else if (!this._slot6) {
            this._slot6 = 'filled'
            return 56
        } else if (!this._slot7) {
            this._slot7 = 'filled'
            return 57
        } else if (!this._slot8) {
            this._slot8 = 'filled'
            return 58
        } else {
            return 90
        }
    }

    private setSlot(slot: number) {
        if (slot == 51) {
            this._slot1 = 'filled';
        } else if (slot == 52) {
            this._slot2 = 'filled';
        } else if (slot == 53) {
            this._slot3 = 'filled';
        } else if (slot == 54) {
            this._slot4 = 'filled'
        } else if (slot == 55) {
            this._slot5 = 'filled'
        } else if (slot == 56) {
            this._slot6 = 'filled'
        } else if (slot == 57) {
            this._slot7 = 'filled'
        } else if (slot == 58) {
            this._slot8 = 'filled'
        }
    }

    private getcontents() {
        log('in getcontents')
        this._myroguestoolbeltcontents.forEach(spell => {
            log(`roguestoolbelt.ts:138 ${spell.lootdesc()}`)
            addSpellClick(spell.lootimage, spell.lootdesc())
            spell.show()
        })
    }

    public bootLoadRoguesToolbelt(data: any[]) {
        //log(`debug: 13 Inside bootroguestoolbelt `, data)

        data.forEach(element => {
            if (element.slot) {
                //log('element.slot ', element.slot)
                //let slot = this.selectSlot()
                //log('creating new item for roguestoolbelt')
                let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                    element.price, element.buybackprice, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound, null, null, null, null
                )
                //log('new roguestoolbelt item is creating, setting slot')
                this.setSlot(element.slot)
                //log('adfter the setSlot call')
                //item.updateLoc(slot)
                //log('pushing the new spell to the roguestoolbeltcontents array ', this._myroguestoolbeltcontents)
                this._myroguestoolbeltcontents.push(item)

                item.hide()
            } else {
                //log('Slot was not set in the DB, so picking a slot')
                let slot = this.selectSlot()
                //log('creating new item for roguestoolbelt')
                let item = new Item(new Texture(element.image), slot, element.srcw, element.srch, element.desc, element.type,
                    element.price, element.buybackprice, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound, null, null, null, null
                )
                //log('new roguestoolbelt item is creating, setting slot')
                this.setSlot(slot)
                //log('adfter the setSlot call')
                //item.updateLoc(slot)
                //log('pushing the new spell to the roguestoolbeltcontents array ', this._myroguestoolbeltcontents)
                this._myroguestoolbeltcontents.push(item)

                item.hide()
            }
        })
    }

    public scribeSpell(spellname: string) {
        log('inside scribeSpell')
        let dbspell = getspell(spellname)
        let slot = this.selectSlot()

        let spell = new Item(dbspell.image, slot, 122, 120, dbspell.desc, dbspell.targettype,
            5, 3, "spell", dbspell.spellshape, dbspell.spellstart, dbspell.spellend, dbspell.sound, null, null, null, null)

        this.setSlot(slot)

        //log('in scribeSpell, spell before push to array ', JSON.stringify(spell))

        this._myroguestoolbeltcontents.push(spell)

        spell.hide()
    }

    get visible() {
        return this._bp.visible;
    }

    public show() {
        log(`roguestoolbelt.ts:152 - In showmethod()`)
        this._bp.visible = true;
        this._closebutton.visible = true;
        log(`roguestoolbeltts:155 - Calling getContents method`)
        this.getcontents()
    }

    public hide() {
        log(`roguestoolbelt.ts:212 - Clicked hide in the roguestoolbelt`)
        this._bp.visible = false;
        this._buybutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
        for (let spell of this._myroguestoolbeltcontents) {
            spell.hide()
        }
    }
}