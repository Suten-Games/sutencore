import resources from "../resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";
import { writeToCl } from "src/gameFunctions/writeToCL";

export class CharWindow {
    private _canvas;
    private _base;
    private _open: any;
    private _closebutton;
    private _pname;
    private _desc1;
    private _desc2;
    private _desc3;
    private _weapontext: any;
    private _strength;
    private _agility;
    private _stamina;
    private _wisdom;
    private _charisma;
    private _armor;
    private _wskill;
    private _damage;
    private _copper;
    private _silver;
    private _gold;
    private _platinum;
    private _loot: any;
    private _lootbig: any;
    private _ebutton: any;
    private _discardbutton;
    private _charbutton;
    private _equipbutton: any;
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
        this._base = new UIImage(canvas, image);
        this._base.hAlign = "left";
        this._base.vAlign = "center";
        this._base.width = "25%";
        this._base.height = "84%";
        this._base.positionY = "10.2%";
        this._base.positionX = "12.5%";
        this._base.sourceWidth = 2160;
        this._base.sourceHeight = 2910;
        this._base.visible = false;

        this._discardbutton = new UIImage(this._canvas, resources.interface.discardButton)
        this._discardbutton.hAlign = "center"
        this._discardbutton.vAlign = "bottom";
        this._discardbutton.positionY = "65%";
        this._discardbutton.positionX = "-18%";
        this._discardbutton.sourceWidth = 1314;
        this._discardbutton.sourceHeight = 545;
        this._discardbutton.visible = false;


        this._charbutton = new UIImage(this._canvas, resources.interface.equipButton)
        this._charbutton.hAlign = "center"
        this._charbutton.vAlign = "bottom";
        this._charbutton.positionY = "55%";
        this._charbutton.positionX = "-18%";
        this._charbutton.sourceWidth = 1314;
        this._charbutton.sourceHeight = 545;
        this._charbutton.visible = false;


        this._pname = new UIText(canvas);
        this._pname.fontSize = 10;
        this._pname.width = 120;
        this._pname.height = 30;
        this._pname.hAlign = "left";
        this._pname.vAlign = "center";
        this._pname.positionY = "45%";
        this._pname.positionX = "23%";
        this._pname.value = `${obj.playername}`;
        this._pname.visible = false;

        this._desc1 = new UIText(canvas);
        this._desc1.fontSize = 10;
        this._desc1.width = 120;
        this._desc1.height = 30;
        this._desc1.hAlign = "left";
        this._desc1.vAlign = "center";
        this._desc1.positionY = "40%";
        this._desc1.positionX = "23%";
        this._desc1.value = `Level ${obj.playername} ${obj.playerclass}`;
        this._desc1.visible = false;

        this._desc2 = new UIText(canvas);
        this._desc2.fontSize = 10;
        this._desc2.width = 120;
        this._desc2.height = 30;
        this._desc2.hAlign = "left";
        this._desc2.vAlign = "center";
        this._desc2.positionY = "-3%";
        this._desc2.positionX = "23%";
        this._desc2.value = "Base Stats";
        this._desc2.visible = false;

        this._strength = new UIText(canvas);
        this._strength.fontSize = 10;
        this._strength.width = 120;
        this._strength.height = 30;
        this._strength.hAlign = "left";
        this._strength.vAlign = "center";
        this._strength.positionY = "-6%";
        this._strength.positionX = "21%";
        this._strength.visible = false;

        this._agility = new UIText(canvas);
        this._agility.fontSize = 10;
        this._agility.width = 120;
        this._agility.height = 30;
        this._agility.hAlign = "left";
        this._agility.vAlign = "center";
        this._agility.positionY = "-8.2%";
        this._agility.positionX = "21%";
        this._agility.visible = false;

        this._stamina = new UIText(canvas);
        this._stamina.fontSize = 10;
        this._stamina.width = 120;
        this._stamina.height = 30;
        this._stamina.hAlign = "left";
        this._stamina.vAlign = "center";
        this._stamina.positionY = "-10.4%";
        this._stamina.positionX = "21%";
        this._stamina.visible = false;

        this._wisdom = new UIText(canvas);
        this._wisdom.fontSize = 10;
        this._wisdom.width = 120;
        this._wisdom.height = 30;
        this._wisdom.hAlign = "left";
        this._wisdom.vAlign = "center";
        this._wisdom.positionY = "-12.6%";
        this._wisdom.positionX = "21%";
        this._wisdom.visible = false;

        this._charisma = new UIText(canvas);
        this._charisma.fontSize = 10;
        this._charisma.width = 120;
        this._charisma.height = 30;
        this._charisma.hAlign = "left";
        this._charisma.vAlign = "center";
        this._charisma.positionY = "-14.8%";
        this._charisma.positionX = "21%";
        this._charisma.visible = false;

