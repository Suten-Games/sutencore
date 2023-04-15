import { Singleton } from "src/gameObjects/playerDetail";
import resources from "src/resources";
import { CharWindow } from "./charWindow";

export class CharWindowHandler {
    private _canvas:UICanvas
    private _charbutton;
    private _charwindow: any;

    constructor(canvas: UICanvas, image:Texture){
        this._canvas = canvas;
        this._charbutton = new UIImage(canvas, image )
        this._charbutton.hAlign = "right"
        this._charbutton.vAlign = "center";
        this._charbutton.positionY = "-42%";
        this._charbutton.positionX = "-21%";
        this._charbutton.height = '120px';
        this._charbutton.sourceWidth = 2094;
        this._charbutton.sourceHeight = 3000;
        this.resetCharWindow()
        //this._charbutton.visible = false;
        this._charbutton.onClick = new OnPointerDown(
            (e) => {
                this._charwindow.flip()
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Open Character Window",
            }
        );

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

    public showCharWindow(weapon: any, weapontext: any, combatlog: any, actionbar: any, backpack: any, lootimage: any, slot: any) {
        //log('calling charwindow.setcharloot from the backback showcharwindow function')
        this._charwindow.setCharLoot(weapon, weapontext, combatlog, actionbar, backpack, lootimage, slot)
        //log('calling charwindow.flip from the backpack showcharwindow function')
        this._charwindow.flip()
    }

    public show() {
        this._charbutton.visible = true;
    }

    public hide() {
        this._charbutton.visible = false;
    }
}