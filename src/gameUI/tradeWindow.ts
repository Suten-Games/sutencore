import resources from "../resources";
import { ActionBar } from "./actionBar";
import { Player } from "../gameObjects/player";
import { BackPack } from "./backPack";
//import { matic } from '@dcl/l2-scene-utils'
//import * as ui from "../../node_modules/@dcl/ui-utils/index";
import { SoundBox } from "../gameUtils/soundbox";
import { Singleton } from "../gameUtils/playerDetail";
// import {
//   ButtonStyles,
//   PromptStyles,
// } from "../../node_modules/@dcl/ui-utils/index";
import { Item } from "../gameObjects/item";
import { CombatLog } from "./combatLog";

export class TradeWindow {
  private _canvas;
  private _image;
  private _cl;
  private _bp;
  private _potion1;
  private _potion2;
  private _potion3;
  private _potion4;
  private _potion5;
  private _potion6;
  private _potion7;
  private _potion8;
  private _potion9;
  private _potion10;

  private _closebutton;

  private _actionBar: ActionBar;
  private _player: Player;
  private _backpack: BackPack;
  private _buybutton;
  private _buytext;
  //public sutenaddress = "0xDd9b105EDaa859307031B26EC9D3B26c6b0b2770";
  public sutenaddress = "0xaC33868Cd9fE28eF755bA568369214dB42Aa9022";
  private obj = Singleton.getInstance();

  private backpacksound = new SoundBox(
    new Transform({ position: new Vector3(8, 0, 8) }),
    resources.sounds.backpack,
    false
  );