        this._armor = new UIText(canvas);
        this._armor.fontSize = 10;
        this._armor.width = 120;
        this._armor.height = 30;
        this._armor.hAlign = "left";
        this._armor.vAlign = "center";
        this._armor.positionY = "-17%";
        this._armor.positionX = "21%";
        this._armor.visible = false;

        this._desc3 = new UIText(canvas);
        this._desc3.fontSize = 10;
        this._desc3.width = 120;
        this._desc3.height = 30;
        this._desc3.hAlign = "left";
        this._desc3.vAlign = "center";
        this._desc3.positionY = "-3%";
        this._desc3.positionX = "29%";
        this._desc3.value = "Melee";
        this._desc3.visible = false;

        this._wskill = new UIText(canvas);
        this._wskill.fontSize = 8;
        this._wskill.width = 120;
        this._wskill.height = 30;
        this._wskill.hAlign = "left";
        this._wskill.vAlign = "center";
        this._wskill.positionY = "-6%";
        this._wskill.positionX = "29%";
        this._wskill.value = "Weapon Skill:";
        this._wskill.visible = false;

        this._damage = new UIText(canvas);
        this._damage.fontSize = 10;
        this._damage.width = 120;
        this._damage.height = 30;
        this._damage.hAlign = "left";
        this._damage.vAlign = "center";
        this._damage.positionY = "-8.2%";
        this._damage.positionX = "28%";
        this._damage.value = "Damage:";
        this._damage.visible = false;

        this._copper = new UIText(canvas);
        this._copper.fontSize = 10
        this._copper.width = 120;
        this._copper.height = 30;
        this._copper.hAlign = "left";
        this._copper.vAlign = "center";
        this._copper.positionY = "-10.4%";
        this._copper.positionX = "28%";
        this._copper.value = "Copper:";
        this._copper.visible = false;

        this._silver = new UIText(canvas);
        this._silver.fontSize = 10
        this._silver.width = 120;
        this._silver.height = 30;
        this._silver.hAlign = "left";
        this._silver.vAlign = "center";
        this._silver.positionY = "-12.6%";
        this._silver.positionX = "28%";
        this._silver.value = "Copper:";
        this._silver.visible = false;

        this._gold = new UIText(canvas);
        this._gold.fontSize = 10
        this._gold.width = 120;
        this._gold.height = 30;
        this._gold.hAlign = "left";
        this._gold.vAlign = "center";
        this._gold.positionY = "-14.8%";
        this._gold.positionX = "28%";
        this._gold.value = "Copper:";
        this._gold.visible = false;

        this._platinum = new UIText(canvas);
        this._platinum.fontSize = 10
        this._platinum.width = 120;
        this._platinum.height = 30;
        this._platinum.hAlign = "left";
        this._platinum.vAlign = "center";
        this._platinum.positionY = "-17%";
        this._platinum.positionX = "28%";
        this._platinum.value = "Platinum:";
        this._platinum.visible = false;

        this._weapontext = new UIText(canvas);
        this._weapontext.fontSize = 14;
        this._weapontext.width = 120;
        this._weapontext.height = 30;
        this._weapontext.hAlign = "left"
        this._weapontext.vAlign = "center"
        this._weapontext.positionY = "28%"
        this._weapontext.positionX = "28%"
        this._weapontext.value = "Rusty Dagger"
        this._weapontext.visible = false;

