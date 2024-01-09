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
    //private _slots: (string | null)[] = new Array(16).map(() => null);
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
                //log('backPack.ts:88 - open spellbook')
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
        let obj = Singleton.getInstance()
        const index = obj.backpackslots.indexOf(null);
        if (index !== -1) {
            const slot = index + 10;
            obj.backpackslots[index] = 'filled';
            item.updateLoc(slot);
            this._mybackpackcontents.push(item);
            //log(`actionBar.ts:selectSlot(): all of the backpack slots: ${obj.backpackslots}`)
            return slot;
        } 
        //log(`actionBar.ts:selectSlot(): all of the backpack slots: ${obj.backpackslots}`)
        return 50;
    }

    public checkSlot(): number {
        //log('backPack.ts: in the checkSlot method');
        //const obj = Singleton.getInstance();
        let obj = Singleton.getInstance();
        //let found = 0
        for (let i = 10; i < 26; i++) {
            if (obj.backpackslots[i] !== 'filled') {
                //log(`actionBar.ts: checkSlot() all of the backpack slots: ${obj.backpackslots}`)
                return i;
            }
        }
        //log(`in the checkSlot method returning found: ${found}`)
        return 50
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
        //log(`debug: 237 Inside bootLoadBackPack`)
        //log(`bootLoadBackPack data: ${JSON.stringify(data)}`)

        data.forEach(element => {
            //log(`debug: 240 In bootloadforeach - element: ${element}`)
            if (element.slot) {
                //log('debug: actionBar:242 element ', JSON.stringify(element))
                let item = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
                    element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound,null,null, null, null
                )

                this.setSlot(element.slot)
                item.setslot = element.slot
                item.updateLoc(element.slot)
                this._mybackpackcontents.push(item)
                item.hide()
            } else {
                log(`debug:253 - In Else`)
            }
        });

        //log(`debug: 255 - After the data.forEach()`)
    }

    public setSlot(slot: number) {
        //log(`STEP 5 - Setting the Backpack slot`)
        //log(`now in backPack.ts - setSlot() setting ${slot} to filled`)
        //log(`in setSlot, slot is: ${slot} will subtract 1 for some reason and make that filled`)
        const obj = Singleton.getInstance();
        //this._slots[slot] = 'filled';
        obj.backpackslots[slot] = 'filled';

        //log(`backPack.ts: setSlot() - this slot ${slot} is now: ${obj.backpackslots[slot]}`)
        //log(`backPack.ts: setSlot() - all of the backpack slots (this._slot): ${obj.backpackslots}`)
    }

    public resetSlot(slot: number) {
        if(slot < 10) { return }
        //log(`in the backPack.ts resetSlot method with slot ${slot}`)
        const obj = Singleton.getInstance();
        obj.backpackslots[slot] = null;
        let i = this._mybackpackcontents.map((x: { slot: () => any; }) => x.slot()).indexOf(slot)
        if (i !== -1) {
            this._mybackpackcontents.splice(i, 1)
        }
        //log(`this slot ${slot} is now: ${obj.backpackslots[slot]}`)
        //log(`all of the backpack slots: ${obj.backpackslots}`)
        //let i = this._mybackpackcontents.map((x: { slot: () => any; }) => x.slot()).indexOf(slot)
        //this._mybackpackcontents.splice(i, 1)
    }

    public show() {
        let obj = Singleton.getInstance()
        this._bp.visible = true;
        this._charbutton.visible = true;
        //if (obj.playerclass == "Magician") {
        this._spellbutton.visible = true;
        //}
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