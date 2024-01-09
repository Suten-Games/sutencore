import resources from "../resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Item } from "../gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";

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
    private _loot: any;
    private _lootbig: any;
    private _ebutton: any;
    private _discardbutton;
    private _charbutton;
    private _equipbutton: any;

    private equipsound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.sheathsword,
        false
    );

    constructor(canvas: any, image: any, charclass: any) {
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
                this._loot.visible = false;
                this._lootbig.visible = false;
                this._weapontext.visible = false;

                if (this._charbutton?.visible != null) {
                    this._charbutton.visible = false;
                    this._discardbutton.visible = false;
                }

                // if (this._ebutton?.visible != null) {
                //   this._ebutton.visible = false;
                // }
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

    public setCharLoot(weapon: Texture = resources.loot.rustyaxe, weapontext = null, combatlog: CombatLog, actionbar: ActionBar, backpack: BackPack, lootimage: Item, slot: number) {
        //set rustyaxe as the default loot texture for now.


        //log('charWindow.ts:260 - in setCharLoot ', lootimage)


        if (!this._open) {
            //log('setting charloot')
            let obj = Singleton.getInstance();
            let charclass: any;
            let weaponstring: any;
            let charwindowimage

            if (obj.weapon == 'resources.loot.rustyaxe') {

                this._loot = new UIImage(this._canvas, resources.loot.rustyaxe);
                if (!weapon) {
                    this._lootbig = new UIImage(this._canvas, resources.loot.rustyaxe);
                    this._weapontext.value = "Rusty Axe";
                } else {
                    this._lootbig = new UIImage(this._canvas, weapon);
                    this._weapontext.value = weapontext
                }

            } else if (obj.weapon == 'resources.loot.rustysword') {

                this._loot = new UIImage(this._canvas, resources.loot.rustysword);
                if (!weapon) {
                    this._lootbig = new UIImage(this._canvas, resources.loot.rustysword);
                    this._weapontext.value = "Rusty Sword";
                } else {
                    this._lootbig = new UIImage(this._canvas, weapon);
                    this._weapontext.value = weapontext
                }

            } else if (obj.weapon == 'resources.loot.rustydagger') {

                this._loot = new UIImage(this._canvas, resources.loot.rustydagger);
                if (!weapon) {
                    this._lootbig = new UIImage(this._canvas, resources.loot.rustydagger);
                    this._weapontext.value = "Rusty Dagger";
                } else {
                    this._lootbig = new UIImage(this._canvas, weapon);
                    this._weapontext.value = weapontext
                }

            }

            if (weapon) {
                if (weapon == resources.loot.rustyaxe) {
                    charclass = 'Berzerker'
                    weaponstring = 'resources.loot.rustyaxe'
                    charwindowimage = resources.interface.rogueScreen
                } else if (weapon == resources.loot.rustysword) {
                    charclass = 'Warrior';
                    weaponstring = 'resources.loot.rustysword';
                    charwindowimage = resources.interface.warriorScreen
                } else if (weapon == resources.loot.rustydagger) {
                    charclass = 'Rogue';
                    weaponstring = 'resources.loot.rustydagger';
                    charwindowimage = resources.interface.rogueScreen;
                } else if (weapon == resources.loot.crackedstaff) {
                    charclass = 'Magician';
                    weaponstring = 'resources.loot.crackedstaff';
                    charwindowimage = resources.interface.mageScreen;
                }

                //log(':320 - setting up the ebutton parameters');

                this._discardbutton.onClick = new OnPointerDown(
                    (e) => {
                        log('discard button has been clicked')
                        this.equipsound.play()
                        //obj.player.changeClass(charclass, weaponstring)
                        log(`calling the actionbar resetSlot method with slot ${slot}`)
                        actionbar.resetSlot(slot)
                        log(`calling the backpack resetSlot method with slot ${slot}`)
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
                        this._loot.visible = false;
                        this._lootbig.visible = false;
                        this._weapontext.visible = false;
                        this._discardbutton.visible = false;
                        this._charbutton.visible = false;
                        //this._weapontext.value 
                        combatlog.text = `You have discarded a ${this._weapontext.value}.`;
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
                        //log(`calling actionbar.resetSlot(${slot})`)
                        actionbar.resetSlot(slot)
                        //log(`calling backback.resetSlot(${slot})`)
                        backpack.resetSlot(slot)
                        lootimage.hide()
                        this._charbutton.visible = false;
                        combatlog.text = `You have equipped a ${charclass}'s weapon.`;
                        combatlog.text = `Your class has changed to ${charclass}.`;
                    },
                    {
                        button: ActionButton.PRIMARY,
                        hoverText: "Close",
                    }
                );
            }

        }


    }

    public flip() {
        //log('charWindow.ts:348 - in the charWindow flip')
        let obj = Singleton.getInstance();

        if (!this._loot) {
            if (obj.weapon == 'resources.loot.rustyaxe') {

                this._loot = new UIImage(this._canvas, resources.loot.rustyaxe);
                this._lootbig = new UIImage(this._canvas, resources.loot.rustyaxe);
                this._weapontext.value = "Rusty Axe";

            } else if (obj.weapon == 'resources.loot.rustysword') {

                this._loot = new UIImage(this._canvas, resources.loot.rustysword);
                this._lootbig = new UIImage(this._canvas, resources.loot.rustysword);
                this._weapontext.value = "Rusty Sword";

            } else if (obj.weapon == 'resources.loot.rustydagger') {

                this._loot = new UIImage(this._canvas, resources.loot.rustydagger);
                this._lootbig = new UIImage(this._canvas, resources.loot.rustydagger);
                this._weapontext.value = "Rusty Dagger";

            } else {

                this._loot = new UIImage(this._canvas, resources.loot.rustydagger);
                this._lootbig = new UIImage(this._canvas, resources.loot.rustydagger);
                this._weapontext.value = "Rusty Dagger";

            }
        }


        this._loot.hAlign = "center";
        this._loot.vAlign = "bottom";
        this._loot.width = "2.5%";
        this._loot.height = "7.3%";
        this._loot.positionY = "20.2%";
        this._loot.positionX = "-21.5%";
        this._loot.sourceWidth = 1219;
        this._loot.sourceHeight = 2154;

        this._lootbig.hAlign = "center";
        this._lootbig.vAlign = "bottom";
        this._lootbig.width = "10%";
        this._lootbig.height = "30%";
        this._lootbig.positionY = "50.2%";
        this._lootbig.positionX = "-26.5%";
        this._lootbig.sourceWidth = 1219;
        this._lootbig.sourceHeight = 2154;

        this._desc1.value = `Level ${obj.level} ${obj.playerclass}`;
        this._pname.value = `${obj.playername}`;
        this._strength.value = `Strength: ${obj.strength}`;
        this._agility.value = `Agility: ${obj.agility}`;
        this._stamina.value = `Stamina: ${obj.stamina}`;
        this._wisdom.value = `Wisdom: ${obj.wisdom}`;
        this._charisma.value = `Charisma: ${obj.charisma}`;
        this._armor.value = `Armor: ${obj.armor}`;

        if (this._open) {
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

            if (this._loot?.visible != null) {
                //log('setting loot.visible to false')
                this._loot.visible = false;
            }

            if (this._lootbig?.visible != null) {
                //log('setting lootbig.visible to false')
                this._lootbig.visible = false;
            }

            if (this._weapontext?.visible != null) {
                //log('setting weapontext visible to false')
                this._weapontext.visible = false;
            }

            // if (this._ebutton?.visible != null) {
            //   log('setting ebutton.visible to false')
            //   this._ebutton.visible = false;
            // }

            if (this._discardbutton?.visible != null) {
                this._discardbutton.visible = false;
            }

            if (this._charbutton?.visible != null) {
                this._charbutton.visible = false;
            }


        } else {
            // log('in the charWindow flip else')
            //log('setting ebutton.visible to false')
            //this._ebutton.visible = false;


            this._base.visible = true;
            this._open = true;
            this._closebutton.visible = true;
            this._pname.visible = true;
            this._desc1.visible = true;
            this._desc2.visible = true;
            this._desc3.visible = true;
            this._strength.visible = true;
            this._agility.visible = true;
            this._stamina.visible = true;
            this._wisdom.visible = true;
            this._charisma.visible = true;
            this._armor.visible = true;
            this._wskill.visible = true;
            this._damage.visible = true;
            this._loot.visible = true;
            this._lootbig.visible = true;
            this._weapontext.visible = true;

            this._charbutton.visible = true;
            this._discardbutton.visible = true;
        }
    }
}