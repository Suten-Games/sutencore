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
import { QuestWindow } from "src/gameUI/questWindow";
import { CornerLabel } from "src/gameUI/cornerLabel";
import { apikey } from "suten";
//import { setTimeout } from "src/gameUtils/timeOut";

export class Npc extends Entity {
    private _id: string;
    private _name: string;
    private _class: string;
    private _xp: number;
    private _hp: number;
    private _maxhp: number;
    private _percentage: number;
    private _lootWindow: LootWindow;
    private _questWindow: QuestWindow;
    public walk: AnimationState;
    public turnAround: AnimationState;
    public turnLeft: AnimationState;
    public idle: AnimationState;
    public boxing: AnimationState;
    public kicking: AnimationState;
    public hit1: AnimationState;
    public hit2: AnimationState;
    public death1: AnimationState;
    public death2: AnimationState;
    public sound: AudioClip;
    //private hpbar: UIBar;
    top = 350
    public hpbar: UIBar = new UIBar(this.percentage / 100, -30, this.top, Color4.Red(), BarStyles.ROUNDSILVER, .8)
    public healthLabel: CornerLabel = new CornerLabel('', -40, this.top + 10, Color4.White(), 12);
    public levelLabel: CornerLabel = new CornerLabel('', -100, this.top + 5, Color4.Blue(), 18, false);
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
    private _inbattle: boolean


    constructor(
        id: string,
        name: string,
        classtype: string,
        xp: number,
        damage: number,
        maxhp: number,
        hp: number,
        percentage: number,
        sound: AudioClip,
        shape: GLTFShape,
        currentloc: Vector3,
        currentrot: Quaternion,
        path: any = [],
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

        this.hpbar.hide()

        this.initializeComponents(id, name, classtype, xp, damage, dead, maxhp, hp, percentage, sound, shape, currentloc, currentrot, path, level, boss, portrait, width, height, personality, wallet, deity, goaltree, currentgoal, patron, faction)
        // this.initializeAnimations();

        const obj = Singleton.getInstance()

        this._level = level;
        this._faction = faction;

        let npcAnimator = new Animator();
        this.addComponent(npcAnimator);

        this.walk = new AnimationState("a-walking");
        npcAnimator.addClip(this.walk);

        this.idle = new AnimationState("b-idle");

        npcAnimator.addClip(this.idle);

        this.boxing = new AnimationState("c-punch");
        npcAnimator.addClip(this.boxing);

        this.kicking = new AnimationState("d-kick");
        npcAnimator.addClip(this.kicking);

        this.hit1 = new AnimationState("e-hitInHead");
        npcAnimator.addClip(this.hit1);

        this.hit2 = new AnimationState("f-hitInKidney");
        npcAnimator.addClip(this.hit2);

        this.turnAround = new AnimationState("g-turnAround");
        npcAnimator.addClip(this.turnAround);

        this.death1 = new AnimationState("h-death1");
        npcAnimator.addClip(this.death1);

        this.death2 = new AnimationState("i-death2");
        npcAnimator.addClip(this.death2);

        this.turnLeft = new AnimationState("g-turnAround");
        npcAnimator.addClip(this.turnLeft);

        this._lootWindow = new LootWindow(
            obj.canvas,
            resources.interface.blueLootWindow,
            obj.actionbar,
            obj.backpack,
            obj.player,
            this
        );

        this._questWindow = new QuestWindow(
            obj.canvas, resources.interface.questLog);


        engine.addEntity(this);
    }

    public hideOrc() {
        this.getComponent(GLTFShape).visible = false
    }

    public playAudio() {
        this.getComponent(AudioSource).playOnce();
    }

    get faction() {
        return this._faction;
    }

    get id() {
        return this._id;
    }

    get level() {
        return this._level;
    }

