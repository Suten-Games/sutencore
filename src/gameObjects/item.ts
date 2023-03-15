import resources from "../resources";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { TradeWindow } from "../gameUI/tradeWindow";
import { SoundBox } from "./soundBox";
import { Singleton } from "./playerDetail";
import { slotPicker } from "src/gameUtils/slotPicker";
import { Player } from "./player";
import { ParticleSystem } from "src/gameSystems/ParticleSystem";
import { setTimeout } from "src/gameUtils/timeOut";
import { UI } from "src/gameUI/ui";
import { setSpell } from "src/gameFunctions/setSpell";
import { SpellScroll } from "src/gameUI/spellScroll";
// import { LootWindow } from "../gameUI/lootWindow";
// import { Mob } from "./mob";


export class Item {
    private _canvas: UICanvas;
    private _image;
    private _actionBar: ActionBar;
    private _backPack: BackPack;
    private _spellScroll: SpellScroll;
    private _lootimage;
    private _activespellimage;
    private _desc;
    private isMerchant: boolean;
    private isSpellBook: boolean;
    private isActionBar: boolean;
    private isLootWindow: boolean;
    private isBackpack: boolean;
    private isPurchase: boolean;
    private isActiveSpell: boolean;
    private isScribedSpell: boolean;
    private _player: Player;
    //private _lw: LootWindow;
    private _potiontype;
    private _potionprice;
    private _slot: number;
    private _spellshape;
    private _spellstart;
    private _spellend;
    private _sound;
    private _npc: { hideOrc: () => void; } | null;
    private _tradewindow;
    private _itemtype;

    private _isquestloot;
    private _questlootclicked;
    private _isconsumable;
    private _isweapon;
    private _isspell;
    private _isability;
    private _isscroll;
    //private _spellscroll: SpellScroll;
    private _scribedspell;

