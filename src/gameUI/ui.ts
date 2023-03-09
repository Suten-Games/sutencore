import resources from "src/resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Khepra } from "./khepra";

export class UI {
    private gameCanvas: UICanvas;
    private backPack: BackPack;

    constructor() {
        this.gameCanvas = new UICanvas();
        new CombatLog(this.gameCanvas);
        new ActionBar(this.gameCanvas, resources.interface.blueActionBar);
        this.backPack = new BackPack(this.gameCanvas, resources.interface.blueBackpack);
        new Khepra(this.gameCanvas, resources.interface.khepra, this.backPack);
    }
}