  constructor(canvas:UICanvas, image:any, actionBar:ActionBar, backPack:BackPack, player:Player, combatLog:CombatLog) {
    this._canvas = canvas;
    this.obj.canvas = canvas;
    this._image = image;
    this._cl = combatLog;
    //this._actionBar = actionBar;
    this.obj.actionbar = actionBar;
    this._backpack = backPack;
    this.obj.backpack = backPack;
    this._player = player;
    this.obj.player = player;
    this.obj.tradewindow = this;
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


    this._potion1 = new Item(resources.loot.redPotion, 26, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this)
    this._potion2 = new Item(resources.loot.redPotion, 27, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion3 = new Item(resources.loot.redPotion, 28, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion4 = new Item(resources.loot.redPotion, 29, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion5 = new Item(resources.loot.redPotion, 30, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion6 = new Item(resources.loot.greenPotion, 31, 1219, 2154, "Minor Heal", null, 5, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion7 = new Item(resources.loot.redPotion, 32, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion8 = new Item(resources.loot.bluePotion, 33, 1219, 2154, "Minor Heal", null, 20, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion9 = new Item(resources.loot.greenPotion, 34, 1219, 2154, "Minor Heal", null, 5, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
    this._potion10 = new Item(resources.loot.bluePotion, 35, 1219, 2154, "Minor Heal", null, 20, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
  }

  get visible() {
    return this._bp.visible;
  }

  public show() {
    this._bp.visible = true;
    this._closebutton.visible = true;
    if (!this._potion1.isAction()) {
      this._potion1.show();
    } else {
      this.replacepotion(26);
    }
    if (!this._potion2.isAction()) {
      this._potion2.show();
    } else {
      this.replacepotion(27);
    }
    if (!this._potion3.isAction()) {
      this._potion3.show();
    } else {
      this.replacepotion(28);
    }
    if (!this._potion4.isAction()) {
      this._potion4.show();
    } else {
      this.replacepotion(29);
    }
    if (!this._potion5.isAction()) {
      this._potion5.show();
    } else {
      this.replacepotion(30);
    }
    if (!this._potion6.isAction()) {
      this._potion6.show();
    } else {
      this.replacepotion(31);
    }
    if (!this._potion7.isAction()) {
      this._potion7.show();
    } else {
      this.replacepotion(32);
    }
    if (!this._potion8.isAction()) {
      this._potion8.show();
    } else {
      this.replacepotion(33);
    }
    if (!this._potion9.isAction()) {
      this._potion9.show();
    } else {
      this.replacepotion(34);
    }
    if (!this._potion10.isAction()) {
      this._potion10.show();
    } else {
      this.replacepotion(35);
    }
  }

  private afterConfirm(potion:any) {
    potion.sendItemDown();
    this._buybutton.visible = false;
  }

  public purchase(potion:any) {
    this._buybutton.visible = true;
    this._buytext.value = `${potion.potionprice} Mana`
    this._buytext.visible = true;

    // Skip Matic
    this._buybutton.onClick = new OnClick(() => {
      log('clicked the buy button')
      potion.sendItemDown()
      this._buybutton.visible = false;
      this._buytext.visible = false;
    });

    //Matic Purchasing
    // this._buybutton.onClick = new OnClick(async () => {
    //   var obj = Singleton.getInstance();

    //   log(`obj.manal1 ${obj.manal1} ${typeof(obj.manal1)}`)

    //   if (obj.manal1 < 100 && obj.maticbalance <= potion.potionprice) {
    //     this.hide();
    //     this._cl.text = `You don't have enough Mana for this item.`; 
    //     let customprompt = new ui.CustomPrompt(PromptStyles.LIGHT);
    //     customprompt.addText("Out of Matic Mana!", 0, 130, Color4.Red(), 30);
    //     customprompt.addText(
    //       "You don't have enough Mana to buy this item.",
    //       0,
    //       100
    //     );
    //     customprompt.addText("Please acquire some mana and come back to the shop!.", 0, 80);

    //   } else if (obj.maticbalance >= potion.potionprice) {
    //     const loading = new ui.LoadingIcon(15);
    //     this._cl.text = `You are purchasing a ${potion.potiontype} potion`;
    //     this._cl.text = `Click 'Sign' in the Metamask popup.`;
    //     this._cl.text = `Hang tight, only takes a moment.`;
    //     await matic.sendMana(this.sutenaddress, potion.potionprice, true);
    //     obj.maticbalance = obj.maticbalance - potion.potionprice;
    //     potion.sendItemDown();
    //     this._cl.text = `You have purchased a ${potion.potiontype} potion`;
    //     this._cl.text = `Your Matic Mana Balance is now ${obj.maticbalance}`;
    //     this._buybutton.visible = false;
    //     this._buytext.visible = false;
    //     this.backpacksound.play();
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

  public replacepotion(slot:any) {
    if (slot == 26) {
      this._potion1 = new Item(resources.loot.redPotion, 26, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this)
      this._potion1.show();
    } else if (slot == 27) {
      this._potion2 = new Item(resources.loot.redPotion, 27, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion2.show();
    } else if (slot == 28) {
      this._potion3 = new Item(resources.loot.redPotion, 28, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion3.show();
    } else if (slot == 29) {
      this._potion4 = new Item(resources.loot.redPotion, 29, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion4.show();
    } else if (slot == 30) {
      this._potion5 = new Item(resources.loot.redPotion, 30, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion5.show();
    } else if (slot == 31) {
      this._potion6 = new Item(resources.loot.greenPotion, 31, 1219, 2154, "Minor Heal", null, 5, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion6.show();
    } else if (slot == 32) {
      this._potion7 = new Item(resources.loot.redPotion, 32, 1219, 2154, "Minor Heal", null, 1, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion7.show();
    } else if (slot == 33) {
      this._potion8 = new Item(resources.loot.bluePotion, 33, 1219, 2154, "Minor Heal", null, 20, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion8.show();
    } else if (slot == 34) {
      this._potion9 = new Item(resources.loot.greenPotion, 34, 1219, 2154, "Minor Heal", null, 5, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion9.show();
    } else if (slot == 35) {
      this._potion10 = new Item(resources.loot.bluePotion, 35, 1219, 2154, "Minor Heal", null, 20, "consumable", null, null, null, resources.sounds.corkpop, null, null, this);
      this._potion10.show();
    }
  }

  public hide() {
    this._bp.visible = false;
    this._buybutton.visible = false;
    this._closebutton.visible = false;
    this._buytext.visible = false;

    if (!this._potion1.isAction()) {
      this._potion1.hide();
    }

    if (!this._potion2.isAction()) {
      this._potion2.hide();
    }

    if (!this._potion3.isAction()) {
      this._potion3.hide();
    }

    if (!this._potion4.isAction()) {
      this._potion4.hide();
    }

    if (!this._potion5.isAction()) {
      this._potion5.hide();
    }

    if (!this._potion6.isAction()) {
      this._potion6.hide();
    }

    if (!this._potion7.isAction()) {
      this._potion7.hide();
    }

    if (!this._potion8.isAction()) {
      this._potion8.hide();
    }

    if (!this._potion9.isAction()) {
      this._potion9.hide();
    }

    if (!this._potion10.isAction()) {
      this._potion10.hide();
    }
  }
}
