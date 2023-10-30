import resources from "../resources";
import { sAggro, sLevel, sPlayer } from "suten";
import { SoundBox } from "./soundBox";
import { CombatLog } from "src/gameUI/combatLog";
import { ActionBar } from "src/gameUI/actionBar";
import { BackPack } from "src/gameUI/backPack";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { Singleton } from "./playerDetail";
import { Item } from "./item";
import { UIBar } from "src/gameUI/uiBar";
import { BarStyles } from "src/gameUtils/types";
import { writeToCl } from "src/gameFunctions/writeToCL";
import { CornerLabel } from "src/gameUI/cornerLabel";
import { UICounter } from "src/gameUI/uiCounter";

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
    private _shieldhp: number;
    private _factions: any
    private _activequests: string[];

    private hpBar = new UIBar(
        1,
        -30,
        500,
        Color4.Green(),
        BarStyles.ROUNDWHITE,
        0.8
    );
    private levelBar = new UIBar(
        0,
        -30,
        480,
        Color4.Blue(),
        BarStyles.ROUNDWHITE,
        0.8
    );
    private healthLabel = new CornerLabel(
        "HP",
        -100,
        490,
        Color4.White(),
        12,
        true
    );
    private healthValue = new UICounter(0, 35, 490, Color4.Yellow(), 12, true);
    private xpLabel = new CornerLabel(
        "XP",
        -100,
        470,
        Color4.White(),
        12,
        true
    );
    private playerName: UIText;
    private playerLevel: UIText;
    private _aggroList: [];
    private apiUrl = sPlayer
    private aggUrl = sAggro
    private levelUrl = sLevel
    private canvas;
    private actionbar;
    private backpack;
    private tradewindow: any;

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

    private levelupbox = new SoundBox(
        new Transform({ position: new Vector3(7, 0, 8) }),
        resources.sounds.levelup,
        false
    );

    constructor(
        address: string,
        startingHp: number,
        canvas: any,
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
        this.healthValue.set(startingHp);
        this._activequests = [];
        this._leveledup = false;
    }

    set quest(val: string) {
        this._activequests.push(val)
    }

    get quests(): string[] {
        return this._activequests;
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

    get factions() {
        return this._factions
    }

    set factions(val) {
        this._factions = val;
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
            this.healthValue.set(val);
        }
    }

    get shieldhp() {
        return this._shieldhp;
    }

    set shieldhp(val: number) {
        if (val > -1) {
            this._shieldhp = val;
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

    showhpbar() {
        this.hpBar.set(1);
    }

    hidehpbar() {
        this.hpBar.set(0);
    }

    initialhp(val: number) {
        this.hpBar.set(val);
    }

    configuretrade(val: TradeWindow) {
        this.tradewindow = val;
    }

    healthcheck(val: number) {
        this.hpBar.set(val);
    }

    setShield(val: number, text: string) {
        log('player.ts:288 - setting shieldhp with val: ', val)
        if (val > 0) {
            log('player.ts:290 - creating a shield of size: ', val)
            writeToCl(text)
            this._shieldhp = val;
        } else if (val == 0) {
            writeToCl(text)
            this._shieldhp = 0;
        } else {
            log(`player.ts:299 - invalid shield value.. discarding ${val}`)
        }
    }

    xpcheck() {
        let val = this.currentxp / this.levelmax;
        this.levelBar.set(val);
    }

    levelupnotice() {
        if (this.levelup) {
            this.levelupbox.play();
            this.levelupbox.play();
            writeToCl(`You have reached a new level! You are now level ${this.level}`)
            writeToCl(`You have gotten stronger and tougher!`)
            this.levelup = false;
        }
    }

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
                            log('Setting levelup to true')
                            this.levelup = true;
                            this.playerLevel.value = res.level
                            log("leveled up, setting new player hp to: ", res.hp);
                            this.hp = res.hp;
                            this.currentxp = res.currentxp;
                            this.levelmax = res.levelmax;
                            this.basedamage = res.basedamage;
                            log(`Setting initialhp to 1`)
                            this.initialhp(1)
                            obj.playerhp = res.hp;
                            this.xpcheck();
                            this.healthcheck(100 / 100);
                            this.levelupnotice()
                        }
                        this.currentxp = res.currentxp;
                        this.levelmax = res.levelmax;
                        this.xpcheck();
                        this.basedamage = res.basedamage;
                    });
            } catch (error) {
                log("player.ts: failed to update player achievement  ", error);
            }
        });
    }

    updateaggro(action: string, mobid: string) {
        log(`updateing player aggro list ${action} ${mobid}`)
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

    trinket(text: string, desc: string, slot: number, lootitem: Item) {
        if (text) {
            writeToCl(text)
            log(`in trinket, desc: ${desc} slot: ${slot} lootitem: ${lootitem}`)
        } else {
            writeToCl(`Why was he carrying this trinket? Interesting.`)
        }
    }

    unusable() {
        writeToCl(`You don't have the skill to use this yet.`)
        writeToCl(`The item disintegrates in your hand`)
        //this._combatLog.text = `You don't have the skill to use this yet.`;
        //this._combatLog.text = `The item disintegrates in your hand`;
    }


    weapon(weapon: Texture, weapontext: string, actionbar: any, backpack: any, lootimage: any, slot: number) {
        //log('calling backpack.showCharWindow from the player.weapon function')
        this.backpack.showCharWindow(weapon, weapontext, this._combatLog, actionbar, backpack, lootimage, slot)
    }

    changeClass(charclass: string, weapon: string) {
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
                    log(`Adding health ${amount} to player ${this.name}`);
                    log(
                        `player hp: ${this.hp} damage amount: ${amount} player newhp: ${this.hp + amount
                        }`
                    );
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

        this.healthValue.set(obj.playerhp);
        let percentage = ((this.hp / this.maxhp) * 100).toFixed(0);
        this.initialhp(Number(percentage) / 100);
        writeToCl(`You have been healed for ${amount} hp.`)

        if (Number(percentage) > 50) {
            this.abouttodie.stop();
        }
    }

    damage(amount: number) {
        //log('player.ts: in player damage')
        let url = this.apiUrl + "/" + this.address;
        var obj = Singleton.getInstance();

        //log(`in damage: amount ${amount} current hp ${this.hp} maxhp ${this.maxhp}`)

        if (this.shieldhp > 0) {
            log('The shield is being attacked')
            log('current shieldhp: ', this.shieldhp)
            this._shieldhp -= amount;
            if (this.shieldhp <= 0) {
                //log('The shield has been destroyed');
                writeToCl(`The shield has been destroyed`)
                this.shieldhp = 0;
                log('calling setShield with 0 and text');
                this.setShield(0, 'The shield has been destroyed');
            }
        } else {
            if (this.hp > 0) {
                if (this.hp - amount > 0) {
                    // log(
                    //     `playerhp: ${this.hp} damageamount: ${amount} playernewhp: ${this.hp - amount
                    //     }`
                    // );
                    this.hp -= amount;
                    obj.playerhp = this.hp;
                } else {
                    //log(`setting playerhp to zero`);
                    this.hp = 0;
                    obj.playerhp = this.hp;
                }
            }
        }



        //log(`this.hp ${this.hp} / this.maxhp ${this.maxhp} * 100 gives percentage of ${(this.hp / this.maxhp) * 100}`)
        this.healthValue.set(obj.playerhp);

        let percentage = ((this.hp / this.maxhp) * 100).toFixed(0);
        this.initialhp(Number(percentage) / 100);
        this.healthcheck(Number(percentage) / 100);

        if (Number(percentage) < 30) {
            this.abouttodie.play();
        }

        if (this.hp <= 0) {
            orclaugh.play();


            log('lootwindows length: ', obj.lootwindows.length);
            obj.lootwindows.forEach((x) => {
                log('Calling hide on lootwindows')
                x.hide()
            })

            obj.hpbars.forEach((x) => {
                log('Calling hide on hpbars')
                x.hide()
            })

            // obj.healthlabels.forEach((x) => {
            //     log('Calling hide on healthlabels')
            //     x.set(' ');
            // })

            obj.localmobstate.forEach((x) => {
                if (x.mosthated == this.address) {
                    x.playerdead = true;
                }
            });
            this.abouttodie.stop();
            this.deathsound.play();
            this._combatLog.text = `You have died.`;
            this._combatLog.text = `Make your way to the Duat.`;
            this._combatLog.text = `Seek out Anpu.`;
            obj.inDuat = true;
            this.alive = false;
            log('calling unloadLife from player.ts')
            //unloadLife();
            log('calling loadDeath from player.ts')
            //loadDeathScape(this.canvas, this.actionbar, this.backpack, this, this._combatLog, this.tradewindow)


            // loadDeath(
            //   this.canvas,
            //   this,
            //   this._combatLog,
            //   this.actionbar,
            //   this.backpack,
            //   obj.tradewindow
            // );
        }
    }
}