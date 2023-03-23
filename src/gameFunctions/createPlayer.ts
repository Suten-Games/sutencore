import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";

let lowerCaseAddress: string = "";

export async function createDefaultPlayer(ui:UI ) {
    log(`debug: 2 Inside createPlayer`)

    let player = new Player(
        lowerCaseAddress,
        42,
        ui.gc,
        ui.cl,
        ui.ab,
        ui.bp
    );

    return player
}