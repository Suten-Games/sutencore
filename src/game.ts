import { UI } from "./gameUI/ui";

const local: boolean = false;
const apiUrl = local
  ? "http://localhost:8080/player"
  : "https://sutenquestapi.azurewebsites.net/player";


// SETUP UI
const ui = new UI();
let lowerCaseAddress: string = "";

