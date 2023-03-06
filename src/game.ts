import resources from "./resources";
// import { CombatLog } from "./gameUI/combatLog";
// import { ActionBar } from "./gameUI/actionBar";
// import { BackPack } from "./gameUI/backPack";
import { Khepra } from "./gameUI/khepra";

const local: boolean = false;

const apiUrl = local
  ? "http://localhost:8080/player"
  : "https://sutenquestapi.azurewebsites.net/player";

const gameCanvas = new UICanvas();
// const combatLog = new CombatLog(gameCanvas);

// //SETUP UI
// const actionBar = new ActionBar(gameCanvas, resources.interface.blueActionBar);
// const backPack = new BackPack(gameCanvas, resources.interface.blueBackpack);
//const khepra = new Khepra(gameCanvas, resources.interface.khepra, backPack);
const khepra = new Khepra(gameCanvas, resources.interface.khepra);
let lowerCaseAddress: string = "";