import { PlayerState } from "src/components/playerStateComponent";
import { Player } from "src/gameObjects/player";

export function populatePlayer(player:Player, json:PlayerState) {
    //log(`POPULATE PLAYER: json.currentxp: ${json.currentxp} json.levelmax: ${json.levelmax}`)
    player.level = json.level;
    player.basedamage = json.basedamage;
    player.hp = json.hp;
    player.startinghp = json.hp;
    player.maxhp = json.maxhp;
    player.currentxp = json.currentxp;
    //log(`POPULATE PLAYER, player.currentxp: ${player.currentxp}`)
    player.levelmax = json.levelmax;
    //log(`POPULATE PLAYER, player.levelmax: ${player.levelmax}`)
    player.xpcheck()
}