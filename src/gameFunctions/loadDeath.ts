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
import { DeathScene } from "../gameObjects/deathScene";
import { reloadGame, unloadSystems } from "./reloadGame";
import { PeasantDialog } from "src/gameUI/oldManDialog";

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
  //let deathscene = new DeathScene();
  let upperDuat

    //new NoEthScene();

    let soundbox = new SoundBox(
      new Transform({ position: new Vector3(8, 0, 8) }),
      resources.sounds.deathzone,
      true
    );
    soundbox.addComponent(new DeathItem());
    soundbox.play();

  //let loading = new ui.LoadingIcon(10)

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
  // const dialog = new PeasantDialog(gameCanvas);



  // dialog.onDialogStarted = () =>
  //   (anpu.getComponent(OnPointerDown).showFeedback = false);

  // dialog.onDialogEnded = () => {
  //   log('loadDeath.ts: in onDialog Ended, healing player')
  //   movePlayerTo({ x: 80, y: 0.1, z: 80 })
  //   player.alive = true;
  //   obj.inDuat = false;
  //   //player.heal(5000, false);
  //   player.resurrect()
  //   combatLog.text = ''
  //   combatLog.text = ''
  //   combatLog.text = ''
  //   combatLog.text = ''
  //   combatLog.text = ''
  //   combatLog.text = `You have been resurrected by Anpu.`;
  //   combatLog.text = `You have entered Saqqara.`;
  //   combatLog.text = `Press 'esc' to lock/unlock your mouse.`
  //   deathscene.unloadScene()
  //   upperDuat.unloadScene()

  //   //log('turn back On Player HP Bar')
  //   player.showhpbar()
  //   player.xpcheck()

  //   //unloadSystems()
  //   //log('Calling reloadGame in loadDeath.ts tradewindow is currently: ', tradewindow)
  //   //reloadGame(gameCanvas, actionbar, backpack, player, combatLog, shopkeeper, tradewindow)
  //   reloadGame(gameCanvas, actionbar, backpack, player, combatLog, tradewindow)
  // };

  // dialog.onSequenceComplete = () => {
  //   log("loadDeath.ts: in onSequenceCompleted");
  // };

  // dialog.onPoorChoiceMade = () => {
  //   //oldmanrivers.battle = true;
  //   log('turn on fight mode')
  // };

  // dialog.npcWon = () => {
  //   log("npc won");
  // };

  // dialog.playerWon = () => {
  //   log("player won");
  // };

  // // export let myNPC = new NPC(
  // //   { position: new Vector3(10, 0.1, 10) }, 
  // //   'models/CatLover.glb', 
  // //   () => {
  // //      myNPC.talk(ILoveCats, 0)
  // //   }
  // // )

  // const anpu = new Orc(
  //   '123456',
  //   'Anpu',
  //   1000,
  //   false,
  //   500,
  //   resources.sounds.peasantunlock,
  //   resources.models.anpu,
  //   200,
  //   100,
  //   new Vector3(61, 30.1, 26),
  //   Quaternion.Euler(0, 90, 0),
  //   [[61, 30.1, 26], [61, 30.1, 35], [42, 30.1, 35], [42, 30.1, 26]],
  //   gameCanvas,
  //   actionbar,
  //   backpack,
  //   player
  // )
  // anpu.addComponent(new DeathItem())
  // let animator = anpu.getComponent(Animator);
  // let idle = animator.getClip("idle");
  // idle.play()

  // anpu.addComponentOrReplace(
  //   new OnPointerDown(
  //     (e) => {
  //       dialog.run();
  //       log('load death dialog: ', e)
  //     },
  //     {
  //       button: ActionButton.PRIMARY,
  //       hoverText: "Speak to Anpu",
  //       showFeedback: true,
  //     }
  //   )
  // );

  // //log('loadDeath.ts:163 -> moving player to the Upper Duat 8,50,8')
  // //movePlayerTo({ x: 8, y: 50, z: 8 })
  // movePlayerTo({ x: 11, y: 0.1, z: 12 })
  

  }
  