import { MobState } from "src/components/mobStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";


const obj = Singleton.getInstance();

export function heHatedNoOneThenICameAlong(mobstate: MobState) {
    log(
        `Battle (${mobstate?.id}) is joined! Setting mosthated to me because he doesn't hate anyone yet.`
    );

    mobstate.mosthated = obj.playeraddress;
    mobstate.mobdead = false;
    mobstate.clicked = false;
    mobstate.playerdead = false;
    mobstate.timeout = false;
    mobstate.trackplayer = false;

    let id = mobstate?.id;
    let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

    if (exists > -1) {
        //log("exists 1: ", exists);
        obj.localmobstate.splice(exists, 1, mobstate);
    } else {
        log(`heHatedNoOne.ts: Adding ${mobstate.mobname} to localmobstate`)
        obj.localmobstate.push(mobstate);
    }
}