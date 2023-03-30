import { Item } from "src/gameObjects/item";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";
import resources from "../resources";
import { CharWindow } from "./charWindow";
import { SpellBook } from "./spellBook";


export class BackPack {
    private _canvas;
    private _image;
    private _bp;
    private _charbutton;
    private _spellbutton;
    private _isOpen: boolean;
    private _slot10: any;
    private _slot11: any;
    private _slot12: any;
    private _slot13: any;
    private _slot14: any;
    private _slot15: any;
    private _slot16: any;
    private _slot17: any;
    private _slot18: any;
    private _slot19: any;
    private _slot20: any;
    private _slot21: any;
    private _slot22: any;
    private _slot23: any;
    private _slot24: any;
    private _slot25: any;
    private _mybackpackcontents: any;
    private _playerclass: any;
    private _charwindow: any;
    private _spellbookwindow: any;

    private backpacksound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.backpack,
        false
    );

    constructor(canvas: UICanvas, image: Texture) {
        let obj = Singleton.getInstance()
        this._canvas = canvas;
        this._image = image;
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "right"
        this._bp.vAlign = "center";
        this._bp.width = "20%";
        this._bp.height = "60%";
        this._bp.sourceWidth = 665;
        this._bp.sourceHeight = 951;
        this._bp.visible = false;
        this._mybackpackcontents = obj.showbackpack()
        //   this._isOpen = false;
        this._spellbookwindow = new SpellBook(this._canvas, resources.interface.spellBook)
        this._charbutton = new UIImage(this._canvas, resources.interface.characterButton)
        this._charbutton.hAlign = "right"
        this._charbutton.vAlign = "center";
        this._charbutton.positionY = "-42%";
        this._charbutton.positionX = "-21%";
        this._charbutton.height = '120px';
        this._charbutton.sourceWidth = 2094;
        this._charbutton.sourceHeight = 3000;
        this._charbutton.visible = false;
        this._charbutton.onClick = new OnPointerDown(
            (e) => {
                this._charwindow.flip()
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Open Character Window",
            }
        );

        this._spellbutton = new UIImage(this._canvas, resources.interface.spellBook)
        this._spellbutton.hAlign = "right"
        this._spellbutton.vAlign = "center";
        this._spellbutton.positionY = "-45%";
        this._spellbutton.positionX = "-13%";
        this._spellbutton.sourceWidth = 2032
        this._spellbutton.sourceHeight = 1324
        this._spellbutton.visible = false;
        this._spellbutton.onClick = new OnPointerDown(
            (e) => {
                //this._charwindow.flip()
                log('backPack.ts:88 - open spellbook')
                this._spellbookwindow.show()
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Open Spell Book",
            }
        );
        this.bpopen = false;
    }


    public resetCharWindow() {
        //log('debug - resetting char window')
        let obj = Singleton.getInstance()
        if (obj.playerclass == 'Rogue') {
            this._charwindow = new CharWindow(this._canvas, resources.interface.rogueScreen, 'Rogue')
        } else if (obj.playerclass == 'Warrior') {
            this._charwindow = new CharWindow(this._canvas, resources.interface.warriorScreen, 'Warrior')
        } else if (obj.playerclass == 'Berzerker') {
            this._charwindow = new CharWindow(this._canvas, resources.interface.berzerkerScreen, 'Berzerker')
        } else if (obj.playerclass == 'Magician') {
            this._charwindow = new CharWindow(this._canvas, resources.interface.mageScreen, "Magician")
        } else {
            this._charwindow = new CharWindow(this._canvas, resources.interface.characterScreen, 'Adventurer')
        }
        this._charwindow.setCharLoot()
    }

    public selectSlot(item: Item): number {
        if (!this._slot10) {
            this._slot10 = 'filled'
            item.updateLoc(10)
            this._mybackpackcontents.push(item)
            return 10
        } else if (!this._slot11) {
            this._slot11 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(11)
            return 11
        } else if (!this._slot12) {
            this._slot12 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(12)
            return 12
        } else if (!this._slot13) {
            this._slot13 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(13)
            return 13
        } else if (!this._slot14) {
            this._slot14 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(14)
            return 14
        } else if (!this._slot15) {
            this._slot15 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(15)
            return 15
        } else if (!this._slot16) {
            this._slot16 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(16)
            return 16
        } else if (!this._slot17) {
            this._slot17 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(17)
            return 17
        } else if (!this._slot18) {
            this._slot18 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(18)
            return 18
        } else if (!this._slot19) {
            this._slot19 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(19)
            return 19
        } else if (!this._slot20) {
            this._slot20 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(20)
            return 20
        } else if (!this._slot21) {
            this._slot21 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(21)
            return 21
        } else if (!this._slot22) {
            this._slot22 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(22)
            return 22
        } else if (!this._slot23) {
            this._slot23 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(23)
            return 23
        } else if (!this._slot24) {
            this._slot24 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(24)
            return 24
        } else if (!this._slot25) {
            this._slot25 = 'filled'
            this._mybackpackcontents.push(item)
            item.updateLoc(25)
            return 25
        } else {
            return 50
        }
    }

    private getcontents() {
        this._mybackpackcontents.forEach((potion: { show: () => void; }) => {
            potion.show()
        })
    }

    get visible() {
        return this._bp.visible
    }

    set bpopen(val) {
        this._isOpen = val
    }

    get bpopen() {
        return this._isOpen
    }

    set playerclass(val) {
        this._playerclass = val
    }

    get playerclass() {
        return this._playerclass
    }

    public showCharWindow(weapon: any, weapontext: any, combatlog: any, actionbar: any, backpack: any, lootimage: any, slot: any) {
        //log('calling charwindow.setcharloot from the backback showcharwindow function')
        this._charwindow.setCharLoot(weapon, weapontext, combatlog, actionbar, backpack, lootimage, slot)
        //log('calling charwindow.flip from the backpack showcharwindow function')
        this._charwindow.flip()
    }

    public bootLoadBackPack(data: any[]) {
        //log(`debug: 12 Inside bootLoadBackPack`)

        data.forEach(element => {
            if (element.slot) {
                log('actionBar:90 element ', JSON.stringify(element))
                let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                    element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,
                )
                // let potion = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                //     element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,
                //     element.lootwindow, element.npc)

                this.setSlot(element.slot)
                item.setslot = element.slot
                item.updateLoc(element.slot)
                this._mybackpackcontents.push(item)
                item.hide()
            }
        });
    }

    private setSlot(slot: number) {
        if (slot == 10) {
            this._slot10 = 'filled';
        } else if (slot == 11) {
            this._slot11 = 'filled';
        } else if (slot == 12) {
            this._slot12 = 'filled';
        } else if (slot == 13) {
            this._slot13 = 'filled'
        } else if (slot == 14) {
            this._slot14 = 'filled'
        } else if (slot == 15) {
            this._slot15 = 'filled'
        } else if (slot == 16) {
            this._slot16 = 'filled'
        } else if (slot == 17) {
            this._slot17 = 'filled'
        } else if (slot == 18) {
            this._slot18 = 'filled'
        } else if (slot == 19) {
            this._slot19 = 'filled'
        } else if (slot == 20) {
            this._slot20 = 'filled'
        } else if (slot == 21) {
            this._slot21 = 'filled'
        } else if (slot == 22) {
            this._slot22 = 'filled'
        } else if (slot == 23) {
            this._slot23 = 'filled'
        } else if (slot == 24) {
            this._slot24 = 'filled'
        } else if (slot == 25) {
            this._slot25 = 'filled'
        }
    }

    public resetSlot(slot: number) {
        if (slot == 10) {
            this._slot10 = null;
        } else if (slot == 11) {
            this._slot11 = null;
        } else if (slot == 12) {
            this._slot12 = null;
        } else if (slot == 13) {
            this._slot13 = null
        } else if (slot == 14) {
            this._slot14 = null
        } else if (slot == 15) {
            this._slot15 = null
        } else if (slot == 16) {
            this._slot16 = null
        } else if (slot == 17) {
            this._slot17 = null
        } else if (slot == 18) {
            this._slot18 = null
        } else if (slot == 19) {
            this._slot19 = null
        } else if (slot == 20) {
            this._slot20 = null
        } else if (slot == 21) {
            this._slot21 = null
        } else if (slot == 22) {
            this._slot22 = null
        } else if (slot == 23) {
            this._slot23 = null
        } else if (slot == 24) {
            this._slot24 = null
        } else if (slot == 25) {
            this._slot25 = null
        }
        let i = this._mybackpackcontents.map((x: { slot: () => any; }) => x.slot()).indexOf(slot)
        this._mybackpackcontents.splice(i, 1)
    }

    public show() {
        let obj = Singleton.getInstance()
        this._bp.visible = true;
        this._charbutton.visible = true;
        if (obj.playerclass == "Magician") {
            this._spellbutton.visible = true;
        }
        this.getcontents()
        this.backpacksound.play()
        this.bpopen = true

    }

    public hide() {
        this.bpopen = false
        this._bp.visible = false;
        this._charbutton.visible = false;
        this._spellbutton.visible = false;
        this._mybackpackcontents.forEach((item: { hide: () => void; }) => {
            item.hide()
        })
    }
}