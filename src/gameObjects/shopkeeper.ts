import resources from "../resources";
import { Npc } from "./npc";
import { LifeItem } from "../components/lifeItemComponent";
//import * as ui from "../../node_modules/@dcl/ui-utils/index";
import { Singleton } from "../gameClasses/playerDetail";
import { SoundBox } from "../gameClasses/soundbox";
//import { BuilderHUD } from "../modules/BuilderHUD";

export class LoadShopKeeper {
  private gameCanvas;
  private tradeWindow;
  private shopkeeper;
  private _address;
  private _balance;
  private _cl;

  private shopping = new SoundBox(
    new Transform({ position: new Vector3(-12.8, 1.2, -11.6) }),
    resources.sounds.shopkeeper,
    false
  );

  constructor(gameCanvas, tradeWindow, combatLog) {
    this._cl = combatLog;

    this.shopkeeper = new Npc(
      resources.sounds.peasantunlock,
      resources.models.peasant,
      22,
      new Vector3(-12.8, 1.2, -11.6),
      Quaternion.Euler(0, 90, 0),
      gameCanvas
    );

    this.shopkeeper.addComponent(
      new OnPointerDown(
        (e) => {
          this.shopping.play();
          var obj = Singleton.getInstance();
          if (tradeWindow.visible) {
            tradeWindow.hide();
            this.shopping.stop();
            let song = obj.playRandom();
            song.play();
          } else {
            tradeWindow.show();
          }
        },
        {
          button: ActionButton.PRIMARY,
          showFeedback: true,
          hoverText: "Trade",
        }
      )
    );
    this.shopkeeper.addComponent(new LifeItem());
  }

  hide() {
    this.shopkeeper.hide();
  }

  balance(val) {
    this._balance = val;
  }

  address(val) {
    this._address = val;
  }
}
