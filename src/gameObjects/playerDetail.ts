import resources from "../resources";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { SoundBox } from "./soundBox";
import { LifeItem } from "src/components/lifeItemComponent";
import { MobState } from "src/components/mobStateComponent";
import { TradeWindow } from "src/gameUI/tradeWindow";
import { Item } from "./item";
import { Player } from "./player";
import { SpellScroll } from "src/gameUI/spellScroll";
import { SpellBook } from "src/gameUI/spellBook";
import { CombatLog } from "src/gameUI/combatLog";
import { LootWindow } from "src/gameUI/lootWindow";
import { UIBar } from "src/gameUI/uiBar";
import { CornerLabel } from "src/gameUI/cornerLabel";
import { WarriorsTome } from "src/gameUI/warriorsTome";
import { RoguesToolbelt } from "src/gameUI/roguestoolbelt";
import { CharWindow } from "src/gameUI/charWindow";
import { setTimeout } from "src/gameUtils/timeOut";

//import { closeSocket } from "../gameFunctions/wsConnection";

export class Singleton {
    private static instance: Singleton;
    private _playerhp: number = 0;
    private _playermaxhp: number = 0;
    private _playerclass: string = "Adventurer";
    private _playeraddress: string = "123123";
    private _playername: string = "Adventurer";
    private _playerstrength: number = 0;
    private _playerlevel: number = 1;
    private _playeragility: number = 0;
    private _playerstamina: number = 0;
    private _playerwisdom: number = 0;
    private _playercharisma: number = 0;
    private _playerarmor: number = 0;
    private _playercopper: number = 0;
    private _playersilver: number = 0;
    private _playergold: number = 0;
    private _playerplatinum: number = 0;
    private _weapon: string = "";
    private _playerspellbook: Array<Item> = [];
    private _playerswarriorstome: Array<Item> = [];
    private _playersroguestoolbelt: Array<Item> = [];
    private _playerbackpack: Array<Item> = [];
    private _playeractionbar: Array<Item> = [];
    private _playercharacter: Array<Item> = [];
    private _playeractivespells: Array<object> = [];
    private _playerquestlog: Array<object> = [];
    private _gameover: boolean = false;
    private _winner: string = "";
    private _localmobstate: Array<MobState> = [];
    private _lootwindows: Array<LootWindow> = [];
    private _healthbars: Array<UIBar> = [];
    private _healthlabels: Array<CornerLabel> = [];
    private _levellabels: Array<CornerLabel> = [];
    private _balance: number = 0;
    private _manal1: number = 0
    private _canvas: UICanvas;
    private _actionbar: ActionBar;
    private _actionbarslots: (string | null)[] = this.initializeArrayWithNulls(9);
    private _backpackslots: (string | null)[] = this.initializeArrayWithNulls(16);
    private _characterslots: (string | null)[] = this.initializeArrayWithNulls(6);

    private _battlehymns: SoundBox[];
    private currentIndex: number = 0;

    private _backPack: BackPack;
    private _spellScroll: SpellScroll;
    private _spellBook: SpellBook;
    private _warriorsTome: WarriorsTome;
    private _roguesToolbelt: RoguesToolbelt;
    private _characterWindow: CharWindow;
    private _combatLog: CombatLog
    private _player: Player;
    private _tradewindow: TradeWindow;
    private _socketclass: any;
    private _inDuat: boolean = false;
    private _currentWeather: string = "sun";
    member: number;
    balance!: number;
    // private _scribedspells: Map<string, Ispell>;

