import resources from "../resources";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";

export class SpellBook {
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
    private _myspellbookcontents: Array<Item>;
    private obj = Singleton.getInstance();


    constructor(canvas: any, image: any) {
        let obj = Singleton.getInstance()
        this._canvas = canvas;
        this.obj.canvas = canvas;
        this._image = image;
        this._myspellbookcontents = obj.playerspellbook;
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "left";
        this._bp.vAlign = "center";
        this._bp.width = "40%";
        this._bp.height = "50%";
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
        this._closebutton.positionX = "47%";
        this._closebutton.positionY = "29%";
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

    public selectSlot(item: Item) {
        if (!this._slot1) {
            this._slot1 = 'filled';
            this._myspellbookcontents.push(item)
            return 51
        } else if (!this._slot2) {
            this._slot2 = 'filled';
            this._myspellbookcontents.push(item)
            return 52
        } else if (!this._slot3) {
            this._slot3 = 'filled';
            this._myspellbookcontents.push(item)
            return 53
        } else if (!this._slot4) {
            this._slot4 = 'filled';
            this._myspellbookcontents.push(item)
            return 54
        } else if (!this._slot5) {
            this._slot5 = 'filled';
            this._myspellbookcontents.push(item)
            return 55
        } else if (!this._slot6) {
            this._slot6 = 'filled'
            this._myspellbookcontents.push(item)
            return 56
        } else if (!this._slot7) {
            this._slot7 = 'filled'
            this._myspellbookcontents.push(item)
            return 57
        } else if (!this._slot8) {
            this._slot8 = 'filled'
            this._myspellbookcontents.push(item)
            return 58
        } else {
            return 90
        }
    }

    private getcontents() {
        log(`spellBook.ts:141 - In getContents method size of spellbook: ${this._myspellbookcontents.length} `)
        this._myspellbookcontents.forEach(item => {
            log(`spellBook.ts:142 - Calling item.show()`)
            item.show()
        })
    }

    get visible() {
        return this._bp.visible;
    }

    public show() {
        log(`spellBook.ts:152 - In showmethod()`)
        this._bp.visible = true;
        this._closebutton.visible = true;
        log(`spellBookts:155 - Calling getContents method`)
        this.getcontents()
    }

    public hide() {
        this._bp.visible = false;
        this._buybutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
    }
}