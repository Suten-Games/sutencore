import resources from "../resources";
import { ActionWindow } from "./actionWindow";

export class CombatLog {
    private _combatlog0: UIText;
    private _combatlog1: UIText;
    private _combatlog2: UIText;
    private _combatlog3: UIText;
    private _combatlog4: UIText;
    private _displayarray: string[];
    private _counter: number;
    private actionWindow: ActionWindow

    constructor(canvas: UICanvas) {

        this.actionWindow = new ActionWindow(canvas, resources.interface.combatlog)

        this._combatlog0 = new UIText(canvas);
        this._combatlog0.vAlign = "bottom";
        this._combatlog0.hAlign = "center";
        this._combatlog0.hTextAlign = "center";
        this._combatlog0.fontSize = 14;
        this._combatlog0.opacity = 0.8;
        this._combatlog0.positionY = "25%";

        this._combatlog1 = new UIText(canvas);
        this._combatlog1.vAlign = "bottom";
        this._combatlog1.hAlign = "center";
        this._combatlog1.hTextAlign = "center";
        this._combatlog1.fontSize = 14;
        this._combatlog1.positionY = "23%";
        this._combatlog1.opacity = 0.8;

        this._combatlog2 = new UIText(canvas);
        this._combatlog2.vAlign = "bottom";
        this._combatlog2.hAlign = "center";
        this._combatlog2.hTextAlign = "center";
        this._combatlog2.fontSize = 14;
        this._combatlog2.positionY = "21%";
        this._combatlog2.opacity = 0.8;

        this._combatlog3 = new UIText(canvas);
        this._combatlog3.vAlign = "bottom";
        this._combatlog3.hAlign = "center";
        this._combatlog3.hTextAlign = "center";
        this._combatlog3.fontSize = 14;
        this._combatlog3.positionY = "19%";
        this._combatlog3.opacity = 0.8;

        this._combatlog4 = new UIText(canvas);
        this._combatlog4.vAlign = "bottom";
        this._combatlog4.hAlign = "center";
        this._combatlog4.hTextAlign = "center";
        this._combatlog4.fontSize = 14;
        this._combatlog4.positionY = "17%"
        this._combatlog4.opacity = 0.8;

        this._displayarray = [];
        this._counter = 0;

    }

    get text() {
        return this._combatlog0.value;
    }

    set text(val: string) {
        if (this._counter > 4) {
            this._counter = 0;
        }

        this._displayarray[this._counter] = val;

        if (this._counter == 0) {
            this._combatlog0.value = this._displayarray[this._counter];
        } else if (this._counter == 1) {
            this._combatlog1.value = this._displayarray[this._counter];
        } else if (this._counter == 2) {
            this._combatlog2.value = this._displayarray[this._counter];
        } else if (this._counter == 3) {
            this._combatlog3.value = this._displayarray[this._counter];
        } else if ((this._counter = 4)) {
            this._combatlog4.value = this._displayarray[this._counter];
        }

        this._counter += 1;
    }

    public clearlog() {
        this._displayarray = [];
        this._combatlog0.value = "";
        this._combatlog1.value = "";
        this._combatlog2.value = "";
        this._combatlog3.value = "";
        this._combatlog4.value = "";
    }

    public show() {
        this._combatlog0.visible = true;
        this._combatlog1.visible = true;
        this._combatlog2.visible = true;
        this._combatlog3.visible = true;
        this._combatlog4.visible = true;
    }

    public hide() {
        this._combatlog0.visible = false;
        this._combatlog1.visible = false;
        this._combatlog2.visible = false;
        this._combatlog3.visible = false;
        this._combatlog4.visible = false;
    }
}
