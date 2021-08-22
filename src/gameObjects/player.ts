import resources from "../resources";
import { CombatLog } from "../gameUI/combatLog";
//import { unloadLife, loadDeath } from "../gameFunctions/loadDeath";
import { BackPack } from "../gameUI/backPack";
import { ActionBar } from "../gameUI/actionBar";
import { SoundBox } from "../gameUtils/soundbox";
//import { BarStyles } from "../../node_modules/@dcl/ui-utils/utils/types";
//import * as ui from "../../node_modules/@dcl/ui-utils/index";
import { Singleton } from "../gameUtils/playerDetail";
//import { QuestLog } from "./questLog";

const orclaugh = new SoundBox(
  new Transform({ position: new Vector3(7, 0, 8) }),
  resources.sounds.orclaugh,
  false
);

export class Player {
  private _alive: boolean;
  private _combatLog: CombatLog;
  private _leveledup: boolean;
  private _address: string;
  private _hp: number;
  private _level: number;
  private _name: string;
  private _basedamage: number;
  private _maxhp: number;
  private _currentxp: number;
  private _levelmax: number;
  private _startinghp: number;
  private _inbatttle: boolean;

//   private hpBar = new ui.UIBar(
//     1,
//     -30,
//     500,
//     Color4.Green(),
//     BarStyles.ROUNDWHITE,
//     0.8
//   );
//   private levelBar = new ui.UIBar(
//     0,
//     -30,
//     480,
//     Color4.Blue(),
//     BarStyles.ROUNDWHITE,
//     0.8
//   );
//   private healthLabel = new ui.CornerLabel(
//     "HP",
//     -100,
//     490,
//     Color4.White(),
//     12,
//     true
//   );
//   private healthValue = new ui.UICounter(0, 35, 490, Color4.Yellow(), 12, true);
//   private xpLabel = new ui.CornerLabel(
//     "XP",
//     -100,
//     470,
//     Color4.White(),
//     12,
//     true
//   );
  private playerName: UIText;
  private playerLevel: UIText;
  private _aggroList: [];
  private apiUrl = "https://sutenquestapi.azurewebsites.net/player";
  private aggUrl = "https://sutenquestapi.azurewebsites.net/aggro";
  private levelUrl = "https://sutenquestapi.azurewebsites.net/levels";
  private canvas;
  private actionbar;
  private backpack;
  private tradewindow;

  private deathsound = new SoundBox(
    new Transform({ position: new Vector3(8, 0, 8) }),
    resources.sounds.playerdeath,
    false
  );

  private abouttodie = new SoundBox(
    new Transform({ position: new Vector3(8, 0, 8) }),
    resources.sounds.abouttodie,
    true
  );
  private _questlog

  constructor(
    address: string,
    startingHp: number,
    canvas,
    combatlog: CombatLog,
    actionbar: ActionBar,
    backpack: BackPack
  ) {
    this._alive = true;
    this._address = address;
    this._hp = startingHp;
    this._maxhp = startingHp;
    this._startinghp = startingHp;
    this._inbatttle = false;
    this._combatLog = combatlog;
    this.canvas = canvas;
    this.actionbar = actionbar;
    this.backpack = backpack;
    //this.healthValue.set(startingHp);
    //this._questlog = new QuestLog(this.canvas,resources.interface.questLog)

    this._leveledup = false;
  }

  get alive() {
    return this._alive;
  }

  set alive(val: boolean) {
    this._alive = val;
  }

  get name() {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }

  get level() {
    return this._level;
  }

  set level(val: number) {
    if (val > 0) {
      this._level = val;
    }
  }

  get levelup() {
    return this._leveledup;
  }

  set levelup(val: boolean) {
    this._leveledup = val;
  }

  get basedamage() {
    return this._basedamage;
  }

  set basedamage(val: number) {
    if (val > -1) {
      this._basedamage = val;
    }
  }

  get hp() {
    return this._hp;
  }

  set hp(val: number) {
    //log('setting player hp to: ', val)
    if (val > -1) {
      this._hp = val;

      //log(`setting healthValue to: ${val}`)
      //this.healthValue.set(val);
    }
  }

  get maxhp() {
    return this._maxhp;
  }

  set maxhp(val: number) {
    if (val > -1) {
      this._maxhp = val;
    }
  }

