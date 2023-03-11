import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";
import resources from "../resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";

export class TradeWindow {
    private _canvas;
    private _image;
    private _cl;
    private _bp;
    private _closebutton;
    private _buybutton;
    private _buytext;
    public sutenaddress = "0xaC33868Cd9fE28eF755bA568369214dB42Aa9022";
    private obj = Singleton.getInstance();

    private backpacksound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.backpack,
        false
    );

    constructor(canvas: UICanvas, image: any, actionBar: ActionBar, backPack: BackPack, player: Player, combatLog: CombatLog) {
        this._canvas = canvas;
        this.obj.canvas = canvas;
        this._image = image;
        this._cl = combatLog;
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "left";
        this._bp.vAlign = "center";
        this._bp.width = "25%";
        this._bp.height = "84%";
        this._bp.positionY = "10.2%";
        this._bp.positionX = "12.5%";
        this._bp.sourceWidth = 877; //Old Style
        this._bp.sourceHeight = 1401; //Old Style
        this._bp.visible = false;

        this._closebutton = new UIImage(this._canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "left";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "5%";
        this._closebutton.height = "8%";
        this._closebutton.positionX = "33%";
        this._closebutton.positionY = "44%";
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
        this.obj.tradewindow = this;
    }

    get visible() {
        return this._bp.visible;
    }

    public show() {
        this._bp.visible = true;
        this._closebutton.visible = true;
    }

    private afterConfirm(potion: any) {
        potion.sendItemDown();
        this._buybutton.visible = false;
    }

    public purchase(potion: any) {
        this._buybutton.visible = true;
        this._buytext.value = `${potion.potionprice} Mana`
        this._buytext.visible = true;

        // Skip Matic
        this._buybutton.onClick = new OnPointerDown(() => {
            log('clicked the buy button')
            potion.sendItemDown()
            this._buybutton.visible = false;
            this._buytext.visible = false;
        });
    }

    public hide() {
        this._bp.visible = false;
        this._buybutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
    }
}
