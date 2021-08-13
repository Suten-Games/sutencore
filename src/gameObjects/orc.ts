import resources from "../resources";
import { MobState } from "../components/mobStateComponent";
import { followData } from "../gameSystems/followSystem";
import { LootWindow } from "../gameUI/lootWindow";
//import * as ui from "../../node_modules/@dcl/ui-utils/index";
//import { FollowsPlayer } from "../gameFunctions/followsPlayer";
//import { LifeItem, VictoryItem } from "../itemflags/deathItem";
//import { BarStyles } from "../../node_modules/@dcl/ui-utils/utils/types";
import { Singleton } from "../gameUtils/playerDetail";

export class Orc extends Entity {
  private _id: string;
  private _name: string;
  private _xp: number;
  private _hp: number;
  private _percentage: number;
  private _battle: boolean = false;
  private _startinghp: number;
  private _lootWindow: LootWindow;
  private _canvas;
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
  private hpbar = null;
  private hpbar2 = null;
  private update2;
  private npcUrl = "https://sutenquestapi.azurewebsites.net/npc";
  private scatterRadius = 6;

  constructor(
    id: string,
    name: string,
    xp: number,
    dead: boolean,
    damage: number,
    sound: AudioClip,
    model: GLTFShape,
    startingHp: number,
    percentage: number,
    start: Vector3,
    rotation: Quaternion,
    path,
    canvas,
    actionBar,
    backpack,
    player
  ) {
    super();

    //log('attempting to create a new orc')

    this.addComponent(model);
    // this.addComponent(new LifeItem())
    // this.addComponent(new VictoryItem())
    if (name == "Orc Chief") {
      this.addComponent(
        new Transform({
          position: start,
          rotation: rotation,
          scale: new Vector3(2, 2, 2),
        })
      );

    } else {
      this.addComponent(
        new Transform({
          position: start,
          rotation: rotation,
        })
      );
    }


    this._canvas = canvas;
    this.addComponent(new AudioSource(sound));
    this.addComponent(new MobState());
    this.addComponent(new followData());
    this.getComponent(MobState).array = path;
    this._id = id;
    this.getComponent(MobState).id = this._id;
    this.getComponent(MobState).damage = damage;
    this._name = name;
    this._xp = xp;
    //log(`setting mobstate.mobname to ${name}`)
    this.getComponent(MobState).mobname = name;
    this._hp = startingHp;
    this._startinghp = startingHp;

    if (name == undefined) {
      log(`Unable to set name for orc: ${this._id}`)
    }

    if (dead) {
      log(`In ${this._id} Orc Creation, setting mobdead to true`)
      this.getComponent(MobState).mobdead = true;
    }

    this._percentage = percentage;
    //this.addComponent(new FollowsPlayer());
    //this.addComponent(new NpcId());
    //this.getComponent(NpcId).id = this._id;
    //this.addComponentOrReplace(new NpcName());
    //this.getComponent(NpcName).name = this._name;

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

    // this.getComponent(FollowsPlayer).defaultHeight = 0.1;
    // this.getComponent(FollowsPlayer).speed = 0.1;
    // this.getComponent(FollowsPlayer).elapsedTime = Math.random() * 0.5;
    // this.getComponent(FollowsPlayer).randomOffsetX =
    //   (Math.random() * 2 - 1) * this.scatterRadius;
    // this.getComponent(FollowsPlayer).randomOffsetZ =
    //   (Math.random() * 2 - 1) * this.scatterRadius;

    this._lootWindow = new LootWindow(
      canvas,
      resources.interface.blueLootWindow,
      actionBar,
      backpack,
      player,
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
    //log(`${this.id} returning mobname ${this._name}`)
    return this._name
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

  initialhp(val) {
    log('in orc initialhp')
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

  healthcheck(val) {
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

  addlootclick() {
    this.addComponentOrReplace(
      new OnPointerDown(
        (e) => {
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
    let top = 300
    // if(this.hpbar == null) {
    //   log(`Turning on top orc ${this._id} hpbar`)
    //   this.hpbar = new ui.UIBar(this.percentage / 100, 0, top, Color4.Red(), BarStyles.ROUNDSILVER, .8)
    // } else if(this.hpbar.read() == 0) {
    //   log(`rc hp bar: ${this.hpbar.read()} is not null, so one probably exists: ${this._id} `)
    //   this.hpbar2 = new ui.UIBar(this.percentage / 100, -30, top - 30, Color4.Blue(), BarStyles.ROUNDSILVER, .8) 
    //   this.update2 = true;
    // }
  }

  hidehpbar() {
    this.hpbar.set(0)
    this.hpbar = null
    if (this.hpbar2 != null) {
      this.hpbar2.set(0)
      this.hpbar2 = null
    }

  }

  heal(amount: number) {
    let url = this.npcUrl + "/" + this._id;

    if (amount > 0) {
      if (this.hp < this._startinghp) {
        if (this.hp + amount < this._startinghp) {
          //log(`Adding health ${amount}  ${this.name}`)
          this.hp += amount
        } else {
          //log(`setting hp: ${this.hp} to maxhp: ${this._startinghp}`)
          this.hp = this._startinghp
          //log(`set hp: ${this.hp} to maxhp: ${this._startinghp}`) 
        }
      }
    }

    let percentage = ((this.hp / this._startinghp) * 100).toFixed(0)
    this.initialhp(Number(percentage) / 100)

  }

  takedamage(amount: number, loc, rot) {
    //let url = this.npcUrl + "/" + this._id;
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

    //log(`this.hp ${this.hp} / this.maxhp ${this._startinghp} * 100 gives percentage of ${(this.hp / this._startinghp) * 100}`)
    let percentage = ((this.hp / this._startinghp) * 100).toFixed(0)
    this.initialhp(Number(percentage) / 100)
    this.healthcheck(Number(percentage) / 100)

    let id = this._id
    let exists = obj.localmobstate.map(x => x.id).indexOf(id)
    //log('updating mobstate in the singleton')

    //log('1 updating mobstate ', JSON.stringify(mobstate))

    if (exists > -1) {
      //log(`id: ${this._id} exists 4: ${exists}`)
      obj.localmobstate.splice(exists, 1, mobstate)
      //log(`localmobstate: ${obj.localmobstate}`)
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
        // .then((res) => res.json())
        // .then((res) => {
        //   log('after delete ')
        // })
      } catch (error) {
        log("failed to delete npc ", error);
      }
    });
  }

}
