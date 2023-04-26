import { Singleton } from "src/gameObjects/playerDetail";
import { SceneState } from "./npcFSM";
import { CombatLog } from "src/gameUI/combatLog";
import { MobState } from "src/components/mobStateComponent";
import { heHatedSomebodyButTheyLeft } from "./heHatedSomebody";
import { heHatedNoOneThenICameAlong } from "./heHatedNoOne";
import { heHatesMeAndWeBattlin } from "./heHatesMe";


const obj = Singleton.getInstance();

export function attack(s: SceneState, cl: CombatLog) {
    const mob = s.npc
    const mobstate = s.npc.getComponent(MobState);

    if (mobstate.mosthated == null) {
        heHatedNoOneThenICameAlong(mobstate)
    } else if ((mobstate.mosthated = obj.playeraddress)) {
        heHatesMeAndWeBattlin(mobstate, mob, s)
    } else {
        if (mobstate.battle == false) {
            heHatedSomebodyButTheyLeft(mobstate)
        } else {
            log(`attack.ts:34 Exiting attack loop for now because he hates someone else`);
            log(`TODO: Let me pop him but he won't pop me unless I hurt him more than who he popping`)
            log(`TODO: then he'll hate me enough to pop me instead`)
            return;
        }
    }
}