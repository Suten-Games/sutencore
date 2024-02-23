import resources from "../resources";
import { Ispell } from "src/components/spellComponent";
import { getspell } from "src/gameObjects/spells";
import { Singleton } from "src/gameObjects/playerDetail";
import { SpellBook } from "./spellBook";
import { Item } from "src/gameObjects/item";
import { writeToCl } from "src/gameFunctions/writeToCL";

export class SpellScroll {
    private _canvas;
    private _image;
    private _bp;
    private _closebutton;
    private _scribebutton;
    private _discardbutton;
    private _buytext;
    private _lootbig:UIImage;
    private _desc1;
    private _title;
    private _armor;
    private _spell:Ispell;
    private _spellbook: SpellBook;
    private currentScroll: Item

    constructor(canvas: any, image: any) {
        let obj = Singleton.getInstance();
        this._spellbook = obj.spellbook
        this._canvas = canvas;
        this._image = image;

        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "left";
        this._bp.vAlign = "center";
        this._bp.width = "30%";
        this._bp.height = "40%";
        // this._bp.positionY = "10.2%";
        // this._bp.positionX = "12.5%";
        this._bp.positionY = "40.2%";
        this._bp.positionX = "50.5%";
        this._bp.sourceWidth = 820; //Old Style
        this._bp.sourceHeight = 644; //Old Style
        this._bp.visible = false;

        this._title = new UIText(canvas);
        this._title.fontSize = 14;
        this._title.width = 120;
        this._title.height = 30;
        this._title.hAlign = "left";
        this._title.vAlign = "center";
        this._title.positionY = "23%";
        this._title.positionX = "23%";
        //this._title.value = this._spell.name;
        this._title.visible = false;

        this._desc1 = new UIText(canvas);
        this._desc1.fontSize = 12;
        this._desc1.width = 120;
        this._desc1.height = 30;
        this._desc1.hAlign = "left";
        this._desc1.vAlign = "center";
        this._desc1.positionY = "40%";
        this._desc1.positionX = "61%";
        //this._desc1.value = this._spell.desc;
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
        this._closebutton.positionX = "74%";
        this._closebutton.positionY = "50%";
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
        this._scribebutton.positionY = "30%";
        this._scribebutton.positionX = "55%";
        // this._bp.positionY = "40.2%";
        // this._bp.positionX = "50.5%";
        this._scribebutton.sourceWidth = 1314;
        this._scribebutton.sourceHeight = 545;
        this._scribebutton.visible = false;
        this._scribebutton.onClick = new OnPointerDown(
            (e) => {
                this.scribe()
            }
        )

        this._discardbutton = new UIImage(this._canvas, resources.interface.discardButton);
        this._discardbutton.hAlign = "left";
        this._discardbutton.vAlign = "center";
        this._discardbutton.width = "5%";
        this._discardbutton.height = "5.3%";
        this._discardbutton.positionY = "30%";
        this._discardbutton.positionX = "65%";
        this._discardbutton.sourceWidth = 1314;
        this._discardbutton.sourceHeight = 545;
        this._discardbutton.visible = false;
        this._discardbutton.onClick = new OnPointerDown(
            (e) => {
                this.discard()
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

    public setSpell(spellname:string, scroll:Item) {
        //log('debug spellScroll.ts - Inside setSpell')
        this.currentScroll = scroll

        //log('debug spellname: ', spellname)
        let spell = getspell(spellname)

        if(spell) {
            this._spell = spell
            this._lootbig = new UIImage(this._canvas, spell.image)
            this._lootbig.hAlign = "center";
            this._lootbig.vAlign = "bottom";
            this._lootbig.width = "5%";
            this._lootbig.height = "8%";
            this._lootbig.positionY = "95%";
            this._lootbig.positionX = "8%";
            this._lootbig.sourceWidth = 122;
            this._lootbig.sourceHeight = 120;
            this._desc1.value = `${this._spell.desc} | ${this._spell.class}`;
            //this._lootbig.visible = false;
            this.show()
        } else {
            log('unable to find spell: ', spellname)
        }
    }

    private discard() {
        //log(`Discarding the scroll`)
        this.hide()
        this.currentScroll.removeItem()
    }

    private scribe() {
        let obj = Singleton.getInstance();
        // Assuming these are the spellbooks for different classes
        let spells = obj.sbook;
        let rogueabilities = obj.rtoolbelt;
        let warriorabilities = obj.wtome;

        // Splitting the class string into an array of classes that can use the spell
        const spellClasses = this._spell.class.split(",").map(cls => cls.trim());

        // Check if the player's class is one of the spell's classes
        let canScribeSpell = false;
        for (let i = 0; i < spellClasses.length; i++) {
            if (spellClasses[i] === obj.playerclass) {
                canScribeSpell = true;
                break;
            }
        }

        if (!canScribeSpell) {
            writeToCl(`You do not have the right class to scribe this spell.`);
            this.hide();
            return;
        }

        // Determine which spellbook to use based on player's class
        let currentSpellbook;
        switch (obj.playerclass) {
            case "Mage":
                currentSpellbook = spells;
                break;
            case "Rogue":
                currentSpellbook = rogueabilities;
                break;
            case "Warrior":
                currentSpellbook = warriorabilities;
                break;
            default:
                writeToCl(`Invalid player class.`);
                this.hide();
                return;
        }

        // Check if the spell is already scribed
        const isSpellAlreadyScribed = currentSpellbook.some(spell => spell.lootdesc() === this._spell.name);

        if (isSpellAlreadyScribed) {
            writeToCl(`This spell is already in your spellbook.`);
            this.hide();
            return;
        }

        // Scribe the spell to the appropriate book
        if (obj.playerclass === "Mage") {
            obj.spellbook.scribeSpell(this._spell.name);
        } else if (obj.playerclass === "Rogue") {
            obj.roguestoolbelt.scribeSpell(this._spell.name);
        } else if (obj.playerclass === "Warrior") {
            obj.warriorstome.scribeSpell(this._spell.name);
        }

        this.hide();
        this.currentScroll.removeItem();
    }


    public show() {
        this._bp.visible = true;
        this._lootbig.visible = true;
        this._desc1.visible = true;
        this._title.visible = true;
        this._scribebutton.visible = true;
        this._discardbutton.visible = true;
        this._closebutton.visible = true;
        this._buytext.visible = true    ;
    }

    public hide() {
        this._bp.visible = false;
        this._lootbig.visible = false;
        this._desc1.visible = false;
        this._title.visible = false;
        this._scribebutton.visible = false;
        this._discardbutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
    }
}
