import resources from "../resources";
import { Singleton } from "./playerDetail";
import { MobState } from "src/components/mobStateComponent";
import { NpcId } from "src/components/npcIdComponent";
import { LifeItem } from "src/components/lifeItemComponent";
import { VictoryItem } from "src/components/victoryItemComponent";
import { NpcName } from "src/components/npcNameComponent";

import { followData } from "../gameSystems/followSystem";
import { UIBar } from "src/gameUI/uiBar";
import { BarStyles } from "src/gameUtils/types";
import { LootWindow } from "src/gameUI/lootWindow";
import { CornerLabel } from "src/gameUI/cornerLabel";

export class Npc extends Entity {
    private _id: string;
    private _name: string;
    private _xp: number;
    private _hp: number;
    private _maxhp: number;
    private _percentage: number;
    private _lootWindow: LootWindow;
    public walk: AnimationState;
    public walk_: AnimationState;
    public turnAround: AnimationState;
    public turnAround_: AnimationState;
    public turnLeft: AnimationState;
    public turnLeft_: AnimationState;
    public idle: AnimationState;
    public idle_: AnimationState;
    public boxing: AnimationState;
    public boxing_: AnimationState;
    public kick: AnimationState;
    public kick_: AnimationState;
    public hit1: AnimationState;
    public hit1_: AnimationState;
    public hit2: AnimationState;
    public hit2_: AnimationState;
    public death1: AnimationState;
    public death1_: AnimationState;
    public death2: AnimationState;
    public death2_: AnimationState;
    private hpbar: UIBar;
    private hpbar2: UIBar;
    public healthLabel: CornerLabel = new CornerLabel('', -10, 310, Color4.White(), 12);
    private update2: any;
    private npcUrl = "https://sutenquestapi.azurewebsites.net/npc";
    public primaryFaction = "Orcish Empire"
    private _shape: any
    private _level: number
    private _spawnloc: any
    private _spawnrot: any
    private _boss: boolean
    private _width: number
    private _height: number
    private _personality: string
    private _wallet: string
    private _deity: string
    private _currentgoal: string
    private _patron: string
    private _faction: string
    private _dead: any
    private _portrait: string
    private _goaltree: any

    constructor(
        id: string,
        name: string,
        xp: number,
        damage: number,
        maxhp: number,
        hp: number,
        percentage: number,
        sound: AudioClip,
        shape: GLTFShape,
        currentloc: Vector3,
        currentrot: Quaternion,
        path: any,
        level: number = 1,
        boss: boolean,
        portrait: string = "",
        width: number = 256,
        height: number = 256,
        personality: string = "",
        wallet: string = "",
        deity: string = "",
        goaltree: any = [],
        currentgoal: string = "",
        patron: string = "",
        faction: string = "",
        dead: boolean,
    ) {
        super();

        this.initializeComponents(id, name, xp, damage, dead, maxhp, hp, percentage, sound, shape, currentloc, currentrot, path, level, boss, portrait, width, height, personality, wallet, deity, goaltree, currentgoal, patron, faction)
        // this.initializeAnimations();

        log('attempting to create a new orc')
        const obj = Singleton.getInstance()

        let npcAnimator = new Animator();
        this.addComponent(npcAnimator);

        this.walk = new AnimationState("a-walking");
        this.walk_ = new AnimationState("walking");
        npcAnimator.addClip(this.walk);
        npcAnimator.addClip(this.walk_)

        this.idle = new AnimationState("b-idle");
        this.idle_ = new AnimationState("idle")
        npcAnimator.addClip(this.idle);
        npcAnimator.addClip(this.idle_)

        this.boxing = new AnimationState("c-punch");
        this.boxing_ = new AnimationState("punch");
        npcAnimator.addClip(this.boxing);
        npcAnimator.addClip(this.boxing_)

        this.kick = new AnimationState("d-kick");
        this.kick_ = new AnimationState("kick")
        npcAnimator.addClip(this.kick);
        npcAnimator.addClip(this.kick_)

        this.hit1 = new AnimationState("e-hitInHead");
        this.hit1_ = new AnimationState("hitInHead")
        npcAnimator.addClip(this.hit1);
        npcAnimator.addClip(this.hit1_)

        this.hit2 = new AnimationState("f-hitInKidney");
        this.hit2_ = new AnimationState("hitInKidney")
        npcAnimator.addClip(this.hit2);
        npcAnimator.addClip(this.hit2_)

        this.turnAround = new AnimationState("g-turnAround");
        this.turnAround_ = new AnimationState("turnAround")
        npcAnimator.addClip(this.turnAround);
        npcAnimator.addClip(this.turnAround_)

        this.death1 = new AnimationState("h-death1");
        this.death1_ = new AnimationState("death1")
        npcAnimator.addClip(this.death1);
        npcAnimator.addClip(this.death1_)

        this.death2 = new AnimationState("i-death2");
        this.death2_ = new AnimationState("death2")
        npcAnimator.addClip(this.death2);
        npcAnimator.addClip(this.death2_)

        this.turnLeft = new AnimationState("g-turnAround");
        this.turnLeft_ = new AnimationState("turnAround");
        npcAnimator.addClip(this.turnLeft);
        npcAnimator.addClip(this.turnLeft_)

        this._lootWindow = new LootWindow(
            obj.canvas,
            resources.interface.blueLootWindow,
            obj.actionbar,
            obj.backpack,
            obj.player,
            this
        );


        engine.addEntity(this);
    }

