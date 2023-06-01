import resources from "../resources";
import { ActionWindow } from "./actionWindow";

export class CombatLog {
    private _combatlogs: UIText[];
    private _displayarray: string[];
    private _scrollUp
    private _scrollDown
    private _startIndex: number;


    constructor(canvas: UICanvas) {

        new ActionWindow(canvas, resources.interface.combatlog);
        this._scrollDown = new UIImage(canvas, resources.interface.scrollDownBtn);
        this._scrollDown.hAlign = "center"
        this._scrollDown.vAlign = "bottom";
        this._scrollDown.width = "2%";
        this._scrollDown.height = "2%";
        this._scrollDown.positionY = "16%";
        this._scrollDown.positionX = "14.2%";
        this._scrollDown.sourceWidth = 38;
        this._scrollDown.sourceHeight = 13;

        this._scrollDown.onClick = new OnPointerDown(
            (e) => {
                this.scrolldown()
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Scroll Down",
            }
        );

        this._scrollUp = new UIImage(canvas, resources.interface.scrollUpBtn);
        this._scrollUp.hAlign = "center"
        this._scrollUp.vAlign = "bottom";
        this._scrollUp.width = "2%";
        this._scrollUp.height = "2%";
        this._scrollUp.positionY = "24.5%";
        this._scrollUp.positionX = "14.2%";
        this._scrollUp.sourceWidth = 38;
        this._scrollUp.sourceHeight = 13;

        this._scrollUp.onClick = new OnPointerDown(
            (e) => {
                this.scrollup()
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Scroll Up",
            }
        );

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
        this._startIndex = 0;
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
        // Ensure we're not at the beginning of the log array
        if (this._startIndex > 0) {
            this._startIndex--;
            this._combatlogs.forEach((log, index) => {
                log.value = this._displayarray[this._startIndex + index] || "";
            });
        }
    }

    public scrolldown() {
        // Ensure we're not at the end of the log array
        if (this._startIndex + 5 < this._displayarray.length) {
            this._startIndex++;
            this._combatlogs.forEach((log, index) => {
                log.value = this._displayarray[this._startIndex + index] || "";
            });
        }

    }
}