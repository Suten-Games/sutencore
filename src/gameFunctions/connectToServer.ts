import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { writeToCl } from "./writeToCL";
import { joinSocketsServer } from "./wsConnection";

export async function connectToServer(ui: UI,json: PlayerState, player: Player) {
    log(`debug: 8 Inside connectToServer`)

    try {
        log('joining socket server')
        let socket = await joinSocketsServer(
            ui.gc,
            ui.ab,
            ui.bp,
            player,
            ui.cl
        );
    } catch (error) {
        writeToCl(ui, `:(  Game socket failed to load  :(`, `Please refresh/reload the scene`)
        //failedstart = true;

        return;
    }
}