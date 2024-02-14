import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";
import { UI } from "src/gameUI/ui";
import { connectToServer } from "../gameServer/connectToServer";
import { deathCheck } from "./deathCheck";
import { loadPlayerItems } from "./loadPlayerItems";
import { newPlayer } from "./newPlayer";
import { populateObj } from "./populateObj";
import { loadPlayerFactions } from "./loadPlayerFactions";
import { fetchPlayerQuests } from "./fetchPlayerQuests";

export async function playerSearch(json: PlayerState, ui: UI, lowerCaseAddress: string, player: Player) {
    let playerJson = json;

    if (json.message === "Could not find player by address") {
        playerJson = await newPlayer(ui, lowerCaseAddress, player);
    } else {
        const playerIsDead = deathCheck(ui, json, player);
        if (playerIsDead) {
            return; // Exit if the player is dead
        }

        loadPlayerItems(ui, json);
        populateObj(playerJson, player);
        loadPlayerFactions(player, playerJson);
        await fetchPlayerQuests(player);
    }

    await connectToServer(ui, player);
}
