import { MobState } from "src/components/mobStateComponent";
import { SceneState } from "./NewnpcFSM";
import { Npc } from "src/gameObjects/npc";
import { writeToCl } from "./writeToCL";
import { BossBattle } from "src/components/bossBattleComponent";
import { SecondaryTimeOut } from "src/components/secondaryTimeOutComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { SpawnTimeOut } from "src/components/spawnTimerComponent";
import { Player } from "src/gameObjects/player";
import { apikey, local } from "suten";
import { SoundManager } from "./soundManager";
import resources from "src/resources";

const apiUrl = local
    ? "http://localhost:8080/player/"
    : "https://sutenquestapi.azurewebsites.net/player/";


const soundManager = SoundManager.getInstance();
const PUNCH_TIME = 2.2;
const PAUSE = 2.2;
const obj = Singleton.getInstance();


export function heHatesMeAndWeBattlin(mobstate: MobState, mob: Npc, s: SceneState) {
    //log('he HATES me still')
    if(mobstate.abilitydamage > 0) {
        log(`mobstate ability: ${mobstate.abilitydamage}`)
    }
    
    const mobvisible = s.npc.getComponent(GLTFShape).visible;
    const camera = Camera.instance;
    let transform = mob.getComponent(Transform);
    
    //He hates me so we battlin'
    if (mobstate.mobdead || mobstate.playerdead || mobvisible == false) {
        return;
    }

    let newTarget = camera.position.clone();
    newTarget.y = newTarget.y - 1.75;
    transform.lookAt(newTarget);

    mob.mobfight()

    if (!mobstate.battle) {
        log(`Turning on the BATTLE FLAG for ${mob.mobname}`)
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


        if(!mob.battle) {
            mob.showhpbar();
        }
        
        mobstate.position = s.transform.position;
        mobstate.rotation = s.transform.rotation;

        let id = mobstate?.id;
        let exists = obj.localmobstate.map((x) => x.id).indexOf(id);

        if (exists > -1) {
            obj.localmobstate.splice(exists, 1, mobstate);
        } else {
            log(`Adding ${mob.mobname} to the localmobstate`)
            obj.localmobstate.push(mobstate);
        }
    }

    //Keeping mobstate location synced
    
    if (mobstate.abilitydamage > 0) {
        log(`heHatesMe and mobstate.abilitydamage is greater than 0`)
        //s.player.bash(spell.oncastmsg[0].line1, mobState.mobname, 10)
        mob.mobturn()
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
        let mobhp = mob.takedamage(mobstate.abilitydamage, nowloc, nowrot);
        if (mobhp <= 0) {
            //log(`attack.ts:196 - Calling mob.mobdead() animation`)
            mob.mobdead()

            if (mobstate.mobname == 'Orc Chief') {
                writeToCl(`You have defeated the Sand Orc Chief!!`)
                writeToCl(`You have captured the Sand Orc flag!!`)
                mobstate.gameover = true
                mobstate.winner = obj.playername
            }

            mobstate.battle = false;
            s.player.disengageFromBattle(mob.id)
            //log(`heHateMe.ts: Setting mobstate.mobdead to TRUE`)
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
                obj.localmobstate.splice(exists, 1, mobstate);
            } else {
                obj.localmobstate.push(mobstate);
            }

            //log(`in attack mob ${s.npc.id} hp is 0, setting SpawnTimeout to 90`)
            //log(`RESPAWN: adding SpawnTimeout of 60 to the mob`)
            mob.addComponentOrReplace(new SpawnTimeOut(60));
            //log(`Validating mobstate.mobdead should still be true ${mobstate.mobdead}`)

            let aggarray = [];
            aggarray = s.player.aggro;
            // if (aggarray != undefined && aggarray.length > 0) {
            //     if (aggarray.indexOf(s.npc.id) > -1) {
            //         s.player.updateaggro("remove", s.npc.id);
            //     }
            // }

            writeToCl(`You have slain an ${s.npc.mobname}`)
            soundManager.playKillSound();

            mob.addlootclick();

            if (s.player.level === undefined) {
                s.player.level = 1;
            }

            //log(`calling achievement check with 20 and ${s.player.level}`)
            //This is a setting that shouuld change from NPC to NPC. The XP Gained from a kill.
            if (mob.xp) {
                //log(`heHateMe.ts: passing mob xp${mob.xp} and my currentlevel ${s.player.level} to achievementcheck`)
                //s.player.achievementcheck(s.npc.xp, s.player.level);
                s.player.achievementcheck(mob.xp, s.player.level)
                writeToCl(`You have gained ${mob.xp} experience!`)
            } else {
                s.player.achievementcheck(20, s.player.level);
                writeToCl(`You have gained experience!`)
            }

            log(`heHatesMe.ts - Calling updateFaction with ${mob.faction}, ${s.player.name} and -1`)
            updateFaction(mob.faction, s.player, -1)
            //writeToCl(`Your standing with ${mob.faction} has gotten worse`)

            log('orc.ts:267 heHatesMe.ts - mob is dead, calling npc.hidehpbar')
            s.npc.hidehpbar();
        }
        log(`Setting ability damage back to zero`)
        mobstate.abilitydamage = 0
    } else if (!s.clicked) {
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
                s.player.engageInBattle(mob.id)
                mobstate.clicked = false;
                mobstate.playerdead = false;
                mobstate.timeout = true;

                log("Playing hit sound for mob hurt player"); 
                soundManager.playPlayerHitSound();
                s.player.damage(mobstate.damage);

                if (mob.mobname == 'Orc Shaman') {
                    writeToCl(`Your blood BOILS!! You take ${mobstate.damage} points of damage`)
                } else {
                    writeToCl(`An ${s.npc.mobname} hits YOU for ${mobstate.damage} points of damage`)
                }

                s.npc.addComponentOrReplace(new SecondaryTimeOut(PAUSE));
            }

    } else if (s.clicked) {
        //log(`attack.ts ${mob.id} has been clicked`);
        mob.mobhit()

        if (!s.npc.hasComponent(SecondaryTimeOut)) {
            log("Playing hit sound for mob has been hit"); 
            //soundManager.playMobHitSound();
            if (mob.sound) {
                soundManager.playMobHitSound(mob.sound);
            } else {
                soundManager.playMobHitSound(resources.sounds.defaultMobHit);
            }
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
                //log(`attack.ts:196 - Calling mob.mobdead() animation`)
                mob.mobdead()

                if (mobstate.mobname == 'Orc Chief') {
                    writeToCl(`You have defeated the Sand Orc Chief!!`)
                    writeToCl(`You have captured the Sand Orc flag!!`)
                    mobstate.gameover = true
                    mobstate.winner = obj.playername
                }

                mobstate.battle = false;
                s.player.disengageFromBattle(mob.id)
                //log(`heHateMe.ts: Setting mobstate.mobdead to TRUE`)
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
                    obj.localmobstate.splice(exists, 1, mobstate);
                } else {
                    obj.localmobstate.push(mobstate);
                }

                //log(`in attack mob ${s.npc.id} hp is 0, setting SpawnTimeout to 90`)
                //log(`RESPAWN: adding SpawnTimeout of 60 to the mob`)
                mob.addComponentOrReplace(new SpawnTimeOut(60));
                //log(`Validating mobstate.mobdead should still be true ${mobstate.mobdead}`)

                let aggarray = [];
                aggarray = s.player.aggro;
                // if (aggarray != undefined && aggarray.length > 0) {
                //     if (aggarray.indexOf(s.npc.id) > -1) {
                //         s.player.updateaggro("remove", s.npc.id);
                //     }
                // }

                writeToCl(`You have slain an ${s.npc.mobname}`)

                soundManager.playKillSound();

                mob.addlootclick();

                if (s.player.level === undefined) {
                    s.player.level = 1;
                }

                //log(`calling achievement check with 20 and ${s.player.level}`)
                //This is a setting that shouuld change from NPC to NPC. The XP Gained from a kill.
                if (mob.xp) {
                    //log(`heHateMe.ts: passing mob xp${mob.xp} and my currentlevel ${s.player.level} to achievementcheck`)
                    //s.player.achievementcheck(s.npc.xp, s.player.level);
                    s.player.achievementcheck(mob.xp, s.player.level)
                    writeToCl(`You have gained ${mob.xp} experience!`)
                } else {
                    s.player.achievementcheck(20, s.player.level);
                    writeToCl(`You have gained experience!`)
                }

                log(`heHatesMe.ts - Calling updateFaction with ${mob.faction}, ${s.player.name} and -1`)
                updateFaction(mob.faction, s.player, -1)
                //writeToCl(`Your standing with ${mob.faction} has gotten worse`)

                log('orc.ts:267 heHatesMe.ts - mob is dead, calling npc.hidehpbar')
                s.npc.hidehpbar();
            } else {
                mobstate.battle = true;
                s.player.engageInBattle(mob.id)
                mobstate.clicked = false;
                mobstate.playerdead = false;
                mobstate.timeout = true;
                mobstate.trackplayer = false;
            }
        }
    }
}


