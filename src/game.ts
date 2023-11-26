import { BaseScene } from "./baseScene";
import { loadSutenQuest } from "./gameFunctions/loadSutenQuest";
import { UI } from "./gameUI/ui";
// import { BuilderHUD } from "./modules/BuilderHUD";
// import resources from "./resources";

// SETUP UI
var ui = UI.getInstance();

// SETUP STAGE
if (typeof BaseScene == 'function') {
  new BaseScene()
}

// START GAME
loadSutenQuest(ui);

// const positionalorc = new Entity();
// const orcmodel = resources.models.orcwarrior
// positionalorc.addComponentOrReplace(orcmodel);
// const initialposition = new Transform({
//   position: new Vector3(12, 0, 1),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// chest_Base_Iron_01.addComponentOrReplace(initialposition);
// engine.addEntity(positionalorc);


// const hud: BuilderHUD = new BuilderHUD();
// hud.attachToEntity(positionalorc)