    private potionsound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.corkpop,
        false
    );

    private backpacksound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.backpack,
        false
    );

    constructor(
        image: Texture,
        slot: number,
        srcw: number,
        srch: number,
        desc: string,
        type: string | null = null,
        price: number | null = null,
        itemtype: string | null = null,
        spellshape: string | null = null,
        spellstart: number | null = null,
        spellend: number | null = null,
        sound: AudioClip | null = null,
        tradewindow: TradeWindow | null = null,
        //lootwindow: LootWindow | TradeWindow | undefined,
        //npc: Orc | NPC | null = null,
    ) {
        let obj = Singleton.getInstance()
        this._canvas = obj.canvas;
        this._image = image;
        this._itemtype = itemtype;
        this._lootimage = new UIImage(this._canvas, this._image);
        this._lootimage.visible = false;
        this._activespellimage = new UIImage(this._canvas, this._image);
        this._activespellimage.visible = false;

        this._tradewindow = null

        if (tradewindow) {
            if (this._itemtype == "spell") {
                log('item.ts:83 - setting up tradewindow')
            }

            this._tradewindow = tradewindow
        }

        this._desc = new UIText(this._canvas);
        if (desc) {
            this._desc.value = desc
            this._potiontype = desc
        } else {
            this._desc.value = 'Item'
            this._potiontype = 'Item'
        }

        if (price) {
            this._potionprice = price
        }

        this._spellstart = spellstart;
        this._spellend = spellend;

        this._actionBar = obj.actionbar;
        this._backPack = obj.backpack;
        this._spellScroll = obj.spellscroll;
        this._player = obj.player;
        this._questlootclicked = false;
        this._sound = sound;
        //this._lw = lootwindow;
        //this._npc = npc;

        switch (spellshape) {
            case "BoxShape":
                this._spellshape = new BoxShape()
                break;
            case "SphereShape":
                this._spellshape = new SphereShape()
                break;
            default:
                this._spellshape = null;
                break;
        }

        switch (itemtype) {
            case "questloot":
                this._isquestloot = true;
                break;

            case "consumable":
                this._isconsumable = true;
                break;

            case "weapon":
                this._isweapon = true;
                break;

            case "spell":
                this._isspell = true;
                break;

            case "ability":
                this._isability = true;
                break;

            case "scroll":
                this._isscroll = true;
                break;

            case "scribedscroll":
                this._scribedspell = true;

            default:
                break;
        }

        this._lootimage.sourceWidth = srcw;
        this._lootimage.sourceHeight = srch;

        log('item.ts calling slotPicker with slot: ', slot)
        let slotposition = slotPicker(slot)
        this.isActionBar = slotposition.ab
        this.isBackpack = slotposition.bp
        this.isMerchant = slotposition.mc
        this.isPurchase = slotposition.pc
        this.isLootWindow = slotposition.lw
        this.isActiveSpell = slotposition.as
        this.isSpellBook = slotposition.sb
        this._lootimage.hAlign = slotposition.ha
        this._lootimage.vAlign = slotposition.va
        this._lootimage.width = slotposition.w
        this._lootimage.height = slotposition.h
        this._lootimage.positionY = slotposition.y
        this._lootimage.positionX = slotposition.x
        this._desc.fontSize = slotposition.fs;
        this._desc.width = slotposition.fw;
        this._desc.height = slotposition.fh;
        this._desc.hAlign = slotposition.fha;
        this._desc.vAlign = slotposition.fva;
        this._desc.positionY = slotposition.fy;
        this._desc.positionX = slotposition.fx;

        this._lootimage.visible = false;
        this._desc.visible = false;


        if (this.isMerchant) {
            this._lootimage.onClick = new OnClick(() => {
                this.setItemForSale();
            });
        } else if (this.isActionBar) {
            log('--')
        } else if (this.isPurchase) {
            this._lootimage.onClick = new OnClick(() => {
                this.sendItemDown();
            });
        } else if (this.isLootWindow) {
            this._lootimage.onClick = new OnClick(() => {
                this.sendToBackpack()
            })
        } else if (this.isSpellBook) {
            log(`item.ts:212 - This is a scribed spell`)
        }
    }

    public image() {
        return this._image;
    }

    public slot() {
        return this._slot;
    }

    public show() {
        if (this._itemtype == "spell") {
            log('item.ts:226 - in  item show')
            this._lootimage.visible = true;
            this._desc.visible = true;
        }

        if (this.isLootWindow) {
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else if (this.isMerchant) {
            log('in item merchant show')
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else if (this._backPack) {
            log('in backpack')
            this._lootimage.visible = true;
            this._desc.visible = false;
            // } else if (this._backPack.bpopen) {
            //     log('in bpopen')
            //     this._lootimage.visible = true;
            //     this._desc.visible = false;
        } else {
            log('setting desc to visible')
            this._lootimage.visible = true;
            this._desc.visible = true;
        }
    }

    public hide() {
        this._lootimage.visible = false;
        this._desc.visible = false;
    }

    public isAction() {
        return this.isActionBar;
    }

    public lootdesc() {
        return this._desc.value
    }

    public itemtype() {
        return this._itemtype
    }

    public spellshape() {
        if (this._itemtype == "spell") {
            if (typeof this._spellshape == "object") {
                return "BoxShape"
            }
            return this._spellshape
        }

        return null
    }

    public spellstart() {
        return this._spellstart
    }

    public spellend() {
        return this._spellend
    }

    public lootheight() {
        return this._lootimage.sourceHeight
    }

    public lootwidth() {
        return this._lootimage.sourceWidth
    }

    public sound() {
        if (this._sound) {
            return this._sound.url
        } else {
            return this._sound
        }
    }

    public itemprice() {
        return this._potionprice
    }

    get potionprice() {
        return this._potionprice
    }

    set potionprice(val) {
        this._potionprice = val
    }

    get potiontype() {
        return this._potiontype
    }

    set potiontype(val) {
        this._potiontype = val
    }

    set setslot(val: number) {
        this._slot = val
    }

    get questlootclicked() {
        return this._questlootclicked
    }

    // public quest(questinstance) {
    //     log("we have a quest match!");
    //     this._lootimage.onClick = new OnClick(() => {
    //         this._lootimage.visible = false;
    //         log('resetting slot: ', this.slot())
    //         this._actionBar.resetSlot(this.slot());
    //         log("clicked the quest item in slot ");
    //         this._questlootclicked = true;
    //         questinstance.acceptloot()

    //     })
    //     return 'Added quest click'
    // }

    // public quest(questinstance) {
    //     this._lootimage.onClick = new OnPointerDown(() => {
    //         this._lootimage.visible = false;
    //         this._actionBar.resetSlot(this.slot());
    //         this._questlootclicked = true;
    //         questinstance.acceptloot()

    //     })
    //     return 'Added quest click'
    // }

    public updateLoc(slot: number) {

        let ps: ParticleSystem
        this._lootimage.visible = true;
        if (this._spellshape) {

            let soundstring = "sounds/" + this._sound + ".mp3"
            let sound = new AudioClip(soundstring)
            ps = new ParticleSystem(2, 2, this._spellshape, sound)
            engine.addSystem(ps)
        }


        this._lootimage.onClick = new OnPointerDown(() => {

            if (this._player == undefined || !this._player.alive) {
                log('item.ts:354 - you cant heal if you are dead')
                return
            }


            if (this._isscroll) {
                //let ui = UI.getInstance()
                log('item.ts:360 - Clicked on the scroll')
                this._spellScroll.setSpell(this._desc.value)
                //this._spellScroll.show()

                // this._spellscroll = new SpellScroll(this._canvas, resources.interface.spellScroll, this._desc.value)
                // this._spellscroll.show()
                // log('item.ts:364 - Returning out of isscroll method');

                return
            }


            if (this._isspell) {
                if (this._itemtype == "spell") {
                    log("item.ts:411 - Cast a spell")
                }

                ps.turnOn(new BoxShape(), this._spellstart, this._spellend)
                log("item.ts:415 - calling activateSpell()")
                //this.activateSpell()

                return
            }

            if (this._isweapon) {
                if (this._image.src.split('/')[2] == 'rustysword.png') {
                    this._player.weapon(resources.loot.rustysword, "Rusty Sword", this._actionBar, this._backPack, this, slot)
                } else if (this._image.src.split('/')[2] == 'rustydagger.png') {
                    this._player.weapon(resources.loot.rustydagger, "Rusty Dagger", this._actionBar, this._backPack, this, slot)
                } else if (this._image.src.split('/')[2] == 'rustyaxe.png') {
                    this._player.weapon(resources.loot.rustyaxe, "Rusty Axe", this._actionBar, this._backPack, this, slot)
                } else if (this._image.src.split('/')[2] == "crackedstaff.png") {
                    this._player.weapon(resources.loot.crackedstaff, "Cracked Staff", this._actionBar, this._backPack, this, slot)
                }
                return
            }

            if (this._isconsumable) {
                if (this._image.src.split("/")[2] == "redHealthPotion.png") {
                    this._isconsumable = true;
                    this.potionsound.play()
                    this._player.heal(20, true);
                } else if (this._image.src.split("/")[2] == "greenHealthPotion.png") {
                    this._isconsumable = true;
                    this.potionsound.play()
                    this._player.heal(50, true);
                } else if (this._image.src.split("/")[2] == "blueHealthPotion.png") {
                    this._isconsumable = true;
                    this.potionsound.play()
                    this._player.heal(500, true);
                }

                this._lootimage.visible = false;
                this._actionBar.resetSlot(slot);
                this._backPack.resetSlot(slot);

                return
            }

            if (this._isquestloot) {
                if (this._image.src.split('/')[2] == 'sandbeetle.png') {
                    this._isquestloot = true;
                    this._player.trinket("It looks like a petrified beetle shell", "Beetle Shell", slot, this)
                } else if (this._image.src.split('/')[2] == "orctooth.png") {
                    this._isquestloot = true;
                    this._player.trinket("You hit him so hard a tooth fell out! Someone might want this.", "Orc Tooth", slot, this);
                }
            } else {
                this._player.unusable()
                // this._lootimage.visible = false;
                // this._actionBar.resetSlot(slot);
                // this._backPack.resetSlot(slot);
            }


        });
    }

    public activateSpell() {
        log('item.ts:478 - inside activateSpell');
        let slot = 60;
        let slotposition = slotPicker(slot);
        this._activespellimage.hAlign = slotposition.ha
        this._activespellimage.vAlign = slotposition.va
        this._activespellimage.width = slotposition.w
        this._activespellimage.height = slotposition.h
        this._activespellimage.positionY = slotposition.y
        this._activespellimage.positionX = slotposition.x
        this._activespellimage.sourceWidth = this._lootimage.sourceWidth;
        this._activespellimage.sourceHeight = this._lootimage.sourceHeight;
        this._activespellimage.visible = true;


        let obj = Singleton.getInstance()
        //let spellbook = obj.allspells

        log('item.ts:588  after assigning spellbook')

        //let activespell: Ispell = spellbook.get("amunsshield")


        // log('item.ts:592 - active spell size: ', activespell.size)
        // log('item.ts:593 - active spell duration: ', activespell.duration)
        // log('item.ts:597  setting shield hp')
        //this._player.setShield(activespell.size, activespell.oncastmsg[0].line1);

        // setTimeout(activespell.duration, () => {
        //     this._activespellimage.visible = false;
        //     this._player.setShield(0, activespell.ondropmsg[0].line1);
        // })
    }

    public sendToBackpack() {
        let slot = this._actionBar.selectSlot(this);

        if (slot == 0) {
            slot = this._backPack.selectSlot(this);
            if (slot == 50) {
                this._player.bagsfull();
                this._desc.visible = false;
                this._lootimage.visible = false;
            } else {
                this._slot = slot;
                let slotposition = slotPicker(slot)
                this.isActionBar = slotposition.ab
                this.isBackpack = slotposition.bp
                this.isMerchant = slotposition.mc
                this.isPurchase = slotposition.pc
                this.isLootWindow = slotposition.lw
                this._lootimage.hAlign = slotposition.ha
                this._lootimage.vAlign = slotposition.va
                this._lootimage.width = slotposition.w
                this._lootimage.height = slotposition.h
                this._lootimage.positionY = slotposition.y
                this._lootimage.positionX = slotposition.x
                this._desc.fontSize = slotposition.fs;
                this._desc.width = slotposition.fw;
                this._desc.height = slotposition.fh;
                this._desc.hAlign = slotposition.fha;
                this._desc.vAlign = slotposition.fva;
                this._desc.positionY = slotposition.fy;
                this._desc.positionX = slotposition.fx;
                this._desc.visible = false;
                if (!this._backPack.bpopen) {
                    this._desc.visible = false;
                    this._lootimage.visible = false;
                }
            }
        } else {
            this._slot = slot;
            let slotposition = slotPicker(slot)
            this.isActionBar = slotposition.ab
            this.isBackpack = slotposition.bp
            this.isMerchant = slotposition.mc
            this.isPurchase = slotposition.pc
            this.isLootWindow = slotposition.lw
            this._lootimage.hAlign = slotposition.ha
            this._lootimage.vAlign = slotposition.va
            this._lootimage.width = slotposition.w
            this._lootimage.height = slotposition.h
            this._lootimage.positionY = slotposition.y
            this._lootimage.positionX = slotposition.x
            this._desc.fontSize = slotposition.fs;
            this._desc.width = slotposition.fw;
            this._desc.height = slotposition.fh;
            this._desc.hAlign = slotposition.fha;
            this._desc.vAlign = slotposition.fva;
            this._desc.positionY = slotposition.fy;
            this._desc.positionX = slotposition.fx;
            this._desc.visible = false;
            this.isActionBar = true;
            this._lootimage.visible = true;
            this._desc.visible = false;
        }

        // if (this._lw) {
        //     this._lw.hidelootwindow();
        //     this._lw.looted = true;
        // }

        this.backpacksound.play();
        // if (this._npc) {
        //     this._npc.hideMob();
        // }

    }

    public sendItemDown() {

        this._actionBar.exist()

        let slot = this._actionBar.selectSlot(this);

        this._slot = slot

        let slotposition = slotPicker(slot)
        this.isActionBar = slotposition.ab
        this.isBackpack = slotposition.bp
        this.isMerchant = slotposition.mc
        this.isPurchase = slotposition.pc
        this.isLootWindow = slotposition.lw
        this._lootimage.hAlign = slotposition.ha
        this._lootimage.vAlign = slotposition.va
        this._lootimage.width = slotposition.w
        this._lootimage.height = slotposition.h
        this._lootimage.positionY = slotposition.y
        this._lootimage.positionX = slotposition.x
        this._desc.fontSize = slotposition.fs;
        this._desc.width = slotposition.fw;
        this._desc.height = slotposition.fh;
        this._desc.hAlign = slotposition.fha;
        this._desc.vAlign = slotposition.fva;
        this._desc.positionY = slotposition.fy;
        this._desc.positionX = slotposition.fx;
        this._desc.visible = false;

        if (slot == 0) {
            slot = this._backPack.selectSlot(this);
            this._slot = slot
            let slotposition = slotPicker(slot)
            this.isActionBar = slotposition.ab
            this.isBackpack = slotposition.bp
            this.isMerchant = slotposition.mc
            this.isPurchase = slotposition.pc
            this.isLootWindow = slotposition.lw
            this._lootimage.hAlign = slotposition.ha
            this._lootimage.vAlign = slotposition.va
            this._lootimage.width = slotposition.w
            this._lootimage.height = slotposition.h
            this._lootimage.positionY = slotposition.y
            this._lootimage.positionX = slotposition.x
            this._desc.fontSize = slotposition.fs;
            this._desc.width = slotposition.fw;
            this._desc.height = slotposition.fh;
            this._desc.hAlign = slotposition.fha;
            this._desc.vAlign = slotposition.fva;
            this._desc.positionY = slotposition.fy;
            this._desc.positionX = slotposition.fx;
            if (!this._backPack.bpopen) {
                this._desc.visible = false;
                this._lootimage.visible = false;
            }
            this.isBackpack = true;
        }
    }

    private setItemForSale() {
        let slotposition = slotPicker(36)
        this.isActionBar = slotposition.ab
        this.isBackpack = slotposition.bp
        this.isMerchant = slotposition.mc
        this.isPurchase = slotposition.pc
        this.isLootWindow = slotposition.lw
        this._lootimage.hAlign = slotposition.ha
        this._lootimage.vAlign = slotposition.va
        this._lootimage.width = slotposition.w
        this._lootimage.height = slotposition.h
        this._lootimage.positionY = slotposition.y
        this._lootimage.positionX = slotposition.x
        this._desc.fontSize = slotposition.fs;
        this._desc.width = slotposition.fw;
        this._desc.height = slotposition.fh;
        this._desc.hAlign = slotposition.fha;
        this._desc.vAlign = slotposition.fva;
        this._desc.positionY = slotposition.fy;
        this._desc.positionX = slotposition.fx;

        this._lootimage.onClick = new OnPointerDown(() => {
            this.sendItemDown();
        });

        //this._tradewindow.purchase(this)
    }
}