import { BaseScene } from "./baseScene";
import { loadSutenQuest } from "./gameFunctions/loadSutenQuest";
import { UI } from "./gameUI/ui";

// SETUP UI
var ui = UI.getInstance();

// SETUP STAGE
if (typeof BaseScene == 'function') {
  new BaseScene()
}

// START GAME
loadSutenQuest(ui);