    public hideOrc() {
        this.getComponent(GLTFShape).visible = false
    }


    public playAudio() {
        this.getComponent(AudioSource).playOnce();
    }

    get id() {
        return this._id;
    }

    get level() {
        return this._level;
    }

    get hp() {
        return this._hp;
    }


    get xp() {
        return this._xp;
    }

    set hp(val: number) {
        if (val > -1) {
            this._hp = val;
        }
    }

    get percentage() {
        return this._percentage;
    }

    set mobname(val) {
        this._name = val;
        this.getComponent(MobState).mobname = val;
    }

    get mobname() {
        return this._name
    }

    mobwalk() {
        if (!this.walk.playing) {
            this.walk.play()
        } else {
            this.walk.playing = true
        }
    }

    mobwalkpause() {
        this.walk.pause()
    }

    mobturn() {
        if (!this.turnLeft.playing) {
            this.turnLeft.play()
            this.hit1.stop()
        } else {
            this.turnLeft.playing = true
        }
    }

    mobturnpause() {
        this.turnLeft.pause()
    }

    mobfight() {
        if (!this.boxing.playing) {
            this.boxing.play()
            this.turnLeft.stop()
            this.walk.stop()
        } else {
            this.boxing.playing = true;
        }
    }

    mobhit() {
        if (!this.hit1.playing) {
            this.hit1.play()
            this.boxing.stop()
            this.walk.stop()
        } else {
            this.hit1.playing = true;
        }
    }

    mobidle() {
        if (!this.idle.playing) {
            this.walk.stop()
            this.idle.play()
        } else {
            this.idle.playing = true;
            this.idle_.playing = true;
            this.boxing.playing = false;
            this.boxing_.playing = false;
            this.death2.playing = false;
            this.death2_.playing = false;
            this.walk.playing = false;
            this.walk_.playing = false;
            this.turnLeft.playing = false;
            this.turnLeft_.playing = false;
            this.hit1.playing = false;
            this.hit1_.playing = false;
            this.hit2.playing = false;
            this.hit2_.playing = false;
            this.death1.playing = false;
            this.death1_.playing = false;
            this.death1.looping = false;
            this.death1_.looping = false;
        }
    }

    mobdead() {
        this.idle.playing = false;
        this.idle_.playing = false;
        this.boxing.playing = false;
        this.boxing_.playing = false;
        this.death2.playing = false;
        this.death2_.playing = false;
        this.walk.playing = false;
        this.walk_.playing = false;
        this.turnLeft.playing = false;
        this.turnLeft_.playing = false;
        this.hit1.playing = false;
        this.hit1_.playing = false;
        this.hit2.playing = false;
        this.hit2_.playing = false;
        this.death1.playing = true;
        this.death1_.playing = true;
        this.death1.looping = false;
        this.death1_.looping = false;
    }