    get maxhp() {
        return this._maxhp
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

    set battle(val:boolean) {
        this._inbattle = val
    }

    get battle() {
        return this._inbattle
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

    get mobclass() {
        return this._class
    }

    mobwalk() {
        //log(`in mobwalk method()`)
        const mobState = this.getComponent(MobState);
        if (mobState && mobState.idle) return;  // Don't walk while idling

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
        //log(`in mobturn method()`)
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
        //log(`in mobidle method()`)
        this.walk.stop()
        this.idle.play()
    }

    mobdead() {
        this.idle.playing = false;
        this.boxing.playing = false;
        this.walk.playing = false;
        this.turnLeft.playing = false;
        this.hit1.playing = false;
        this.hit2.playing = false;
        this.death2.playing = true;
        this.death2.looping = false;
    }

    respawn() {
        log(`trying to respawn ${this.id}`)

        let mobstate = this.getComponent(MobState)
        mobstate.respawned = false;

        // Reset HP to maximum
        this.hp = this._maxhp; // This line sets the NPC's health to its maximum value

        // Update HP bar to show full health
        //let percentage = 100; // 100% health
        this.initialhp(1); // This line updates the HP bar to show full health
        this.healthcheck(1); // This line updates any additional health-related UI elements, if necessary


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
        if (val > 0) {
            this.hpbar.set(val)
        }
    }

    healthcheck(val: number) {
        //log('npc.ts:337 - in healthcheck')
        if (val > 0) {
            this.hpbar.set(val)
        }
    }

    addlootclick() {
        this.addComponentOrReplace(
            new OnPointerDown(
                (e) => {
                    //log('clicked addlootclick')
                    this._lootWindow.flip()
                },
                {
                    button: ActionButton.SECONDARY,
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
        log(`npc.ts:393 - inshowhpbar`);
        let obj = Singleton.getInstance();
        this.healthLabel.set(' ');
        this.levelLabel.set(' ');
        //log(`npc.ts:397 - CREATING UI BAR`);

        let newYPosition = Singleton.lastHpBarPosition - 45;
        if (newYPosition < 0) {
            newYPosition = 350; // Reset to default if it goes too low
        }

        //log('percentage ', this.percentage)

        this.hpbar = new UIBar(this.percentage / 100, -30, newYPosition, Color4.Red(), BarStyles.ROUNDSILVER, 0.8);
        this.healthLabel = new CornerLabel(this._name, -40, newYPosition + 10, Color4.White(), 12);
        this.levelLabel = new CornerLabel(this._level.toString(), -100, newYPosition + 5, Color4.Blue(), 18, false);

        // Update the last position in Singleton
        Singleton.lastHpBarPosition = newYPosition;

        // Check if hpbar already has the LifeItem component before adding
        if (!this.hpbar.hasComponent(LifeItem)) {
            this.hpbar.addComponent(new LifeItem());
        }
        //log('calling this.hpbar.show()')
        this.hpbar.show();

        this.healthLabel.set(this.mobname);
        // Same check for healthLabel
        if (!this.healthLabel.hasComponent(LifeItem)) {
            this.healthLabel.addComponent(new LifeItem());
        }

        this.levelLabel.set(this._level.toString());
        // Same check for levelLabel
        if (!this.levelLabel.hasComponent(LifeItem)) {
            this.levelLabel.addComponent(new LifeItem());
        }

        // Add to global arrays if not already present
        if (obj.hpbars.indexOf(this.hpbar) === -1) {
            obj.hpbars.push(this.hpbar);
        }
        if (obj.healthlabels.indexOf(this.healthLabel) === -1) {
            obj.healthlabels.push(this.healthLabel);
        }
        if (obj.levellabels.indexOf(this.levelLabel) === -1) {
            obj.levellabels.push(this.levelLabel);
        }

        this.battle = true;
    }

    hidehpbar() {
        log('npc.ts:407 - in hidehpbar')
        let obj = Singleton.getInstance();
        this.hpbar.hide()
        this.healthLabel.set('');
        this.levelLabel.set('');
        obj.hpbars.pop();
        obj.healthlabels.pop();
        obj.levellabels.pop();
        this.battle = false;
        let newYPosition = Singleton.lastHpBarPosition;
        if (newYPosition < 350) {
            Singleton.lastHpBarPosition = Singleton.lastHpBarPosition + 45;
        }
    }

    heal(amount: number) {
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
                'x-api-key': apikey
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
        classtype: string,
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
        if (shape.src == "models/sandcat.glb") {
            this.addComponent(
                new Transform({
                    position: currentloc,
                    rotation: currentrot,
                    scale: new Vector3(3, 3, 3)
                }) 
            )
        } else {
            this.addComponent(
                new Transform({
                    position: currentloc,
                    rotation: currentrot,
                    scale: boss ? new Vector3(2, 2, 2) : new Vector3(1, 1, 1),
                })
            );
        }
        

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

        this.sound = sound

        this.addComponent(new AudioSource(sound));
        this.addComponent(new MobState());
        this.addComponent(new followData());

        this.getComponent(MobState).array = path;
        this._id = id;
        this.getComponent(MobState).id = this._id;
        this.getComponent(MobState).damage = damage;
        this._name = name;
        this.getComponent(MobState).mobname = name;
        this._class = classtype;
        this.getComponent(MobState).mobclass = classtype;
        this._xp = xp;
        this._hp = hp;
        this._percentage = percentage;
        this.getComponent(MobState).mobdead = dead;

        this.addComponent(new NpcId());
        this.getComponent(NpcId).id = this._id;
        this.addComponentOrReplace(new NpcName());
        this.getComponent(NpcName).name = this._name;
    }
}