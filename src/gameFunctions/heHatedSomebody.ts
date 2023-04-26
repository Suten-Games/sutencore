import { MobState } from "src/components/mobStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";

const obj = Singleton.getInstance();

export function heHatedSomebodyButTheyLeft(mobstate: MobState) {
    log(
        `Battle (${mobstate?.id}) is rejoined! Setting mosthated to me because the old player is missing or dead.`
    );

    mobstate.mosthated = obj.playeraddress;
    mobstate.clicked = false;
    mobstate.playerdead = false;
    mobstate.timeout = false;
    mobstate.trackplayer = false;

    let id = mobstate?.id;
    let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

    if (exists > -1) {
        log(`${mobstate?.id} exists 1 ${exists}`);
        obj.localmobstate.splice(exists, 1, mobstate);
    } else {
        obj.localmobstate.push(mobstate);
    }
}