    respawn() {
        log(`trying to respawn ${this.id}`)

        let mobstate = this.getComponent(MobState)
        mobstate.respawned = false;

        //Set Transform to Initial Spawn Point
        mobstate.position = mobstate.array[mobstate.origin]
        mobstate.rotation = new Quaternion(0, 1, 0)

        this.getComponent(GLTFShape).visible = true

        this.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    this.getComponent(OnPointerDown).showFeedback = true;
                    let mobstate = this.getComponent(MobState)
                    mobstate.battle = true;
                    mobstate.clicked = true;
                    mobstate.playerdead = false;
                    mobstate.timeout = false;
                    mobstate.trackplayer = false;
                    mobstate.respawned = false;

                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "Punch",
                }
            )
        );
    }


    initialhp(val: number) {
        //log('npc.ts:331 - Setting orc initialhp')
        if (this.update2) {
            if (this.hpbar2) {
                if (val > 0) {
                    this.hpbar2.set(val)
                }
            }
        } else {
            if (this.hpbar) {
                if (val > 0) {
                    this.hpbar.set(val)
                }
            }
        }
    }

    // initialhp(val: number) {
    //     if (val <= 0) return;

    //     this.update2 && this.hpbar2 ? this.hpbar2.set(val)
    //         : this.hpbar ? this.hpbar.set(val)
    //             : null;
    // }

    healthcheck(val: number) {
        //log('npc.ts:337 - in healthcheck')
        if (this.update2) {
            if (val > 0) {
                this.hpbar2.set(val)
            }
        } else {
            if (val > 0) {
                this.hpbar.set(val)
            }
        }
    }

    // healthcheck(val: number) {
    //     if (val <= 0) return;

    //     this.update2 && this.hpbar2 ? this.hpbar2.set(val)
    //         : this.hpbar ? this.hpbar.set(val)
    //             : null;
    // }



    addlootclick() {
        this.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    //log('clicked addlootclick')
                    this._lootWindow.flip()
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "Loot Corpse"
                }
            )
        );
    }

    addlootallclick() {
        this.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    //log('clicked lootadll')
                    this._lootWindow.sendtobp()
                },
                {
                    button: ActionButton.SECONDARY,
                    showFeedback: true,
                    hoverText: "Loot All"
                }
            )
        )
    }


    showhpbar() {
        //log('npc.ts:393 - inshowhpbar')
        this.healthLabel.set(' ');
        let top = 300
        if (!this.hpbar) {
            //log(`npc.ts:396 - Turning on top orc ${this._id} hpbar`)
            this.hpbar = new UIBar(this.percentage / 100, 0, top, Color4.Red(), BarStyles.ROUNDSILVER, .8)
            this.healthLabel.set(this.mobname);
        } else if (this.hpbar.read() == 0) {
            //log(`npc.ts:400 - rc hp bar: ${this.hpbar.read()} is not null, so one probably exists: ${this._id} `)
            this.hpbar2 = new UIBar(this.percentage / 100, -30, top - 30, Color4.Blue(), BarStyles.ROUNDSILVER, .8)
            this.update2 = true;
        }
    }

    hidehpbar() {
        //log('npc.ts:407 - in hidehpbar')
        this.hpbar.set(0)
        this.hpbar.hide()
        this.healthLabel.set('');
        if (this.hpbar2 != null) {
            this.hpbar2.set(0)
            this.hpbar2.hide()
        }
    }

    // heal(amount: number) {
    //     if (amount <= 0 || this.hp >= this._maxhp) return;

    //     this.hp = this.hp + amount < this._maxhp ? this.hp + amount : this._maxhp;
    //     let percentage = ((this.hp / this._maxhp) * 100).toFixed(0);
    //     this.initialhp(Number(percentage) / 100);
    // }


    heal(amount: number) {
        let url = this.npcUrl + "/" + this._id;

        if (amount > 0) {
            if (this.hp < this._maxhp) {
                if (this.hp + amount < this._maxhp) {
                    this.hp += amount
                } else {
                    this.hp = this._maxhp
                }
            }
        }

        let percentage = ((this.hp / this._maxhp) * 100).toFixed(0)
        this.initialhp(Number(percentage) / 100)

    }

    // takedamage(amount: number, loc: any, rot: any) {
    //     const obj = Singleton.getInstance();
    //     let mobstate = this.getComponent(MobState);
    //     mobstate.rotation = rot;
    //     mobstate.position = loc;

    //     if (this.hp > 0) {
    //         this.hp = this.hp - amount > 0 ? this.hp - amount : 0;
    //     }

    //     let percentage = ((this.hp / this._maxhp) * 100).toFixed(0);
    //     this.initialhp(Number(percentage) / 100);
    //     this.healthcheck(Number(percentage) / 100);

    //     let id = this._id;
    //     let exists = obj.localmobstate.map(x => x.id).indexOf(id);

    //     if (exists > -1) {
    //         obj.localmobstate.splice(exists, 1, mobstate);
    //     } else {
    //         obj.localmobstate.push(mobstate);
    //     }

    //     return this.hp;
    // }

    takedamage(amount: number, loc: any, rot: any) {
        const obj = Singleton.getInstance()
        let mobstate = this.getComponent(MobState)
        mobstate.rotation = rot
        mobstate.position = loc

        if (this.hp > 0) {
            if (this.hp - amount > 0) {
                this.hp -= amount
            } else {
                this.hp = 0
            }
        }

        let percentage = ((this.hp / this._maxhp) * 100).toFixed(0)
        this.initialhp(Number(percentage) / 100)
        this.healthcheck(Number(percentage) / 100)

        let id = this._id
        let exists = obj.localmobstate.map(x => x.id).indexOf(id)

        if (exists > -1) {
            obj.localmobstate.splice(exists, 1, mobstate)
        } else {
            obj.localmobstate.push(mobstate)
        }

        return this.hp
    }

    remove() {
        let url = this.npcUrl + "/" + this._id;

        executeTask(async () => {
            const options = {
                method: "DELETE",
            };

            try {
                fetch(url, options).then((res) => res);
            } catch (error) {
                log("failed to delete npc ", error);
            }
        });
    }

    private initializeComponents(
        id: string,
        name: string,
        xp: number,
        damage: number,
        dead: boolean,
        maxhp: number,
        hp: number,
        percentage: number,
        sound: AudioClip,
        shape: GLTFShape,
        currentloc: Vector3,
        currentrot: Quaternion,
        path: any,
        level: number,
        boss: boolean,
        portrait: string,
        width: number,
        height: number,
        personality: string,
        wallet: string,
        deity: string,
        goaltree: any,
        currentgoal: string,
        patron: string,
        faction: string
    ) {
        this.addComponent(shape);
        this.addComponent(new LifeItem())
        this.addComponent(new VictoryItem())
        this.addComponent(
            new Transform({
                position: currentloc,
                rotation: currentrot,
                scale: boss ? new Vector3(2, 2, 2) : new Vector3(1, 1, 1),
            })
        );

        this._maxhp = maxhp;
        this._portrait = portrait;
        this._goaltree = goaltree;
        this._level = level;
        this._boss = boss;
        this._width = width;
        this._height = height;
        this._personality = personality;
        this._wallet = wallet;
        this._deity = deity;
        this._currentgoal = currentgoal;
        this._patron = patron;
        this._faction = faction;

        this.addComponent(new AudioSource(sound));
        this.addComponent(new MobState());
        this.addComponent(new followData());

        this.getComponent(MobState).array = path;
        this._id = id;
        this.getComponent(MobState).id = this._id;
        this.getComponent(MobState).damage = damage;
        this._name = name;
        this.getComponent(MobState).mobname = name;
        this._xp = xp;
        this._hp = hp;
        this._percentage = percentage;
        this.getComponent(MobState).mobdead = dead;

        this.addComponent(new NpcId());
        this.getComponent(NpcId).id = this._id;
        this.addComponentOrReplace(new NpcName());
        this.getComponent(NpcName).name = this._name;
    }

    //private animationStatesMap: { [key: string]: AnimationState } = {};

    // private initializeAnimations() {
    //     let npcAnimator = new Animator();
    //     this.addComponent(npcAnimator);

    //     const animationStates = [
    //         "a-walking", "walking",
    //         "b-idle", "idle",
    //         "c-punch", "punch",
    //         "d-kick", "kick",
    //         "e-hitInHead", "hitInHead",
    //         "f-hitInKidney", "hitInKidney",
    //         "g-turnAround", "turnAround",
    //         "h-death1", "death1",
    //         "i-death2", "death2"
    //     ];

    //     animationStates.forEach(state => {
    //         this.animationStatesMap[state] = new AnimationState(state);
    //         npcAnimator.addClip(this.animationStatesMap[state]);
    //     });

    // }

    // private stopAnimation(animation: AnimationState) {
    //     //if (animation.playing) {
    //         animation.stop();
    //    // }
    // }

    // private pauseAnimation(animation:AnimationState) {
    //     animation.pause()
    // }

    // private playAnimation(animation: AnimationState) {
    //     //if (!animation.playing) {
    //         animation.play();
    //     //}
    // }

    // mobAction(action: 'walk' | 'idle' | 'turn' | 'fight' | 'hit' | 'dead') {
    //     this.stopAnimation(this.idle);
    //     this.stopAnimation(this.walk);
    //     this.stopAnimation(this.turnLeft);
    //     this.stopAnimation(this.boxing);
    //     this.stopAnimation(this.hit1);
    //     this.stopAnimation(this.death1);

    //     switch (action) {
    //         case 'walk':
    //             this.playAnimation(this.walk);
    //             break;
    //         case 'idle':
    //             this.playAnimation(this.idle);
    //             break;
    //         case 'turn':
    //             this.playAnimation(this.turnLeft);
    //             break;
    //         case 'fight':
    //             this.playAnimation(this.boxing);
    //             break;
    //         case 'hit':
    //             this.playAnimation(this.hit1);
    //             break;
    //         case 'dead':
    //             this.playAnimation(this.death1);
    //             break;
    //     }
    // }
}