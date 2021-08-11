import { Item } from "../gameObjects/item";
import resources from "../resources";
import { SoundBox } from "../gameClasses/soundbox";
import { Singleton } from "../gameClasses/playerDetail";
// import { CharWindow } from "./charWindow";
// import * as ui from "../../node_modules/@dcl/ui-utils/index";

export class BackPack {
    private _canvas;
    private _image;
    private _bp;
    private _charbutton;
    private _isOpen: boolean;
    private _slot10;
    private _slot11;
    private _slot12;
    private _slot13;
    private _slot14;
    private _slot15;
    private _slot16;
    private _slot17;
    private _slot18;
    private _slot19;
    private _slot20;
    private _slot21;
    private _slot22;
    private _slot23;
    private _slot24;
    private _slot25;
    private _mybackpackcontents: Array<Item>;
     private _playerclass;
//     private _player;
     private _charwindow;

    private backpacksound = new SoundBox(
      new Transform({ position: new Vector3(8, 0, 8) }),
       resources.sounds.backpack,
       false
     );

     constructor(canvas, image) {
      let obj = Singleton.getInstance()
      this._canvas = canvas;
      this._image = image;
      this._bp = new UIImage(this._canvas, this._image);
      this._bp.hAlign = "right"
      this._bp.vAlign = "center";
      this._bp.width = "20%";
      //this._bp.width = "21%";
      this._bp.height = "60%";
      //this._bp.height = "60%";
      //this._bp.sourceWidth = 720;
      this._bp.sourceWidth = 665;
      //this._bp.sourceHeight = 991;
      this._bp.sourceHeight = 951;
      this._bp.visible = false;
      this._mybackpackcontents = obj.playerbackpack
    //   this._isOpen = false;
    //   this._charwindow = new CharWindow(canvas,resources.interface.characterScreen,'Adventurer')

      this._charbutton = new UIImage(this._canvas, resources.interface.characterButton)
      this._charbutton.hAlign = "right"
      this._charbutton.vAlign = "center";
      this._charbutton.positionY = "-40%";
      this._charbutton.positionX = "-20%";
      this._charbutton.sourceWidth = 1309;
      this._charbutton.sourceHeight = 548;
      this._charbutton.visible = false;
      this._charbutton.onClick = new OnPointerDown(
        (e) => {
          this._charwindow.flip()
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: "Open Character Window",
        }
      );
     }


//     public resetCharWindow() {
//       //log('resetting char window')
//       let obj = Singleton.getInstance() 
//       if(obj.playerclass == 'Rogue') {
//         this._charwindow = new CharWindow(this._canvas,resources.interface.rogueScreen,'Rogue')
//       } else if (obj.playerclass == 'Warrior') {
//         this._charwindow = new CharWindow(this._canvas,resources.interface.warriorScreen,'Warrior')
//       } else if (obj.playerclass == 'Berzerker') {
//         this._charwindow = new CharWindow(this._canvas,resources.interface.berzerkerScreen,'Berzerker')
//       } else {
//         this._charwindow = new CharWindow(this._canvas,resources.interface.characterScreen,'Adventurer')
//       }
//       this._charwindow.setCharLoot()
//     }

//     public selectSlot(potion: Item): number {
//       if(!this._slot10) {
//         this._slot10 = 'filled'
//         potion.updateLoc(10)
//         this._mybackpackcontents.push(potion)
//         //log('pushing potion to backpack ', potion)
//         return 10
//       } else if (!this._slot11) {
//         this._slot11 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(11)
//         return 11
//       } else if (!this._slot12) {
//         this._slot12 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(12)
//         return 12
//       } else if (!this._slot13) {
//         this._slot13 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(13)
//         return 13
//       } else if (!this._slot14) {
//         this._slot14 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(14)
//         return 14
//       } else if (!this._slot15) {
//         this._slot15 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(15)
//         return 15
//       } else if (!this._slot16) {
//         this._slot16 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(16)
//         return 16
//       } else if (!this._slot17) {
//         this._slot17 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(17)
//         return 17
//       } else if (!this._slot18) {
//         this._slot18 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(18)
//         return 18
//       } else if (!this._slot19) {
//         this._slot19 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(19)
//         return 19
//       } else if (!this._slot20) {
//         this._slot20 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(20)
//         return 20
//       } else if (!this._slot21) {
//         this._slot21 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(21)
//         return 21
//       } else if (!this._slot22) {
//         this._slot22 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(22)
//         return 22
//       } else if (!this._slot23) {
//         this._slot23 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(23)
//         return 23
//       } else if (!this._slot24) {
//         this._slot24 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(24)
//         return 24
//       } else if (!this._slot25) {
//         this._slot25 = 'filled'
//         this._mybackpackcontents.push(potion)
//         potion.updateLoc(25)
//         return 25
//       } else {
//         return 50
//       }
//     }

