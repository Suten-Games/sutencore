import resources from "../resources";
import { apikey, sAggro, sLevel, sPlayer } from "suten";
import { SoundBox } from "./soundBox";
import { CombatLog } from "src/gameUI/combatLog";
import { ActionBar } from "src/gameUI/actionBar";
import { BackPack } from "src/gameUI/backPack";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { Singleton } from "./playerDetail";
import { Item } from "./item"
import { UIBar } from "src/gameUI/uiBar";
import { BarStyles } from "src/gameUtils/types";
import { writeToCl } from "src/gameFunctions/writeToCL";
import { CornerLabel } from "src/gameUI/cornerLabel";
import { UICounter } from "src/gameUI/uiCounter";
import { OkPrompt } from "src/gameUI/okPrompt";
import { LifeItem } from "src/components/lifeItemComponent";
import { MobState } from "src/components/mobStateComponent";
import { DeathScene } from "src/gameUI/loadDeathScape";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";

const orclaugh = new SoundBox(
    new Transform({ position: new Vector3(7, 0, 8) }),
    resources.sounds.orclaugh,
    false,
    800
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
    private _searchingfor: string[];
    private isAgressive: boolean = false;
    
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
    public healthValue = new UICounter(0, 35, 490, Color4.Yellow(), 12, true);
    private xpLabel = new CornerLabel(
        "XP",
        -100,
        470,
        Color4.White(),
        12,
        true
    );
    private playerName: UIText;
    //private playerLevel: UIText;
    public playerLevel: CornerLabel = new CornerLabel('1', -20, 630, Color4.Yellow(), 18, false);
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
        false,
        800
    );

    private abouttodie = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.abouttodie,
        true,
        800
    );

    private levelupbox = new SoundBox(
        new Transform({ position: new Vector3(7, 0, 8) }),
        resources.sounds.levelup,
        false,
        800
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

    set aggressive(val:boolean){
        this.isAgressive =  val;
    }

    get aggressive() {
        return this.isAgressive;
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

    get searching() {
        return this._searchingfor;
    }

    set searching(val) {
        this._searchingfor = val;
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
        this.playerLevel.set(this._level.toString());
        //this.xpcheck()
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
        if (val > -1) {
            this._hp = val;
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

    private _engagedNPCs: any = {};

    engageInBattle(npcId: string) {
        this._engagedNPCs[npcId] = true;
        this._inbatttle = true;
    }

    disengageFromBattle(npcId: string) {
        let obj = Singleton.getInstance()
        delete this._engagedNPCs[npcId];
        if (Object.keys(this._engagedNPCs).length === 0) {
            this._inbatttle = false;
            obj.hpbars.forEach((x: any) => {
                x.hide()
            })
        }
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

    bash(text: string, name: string, damage: number) {
        writeToCl(`${text} ${name} for ${damage} damage`)
        log(`in player.ts bash`)
    }

    setShield(val: number, text: string) {
        if (val > 0) {
            writeToCl(text)
            this._shieldhp = val;
        } else if (val == 0) {
            writeToCl(text)
            this._shieldhp = 0;
        } else {
            log(`player.ts:299 - invalid shield value.. discarding ${val}`)
        }
    }

    public xpcheck() {
        //log(`!!!!!!!!XPCHECK!!!!!!!!`)
        let val = this.currentxp / this.levelmax;
        //log(`setting levelBar to ${val}`)
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
        var obj = Singleton.getInstance();
        let leveledup = false;

        //log(`in achievementcheck with xp of ${xp} and current level of ${currentlevel}`)
        
        executeTask(async () => {
            const hpo = {
                xp: xp,
            };

            const options = {
                method: "PATCH",
                body: JSON.stringify(hpo),
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': apikey
                },
            };

            try {
                await fetch(url, options)
                    .then((res) => res.json())
                    .then((res) => {
                        // log(`Back from adding the kill experience`)
                        // log(`The API level response is now: ${res.level}, comparing against currentlevel: ${currentlevel}`)
                        if (res.level > currentlevel) {
                            //og(`Should be leveling up now`)
                            var obj = Singleton.getInstance();
                            this.level = res.level;
                            this.levelup = true;
                            this.playerLevel.set(res.level.toString());
                            this.hp = res.hp;
                            this.maxhp = res.hp
                            this.currentxp = 0;
                            this.levelmax = res.levelmax;
                            this.basedamage = res.basedamage;
                            this.initialhp(1)
                            obj.playerhp = res.hp;
                            // obj.level = this.level
                            // obj.maxhp = res.hp
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

    public notdeadyet(percentage:string) {
        if (Number(percentage) > 50) {
            this.abouttodie.stop();
        }
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
                    'x-api-key': apikey
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
        } else {
            writeToCl(`Why was he carrying this trinket? Interesting.`)
        }
    }

    unusable() {
        writeToCl(`You don't have the skill to use this yet.`)
        writeToCl(`The item disintegrates in your hand`)
    }


    weapon(weapon: Texture, weapontext: string, actionbar: any, backpack: any, lootimage: any, slot: number) {
        log(`in player.weapon with weapontext: ${weapontext}`)
        this.backpack.showCharWindow(weapon, weapontext, this._combatLog, actionbar, backpack, lootimage, slot)
    }

    changeClass(charclass: string, weapon: string) {
        let url = this.apiUrl + "/" + this.address;
        var obj = Singleton.getInstance();

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
                    'x-api-key': apikey
                },
            };

            try {
                fetch(url, options)
                    .then((res) => res.json())
                    .then((res) => {
                        obj.playerclass = res.characterclass;
                        obj.weapon = res.primaryweapon;
                    });
            } catch (error) {
                log("player.ts: failed to set character class ", error);
            }
        });
    }

    resurrect() {
        log(`in player resurrect method`)
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
                    'x-api-key': apikey
                },
            };

            try {
                fetch(url, options)
                    .then((res) => res.json())
                    .then((res) => {
                        log(`after the api return. maxhp is: ${res.maxhp}`)
                        this.hp = res.maxhp;
                        obj.playerhp = res.maxhp;
                    });
            } catch (error) {
                log("player.ts: failed to heal player ", error);
            }
        });
    }

    heal(amount: number, text: boolean) {
        var obj = Singleton.getInstance();

        if (amount > 0) {
            if (this.hp < this.maxhp) {
                if (this.hp + amount < this.maxhp) {
                    this.hp += amount;
                    obj.playerhp = this.hp;
                } else {
                    this.hp = this.maxhp;
                    obj.playerhp = this.hp;
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

    showDuatPrompt(title: string, message: string) {
        new OkPrompt(
            'You have died. Seek Anpu in the Duat. Perhaps if you are worthy you may be reborn.',
            () => {
                const dclWorldUrl = 'https://play.decentraland.org/?NETWORK=mainnet&position=4%2C4&realm=duat.dcl.eth';
                openExternalURL(dclWorldUrl);
            },
            'Search',
            true
        )
    }

    showBabyPrompt(title: string, message: string) {
        new OkPrompt(
            'You have died. Anpu has judged you too young for the perils of the Duat.',
            () => {
                // const dclWorldUrl = 'https://play.decentraland.org/?NETWORK=mainnet&position=4%2C4&realm=duat.dcl.eth';
                // openExternalURL(dclWorldUrl);
            },
            'Close',
            true
        )
    }

    unloadLife() {
        log(`in unloadLife of player.ts`)
        let obj = Singleton.getInstance()

        log(`in player.ts setting localmobstate empty`)
        obj.localmobstate = []

        log(`in player.ts unloadLife removing mobs`)
        const mobs = engine.getComponentGroup(MobState);
        mobs.entities.forEach((mob) => {
            engine.removeEntity(mob);
        });
        // while (mobs.entities.length) {
        //     engine.removeEntity(mobs.entities[0]);
        // }

        log(`in player.ts removing all LifeItems`)
        const items = engine.getComponentGroup(LifeItem);
        while (items.entities.length) {
            engine.removeEntity(items.entities[0]);
        }
        
        log(`localmobstate is now: ${obj.localmobstate}`)

    }

    damage(amount: number) {
        let url = this.apiUrl + "/" + this.address;
        var obj = Singleton.getInstance();

        if (this.shieldhp > 0) {
            this._shieldhp -= amount;
            if (this.shieldhp <= 0) {
                writeToCl(`The shield has been destroyed`)
                this.shieldhp = 0;
                this.setShield(0, 'The shield has been destroyed');
            }
        } else {
            if (this.hp > 0) {
                if (this.hp - amount > 0) {
                    this.hp -= amount;
                    obj.playerhp = this.hp;
                } else {
                    this.hp = 0;
                    obj.playerhp = this.hp;
                }
            }
        }

        this.healthValue.set(obj.playerhp);

        let percentage = ((this.hp / this.maxhp) * 100).toFixed(0);
        this.initialhp(Number(percentage) / 100);
        this.healthcheck(Number(percentage) / 100);

        if (Number(percentage) < 30) {
            this.abouttodie.play();
        }

        if (this.hp <= 0) {
            orclaugh.play();

            obj.lootwindows.forEach((x:any) => {
                x.hide()
            })

            obj.hpbars.forEach((x:any) => {
                x.hide()
            })

            obj.healthlabels.forEach((x:any) => {
                x.set(' ');
            })

            obj.levellabels.forEach((x: any) => {
                x.set(' ');
            })

            obj.localmobstate.forEach((x) => {
                if (x.mosthated == this.address) {
                    x.playerdead = true;
                }
            });
            this.abouttodie.stop();
            this.deathsound.play();
            if(this.level < 5) {
                const ps = new ParticleSystem(2, 2, new BoxShape(), resources.sounds.elementalspell)
                engine.addSystem(ps)
                const box = new BoxShape()
                ps.turnOn(box, 3, 89)

                writeToCl(` `)
                writeToCl(`You have died.`)
                writeToCl(`Anpu has deemed you too young for the Duat.`)
                writeToCl(`You have been resurrected.`)

                obj.player.resurrect()
                void movePlayerTo({ x: 180, y: 100, z: 146 })
                log(`Calling this.hpBar.set(1)`)
                this.hpBar.set(1)
                this.showBabyPrompt("Close Now", "You have died. Anpu has resurrected you");
            } else {
                this._combatLog.text = `You have died.`;
                this._combatLog.text = `Make your way to the Duat.`;
                this._combatLog.text = `Seek out Anpu.`;
                obj.inDuat = true;
                this.alive = false;

                this.unloadLife()
                this.showDuatPrompt("Search Now", "You have died. Seek Anpu in the Duat. Perhaps if you are worthy you may be reborn.");

                let deathscene = new DeathScene()
            }
            

            
            this.hidehpbar()

            
        }
    }
}