  get currentxp() {
    return this._currentxp;
  }

  set currentxp(val: number) {
    if (val > -1) {
      this._currentxp = val;
    }
  }

  get levelmax() {
    return this._levelmax;
  }

  set levelmax(val: number) {
    if (val > -1) {
      this._levelmax = val;
    }
  }

  get startinghp() {
    return this._startinghp;
  }

  set startinghp(val: number) {
    if (val > -1) {
      this._startinghp = val;
    }
  }

  get aggro() {
    return this._aggroList;
  }

  set aggro(val: []) {
    this._aggroList = val;
  }

  get address() {
    return this._address;
  }

  set address(val: string) {
    this._address = val;
  }

  get battle() {
    return this._inbatttle;
  }

  set battle(val: boolean) {
    this._inbatttle = val;
  }

//   showhpbar() {
//     this.hpBar.set(1);
//   }

//   hidehpbar() {
//     this.hpBar.set(0);
//   }

//   initialhp(val) {
//     this.hpBar.set(val);
//   }

  configuretrade(val) {
    this.tradewindow = val;
  }

//   healthcheck(val) {
//     this.hpBar.set(val);
//   }

//   xpcheck() {
//     let val = this.currentxp / this.levelmax;
//     this.levelBar.set(val);
//   }

  achievementcheck(xp: number, currentlevel: number) {
    let url = this.levelUrl + "/" + this.address;
    let leveledup = false;

    executeTask(async () => {
      const hpo = {
        xp: xp,
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        await fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            //log(`back from levels check: ${JSON.stringify(res)}`)
            if (res.level > currentlevel) {
              var obj = Singleton.getInstance();
              this.level = res.level;
              //log('Setting levelup to true')
              this.levelup = true;
              //this.playerLevel.value = res.level
              //log("leveled up, setting new player hp to: ", res.hp);
              this.hp = res.hp;
              this.currentxp = res.currentxp;
              this.levelmax = res.levelmax;
              this.basedamage = res.basedamage;
              // log(`Setting initialhp to 1`)
              // this.initialhp(1)
              obj.playerhp = res.hp;
            //   this.xpcheck();
            //   this.healthcheck(100 / 100);
            }
            this.currentxp = res.currentxp;
            this.levelmax = res.levelmax;
            //this.xpcheck();
            this.basedamage = res.basedamage;
          });
      } catch (error) {
        log("player.ts: failed to update player achievement  ", error);
      }
    });
  }

  updateaggro(action: string, mobid: string) {
    let url = this.aggUrl + "/" + this.address;

    executeTask(async () => {
      const hpo = {
        action: action,
        mobid: mobid,
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            this.aggro = res.aggro;
          });
      } catch (error) {
        log("player.ts: failed to update player aggro list ", error);
      }
    });
  }

  bagsfull() {
    this._combatLog.text = `Your bag is completely full`;
    this._combatLog.text = `You'll have to use some items to make more room.`;
  }

  trinket(text, desc) {
    this._questlog.quest(text,desc)
    this._questlog.flip()
    if(desc == 'Orc Tooth') {
      this._combatLog.text = `You have picked up an Orc Tooth. Interesting.`; 
    } else {
      this._combatLog.text = `Why was he carrying this trinket? Interesting.`;
    }
    //this._combatLog.text = `The item disintegrates in your hand`;
  }

  unusable() {
    this._combatLog.text = `You don't have the skill to use this yet.`;
    this._combatLog.text = `The item disintegrates in your hand`;
  }

  weapon(weapon, weapontext, actionbar, backpack, lootimage, slot) {
    log('calling backpack.showCharWindow from the player.weapon function')
    this.backpack.showCharWindow(weapon, weapontext, this._combatLog, actionbar, backpack, lootimage, slot)
  }

  changeClass(charclass, weapon) {
    let url = this.apiUrl + "/" + this.address;
    var obj = Singleton.getInstance();

    //log(`in changeClass(${charclass}, ${JSON.stringify(weapon)})`)

    executeTask(async () => {
      const hpo = {
        characterclass: charclass,
        primaryweapon: weapon
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            log(`res: ${JSON.stringify(res)}`)
            log(
              `back from change class call. Class is now ${res.characterclass}`
            );
            obj.playerclass = res.characterclass;
            log(`obj.playerclass is now ${obj.playerclass}`);
            obj.weapon = res.primaryweapon;
            log(`obj.weapon is now ${obj.weapon}`)
          });
      } catch (error) {
        log("player.ts: failed to set character class ", error);
      }
    });
  }

  resurrect() {
    let url = this.apiUrl + "/" + this.address;
    var obj = Singleton.getInstance();

    executeTask(async () => {
      const hpo = {
        hp: this.maxhp,
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(hpo),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            // log(
            //   `back from api resurrect call hp is currenty: ${this.hp} and will be: ${res.hp}`
            // );
            this.hp = res.maxhp;
            this.maxhp = res.maxhp;
            obj.playerhp = res.maxhp;
            //this.healthBar.value = res.percentage + '%'
            // log(`in player.ts heal, sending ${res.percentage / 100} to initialhp`)
            // this.initialhp(res.percentage / 100)
            //log(`hp is now after resurrect: ${this.hp}`);
          });
      } catch (error) {
        log("player.ts: failed to heal player ", error);
      }
    });
  }

  heal(amount: number, text: boolean) {
    //let url = this.apiUrl + '/' + this.address
    var obj = Singleton.getInstance();
    log(`in heal: amount ${amount} current hp ${this.hp} maxhp ${this.maxhp}`);

    if (amount > 0) {
      if (this.hp < this.maxhp) {
        if (this.hp + amount < this.maxhp) {
          // log(`Adding health ${amount} to player ${this.name}`);
          // log(
          //   `player hp: ${this.hp} damage amount: ${amount} player newhp: ${
          //     this.hp + amount
          //   }`
          // );
          this.hp += amount;
          obj.playerhp = this.hp;
        } else {
          log(`setting hp: ${this.hp} to maxhp: ${this.maxhp}`);
          this.hp = this.maxhp;
          obj.playerhp = this.hp;
          log(`set hp: ${this.hp} to maxhp: ${this.maxhp}`);
        }
      }
    }

    //this.healthValue.set(obj.playerhp);
    let percentage = ((this.hp / this.maxhp) * 100).toFixed(0);
    //this.initialhp(Number(percentage) / 100);
    this._combatLog.text = `You have been healed for ${amount} hp.`;

    if (Number(percentage) > 50) {
      this.abouttodie.stop();
    }
  }

  damage(amount: number) {
    //log('player.ts: in player damage')
    let url = this.apiUrl + "/" + this.address;
    var obj = Singleton.getInstance();

    //log(`in damage: amount ${amount} current hp ${this.hp} maxhp ${this.maxhp}`)

    if (this.hp > 0) {
      if (this.hp - amount > 0) {
        log(
          `playerhp: ${this.hp} damageamount: ${amount} playernewhp: ${
            this.hp - amount
          }`
        );
        this.hp -= amount;
        obj.playerhp = this.hp;
      } else {
        log(`setting playerhp to zero`);
        this.hp = 0;
        obj.playerhp = this.hp;
      }
    }

    //log(`this.hp ${this.hp} / this.maxhp ${this.maxhp} * 100 gives percentage of ${(this.hp / this.maxhp) * 100}`)
    //this.healthValue.set(obj.playerhp);

    let percentage = ((this.hp / this.maxhp) * 100).toFixed(0);
    //this.initialhp(Number(percentage) / 100);
    //this.healthcheck(Number(percentage) / 100);

    if (Number(percentage) < 30) {
      this.abouttodie.play();
    }

    if (this.hp <= 0) {
      orclaugh.play();

    //   obj.localmobstate.forEach((x) => {
    //     if (x.mosthated == this.address) {
    //       x.playerdead = true;
    //     }
    //   });
      this.abouttodie.stop();
      this.deathsound.play();
      this._combatLog.text = `You have died.`;
      this._combatLog.text = `Make your way to the Duat.`;
      this._combatLog.text = `Seek out Anpu.`;
      obj.inDuat = true;
      this.alive = false;
    //   unloadLife();
    //   loadDeath(
    //     this.canvas,
    //     this,
    //     this._combatLog,
    //     this.actionbar,
    //     this.backpack,
    //     obj.tradewindow
    //   );
    }
  }
}