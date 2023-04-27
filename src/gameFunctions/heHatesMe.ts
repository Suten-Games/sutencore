import { MobState } from "src/components/mobStateComponent";
import { SceneState } from "./npcFSM";
import { Npc } from "src/gameObjects/npc";
import { writeToCl } from "./writeToCL";
import { BossBattle } from "src/components/bossBattleComponent";
import { SecondaryTimeOut } from "src/components/secondaryTimeOutComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { createSoundBox } from "./createSoundBox";
import resources from "src/resources";
import { SpawnTimeOut } from "src/components/spawnTimerComponent";


const soundbox3 = createSoundBox(7, 0, 8, resources.sounds.playerHit2, false);
const soundbox4 = createSoundBox(7, 0, 8, resources.sounds.playerHit, false);
const killbox = createSoundBox(7, 0, 8, resources.sounds.killping, false);
const PUNCH_TIME = 2.2;
const PAUSE = 2.2;
const obj = Singleton.getInstance();

export function heHatesMeAndWeBattlin(mobstate: MobState, mob: Npc, s: SceneState) {
    const mobvisible = s.npc.getComponent(GLTFShape).visible;
    const camera = Camera.instance;
    let transform = mob.getComponent(Transform);

    //He hates me so we battlin'
    if (mobstate.mobdead || mobstate.playerdead || mobvisible == false) {
        //log("attack.ts: escaping out of attack.ts because the mob or the player is dead");

        return;
    }

    let newTarget = camera.position.clone();
    newTarget.y = newTarget.y - 1.75;
    transform.lookAt(newTarget);

    mob.mobfight()

    if (!mobstate.battle) {
        //Check to see if this is the boss fight
        if (mobstate.mobname == 'Orc Chief') {
            writeToCl(`The Sand Orc Chief has noticed you. Defend yourself!!`)
        }
        try {
            const bossbattle = s.npc.getComponent(BossBattle);
            if (bossbattle) {
                writeToCl(`The Sand Orc Chief has noticed you. Defend yourself!!`)
            }
        } catch {
            log(`Mob is not a boss`)
        }


        //log(`attack.ts:97 - ${mobstate.id} turning on showhpbar1`);
        mob.showhpbar();
        //log(`Setting intial mob location`)
        mobstate.position = s.transform.position;
        mobstate.rotation = s.transform.rotation;

        let id = mobstate?.id;
        let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

        if (exists > -1) {
            //log(`${mobstate?.id} exists 1 ${exists}`);
            obj.localmobstate.splice(exists, 1, mobstate);
        } else {
            obj.localmobstate.push(mobstate);
        }
    }

    //Keeping mobstate location synced

    if (!s.clicked) {
        if (
            !mob.hasComponent(SecondaryTimeOut) &&
            mob.getComponent(OnPointerDown).showFeedback === false
        ) {
            mob.getComponent(OnPointerDown).showFeedback = true;
        }

        if (!mob.hasComponent(SecondaryTimeOut)) {
            //adding a timeout for click delay, old one expired
            //This is a setting that should be tweaked depending on player class and level

            mobstate.battle = true;
            //mobstate.mobdead = false;
            mobstate.clicked = false;
            mobstate.playerdead = false;
            mobstate.timeout = true;

            //log(`attack.ts: 109 faking damage for now`)
            //mobstate.damage = .00001

            //log(`mobstate.damage ${mobstate.damage}`)

            //log(`player name: ${s.player.name}`)

            soundbox3.play();
            s.player.damage(mobstate.damage);

            if (mob.mobname == 'Orc Shaman') {
                writeToCl(`Your blood BOILS!! You take ${mobstate.damage} points of damage`)
            } else {
                writeToCl(`An ${s.npc.mobname} hits YOU for ${mobstate.damage} points of damage`)
            }


            //log(`currently being hit by ${s.npc.id}`)
            //log(`got popped for ${mobstate.damage} hp`)
            //log(`adding a timeout of ${PAUSE} for punch delay to ${s.npc.id}`);
            s.npc.addComponentOrReplace(new SecondaryTimeOut(PAUSE));
        }
    } else if (s.clicked) {
        //log(`attack.ts ${mob.id} has been clicked`);
        mob.mobhit()

        if (!s.npc.hasComponent(SecondaryTimeOut)) {
            soundbox4.play();
            let nowloc = [
                s.transform.position.x,
                s.transform.position.y,
                s.transform.position.z,
            ];
            let nowrot = [
                s.transform.rotation.x,
                s.transform.rotation.y,
                s.transform.rotation.z,
            ];

            if (s.player.basedamage === undefined) {
                //log('attack.ts: setting default basedamage for player ', s.player)
                s.player.basedamage = 1;
            }

            let damage = s.player.basedamage * Math.round(Math.random() * 3);

            let mobhp = mob.takedamage(damage, nowloc, nowrot);

            let actionverb
            if (obj.playerclass == 'Warrior') {
                actionverb = 'slash'
            } else if (obj.playerclass == 'Rogue') {
                actionverb = 'pierce'
            } else if (obj.playerclass == 'Berzerker') {
                actionverb = 'chop'
            } else if (obj.playerclass == 'Magician') {
                actionverb = 'bash'
            } else {
                actionverb = 'hit'
            }

            if (damage == 0) {
                writeToCl(`You MISS a ${mob.mobname}`)
            } else {
                writeToCl(`You ${actionverb} a ${mob.mobname} for ${s.player.basedamage} points of damage`)
            }

            mobstate.clicked = false;

            if (mobhp <= 0) {
                //log(`attack.ts:196 - Calling mob.mobdead()`)
                mob.mobdead()
                if (mobstate.mobname == 'Orc Chief') {
                    writeToCl(`You have defeated the Sand Orc Chief!!`)
                    writeToCl(`You have captured the Sand Orc flag!!`)
                    mobstate.gameover = true
                    mobstate.winner = obj.playername
                }

                mobstate.battle = false;
                mobstate.mobdead = true;
                mobstate.clicked = false;
                mobstate.playerdead = false;
                mobstate.timeout = false;
                mobstate.trackplayer = false;
                mobstate.orcdead = true;

                let id = mobstate?.id;
                let exists = obj.localmobstate.map((x) => x.id).indexOf(id);
                //log(`id: ${mob.id} battle decided, pushing to mobstate`);

                if (exists > -1) {
                    //log(`id: ${s.npc.id} exists 2: ${exists}`);
                    obj.localmobstate.splice(exists, 1, mobstate);
                } else {
                    obj.localmobstate.push(mobstate);
                }

                //log(`in attack mob ${s.npc.id} hp is 0, setting SpawnTimeout to 90`)
                mob.addComponentOrReplace(new SpawnTimeOut(9000));
                let aggarray = [];
                aggarray = s.player.aggro;
                // if (aggarray != undefined && aggarray.length > 0) {
                //     if (aggarray.indexOf(s.npc.id) > -1) {
                //         s.player.updateaggro("remove", s.npc.id);
                //     }
                // }

                writeToCl(`You have slain an ${s.npc.mobname}`)

                killbox.play();

                mob.addlootclick();

                if (s.player.level === undefined) {
                    s.player.level = 1;
                }

                //log(`calling achievement check with 20 and ${s.player.level}`)
                //This is a setting that shouuld change from NPC to NPC. The XP Gained from a kill.
                if (mob.xp) {
                    s.player.achievementcheck(s.npc.xp, s.player.level);
                    writeToCl(`You have gained ${s.npc.xp} experience!`)
                } else {
                    s.player.achievementcheck(20, s.player.level);
                    writeToCl(`You have gained 20 experience!`)
                }

                writeToCl(`Your standing with ${mob.primaryFaction} has gotten worse`)

                //log('orc.ts:267 attack.ts - hidehpbar')
                s.npc.hidehpbar();
            } else {
                mobstate.battle = true;
                mobstate.clicked = false;
                mobstate.playerdead = false;
                mobstate.timeout = true;
                mobstate.trackplayer = false;
            }
        }
    }
}