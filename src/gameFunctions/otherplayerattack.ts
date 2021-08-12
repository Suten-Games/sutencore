import { MobState } from "../components/mobStateComponent";
import { SceneState } from "./npcFSM";
import { CombatLog } from "../gameUI/combatLog";


export function otherplayerattack(s: SceneState, cl: CombatLog) {
  const mobstate = s.npc.getComponent(MobState);

  //log(`otherplayerattack.ts => Foreign attacker for this mob battle true`)

  mobstate.battle = true;
}
