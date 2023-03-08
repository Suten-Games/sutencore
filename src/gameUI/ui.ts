import resources from "src/resources";
import { ActionBar } from "./actionBar";
import { CombatLog } from "./combatLog";
import { Khepra } from "./khepra";

export class UI {
    private gameCanvas: UICanvas;
    private combatLog: CombatLog;
    private actionBar: ActionBar;
    private khepra: Khepra;

    constructor() {
        this.gameCanvas = new UICanvas();
        this.combatLog = new CombatLog(this.gameCanvas);
        this.actionBar = new ActionBar(this.gameCanvas, resources.interface.blueActionBar);
        // const backPack = new BackPack(gameCanvas, resources.interface.blueBackpack);
        //const khepra = new Khepra(gameCanvas, resources.interface.khepra, backPack);
        this.khepra = new Khepra(this.gameCanvas, resources.interface.khepra);
    }
}
