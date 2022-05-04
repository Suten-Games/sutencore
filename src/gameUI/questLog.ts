import { Singleton } from "../gameUtils/playerDetail";
import resources from "../resources";

export class QuestLog {
  private _base;
  private _open: boolean;
  private _closebutton: any;
  private _desc1: any;
  private _charisma: any;
  private _questtext: string;

  constructor(canvas:any, image:any) {
    var obj = Singleton.getInstance();

    this._base = new UIImage(canvas, image);
    this._base.hAlign = "left";
    this._base.vAlign = "center";
    this._base.width = "28%";
    this._base.height = "100%";
    this._base.positionY = "10.2%";
    this._base.positionX = "12.5%";
    this._base.sourceWidth = 1053;
    this._base.sourceHeight = 1712;
    this._base.visible = false;

    this._desc1 = new UIText(canvas);
    this._desc1.fontSize = 14;
    this._desc1.width = 120;
    this._desc1.height = 30;
    this._desc1.hAlign = "left";
    this._desc1.vAlign = "center";
    this._desc1.positionY = "38%";
    this._desc1.positionX = "17%";
    this._desc1.value = `${this._questtext}`;
    this._desc1.visible = false;


    this._charisma = new UIText(canvas);
    this._charisma.fontSize = 10;
    this._charisma.width = 120;
    this._charisma.height = 30;
    this._charisma.hAlign = "left";
    this._charisma.vAlign = "center";
    this._charisma.positionY = "-14.8%";
    this._charisma.positionX = "20%";
    this._charisma.value = "Charisma:";
    this._charisma.visible = false;

    
    this._closebutton = new UIImage(canvas, resources.interface.closebutton);
    this._closebutton.hAlign = "left";
    this._closebutton.vAlign = "center";
    this._closebutton.width = "1%";
    this._closebutton.height = "3%";
    this._closebutton.positionX = "35.8%";
    this._closebutton.positionY = "44.8%";
    this._closebutton.sourceWidth = 93;
    this._closebutton.sourceHeight = 94;
    this._closebutton.visible = false;
    this._closebutton.onClick = new OnPointerDown(
      (e) => {
        this._base.visible = false;
        this._closebutton.visible = false;
        this._desc1.visible = false;
        this._charisma.visible = false;
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Close",
      }
    );
  }

  public show() {
    this._base.visible = true;
  }

  public hide() {
    this._base.visible = false;
  }

  get questtext() {
      return this._questtext;
  }

  set questtext(val:string) {
      this._questtext = val
  }

  public quest(val:string, desc:string) {
    this._questtext = val
    this._desc1.value = this._questtext
    this._charisma.value = desc

  }

  public flip() {
    if (this._open) {
      this._base.visible = false;
      this._open = false;
      this._closebutton.visible = false;
      this._desc1.visible = false;
      this._charisma.visible = false;
    } else {
      this._base.visible = true;
      this._closebutton.visible = true;
      this._open = true;
      this._desc1.visible = true;
      this._charisma.visible = true;
    }
  }
}
