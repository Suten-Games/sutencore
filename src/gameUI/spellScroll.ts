import resources from "../resources";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";

export class SpellScroll {
    private _canvas;
    private _image;
    private _bp;
    private _closebutton;
    private _scribebutton;
    private _buytext;
    private obj = Singleton.getInstance();
    private _spellbook;
    private _spelldetails;
    private _lootbig;
    private _desc1;
    private _title;
    private _armor;

    constructor(canvas: any, image: any, spellname: string) {
        let obj = Singleton.getInstance();
        this._canvas = canvas;
        this.obj.canvas = canvas;
        this._image = image;
        this._spellbook = obj.allspells
        log(`spellScroll.ts:42 - spellbook: ${JSON.stringify(this._spellbook)}`)
        this._spelldetails = this._spellbook.get(spellname)

        
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "left";
        this._bp.vAlign = "center";
        this._bp.width = "40%";
        this._bp.height = "50%";
        this._bp.positionY = "10.2%";
        this._bp.positionX = "12.5%";
        this._bp.sourceWidth = 820; //Old Style
        this._bp.sourceHeight = 644; //Old Style
        this._bp.visible = false;

        this._lootbig = new UIImage(this._canvas, this._spelldetails.image)
        this._lootbig.hAlign = "center";
        this._lootbig.vAlign = "bottom";
        this._lootbig.width = "5%";
        this._lootbig.height = "8%";
        this._lootbig.positionY = "68%";
        this._lootbig.positionX = "-30%";
        this._lootbig.sourceWidth = 122;
        this._lootbig.sourceHeight = 120;
        this._lootbig.visible = false;

        this._title = new UIText(canvas);
        this._title.fontSize = 14;
        this._title.width = 120;
        this._title.height = 30;
        this._title.hAlign = "left";
        this._title.vAlign = "center";
        this._title.positionY = "23%";
        this._title.positionX = "23%";
        this._title.value = this._spelldetails.name;
        this._title.visible = false;

        this._desc1 = new UIText(canvas);
        this._desc1.fontSize = 12;
        this._desc1.width = 120;
        this._desc1.height = 30;
        this._desc1.hAlign = "left";
        this._desc1.vAlign = "center";
        this._desc1.positionY = "10%";
        this._desc1.positionX = "17%";
        this._desc1.value = this._spelldetails.desc;
        this._desc1.visible = false;

        this._armor = new UIText(canvas);
        this._armor.fontSize = 10;
        this._armor.width = 120;
        this._armor.height = 30;
        this._armor.hAlign = "left";
        this._armor.vAlign = "center";
        this._armor.positionY = "-17%";
        this._armor.positionX = "21%";
        this._armor.value = `Armor Test`;
        this._armor.visible = false;

        this._closebutton = new UIImage(this._canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "left";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "5%";
        this._closebutton.height = "8%";
        this._closebutton.positionX = "44%";
        this._closebutton.positionY = "24%";
        this._closebutton.sourceWidth = 168;
        this._closebutton.sourceHeight = 164;
        this._closebutton.visible = false;
        this._closebutton.onClick = new OnPointerDown(
            (e) => {
                this.hide()
            }
        )

        this._scribebutton = new UIImage(this._canvas, resources.interface.scribeButton);
        this._scribebutton.hAlign = "left";
        this._scribebutton.vAlign = "center";
        this._scribebutton.width = "5%";
        this._scribebutton.height = "5.3%";
        this._scribebutton.positionY = "-6%";
        this._scribebutton.positionX = "18%";
        this._scribebutton.sourceWidth = 1314;
        this._scribebutton.sourceHeight = 545;
        this._scribebutton.visible = false;
        this._scribebutton.onClick = new OnPointerDown(
            (e) => {
                this.scribe()
            }
        )

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

    get visible() {
        return this._bp.visible;
    }

    private scribe() {
        log('spellScroll.ts:157 - checking for requirements')
        log('spellScroll.ts:158 - Scribing the spell to spellbook')
        let element = { "image": "images/spells/painterly-spell-icons-1/protect-jade-1.png", "slot": 51, "srcw": 122, "srch": 120, "desc": "Jade Shielding", "type": null, "price": 4, "itemtype": "scribedscroll", "spellshape": "BoxShape", "spellstart": 10, "spellend": 90, "sound": null }

        // let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
        //     element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,
        //     undefined, null)
        
        let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, 
            element.type, element.price, element.itemtype, element.spellshape, element.spellstart, 
            element.spellend, element.sound)

        log(`spellScroll.ts:165 - Pushing Spell onto the playerspellbook`)
        this.obj.playerspellbook.push(item)

        //this.setSlot(element.slot)
        item.setslot = element.slot
        item.updateLoc(element.slot)
        //this._mybackpackcontents.push(item)
        item.hide()
    }

    public show() {
        this._bp.visible = true;
        this._lootbig.visible = true;
        this._desc1.visible = true;
        this._title.visible = true;
        this._scribebutton.visible = true;
        this._closebutton.visible = true;
        this._buytext.visible = true;
    }

    public hide() {
        this._bp.visible = false;
        this._lootbig.visible = false;
        this._desc1.visible = false;
        this._title.visible = false;
        this._scribebutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
    }
}
