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
    //new Transform({ position: new Vector3(-12.8, 1.2, -11.6) }),
    new Transform({ position: new Vector3(79, 0, 79)}),
    resources.sounds.shopkeeper,
    false
  );

  constructor(gameCanvas: UICanvas, tradeWindow: TradeWindow, combatLog: CombatLog) {
    this._cl = combatLog;

    log('in shopkeeper.ts');

    this.shopkeeper = new SutenNpc(
      resources.sounds.shopkeeper,
      resources.models.peasant,
      22,
      new Vector3(-12.8, 1.2, -11.6),
      Quaternion.Euler(0, 90, 0),
    );

    //engine.addEntity(this.shopkeeper)

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
