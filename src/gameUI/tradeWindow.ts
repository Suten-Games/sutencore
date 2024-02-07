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
import { PromptStyles } from "src/gameUtils/types";
import { writeToCl } from "src/gameFunctions/writeToCL";
import { OkPrompt } from "./okPrompt";
import { purchasedItem } from "src/gameFunctions/purchasedItem";
//import { matic } from '@dcl/l2-scene-utils'

export class TradeWindow {
    private _canvas;
    private _image;
    private _cl;
    private _bp;
    private _npc: Npc;
    private _potions: Item[] = [];
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
        this._potions = []; // Reset the array
    }

    public show(npc: Npc) {
        this._bp.visible = true;
        this._closebutton.visible = true;
        //this._buybutton.visible = true;
        
        this._npc = npc

        this.loadItems(npc); // Load items asynchronously

        // Show potions if they exist in the array
        this._potions.forEach(potion => potion.show());
    }

    public hide() {
        this._bp.visible = false;
        this._buybutton.visible = false;
        this._closebutton.visible = false;
        this._buytext.visible = false;

        this.clearItems(); // Clear items when hiding
    }

    private afterConfirm(potion: any) {
        potion.sendItemDown();
        this._buybutton.visible = false;
    }

    public purchase(item: any) {
        log(`in tradeWindow purchase`)
        this._buybutton.visible = true;
        this._buytext.value = `${item.potionprice} Mana`
        this._buytext.visible = true;

        // Skip Matic
        this._buybutton.onClick = new OnPointerDown(() => {
            log('clicked the buy button')
            purchasedItem(this._npc, item)
            //potion.sendItemDown()
            item.sendToBackpack()
            this._buybutton.visible = false;
            this._buytext.visible = false;
        });

        //Matic Purchasing
        // this._buybutton.onClick = new OnPointerDown(async () => {
        //   var obj = Singleton.getInstance();

        //   log(`obj.manal1 ${obj.manal1} ${typeof(obj.manal1)}`)

        //   if (obj.manal1 < 100 && obj.maticbalance <= item.potionprice) {
        //     this.hide();
        //     writeToCl(`You don't have enough Mana for this item.`)
        //     new OkPrompt(
        //         "You don't have enough Mana to buy this item.",
        //         () => {
        //             writeToCl(`Please acquire some mana and come back to the shop!`)
        //         },
        //         'Ok',
        //         true
        //     )
        //   } else if (obj.maticbalance >= item.potionprice) {
        //     //const loading = new ui.LoadingIcon(15);
        //     writeToCl(`You are purchasing a ${item.potiontype} potion`)
        //     writeToCl(`Click 'Sign' in the Metamask popup.`)
        //     writeToCl(`Hang tight, only takes a moment.`)
        //     await matic.sendMana(this.sutenaddress, item.potionprice, true);
        //     obj.maticbalance = obj.maticbalance - item.potionprice;
        //     item.sendItemDown();
        //     this._cl.text = `You have purchased a ${item.potiontype} potion`;
        //     this._cl.text = `Your Matic Mana Balance is now ${obj.maticbalance}`;
        //     this._buybutton.visible = false;
        //     this._buytext.visible = false;
        //     this.backpacksound.play();
        //   }
        // }
        //   } else {
        //     this.hide();
        //     this._cl.text = `You don't have enough Mana for this item.`;
        //     let customprompt = new ui.CustomPrompt(PromptStyles.LIGHT);
        //     customprompt.addText("Out of Matic Mana!", 0, 130, Color4.Red(), 30);
        //     customprompt.addText(
        //       "You don't have enough Matic Mana to buy this item.",
        //       0,
        //       100
        //     );
        //     customprompt.addText("I can transfer Mana to Matic for you.", 0, 80);
        //     customprompt.addText(
        //       "How much Mana would you like to transfer?",
        //       0,
        //       60
        //     );
        //     let button1 = customprompt.addButton(
        //       "50 Mana",
        //       -100,
        //       -30,
        //       () => {
        //         this._cl.text = `The first Metamask Popup is to approve the transfer.`
        //         this._cl.text = `There is an associated Ethereum Miner Fee. `
        //         this._cl.text = `The fee depends on Ethereum network traffic. `
        //         this._cl.text = `If the fee is too high, try again later.`
        //         async function firedeposit(cl) {
        //           this._cl.text = `Please be patient, might take a few minutes to mine.`
        //           await matic.depositMana(50);
        //           log("Mana deposited");
        //           obj.maticbalance = obj.maticbalance + 50;
        //           this._cl.text = `The second popup is the fee for the Mana transfer.`
        //           this._cl.text = `Please be patient, might take a couple minutes to mine.`
        //           log("new balance: ", obj.maticbalance);
        //           cl.text = `You have added 50 Mana to your Matic Wallet`;
        //           cl.text = `Your balance is now ${obj.maticbalance}`;
        //         }
        //         firedeposit(this._cl);
        //       }, ButtonStyles.ROUNDGOLD
        //     );

        //     let button2 = customprompt.addButton(
        //       "100 Mana",
        //       -100,
        //       -90,
        //       () => {
        //         this._cl.text = `The first Metamask Popup is to approve the transfer.`
        //         this._cl.text = `There is an associated Ethereum Miner Fee for this. `
        //         this._cl.text = `The fee is higher depending on Ethereum network traffic. `
        //         this._cl.text = `If the fee is too high, try again at a lower traffic time.`
        //         async function firedeposit(cl) {
        //           await matic.depositMana(100);
        //           log("Mana deposited");
        //           obj.maticbalance = obj.maticbalance + 100;
        //           this._cl.text = `The second popup is the fee for the Mana transfer.`
        //           this._cl.text = `Please be patient, might take a couple minutes to mine.`
        //           log("new balance: ", obj.maticbalance);
        //           cl.text = `You have added 100 Mana to your Matic Wallet`;
        //           cl.text = `Your balance is now ${obj.maticbalance}`;
        //         }
        //         firedeposit(this._cl);
        //       }, ButtonStyles.ROUNDGOLD
        //     );
        //     let button3 = customprompt.addButton(
        //       "500 Mana",
        //       100,
        //       -30,
        //       () => {
        //         this._cl.text = `The first Metamask Popup is to approve the transfer.`
        //         this._cl.text = `There is an associated Ethereum Miner Fee for this. `
        //         this._cl.text = `The fee is higher depending on Ethereum network traffic. `
        //         this._cl.text = `If the fee is too high, try again at a lower traffic time.`
        //         async function firedeposit(cl) {
        //           await matic.depositMana(500);
        //           log("Mana deposited");
        //           obj.maticbalance = obj.maticbalance + 500;
        //           this._cl.text = `The second popup is the fee for the Mana transfer.`
        //           this._cl.text = `Please be patient, might take a couple minutes to mine.`
        //           log("new balance: ", obj.maticbalance);
        //           cl.text = `You have transfered 500 Mana to your Matic Wallet!`;
        //           cl.text = `Your Matic Mana balance is now ${obj.maticbalance}`;
        //           customprompt.hide()
        //           this.show()
        //         }
        //         firedeposit(this._cl);
        //       }, ButtonStyles.ROUNDGOLD
        //     );

        //     let button4 = customprompt.addButton(
        //       "1000 Mana",
        //       100,
        //       -90,
        //       () => {
        //         this._cl.text = `The first Metamask Popup is to approve the transfer.`
        //         this._cl.text = `There is an associated Ethereum Miner Fee for this. `
        //         this._cl.text = `The fee is higher depending on Ethereum network traffic. `
        //         this._cl.text = `If the fee is too high, try again at a lower traffic time.`
        //         async function firedeposit(cl) {
        //           await matic.depositMana(1000);
        //           log("Mana deposited");
        //           obj.maticbalance = obj.maticbalance + 1000;
        //           this._cl.text = `The second popup is the fee for the Mana transfer.`
        //           this._cl.text = `Please be patient, might take a couple minutes to mine.`
        //           log("new balance: ", obj.maticbalance);
        //           cl.text = `You have added 1000 Mana to your Matic Wallet`;
        //           cl.text = `Your balance is now ${obj.maticbalance}`;
        //         }
        //         firedeposit(this._cl);
        //       }, ButtonStyles.ROUNDGOLD
        //     );
        //   }
        // });
    }

}
