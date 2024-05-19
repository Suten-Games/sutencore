import resources from "src/resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Khepra } from "./khepra";
import { SpellBook } from "./spellBook";
import { SpellScroll } from "./spellScroll";
import { QuestWindow } from "./questWindow";
import { QuestBook } from "./questBook";
import { WarriorsTome } from "./warriorsTome";
import { RoguesToolbelt } from "./roguestoolbelt";
import { CharWindow } from "./charWindow";
import { QuestGivingWindow } from "./questGivingWindow";
import { QuestAcceptedWindow } from "./questAcceptedWindow";

export class UI {
    private static instance: UI;
    private gameCanvas: UICanvas;
    private combatLog
    private actionBar: ActionBar;
    private backPack: BackPack;
    private khepra: Khepra;
    private spellBook: SpellBook
    private warriorsTome: WarriorsTome
    private roguesToolbelt: RoguesToolbelt
    private spellScroll: SpellScroll
    private characterwindow: CharWindow
    private questwindow: QuestWindow;
    private questgivingwindow: QuestGivingWindow;
    private questacceptedwindow: QuestAcceptedWindow;
    private questBook: QuestBook;
    private sellItemsPage: UIImage;
        

    constructor() {
        if (UI.instance) {
            throw new Error("Error - use UI.getInstance()");
        }

        this.gameCanvas = new UICanvas();
        this.combatLog = new CombatLog(this.gameCanvas);
        this.actionBar = new ActionBar(this.gameCanvas, resources.interface.blueActionBar);
        //this.actionBar = new ActionBar(this.gameCanvas, new Texture("images/vali/ab.png"));
        this.backPack = new BackPack(this.gameCanvas, resources.interface.blueBackpack);
        this.khepra = new Khepra(this.gameCanvas, resources.interface.khepra, this.backPack);
        this.questwindow = new QuestWindow(this.gameCanvas, resources.interface.questLog);
        this.questgivingwindow = new QuestGivingWindow(this.gameCanvas, resources.interface.questGiving);
        this.questacceptedwindow = new QuestAcceptedWindow(this.gameCanvas, resources.interface.questGiving);
        this.characterwindow = new CharWindow(this.gameCanvas, resources.interface.characterScreen, 'Adventurer');
        this.spellBook = new SpellBook(this.gameCanvas, resources.interface.spellBook);
        this.warriorsTome = new WarriorsTome(this.gameCanvas, resources.interface.spellBook);
        this.roguesToolbelt = new RoguesToolbelt(this.gameCanvas, resources.interface.spellBook);
        this.spellScroll = new SpellScroll(this.gameCanvas, resources.interface.spellScroll);
        this.sellItemsPage = new UIImage(this.gameCanvas, resources.interface.blueMerchantInterface);
        this.sellItemsPage.hAlign = "left";
        this.sellItemsPage.vAlign = "center";
        this.sellItemsPage.width = "25%";
        this.sellItemsPage.height = "84%";
        this.sellItemsPage.positionY = "10.2%";
        this.sellItemsPage.positionX = "12.5%";
        this.sellItemsPage.sourceWidth = 877; //Old Style
        this.sellItemsPage.sourceHeight = 1401; //Old Style
        this.sellItemsPage.visible = false;
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

    get wt() {
        return this.warriorsTome;
    }

    get rt() {
        return this.roguesToolbelt;
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

    get ql() {
        return this.questwindow;
    }

    get qg() {
        return this.questgivingwindow;
    }

    get qa() {
        return this.questacceptedwindow;
    }

    get qb() {
        return this.questBook
    }

    get cw() {
        return this.characterwindow
    }

    turnOffSales() {
        log(`in ui.ts turnOffSales setting to invisible`)
        this.sellItemsPage.visible = false;
    }

    turnOnSales() {
        log(`in ui.ts turnOnSales setting to visible`)
        this.sellItemsPage.visible = true;
    }

}