import resources from "../resources";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { TradeWindow } from "../gameUI/tradeWindow";
import { Player } from "../gameObjects/player";
import { LifeItem } from "../components/lifeItemComponent";
import { MobState } from "../components/mobStateComponent";
import { SoundBox } from "./soundbox";
import { Item } from "../gameObjects/item";
import { closeSocket } from "../gameFunctions/wsConnection";

export class Singleton {
    private static instance: Singleton;
    //     //Assign "new Singleton()" here to avoid lazy initialisation
    private _playerhp: number = 0;
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
    private _weapon: string = "";
    private _playerbackpack: Array<object> = [];
    private _playeractionbar: Array<Item> = [];
    private _playerquestlog: Array<object> = [];
    private _gameover: boolean = false;
    private _winner: string = "";
    private _localmobstate: Array<MobState> = [];
    private _balance: number = 0;
    private _manal1: number = 0
    private _battlehymns: Array<SoundBox> = []
    private soundbox1: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish1, false)
    private soundbox2: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish2, false)
    private soundbox3: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish3, false)
    private soundbox4: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish4, false)
    private soundbox5: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish5, false)
    private soundbox6: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish6, false)
    private soundbox7: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish7, false)
    private soundbox8: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish8, false)
    private soundbox9: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish9, false)
    private soundbox10: SoundBox = new SoundBox(new Transform({ position: new Vector3(32, 10, 14) }), resources.sounds.orkish10, false)
    private _canvas: UICanvas
    private _actionbar: ActionBar
    private _backPack: BackPack
    private _player: Player
    private _tradewindow: TradeWindow
    private _socketclass
    private _inDuat: boolean = false;

    constructor(balance = 0) {
        if (Singleton.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this.member = 0;
        this._inDuat = false;
        this._balance = balance;
        this.soundbox1.addComponent(new LifeItem())
        this.soundbox2.addComponent(new LifeItem())
        this.soundbox3.addComponent(new LifeItem())
        this.soundbox4.addComponent(new LifeItem())
        this.soundbox5.addComponent(new LifeItem())
        this.soundbox6.addComponent(new LifeItem())
        this.soundbox7.addComponent(new LifeItem())
        this.soundbox8.addComponent(new LifeItem())
        this.soundbox9.addComponent(new LifeItem())
        this.soundbox10.addComponent(new LifeItem())
        this._battlehymns.push(this.soundbox1)
        this._battlehymns.push(this.soundbox2)
        this._battlehymns.push(this.soundbox3)
        this._battlehymns.push(this.soundbox4)
        this._battlehymns.push(this.soundbox5)
        this._battlehymns.push(this.soundbox6)
        this._battlehymns.push(this.soundbox7)
        this._battlehymns.push(this.soundbox8)
        this._battlehymns.push(this.soundbox9)
        this._battlehymns.push(this.soundbox10)
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

    set gameover(val) {
        this._gameover = val;
    }

    get gameover() {
        return this._gameover;
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

    set closesock(sockclose: closeSocket) {
        //log('Setting sockclose in obj')
        this._socketclass = sockclose
    }

    set localmobstate(val) {
        //log(`in localmobstate setting new value`)
        this._localmobstate = val
        //log(`playerDetail localmobstate: ${this._localmobstate}`)
    }

    get localmobstate() {
        //log(`returning localmobstate: ${JSON.stringify(this._localmobstate)}`)
        return this._localmobstate
    }

    set backpack(val) {
        this._backPack = val
    }

    get backpack() {
        return this._backPack
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

    set playerbackpack(val) {
        this._playerbackpack.push(val)
    }

    get playerbackpack() {
        return this._playerbackpack
    }

    set playeractionbar(val) {
        this._playeractionbar.push(val)
    }

    get playeractionbar() {
        return this._playeractionbar
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

    member: number;
    balance!: number;
}