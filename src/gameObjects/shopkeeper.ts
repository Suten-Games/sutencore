import resources from "../resources";
import { SutenNpc } from "./sutennpc";
import { LifeItem } from "../components/lifeItemComponent";
//import * as ui from "../../node_modules/@dcl/ui-utils/index";
import { Singleton } from "../gameUtils/playerDetail";
import { SoundBox } from "../gameUtils/soundbox";
import { CombatLog } from "../gameUI/combatLog";
import { TradeWindow } from "../gameUI/tradeWindow";

export class LoadShopKeeper {
  private shopkeeper;
  private _cl;

  private shopping = new SoundBox(
    new Transform({ position: new Vector3(-12.8, 1.2, -11.6) }),
    resources.sounds.shopkeeper,
    false
  );

  constructor(gameCanvas: UICanvas, tradeWindow: TradeWindow, combatLog: CombatLog) {
    this._cl = combatLog;

    this.shopkeeper = new SutenNpc(
      resources.sounds.peasantunlock,
      resources.models.peasant,
      22,
      new Vector3(-12.8, 1.2, -11.6),
      Quaternion.Euler(0, 90, 0),
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

}