    constructor(balance = 0) {
        if (Singleton.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this.member = 0;
        this._inDuat = false;
        this._balance = balance;

        this._battlehymns = [
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish1, false, 152400),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish2, false, 153000),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish3, false, 135600),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish4, false, 135000),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish5, false, 122400),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish6, false, 150000),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish7, false, 198000),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish8, false, 145800),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish9, false, 133800),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish10, false, 134400),
            new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.soundsofsaqqarra, false, 182400)
        ];
        this.playSong();
    }

    private initializeArrayWithNulls(size: number): (string | null)[] {
        let array = [];
        for (let i = 0; i < size; i++) {
            array.push(null);
        }
        return array;
    }

    playSong() {
        // Get the current song based on currentIndex
        let currentSoundBox = this._battlehymns[this.currentIndex];

        // Play the current sound
        currentSoundBox.play();

        // Increment the currentIndex to the next song or reset to 0 if it's the last song
        this.currentIndex = (this.currentIndex + 1) % this._battlehymns.length;

        // Schedule the next song to play after 180000 milliseconds (3 minutes)
        setTimeout(180000, () => this.playSong());
    }

    set canvas(val) {
        this._canvas = val;
    }

    get canvas() {
        return this._canvas;
    }

    set playerclass(val) {
        this._playerclass = val;
    }

    get playerclass() {
        return this._playerclass
    }

    set actionbar(val) {
        this._actionbar = val;
    }

    get actionbar() {
        return this._actionbar;
    }

    set actionbarslots(val) {
        this._actionbarslots = val;
    }

    get actionbarslots() {
        return this._actionbarslots;
    }

    set backpackslots(val) {
        this._backpackslots = val;
    }

    get backpackslots() {
        return this._backpackslots;
    }

    set characterslots(val) {
        this._characterslots = val;
    }

    get characterslots() {
        return this._characterslots;
    }

    set gameover(val) {
        this._gameover = val;
    }

    get gameover() {
        return this._gameover;
    }
    
    set currentweather(val:string) {
        this._currentWeather = val;
    }

    get currentweather() {
        return this._currentWeather;
    }

    set winner(val) {
        this._winner = val;
    }

    get winner() {
        return this._winner;
    }

    set strength(val) {
        this._playerstrength = val;
    }

    get strength() {
        return this._playerstrength;
    }

    set copper(val) {
        this._playercopper = val
    }

    get copper() {
        return this._playercopper
    }

    set silver(val) {
        this._playersilver = val
    }

    get silver() {
        return this._playersilver
    }

    set gold(val) {
        this._playergold = val
    }

    get gold() {
        return this._playergold
    }

    set platinum(val) {
        this._playerplatinum = val
    }

    get platinum() {
        return this._playerplatinum
    }

    set level(val) {
        this._playerlevel = val;
    }

    get level() {
        return this._playerlevel;
    }

    set agility(val) {
        this._playeragility = val
    }

    get agility() {
        return this._playeragility;
    }

    set stamina(val) {
        this._playerstamina = val;
    }

    get stamina() {
        return this._playerstamina;
    }

    set wisdom(val) {
        this._playerwisdom = val;
    }

    get wisdom() {
        return this._playerwisdom;
    }

    set charisma(val) {
        this._playercharisma = val;
    }

    get charisma() {
        return this._playercharisma;
    }

    set armor(val) {
        this._playerarmor = val;
    }

    get armor() {
        return this._playerarmor;
    }

    set weapon(val) {
        this._weapon = val;
    }

    get weapon() {
        return this._weapon;
    }

    set localmobstate(val) {
        this._localmobstate = val
    }

    get localmobstate() {
        return this._localmobstate
    }

    set backpack(val) {
        this._backPack = val
    }

    get backpack() {
        return this._backPack
    }

    set spellscroll(val) {
        this._spellScroll = val
    }

    get spellscroll() {
        return this._spellScroll
    }

    set combatlog(val) {
        this._combatLog = val
    }

    get combatlog() {
        return this._combatLog
    }

    set spellbook(val) {
        this._spellBook = val
    }

    get spellbook() {
        return this._spellBook
    }

    set warriorstome(val:WarriorsTome) {
        this._warriorsTome = val
    }

    get warriorstome() {
        return this._warriorsTome;
    }

    set roguestoolbelt(val: RoguesToolbelt) {
        this._roguesToolbelt = val
    }

    get roguestoolbelt() {
        return this._roguesToolbelt;
    }

    set characterwindow(val: CharWindow) {
        this._characterWindow = val;
    }

    get characterwindow() {
        return this._characterWindow;
    }

    set player(val) {
        this._player = val
    }

    get player() {
        return this._player
    }

    set tradewindow(val) {
        this._tradewindow = val
    }

    get tradewindow() {
        return this._tradewindow
    }

    set manal1(val: number) {
        this._manal1 = val
    }

    get manal1() {
        return this._manal1
    }

    set maticbalance(val: number) {
        this._balance = val;
    }

    get maticbalance() {
        return this._balance;
    }

    set maxhp(val) {
        this._playermaxhp = val;
    }

    get maxhp() {
        return this._playermaxhp;
    }

    set playerhp(val: number) {
        this._playerhp = val
    }

    get playerhp() {
        return this._playerhp
    }

    set playername(val: string) {
        this._playername = val;
    }

    get playername() {
        return this._playername;
    }

    set playeraddress(val: string) {
        this._playeraddress = val;
    }

    get playeraddress() {
        return this._playeraddress
    }

    get hpbars() {
        return this._healthbars
    }

    set hpbars(val:any) {
        this._healthbars.push(val)
    }

    get healthlabels() {
        return this._healthlabels
    }

    set healthlabels(val:any) {
        this._healthlabels.push(val)
    }

    get levellabels() {
        return this._levellabels
    }

    set levellabels(val: any) {
        this._levellabels.push(val)
    }

    get lootwindows() {
        return this._lootwindows
    }

    set lootwindows(val:any) {
        this._lootwindows.push(val);
    }

    playerbackpack(val: any) {
        this._playerbackpack.push(val)
    }

    playeractionbar(val: any) {
        this._playeractionbar.push(val)
    }

    playercharacter(val: any) {
        this._playercharacter.push(val)
    }

    playerspellbook(val: any) {
        this._playerspellbook.push(val)
    }

    playerswarriorstome(val: any) {
        this._playerswarriorstome.push(val)
    }

    playersroguestoolbelt(val: any){
        this._playersroguestoolbelt.push(val)
    }

    get bpack() {
        return this._playerbackpack 
    }

    showbackpack() {
        return this._playerbackpack
    }

    get sbook() {
        return this._playerspellbook
    }

    get wtome() {
        return this._playerswarriorstome
    }

    get rtoolbelt() {
        return this._playersroguestoolbelt
    }

    fetchactionbar() {
        return this._playeractionbar
    }

    fetchcharacter() {
        return this._playercharacter
    }

    fetchbackpack() {
        return this._playerbackpack
    }

    fetchspellbook() {
        return this._playerspellbook
    }

    fetchwarriorstome() {
        return this._playerswarriorstome
    }

    fetchroguestoolbelt() {
        return this._playersroguestoolbelt
    }

    set playeractivespells(val) {
        this._playeractivespells.push(val)
    }

    get playeractivespells() {
        return this._playeractivespells
    }

    get abar() {
        return this._playeractionbar 
    }

    get cwin() {
        return this._playercharacter
    }
   
    set playerquestlog(val) {
        this._playerquestlog.push(val)
    }

    get playerquestlog() {
        return this._playerquestlog
    }

    set inDuat(val) {
        this._inDuat = val
    }

    get inDuat() {
        return this._inDuat;
    }

    static getInstance(): Singleton {
        Singleton.instance = Singleton.instance || new Singleton();
        return Singleton.instance;
    }

    closeSocket() {
        log('closing socket')
        this._socketclass.close()
    }

    playRandom() {
        return this._battlehymns[Math.floor(Math.random() * this._battlehymns.length)];
    }

    static lastHpBarPosition: number = 350;

    updateSoundPositions() {
        const playerPos = Camera.instance.position;
        const angleStep = 360 / this._battlehymns.length;
        let angle = 0;

        for (const soundBox of this._battlehymns) {
            const radians = (Math.PI / 180) * angle;
            const offset = new Vector3(
                8 * Math.cos(radians), // Horizontal offset
                0, // Same vertical level as the player
                8 * Math.sin(radians) // Depth offset
            );

            soundBox.updatePosition(playerPos.add(offset));
            angle += angleStep;
        }
    }

}