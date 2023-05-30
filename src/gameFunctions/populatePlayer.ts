import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";

export function populatePlayer(player:Player, json:PlayerState) {
    player.level = json.level;
    player.basedamage = json.basedamage;
    player.hp = json.hp;
    player.startinghp = json.hp;
    player.maxhp = json.maxhp;
    player.currentxp = json.currentxp;
    player.levelmax = json.levelmax;
}