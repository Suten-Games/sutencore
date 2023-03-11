import resources from "src/resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Khepra } from "./khepra";

export class UI {
    private static instance: UI;
    private gameCanvas: UICanvas;
    private combatLog
    private actionBar: ActionBar;
    private backPack: BackPack;
    private khepra: Khepra;

    constructor() {
        if (UI.instance) {
            throw new Error("Error - use UI.getInstance()");
        }
        this.gameCanvas = new UICanvas();
        this.combatLog = new CombatLog(this.gameCanvas);
        this.actionBar = new ActionBar(this.gameCanvas, resources.interface.blueActionBar);
        this.backPack = new BackPack(this.gameCanvas, resources.interface.blueBackpack);
        this.khepra = new Khepra(this.gameCanvas, resources.interface.khepra, this.backPack);
    }

    static getInstance(): UI {
        UI.instance = UI.instance || new UI();
        return UI.instance;
    }

    get gc() {
        return this.gameCanvas;
    }

    get cl() {
        return this.combatLog  
    }

    get ab() {
        return this.actionBar;
    }

    get bp() {
        return this.backPack;
    }

    get kp() {
        return this.khepra;
    }

}
