import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { SoundBox } from "src/gameObjects/soundBox";
import resources from "../resources";
import { ActionBar } from "./actionBar";
import { BackPack } from "./backPack";
import { CombatLog } from "./combatLog";
import { Item } from "src/gameObjects/item";
import { fetchInventory } from "src/gameFunctions/fetchInventory";
import { Npc } from "src/gameObjects/npc";
import { purchasedItem } from "src/gameFunctions/purchasedItem";
import { UI } from "./ui";
import { writeToCl } from "src/gameFunctions/writeToCL";
import { soldItem } from "src/gameFunctions/soldItem";

export class TradeWindow {
    private _canvas;
    private _image;
    private _cl;
    private _bp;
    //private _sellbackground: UIImage;
    private _npc: Npc;
    private _potions: Item[] = [];
    private _closebutton;
    private _buybutton;
    private _buypage;
    private _sellpage;
    private _buytext;
    private _storetitle;
    private _forsale: Item;
    public sutenaddress = "0xaC33868Cd9fE28eF755bA568369214dB42Aa9022";
    private obj = Singleton.getInstance();

    private coinssound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.coins,
        false
    );

    constructor(canvas: UICanvas, image: any, actionBar: ActionBar, backPack: BackPack, player: Player, combatLog: CombatLog) {
    //constructor(canvas: UICanvas, image: any, actionBar: ActionBar, backPack: BackPack, player: Player, combatLog: CombatLog, salespage: UIImage) {
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

        this._storetitle = new UIText(this._canvas)
        this._storetitle.value = "General Store"
        this._storetitle.fontSize = 12;
        this._storetitle.width = 120;
        this._storetitle.height = 30;
        this._storetitle.hAlign = "left";
        this._storetitle.vAlign = "center";
        this._storetitle.positionY = "39%";
        this._storetitle.positionX = "22%";
        this._storetitle.visible = false;


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

        this._buypage = new UIImage(this._canvas, resources.interface.buybutton);
        this._buypage.hAlign = "left";
        this._buypage.vAlign = "center";
        this._buypage.width = "5%";
        this._buypage.height = "5.3%";
        this._buypage.positionY = "-28.9%";
        this._buypage.positionX = "15.7%";
        this._buypage.sourceWidth = 390;
        this._buypage.sourceHeight = 170;
        this._buypage.visible = false;
        this._buypage.onClick = new OnPointerDown(() => {
            log('clicked buypage')
            this.showbuypage()
        })

        this._sellpage = new UIImage(this._canvas, resources.interface.buybutton);
        this._sellpage.hAlign = "left";
        this._sellpage.vAlign = "center";
        this._sellpage.width = "5%";
        this._sellpage.height = "5.3%";
        this._sellpage.positionY = "-28.9%";
        this._sellpage.positionX = "20.7%";
        this._sellpage.sourceWidth = 390;
        this._sellpage.sourceHeight = 170;
        this._sellpage.visible = false;
        this._sellpage.onClick = new OnPointerDown(() => {
            log('clicked sellpage')
            this.showsellpage()
        })

        this.obj.tradewindow = this;
    }

    get visible() {
        return this._bp.visible;
    }

    public async loadItems(npc: Npc) {
        const inventory = await fetchInventory(npc);
        this.clearItems();

        inventory.forEach((itemData: any, index: number) => {
            if (index < 10) {
                const lootimage = "images/looticons/" + itemData.portrait;
                const newItem = new Item(
                    new Texture(lootimage),
                    index + 26,
                    itemData.width,
                    itemData.height,
                    itemData.name,
                    null, // Other parameters as needed
                    itemData.price, // Assuming price is part of itemData
                    itemData.buybackprice,
                    itemData.itemtype,
                    null,
                    null,
                    null,
                    itemData.sound,
                    this,
                    null,
                    null,
                    null
                );

                newItem.show();
                this._potions.push(newItem); // Add the new item to the array
            }
        });
    }

    private clearItems() {
        this._potions.forEach(potion => potion.hide());
        //this._potions = []; // Reset the array
    }

    public show(npc: Npc) {
        this._bp.visible = true;
        this._closebutton.visible = true;
        this._sellpage.visible = true;
        this._buypage.visible = true;
        this._storetitle.value = `${npc.name}'s General Store`
        this._storetitle.visible = true;
        
        this._npc = npc

        this.loadItems(npc); // Load items asynchronously

        // Show potions if they exist in the array
        this._potions.forEach(potion => potion.show());
    }

    public showbuypage() {
        this._bp.visible = true;
        this._potions.forEach(potion => potion.show());
    }

    public showsellpage() {
        this._bp.visible = false;

        var ui = UI.getInstance()
        ui.turnOnSales()

        this.clearItems(); // Clear items when hiding 
        this._buybutton.visible = false;
        this._buytext.visible = false;

        let actionbarcontent = this.obj.fetchactionbar()
        actionbarcontent.forEach(item => item.setOnClickForSelling(this));

        let backpackcontent = this.obj.fetchbackpack()
        backpackcontent.forEach(item => item.setOnClickForSelling(this));
    }

    public hide() {
        this._bp.visible = false;
        this._buybutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;
        this._sellpage.visible = false;
        this._buypage.visible = false;
        this._storetitle.visible = false;

        var ui = UI.getInstance()
        ui.turnOffSales()

        this.clearItems(); // Clear items when hiding

        let actionbarcontent = this.obj.fetchactionbar()
        actionbarcontent.forEach(item => item.restoreOriginalOnClick());

        let backpackcontent = this.obj.fetchbackpack()
        backpackcontent.forEach(item => item.restoreOriginalOnClick());

        if(this._forsale) {
            this._forsale.sendToBackpack()
        }

        writeToCl(`${this._npc.name} says, Take care!`)
    }

    private afterConfirm(potion: any) {
        potion.sendItemDown();
        this._buybutton.visible = false;
    }

    public sell(item: any) {
        log(`in tradeWindow sell: ${item.buybackprice}`)
        this._buybutton.visible = true;
        this._buytext.value = `${item.buybackprice} Mana`
        this._buytext.visible = true;
        this._forsale = item

        this._buybutton.onClick = new OnPointerDown(() => {
            log('clicked the sell button')
            writeToCl(`You have sold ${item.lootdesc()} for ${item.buybackprice}`)
            // Step One, Update the Cash of the player
            // player.increaseWealth(item.buybackprice)

            // Step Three, Make the coins sound
            let camera = Camera.instance
            this.coinssound.getComponent(Transform).position = camera.position
            this.coinssound.play();

            // Step Five, Merchant thanks the player
            writeToCl(`${this._npc.name} says, Pleasure doing business with you.`)

            //Step 6 Add item to Merchants Inventory on server
            soldItem(this._npc, item)

            // Step Seven, Delete the item since its been sold
            item.hide()
            item = null;

            // Step Eight, Remove the buy buttons
            this._buybutton.visible = false;
            this._buytext.visible = false;

        });
    }

    public purchase(item: Item) {
        log(`in tradeWindow purchase`)
        this._buybutton.visible = true;
        this._buytext.value = `${item.potionprice} Mana`
        this._buytext.visible = true;

        // Skip Matic
        this._buybutton.onClick = new OnPointerDown(() => {
            log('clicked the buy button')
            purchasedItem(this._npc, item)
            item.sendToBackpack()
            this._buybutton.visible = false;
            this._buytext.visible = false;
        });
    }
}
