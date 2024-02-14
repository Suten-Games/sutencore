import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { writeToCl } from "../gameFunctions/writeToCL";
import { joinSocketsServer } from "./wsConnection";

export async function connectToServer(ui: UI, player: Player) {
    log(`debug: 8 Inside connectToServer`)

    try {
        await joinSocketsServer(
            player,
            ui.cl
        );
    } catch (error) {
        writeToCl(`:(  Game socket failed to load  :(`, `Please refresh/reload the scene`)

        return;
    }
}