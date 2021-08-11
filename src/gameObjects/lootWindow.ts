// import resources from "../resources";
// import { Orc } from "./orc";
// import { LifeItem } from "../itemflags/deathItem";
// import { Item } from "./item";

// export class LootWindow extends Entity {
//     private _canvas;
//     private _image;
//     private _loot;
//     //private _potion1;
//     private _actionbar;
//     private _backpack;
//     private _player;
//     private _lootitem;
//     private _activeloot;
//     private _peonlootpool = [
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion, 
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.sandBeetle,resources.loot.rustysword
//     ]
//     private _gruntlootpool = [
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion,
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion,
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion, 
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.rustyaxe
//     ]      
//     private _archerlootpool = [
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion, 
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.sandBeetle,resources.loot.rustydagger
//     ]
//     private _warriorlootpool = [
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion, 
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.sandBeetle,resources.loot.orctooth,resources.loot.rustydagger 

//     ]
//     private _shamanlootpool = [
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion, 
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.sandBeetle,resources.loot.orctooth,resources.loot.rustydagger 
//     ]
//     private _riverlandslootpool = [
//       resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion,resources.loot.bluePotion, 
//       resources.loot.greenPotion,resources.loot.greenPotion,resources.loot.greenPotion, resources.loot.greenPotion, 
//       resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,resources.loot.redPotion,
//       resources.loot.rustyaxe, resources.loot.rustydagger, resources.loot.rustysword
//     ]
//     private _testpool = [
//       resources.loot.rustydagger, resources.loot.rustydagger, resources.loot.rustydagger, resources.loot.rustydagger, 
//       resources.loot.rustydagger, resources.loot.orctooth,resources.loot.rustydagger, resources.loot.rustysword, 
//       resources.loot.rustyaxe
//     ]
//     private _testpool2 = [
//       resources.loot.bluePotion, resources.loot.orctooth, resources.loot.sandBeetle
//     ]
//     private _chieflootpool = [
//       resources.loot.greekSword
//     ]
//     private _looted = false
//     private _npc

//     constructor(canvas, image, actionBar, backPack, player, orc:Orc) {
//       super()
//       this._canvas = canvas;
//       this._image = image;
//       this._loot = new UIImage(this._canvas, this._image);
//       this._loot.hAlign = "left"
//       this._loot.vAlign = "center";
//       this._loot.width = "50%"; //Old Icons
//       this._loot.height = "84%";
//       this._loot.positionY = "10.2%";
//       this._loot.positionX = "6%";
//       this._loot.sourceWidth = 1440; //Old Style
//       this._loot.sourceHeight = 1440; //Old Style
//       this._loot.visible = false;
//       this._actionbar = actionBar;
//       this._backpack = backPack;
//       this._player = player;
//       this._npc = orc
//       // switch (this._npc.mobname) {
//       //   case 'Sand Orc Peon':
//       //     this._activeloot = this._peonlootpool[Math.floor(Math.random() * this._peonlootpool.length)] 
//       //     break;
//       //   case 'Orc Peon':
//       //     this._activeloot = this._peonlootpool[Math.floor(Math.random() * this._peonlootpool.length)] 
//       //     break;
//       //   case 'Orc Grunt':
//       //     this._activeloot = this._gruntlootpool[Math.floor(Math.random() * this._gruntlootpool.length)] 
//       //     break;
//       //   case 'Sand Orc Archer':
//       //     this._activeloot = this._archerlootpool[Math.floor(Math.random() * this._archerlootpool.length)] 
//       //     break;    
//       //   case 'Orc Warrior':
//       //     this._activeloot = this._warriorlootpool[Math.floor(Math.random() * this._warriorlootpool.length)] 
//       //     break;
//       //   case 'Orc Shaman':
//       //     this._activeloot = this._shamanlootpool[Math.floor(Math.random() * this._shamanlootpool.length)] 
//       //     break;
//       //   case 'Orc Chief':
//       //     this._activeloot = this._chieflootpool[Math.floor(Math.random() * this._chieflootpool.length)] 
//       //     break;
//       //   case 'Riverlands Orc Archer':
//       //     //this._activeloot = this._riverlandslootpool[Math.floor(Math.random() * this._riverlandslootpool.length)]
//       //     this._activeloot = this._testpool[Math.floor(Math.random() * this._testpool.length)]
//       //     break;
//       //   default:
//       //     break;
//       // }
//       this.addComponent(new LifeItem())
//     }