        this._closebutton = new UIImage(canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "left";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "5%";
        this._closebutton.height = "7%";
        this._closebutton.positionX = "32%";
        this._closebutton.positionY = "43%";
        this._closebutton.sourceWidth = 168;
        this._closebutton.sourceHeight = 164;
        this._closebutton.visible = false;
        this._closebutton.onClick = new OnPointerDown(
            (e) => {
                this._base.visible = false;
                this._open = false;
                this._closebutton.visible = false;
                this._pname.visible = false;
                this._desc1.visible = false;
                this._desc2.visible = false;
                this._desc3.visible = false;
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
                log(`246: loot and lootbig.visible = falsee`)
                this._loot.visible = false;
                this._lootbig.visible = false;
                this._weapontext.visible = false;

                if (this._charbutton?.visible != null) {
                    this._charbutton.visible = false;
                    this._discardbutton.visible = false;
                }
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Close",
            }
        );
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
                //log(`here 1`)
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
                //log(`here 2`)
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
                //log(`here 4`)
                charclass = 'Warrior';
                //charclass = obj.playerclass
                weaponstring = 'resources.loot.rustyaxe';
                if (!weapontext) { weapontext = "Rusty Axe" }
                this.setLootImages(this._canvas, resources.loot.rustyaxe, "Rusty Axe", weapontext);
                break;
            case 'Rusty Sword':
                charclass = 'Warrior';
                //charclass = obj.playerclass
                weaponstring = 'resources.loot.rustysword';
                if (!weapontext) { weapontext = "Rusty Sword" }
                this.setLootImages(this._canvas, resources.loot.rustysword, "Rusty Sword", weapontext);
                break;
            case 'Rusty Dagger':
                //log(`here 6`)
                charclass = 'Rogue';
                //charclass = 'Rogue';
                //charclass = obj.playerclass
                weaponstring = 'resources.loot.rustydagger';
                if (!weapontext) { weapontext = "Rusty Dagger" }
                this.setLootImages(this._canvas, resources.loot.rustydagger, "Rusty Dagger", weapontext);
                break;
            case 'Cracked Staff':
                charclass = 'Magician';
                //charclass = obj.playerclass
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

        this._desc1.value = `Level ${obj.level} ${obj.playerclass}`;
        this._pname.value = `${obj.playername}`;
        this._strength.value = `Strength: ${obj.strength}`;
        this._agility.value = `Agility: ${obj.agility}`;
        this._stamina.value = `Stamina: ${obj.stamina}`;
        this._wisdom.value = `Wisdom: ${obj.wisdom}`;
        this._charisma.value = `Charisma: ${obj.charisma}`;
        this._armor.value = `Armor: ${obj.armor}`;

        this._copper.value = `Copper: ${obj.copper}`
        this._silver.value = `Silver: ${obj.silver}`
        this._gold.value = `Gold: ${obj.gold}`
        this._platinum.value = `Platinum: ${obj.platinum}`

        this._loot.hAlign = "center";
        this._loot.vAlign = "bottom";
        this._loot.width = "2.5%";
        this._loot.height = "7.3%";
        this._loot.positionY = "20.2%";
        this._loot.positionX = "-21.5%";
        //log(`392: loot.visible = false`)
        this._loot.visible = false;

        this._lootbig.hAlign = "center";
        this._lootbig.vAlign = "bottom";
        this._lootbig.width = "10%";
        this._lootbig.height = "30%";
        this._lootbig.positionY = "50.2%";
        this._lootbig.positionX = "-26.5%";
        //log(`401: lootbig.visible = false`)
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
                this._desc1.visible = false;
                this._desc2.visible = false;
                this._desc3.visible = false;
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
                log(`447: loot and lootbig.visible = false`)
                this._loot.visible = false;
                this._lootbig.visible = false;
                this._weapontext.visible = false;
                this._discardbutton.visible = false;
                this._charbutton.visible = false;
                //this._weapontext.value 
                //combatlog.text = `You have discarded a ${this._weapontext.value}.`;
                writeToCl(`You have discarded a ${this._weapontext.value}.`)
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Close",
            }
        );

        this._charbutton.onClick = new OnPointerDown(
            (e) => {
                this.equipsound.play()
                obj.player.changeClass(charclass, weaponstring)
                actionbar.resetSlot(slot)
                backpack.resetSlot(slot)
                lootimage.hide()
                this._charbutton.visible = false;
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
        //log('charWindow.ts:348 - in the charWindow flip')
        //let obj = Singleton.getInstance();
        this._base.visible = !this._base.visible;
        this._open = !this._open;
        this._closebutton.visible = !this._closebutton.visible;
        this._pname.visible = !this._pname.visible;
        this._desc1.visible = !this._desc1.visible;
        this._desc2.visible = !this._desc2.visible;
        this._desc3.visible = !this._desc3.visible;
        this._strength.visible = !this._strength.visible;
        this._agility.visible = !this._agility.visible;
        this._stamina.visible = !this._stamina.visible;
        this._wisdom.visible = !this._wisdom.visible;
        this._charisma.visible = !this._charisma.visible;
        this._armor.visible = !this._armor.visible;
        this._wskill.visible = !this._wskill.visible;
        this._damage.visible = !this._damage.visible;
        this._copper.visible = !this._copper.visible;
        this._silver.visible = !this._silver.visible;
        this._gold.visible = !this._gold.visible;
        this._platinum.visible = !this._platinum.visible;
        this._loot.visible = !this._loot.visible;
        this._lootbig.visible = !this._lootbig.visible;
        this._weapontext.visible = !this._weapontext.visible;

        this._charbutton.visible = !this._charbutton.visible;
        this._discardbutton.visible = !this._discardbutton.visible;

    }
}