export function updateFaction(factionName: string, player: Player, change: number) {
    log(`heHatesMe.ts`)
    let factionUrl = apiUrl + player.address + '/factions'

    log(`heHatesMe.ts factionUrl: ${factionUrl}`)

    const factions = {
        factionName: factionName,
        factionValue: change
    };

    log(`heHatesMe.ts factions: ${factions}`)

    let originalFactions: { [key: string]: number } = {};
    player.factions.forEach((faction: { name: string | number; value: number; }) => {
        originalFactions[faction.name] = faction.value;
    });

    const options = {
        method: "PATCH",
        body: JSON.stringify(factions),
        headers: {
            "Content-Type": "application/json",
            'x-api-key': apikey
        },
    };

    fetch(factionUrl, options)
        .then((res) => res.json())
        .then((updatedFactions) => {
            if (updatedFactions && updatedFactions.factions) {
                updatedFactions.factions.forEach((updatedFaction: { name: string; value: number }) => {
                    const originalValue = originalFactions[updatedFaction.name];
                    if (updatedFaction.value !== originalValue) {
                        let factionChangeMsg = `Your standing with ${updatedFaction.name} has `;
                        factionChangeMsg += updatedFaction.value > originalValue ? `improved` : `gotten worse`;
                        writeToCl(factionChangeMsg);
                    }
                });

                // Update the player's factions property
                player.factions = updatedFactions.factions;
            } else {
                writeToCl(`Faction update failed or no changes were made`);
            }
        })
        .catch(error => {
            log(`Error updating faction: ${error}`);
        });
}