//     async getloot() {
//       //log('in get loot')
//       if (this._looted) {
//         this._looted = false;
//       } 

//       let json
//       let mobtier = 1

//       switch (this._npc.mobname) {
//         case 'Sand Orc Peon':
//           mobtier = 1
//           break;
//         case 'Orc Peon':
//           mobtier = 1
//           break;
//         case 'Orc Grunt':
//           mobtier = 1
//           break;
//         case 'Sand Orc Archer':
//           mobtier = 1
//           break;    
//         case 'Orc Warrior':
//           mobtier = 1
//           break;
//         case 'Orc Shaman':
//           mobtier = 1
//           break;
//         case 'Orc Chief':
//           mobtier = 1
//           break;
//         case 'Riverlands Orc Archer':
//           mobtier = 1
//           break;
//         default:
//           mobtier = 1
//           break;
//       }

//       try {
//         let response = await fetch("https://sutenquestapi.azurewebsites.net/loot/" + mobtier + '/' + 123456);
//         json = await response.json();
//       } catch (error) {
//         log("error: ", error.toString());
//       }

//       log('api response: ', json)

//       // api response:
//       // { id: "60fc83b3eb1e240fdefcdd17", name: "Sand Beetle", shape: "sandbeetle.png", width: 345, height: 400 }
//       // height: 400
//       // id: "60fc83b3eb1e240fdefcdd17"
//       // name: "Sand Beetle"
//       // shape: "sandbeetle.png"
//       // width: 345

//       if(!json.shape) { json.shape = "sandbeetle.png"}

//       let lootimg = "src/images/looticons/" + json.shape
//       log('lootimg: ', lootimg)
//       this._lootitem = new Item(new Texture(lootimg), 40, json.width, json.height, json.name, json.type, json.price, json.itemtype, json.spellshape, 
//       json.spellstart, json.spellend, json.sound, this, null)
//       //this._lootitem = new Loot(this._canvas, this._activeloot, 40, this._actionbar,this._backpack, this._player, this, this._npc)
//       //this._lootitem = new Loot(this._activeloot, 40, this._actionbar,this._backpack, this, this._npc)
//       //this._lootitem = new Item(new Texture("src/images/looticons/manavial.png"), 40, 1219, 2154, "Mana Vial", "consumable", 50, "consumable", null, null, null, null, this)
//       this._lootitem.show()
//     }

//     public sendtobp() {
//      // log(`${this._npc.id} lootWindow sendtobp`)
//       this._lootitem.sendToBackpack()
//     }

//     get looted() {
//       return this._looted
//     }

//     set looted(val:boolean) {
//       this._looted = val
//     }

//     get visible() {
//       return this._loot.visible
//     }

//     public flip(item=null) {
//       if(this._loot.visible) {
//         this.hide()
//       } else {
//         if(item) {
//           this.show(item)
//         } else {
//           this.show()
//         }
        
//         //log(`id: ${this._npc.id} Adding the lootallclick method`)
//         this._npc.addlootallclick()
//       }
//     }

//     public hidelootwindow() {
//       //log('clicked hide loot window')
//       this._loot.visible = false;
//       //this._lootitem.hide()
//     }
  
//     public show(item=null) {
//       //log('in show method')
//       this._loot.visible = true;
//       if(item) {
//         //this._lootitem = new Loot(this._canvas, item, 40, this._actionbar,this._backpack, this._player, this, this._npc)
//         //this._lootitem = new Loot(item, 40, this._actionbar,this._backpack, this, this._npc)
//         this._lootitem = new Item(new Texture("src/images/looticons/manavial.png"), 40, 1219, 2154, "Mana Vial", "consumable", 50, "consumable", null, null, null, null, this, this._npc)
//         //{ image: "src/images/looticons/rustyaxe.png", slot: 1, srcw: 1219, srch: 2154, desc: "Rusty Sword", price: 20, itemtype: "weapon" },
//         //let potion = new Item(new Texture(element.image), element.slot, element.srcw, element.srch, element.desc, element.type,
//         //  element.price, element.itemtype, element.spellshape, element.spellstart, element.spellend, element.sound)
//         this._lootitem.show()
//       } else {
//         this.getloot()
//       }
      
//       //this._potion1.show()
//     }
  
//     public hide() {
//       //log('in hide method')
//       this._loot.visible = false;
//       //log('calling hide on the lootitem')
//       this._lootitem.hide()
//     }
//   }
  