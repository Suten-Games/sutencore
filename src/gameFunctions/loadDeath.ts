import { movePlayerTo } from "@decentraland/RestrictedActions";
//import utils from '../../node_modules/decentraland-ecs-utils/index'
//import * as ui from '../../node_modules/@dcl/ui-utils/index'
import resources from "../resources";
import { MobState } from "../components/mobStateComponent";
import { Orc } from "../gameObjects/orc";
import { Player } from "../gameObjects/player";
import { LifeItem } from "../components/lifeItemComponent";
import { DeathItem } from "../components/deathItemComponent";
import { VictoryItem } from "../components/victoryItemComponent";
import { TradeWindow } from "../gameUI/tradeWindow";
import { SoundBox } from "../gameUtils/soundbox";
import { Singleton } from "../gameUtils/playerDetail";

const TURN_TIME = 0.3;

export function unloadLife() {
  log('loadDeath.ts: Unloading Life 1')
    unloadSystems()
    const items = engine.getComponentGroup(LifeItem);
    while (items.entities.length) {
      engine.removeEntity(items.entities[0]);
    }
}

export function unloadVictory() {
  log('loadDeath.ts: Unloading Victory')
  unloadSystems()
  const items = engine.getComponentGroup(VictoryItem);
  while (items.entities.length) {
    engine.removeEntity(items.entities[0]);
  } 
}

export function loadDeath(gameCanvas,player:Player,combatLog, actionbar, backpack, tradewindow:TradeWindow) {
    var obj = Singleton.getInstance();

    //new NoEthScene();

    let soundbox = new SoundBox(
      new Transform({ position: new Vector3(8, 0, 8) }),
      resources.sounds.deathzone,
      true
    );
    soundbox.addComponent(new DeathItem());
    soundbox.play();

    const items = engine.getComponentGroup(LifeItem);
    while (items.entities.length) {
      engine.removeEntity(items.entities[0]);
    }

    const orcs = engine.getComponentGroup(MobState);
    while (orcs.entities.length > 0) {
      engine.removeEntity(orcs.entities[0])
    }

    player.hidehpbar()

    let deathNotice = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, 8000, 8000, true)
    deathNotice.addText('You have died.', 0, 130, Color4.Red(), 30)
    deathNotice.addText("Seek Redemption in the Duat.", 0, 100)
    deathNotice.addButton(
      'Go Now',
      0,
      -30,
      () => {
        log('Sending player to the Duat')
        deathNotice.hide()
        teleportTo('-26,78')
      },
      ui.ButtonStyles.E
    )

    deathNotice.addButton(
      'Go Later',
      0,
      -90,
      () => {
       deathNotice.hide()
    },
    ui.ButtonStyles.F
    )

    deathNotice.show()
  

  }
  