    private getcontents() {
      //log('show contents of backpack')
      this._mybackpackcontents.forEach(potion => {
        potion.show()
      })
    }

    get visible() {
      return this._bp.visible
    }

    set bpopen(val) {
      this._isOpen = val
    }
    
    get bpopen() {
      return this._isOpen;
    }

    set playerclass(val) {
      this._playerclass = val
    }

    get playerclass() {
      return this._playerclass
    }

//     public showCharWindow(weapon, weapontext, combatlog, actionbar, backpack, lootimage, slot) {
//       log('calling charwindow.setcharloot from the backback showcharwindow function')
//       this._charwindow.setCharLoot(weapon, weapontext, combatlog, actionbar, backpack, lootimage, slot)
//         //log('calling charwindow.flip from the backpack showcharwindow function')
//       this._charwindow.flip()
//     }

//     public bootLoadBackPack(data) {
//       //log('loading player backpack on boot ', data)
//       data.forEach(element => {
//         if(element.slot) {
//           let item = new Item(new Texture(element.image), element.slot)
//           this.setSlot(element.slot)
//           item.setslot = element.slot
//           item.updateLoc(element.slot)
//           this._mybackpackcontents.push(item)
//         }
//       });
//     }

    private setSlot(slot:number){
      if(slot == 10) {
        this._slot10 = 'filled';
      } else if (slot == 11) {
        this._slot11 = 'filled';
      } else if (slot == 12) {
        this._slot12 = 'filled';
      } else if (slot == 13) {
        this._slot13 = 'filled'
      } else if (slot == 14) {
        this._slot14 = 'filled'
      } else if (slot == 15) {
        this._slot15 = 'filled'
      } else if (slot == 16) {
        this._slot16 = 'filled'
      } else if (slot == 17) {
        this._slot17 = 'filled'
      } else if (slot == 18) {
        this._slot18 = 'filled'
      } else if (slot == 19) {
        this._slot19 = 'filled'
      } else if (slot == 20) {
        this._slot20 = 'filled'
      } else if (slot == 21) {
        this._slot21 = 'filled'
      } else if (slot == 22) {
        this._slot22 = 'filled'
      } else if (slot == 23) {
        this._slot23 = 'filled'
      } else if (slot == 24) {
        this._slot24 = 'filled'
      } else if (slot == 25) {
        this._slot25 = 'filled'
      }
    }

//     public resetSlot(slot:number) {
//       if(slot == 10) {
//         this._slot10 = null;
//       } else if (slot == 11) {
//         this._slot11 = null;
//       } else if (slot == 12) {
//         this._slot12 = null;
//       } else if (slot == 13) {
//         this._slot13 = null
//       } else if (slot == 14) {
//         this._slot14 = null
//       } else if (slot == 15) {
//         this._slot15 = null
//       } else if (slot == 16) {
//         this._slot16 = null
//       } else if (slot == 17) {
//         this._slot17 = null
//       } else if (slot == 18) {
//         this._slot18 = null
//       } else if (slot == 19) {
//         this._slot19 = null
//       } else if (slot == 20) {
//         this._slot20 = null
//       } else if (slot == 21) {
//         this._slot21 = null
//       } else if (slot == 22) {
//         this._slot22 = null 
//       } else if (slot == 23) {
//         this._slot23 = null
//       } else if (slot == 24) {
//         this._slot24 = null
//       } else if (slot == 25) {
//         this._slot25 = null
//       }
//       let i = this._mybackpackcontents.map(x => x.slot()).indexOf(slot)
//       this._mybackpackcontents.splice(i,1) 
//     }
  
    public show() {
      this._bp.visible = true;
      this._charbutton.visible = true;
      this.getcontents()
      this.backpacksound.play()
      this.bpopen = true
     
    }
  
//     public hide() {
//       this.bpopen = false
//       this._bp.visible = false;
//       this._charbutton.visible = false;
//       this._mybackpackcontents.forEach(potion => {
//         potion.hide()
//       })

//     }
}