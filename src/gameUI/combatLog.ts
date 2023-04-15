import resources from "../resources";
import { ActionWindow } from "./actionWindow";

export class CombatLog {
    private _combatlogs: UIText[];
    private _displayarray: string[];

    constructor(canvas: UICanvas) {

        new ActionWindow(canvas, resources.interface.combatlog);

        this._combatlogs = [];

        for (let index = 0; index < 5; index++) {
            const log = new UIText(canvas);
            log.vAlign = "bottom";
            log.hAlign = "center";
            log.hTextAlign = "center";
            log.fontSize = 14;
            log.positionY = `${25 - index * 2}%`;
            log.opacity = 0.8;
            log.visible = true;
            this._combatlogs.push(log);
        }

        this._displayarray = [];
    }

    set text(val: string) {
        this._displayarray.push(val);

        const displayMessages = this._displayarray.slice(-5);

        this._combatlogs.forEach((log, index) => {
            log.value = displayMessages[index] || "";
        });
    }

    public clearlog() {
        this._displayarray = [];
        this._combatlogs.forEach(log => log.value = "");
    }

    public show() {
        this._combatlogs.forEach(log => log.visible = true);
    }

    public hide() {
        this._combatlogs.forEach(log => log.visible = false);
    }

    public scrollup() {
        if (this._displayarray.length > 5) {
            this._displayarray.pop();
            this._combatlogs.forEach((log, index) => {
                log.value = this._displayarray[index] || "";
            });
        }
    }
}
