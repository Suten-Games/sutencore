import resources from "../resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";
import { writeToCl } from "src/gameFunctions/writeToCL";

export class CharWindow {
    private _canvas;
    private _base: any;
    private _open: any;
    private _closebutton: any;
    private _pname: any;
    private _levelandclass: any;
    private _basestats: any;
    private _wallet: any;
    private _weapontext: any;
    private _strength: any;
    private _agility: any;
    private _stamina: any;
    private _wisdom: any;
    private _charisma: any;
    private _copper: any;
    private _silver: any;
    private _gold: any;
    private _platinum: any;
    private _armor: any;
    private _wskill: any;
    private _damage: any;
    private _loot: any;
    private _lootbig: any;
    private _headslot: any;
    private _torsoslot: any;
    private _bootslot: any;
    private _gloveslot: any;
    private _ringslot: any;
    private _trinketslot: any;
    private _discardbutton;
    private _equipButton;
    private _actionbar: any
    private _slot: any
    private _backpack: any
    private _lootimage: any
    private _weapon: any

    private equipsound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.sheathsword,
        false
    );

    constructor(canvas: any, image: any, charclass: any) {
        //log(`In the CharWindow Constructor`)

        var obj = Singleton.getInstance();

        this._canvas = canvas;
        this.initBase(image);
        this.initTextElements();
        this.initButtons();

        this._discardbutton = new UIImage(this._canvas, resources.interface.discardButton)
        this._discardbutton.hAlign = "center"
        this._discardbutton.vAlign = "bottom";
        this._discardbutton.positionY = "65%";
        this._discardbutton.positionX = "-18%";
        this._discardbutton.sourceWidth = 1314;
        this._discardbutton.sourceHeight = 545;
        this._discardbutton.visible = false;

        this._equipButton = new UIImage(this._canvas, resources.interface.equipButton)
        this._equipButton.hAlign = "center"
        this._equipButton.vAlign = "bottom";
        this._equipButton.positionY = "55%";
        this._equipButton.positionX = "-18%";
        this._equipButton.sourceWidth = 1314;
        this._equipButton.sourceHeight = 545;
        this._equipButton.visible = false;
    }

    public show() {
        this._base.visible = true;
    }

    public hide() {
        this._base.visible = false;
    }

    public setCharLoot(weapon: any, weapontext: string, actionbar: ActionBar, backpack: BackPack, lootimage: Item, slot: number) {
        //public setCharLoot(weapon: Texture, weapontext: string, actionbar: ActionBar, backpack: BackPack, lootimage: Item, slot: number) {
        //log(`in setCharLoot of charWindow`);
        let obj = Singleton.getInstance();

        let weaponToUse
        if (weapon) {
            weaponToUse = weapontext
        } else if (this._weapon) {
            weaponToUse = obj.weapon
        } else {
            weaponToUse = obj.weapon
            this._weapon = obj.weapon
        }

        if (actionbar) {
            this._actionbar = actionbar
        }

        if (backpack) {
            this._backpack = backpack
        }

        if (slot) {
            this._slot = slot
        }

        if (lootimage) {
            this._lootimage = lootimage
        }

        //log(`weaponToUse: ${weaponToUse}`)

        // Initialize variables for class and UI changes
        let charclass: string;
        let weaponstring: string;
        let charwindowimage;

        // Determine the loot image and texts based on the weapon
        switch (weaponToUse) {
            case 'resources.loot.rustyaxe':
                charclass = 'Warrior';
                weaponstring = 'resources.loot.rustyaxe';
                charwindowimage = resources.interface.warriorScreen;
                if (!weapontext) { weapontext = "Rusty Axe" }
                this.setLootImages(this._canvas, resources.loot.rustyaxe, "Rusty Axe", weapontext);
                break;
            case 'resources.loot.rustysword':
                charclass = 'Warrior';
                weaponstring = 'resources.loot.rustysword';
                charwindowimage = resources.interface.warriorScreen;
                if (!weapontext) { weapontext = "Rusty Sword" }
                this.setLootImages(this._canvas, resources.loot.rustysword, "Rusty Sword", weapontext);
                break;
            case 'resources.loot.rustydagger':
                charclass = 'Rogue';
                weaponstring = 'resources.loot.rustydagger';
                charwindowimage = resources.interface.rogueScreen;
                if (!weapontext) { weapontext = "Rusty Dagger" }
                this.setLootImages(this._canvas, resources.loot.rustydagger, "Rusty Dagger", weapontext);
                break;
            case 'resources.loot.crackedstaff':
                charclass = 'Magician';
                weaponstring = 'resources.loot.crackedstaff';
                charwindowimage = resources.interface.mageScreen;
                if (!weapontext) { weapontext = "Cracked Staff" }
                this.setLootImages(this._canvas, resources.loot.crackedstaff, "Cracked Staff", weapontext);
                break;
            case 'Rusty Axe':
                charclass = 'Warrior';
                weaponstring = 'resources.loot.rustyaxe';
                if (!weapontext) { weapontext = "Rusty Axe" }
                this.setLootImages(this._canvas, resources.loot.rustyaxe, "Rusty Axe", weapontext);
                break;
            case 'Rusty Sword':
                charclass = 'Warrior';
                weaponstring = 'resources.loot.rustysword';
                if (!weapontext) { weapontext = "Rusty Sword" }
                this.setLootImages(this._canvas, resources.loot.rustysword, "Rusty Sword", weapontext);
                break;
            case 'Rusty Dagger':
                charclass = 'Rogue';
                weaponstring = 'resources.loot.rustydagger';
                if (!weapontext) { weapontext = "Rusty Dagger" }
                this.setLootImages(this._canvas, resources.loot.rustydagger, "Rusty Dagger", weapontext);
                break;
            case 'Cracked Staff':
                charclass = 'Magician';
                weaponstring = 'resources.loot.crackedstaff';
                if (!weapontext) { weapontext = "Cracked Staff" }
                this.setLootImages(this._canvas, resources.loot.crackedstaff, "Cracked Staff", weapontext);
                break;
            default:
                //log('No valid weapon specified or found in Singleton');
                return; // Exit the function if no valid weapon is found
        }

        // Set up button interactions and other actions
        this.setupInteractions(charclass, weaponstring, slot, actionbar, backpack, lootimage);
    }

    private setLootImages(canvas: any, weapontexture: Texture, defaultText: string, weapontext: string) {
        let obj = Singleton.getInstance();
        this._loot = new UIImage(canvas, weapontexture);
        this._lootbig = new UIImage(canvas, weapontexture);
        this._weapontext.value = weapontext || defaultText;
        this._pname.value = `${obj.playername}`;
        this._loot.hAlign = "center";
        this._loot.vAlign = "bottom";
        this._loot.width = "2.5%";
        this._loot.height = "7.3%";
        this._loot.positionY = "20.2%";
        this._loot.positionX = "-21.5%";
        this._loot.visible = false;
        this._lootbig.hAlign = "center";
        this._lootbig.vAlign = "bottom";
        this._lootbig.width = "10%";
        this._lootbig.height = "30%";
        this._lootbig.positionY = "50.2%";
        this._lootbig.positionX = "-26.5%";
        this._lootbig.visible = false;

        if (defaultText == 'Cracked Staff') {
            this._lootbig.sourceWidth = 122;
            this._lootbig.sourceHeight = 120;
            this._loot.sourceWidth = 122;
            this._loot.sourceHeight = 120;
        } else {
            this._loot.sourceWidth = 1219;
            this._loot.sourceHeight = 2154;
            this._lootbig.sourceWidth = 1219;
            this._lootbig.sourceHeight = 2154;
        }

    }

    private setupInteractions(charclass: string, weaponstring: string, slot: number, actionbar: ActionBar, backpack: BackPack, lootimage: Item) {
        let obj = Singleton.getInstance();
        this._discardbutton.onClick = new OnPointerDown(
            (e) => {
                //log('discard button has been clicked')
                this.equipsound.play()
                //obj.player.changeClass(charclass, weaponstring)
                //log(`calling the actionbar resetSlot method with slot ${slot}`)
                actionbar.resetSlot(slot)
                //log(`calling the backpack resetSlot method with slot ${slot}`)
                backpack.resetSlot(slot)
                lootimage.hide()
                this._base.visible = false;
                this._open = false;
                this._closebutton.visible = false;
                this._pname.visible = false;
                this._levelandclass.visible = false;
                this._basestats.visible = false;
                this._wallet.visible = false;
                this._strength.visible = false;
                this._agility.visible = false;
                this._stamina.visible = false;
                this._wisdom.visible = false;
                this._charisma.visible = false;
                this._armor.visible = false;
                this._wskill.visible = false;
                this._damage.visible = false;
                this._copper.visible = false;
                this._silver.visible = false;
                this._gold.visible = false;
                this._platinum.visible = false;
                this._loot.visible = false;
                this._lootbig.visible = false;
                this._weapontext.visible = false;
                this._discardbutton.visible = false;
                this._equipButton.visible = false;
                //this._weapontext.value 
                //combatlog.text = `You have discarded a ${this._weapontext.value}.`;
                writeToCl(`You have discarded a ${this._weapontext.value}.`)
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Close",
            }
        );

        this._equipButton.onClick = new OnPointerDown(
            (e) => {
                this.equipsound.play()
                obj.player.changeClass(charclass, weaponstring)
                actionbar.resetSlot(slot)
                backpack.resetSlot(slot)
                lootimage.hide()
                this._equipButton.visible = false;
                writeToCl(`You have equipped a ${charclass}'s weapon.`)
                writeToCl(`Your class has changed to ${charclass}.`)
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Close",
            }
        );
    }


    public flip() {
        const isVisible = !this._base.visible;
        this.toggleVisibility(isVisible);
    }

    private initBase(image: any) {
        this._base = this.createUIImage({ source: image, hAlign: "left", vAlign: "center", width: "25%", height: "84%", positionY: "10.2%", positionX: "12.5%", sourceWidth: 2160, sourceHeight: 2910 });
    }

    private initTextElements() {
        let obj = Singleton.getInstance()
        this._pname = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "45%", positionX: "23%", value: `${obj.playername}` });
        this._wallet = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-3%", positionX: "29%", value: "Wallet" })
        this._basestats = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-3%", positionX: "23%", value: "Base Stats" })
        this._levelandclass = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "40%", positionX: "23%", value: `Level ${obj.level} ${obj.playerclass}` });

        this._strength = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-6%", positionX: "21%", value: `Strength: ${obj.strength}` })
        this._agility = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-8.2%", positionX: "21%", value: `Agility: ${obj.agility}` })
        this._stamina = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-10.4%", positionX: "21%", value: `Stamina: ${obj.stamina}` })
        this._wisdom = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-12.6%", positionX: "21%", value: `Wisdom: ${obj.wisdom}` })
        this._charisma = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-14.8%", positionX: "21%", value: `Charisma: ${obj.charisma}` })

        this._copper = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-10.4%", positionX: "28%", value: `Copper: ${obj.copper}` })
        this._silver = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-12.6%", positionX: "28%", value: `Silver: ${obj.silver}` })
        this._gold = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-14.8%", positionX: "28%", value: `Gold: ${obj.gold}` })
        this._platinum = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-17%", positionX: "28%", value: `Platinum: ${obj.platinum}` })

        this._armor = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-17%", positionX: "21%", value: `Armor: ${obj.armor}` })
        this._wskill = this.createUIText({ fontSize: 8, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-6%", positionX: "29%", value: "Weapon Skill" })
        this._damage = this.createUIText({ fontSize: 10, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "-8.2%", positionX: "28%", value: "Damage" })
        this._weapontext = this.createUIText({ fontSize: 14, width: 120, height: 30, hAlign: "left", vAlign: "center", positionY: "28%", positionX: "28%", value: "Rusty Dagger" })
    }

    private initButtons() {
        this._closebutton = this.createUIImage({ source: resources.interface.closebutton, hAlign: "left", vAlign: "center", width: "5%", height: "7%", positionX: "32%", positionY: "43%", sourceWidth: 168, sourceHeight: 164 });
        this._closebutton.onClick = new OnPointerDown(() => this.toggleVisibility(false));
    }

    private toggleVisibility(visible: boolean) {
        log(`toggling visibility to : ${visible}`)
        const elements = [this._base, this._closebutton, this._pname, this._wallet, this._basestats, this._levelandclass, this._strength, this._agility, this._stamina, this._wisdom, this._charisma, this._copper, this._silver, this._gold, this._platinum, this._armor, this._wskill, this._damage];
        elements.forEach(el => el.visible = visible);
        //this._equipButton, this._discardbutton, this._open, this._closebutton,this._headslot, this._ringslot, this._trinketslot, this._torsoslot, this._gloveslot, this._bootslot,
    }

    private createUIText(options: any): UIText {
        const text = new UIText(this._canvas);
        text.fontSize = options.fontSize;
        text.width = options.width;
        text.height = options.height;
        text.hAlign = options.hAlign;
        text.vAlign = options.vAlign;
        text.positionY = options.positionY;
        text.positionX = options.positionX;
        text.value = options.value;
        text.visible = false; // Default visibility
        return text;
    }

    private createUIImage(options: any): UIImage {
        const image = new UIImage(this._canvas, options.source);
        image.hAlign = options.hAlign;
        image.vAlign = options.vAlign;
        image.width = options.width;
        image.height = options.height;
        image.positionY = options.positionY;
        image.positionX = options.positionX;
        if (options.sourceWidth && options.sourceHeight) {
            image.sourceWidth = options.sourceWidth;
            image.sourceHeight = options.sourceHeight;
        }
        image.visible = false; // Default visibility
        return image;
    }
}

