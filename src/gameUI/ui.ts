import resources from "src/resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Khepra } from "./khepra";
import { SpellBook } from "./spellBook";
import { SpellScroll } from "./spellScroll";

export class UI {
    private static instance: UI;
    private gameCanvas: UICanvas;
    private combatLog
    private actionBar: ActionBar;
    private backPack: BackPack;
    private khepra: Khepra;
    private spellBook: SpellBook
    private spellScroll: SpellScroll

    constructor() {
        if (UI.instance) {
            throw new Error("Error - use UI.getInstance()");
        }
        this.gameCanvas = new UICanvas();
        this.combatLog = new CombatLog(this.gameCanvas);
        this.actionBar = new ActionBar(this.gameCanvas, resources.interface.blueActionBar);
        this.backPack = new BackPack(this.gameCanvas, resources.interface.blueBackpack);
        this.khepra = new Khepra(this.gameCanvas, resources.interface.khepra, this.backPack);
        this.spellBook = new SpellBook(this.gameCanvas, resources.interface.spellBook);
        this.spellScroll = new SpellScroll(this.gameCanvas, resources.interface.spellScroll)
    }

    static getInstance(): UI {
        UI.instance = UI.instance || new UI();
        return UI.instance;
    }

    get gc() {
        return this.gameCanvas;
    }

    get cl() {
        return this.combatLog; 
    }

    get sb() {
        return this.spellBook;
    }

    get ss() {
        return this.spellScroll;
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
