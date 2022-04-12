import resources from "../resources";
import { Orc } from "../gameObjects/orc";
import { LifeItem } from "../components/lifeItemComponent";
import { Item } from "../gameObjects/item";

export class LootWindow extends Entity {
  private _canvas;
  private _image;
  private _loot;
  private _closebutton;
  private _actionbar;
  private _backpack;
  private _player;
  private _lootitem: any;
  private _activeloot: any;
  private _peonlootpool = [
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.sandBeetle, resources.loot.rustysword
  ]
  private _gruntlootpool = [
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.rustyaxe
  ]
  private _archerlootpool = [
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.sandBeetle, resources.loot.rustydagger
  ]
  private _warriorlootpool = [
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.sandBeetle, resources.loot.orctooth, resources.loot.rustydagger

  ]
  private _shamanlootpool = [
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.sandBeetle, resources.loot.orctooth, resources.loot.rustydagger
  ]
  private _riverlandslootpool = [
    resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion, resources.loot.bluePotion,
    resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion, resources.loot.greenPotion,
    resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion, resources.loot.redPotion,
    resources.loot.rustyaxe, resources.loot.rustydagger, resources.loot.rustysword
  ]
  private _testpool = [
    resources.loot.rustydagger, resources.loot.rustydagger, resources.loot.rustydagger, resources.loot.rustydagger,
    resources.loot.rustydagger, resources.loot.orctooth, resources.loot.rustydagger, resources.loot.rustysword,
    resources.loot.rustyaxe
  ]
  private _testpool2 = [
    resources.loot.bluePotion, resources.loot.orctooth, resources.loot.sandBeetle
  ]
  private _chieflootpool = [
    resources.loot.greekSword
  ]
  private _looted = false
  private _npc

  constructor(canvas: any, image: any, actionBar: any, backPack: any, player: any, orc: Orc) {
    super()
    this._canvas = canvas;
    this._image = image;
    this._loot = new UIImage(this._canvas, this._image);
    this._loot.hAlign = "left"
    this._loot.vAlign = "center";
    this._loot.width = "50%"; //Old Icons
    this._loot.height = "84%";
    this._loot.positionY = "10.2%";
    this._loot.positionX = "6%";
    this._loot.sourceWidth = 1440; //Old Style
    this._loot.sourceHeight = 1440; //Old Style
    this._loot.visible = false;
    this._actionbar = actionBar;
    this._backpack = backPack;
    this._player = player;
    this._npc = orc
    //this.addComponent(new LifeItem())
    this._closebutton = new UIImage(canvas, resources.interface.closebutton);
    this._closebutton.hAlign = "left";
    this._closebutton.vAlign = "center";
    this._closebutton.width = "7%";
    this._closebutton.height = "7%";
    this._closebutton.positionX = "32%";
    this._closebutton.positionY = "32%";
    this._closebutton.sourceWidth = 168;
    this._closebutton.sourceHeight = 164;
    this._closebutton.visible = false;
    this._closebutton.onClick = new OnPointerDown(
      (e) => {
        this.hide()
        this._closebutton.visible = false;
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Close",
      }
    );
  }

  async getloot() {
    if (this._looted) {
      this._looted = false;
    }

    let json
    let mobtier = 1

    switch (this._npc.mobname) {
      case 'Sand Orc Peon':
        mobtier = 1
        break;
      case 'Orc Peon':
        mobtier = 1
        break;
      case 'Orc Grunt':
        mobtier = 1
        break;
      case 'Sand Orc Archer':
        mobtier = 1
        break;
      case 'Orc Warrior':
        mobtier = 1
        break;
      case 'Orc Shaman':
        mobtier = 1
        break;
      case 'Orc Chief':
        mobtier = 1
        break;
      case 'Riverlands Orc Archer':
        mobtier = 1
        break;
      default:
        mobtier = 1
        break;
    }

    //Commenting out the API call to fetch the loot for now
    //Done of 4/12/22 for testing
    // try {
    //   let response = await fetch("https://sutenquestapi.azurewebsites.net/loot/" + mobtier + '/' + 123456);
    //   json = await response.json();
    // } catch (error) {
    //   log("error: ", error.toString());
    // }

    // log('api response: ', json)

    // api response:
    // { id: "60fc83b3eb1e240fdefcdd17", name: "Sand Beetle", shape: "sandbeetle.png", width: 345, height: 400 }
    // height: 400
    // id: "60fc83b3eb1e240fdefcdd17"
    // name: "Sand Beetle"
    // shape: "sandbeetle.png"
    // width: 345

    // if (!json.shape) { json.shape = "sandbeetle.png" }

    // let lootimg = "images/looticons/" + json.shape
    // log('lootimg: ', lootimg)
    // this._lootitem = new Item(new Texture(lootimg), 40, json.width, json.height, json.name, json.type, json.price, json.itemtype, json.spellshape,
    //   json.spellstart, json.spellend, json.soundjj=, this, null)
    
    this._lootitem = new Item(
      new Texture("images/looticons/manavial.png"),
      40,
      1219,
      2154,
      "Mana Vial",
      "consumable",
      50,
      "consumable",
      null,   //spellshape
      null,   //spellstart
      null,   //spellend
      null,   //sound
      this,    //lootwindow)
      this._npc)
    
    this._lootitem.show()
  }

  public sendtobp() {
    log(`${this._npc.id} lootWindow sendtobp`)
    this._lootitem.sendToBackpack()
  }

  get looted() {
    return this._looted
  }

  set looted(val: boolean) {
    this._looted = val
  }

  get visible() {
    return this._loot.visible
  }

  public flip(item = null) {
    if (this._loot.visible) {
      this.hide()
    } else {
      if (item) {
        this.show(item)
      } else {
        this.show()
      }

      log(`id: ${this._npc.id} Adding the lootallclick method`)
      this._npc.addlootallclick()
    }
  }

  public hidelootwindow() {
    log('clicked hide loot window')
    this._loot.visible = false;
    //this._lootitem.hide()
  }

  public show(item = null) {
    log('in lootWindow show method')
    this._closebutton.visible = true;
    this._loot.visible = true;
    if (item) {
      log('in lootWindow, we have an item, creating a new lootItem')
      log(`the item ${item}`)
      //this._lootitem = new Loot(this._canvas, item, 40, this._actionbar,this._backpack, this._player, this, this._npc)
      //this._lootitem = new Loot(item, 40, this._actionbar,this._backpack, this, this._npc)
      this._lootitem = new Item(new Texture("images/looticons/manavial.png"), 40, 1219, 2154, "Mana Vial", "consumable", 50, "consumable", 
                                null, null, null, null, this, this._npc)
      //{ image: "src/images/looticons/rustyaxe.png", slot: 1, srcw: 1219, srch: 2154, desc: "Rusty Sword", price: 20, itemtype: "weapon" },
      //let potion = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
      //  element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound)
      this._lootitem.show()
    } else {
      log('in lootWindow we do not have an item so calling getLoot')
      this.getloot()
    }

  }

  public hide() {
    //log('in hide method')
    this._loot.visible = false;
    //log('calling hide on the lootitem')
    this._lootitem.hide()
  }
}