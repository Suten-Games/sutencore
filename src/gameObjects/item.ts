import resources from "../resources";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { TradeWindow } from "../gameUI/tradeWindow";
import { Player } from "./player";
import { Singleton } from "../gameUtils/playerDetail";
import { SoundBox } from "../gameUtils/soundbox";
import { slotPicker } from "../gameUtils/slotPicker";
import { ParticleSystem } from "../gameSystems/ParticleSystem";
import { LootWindow } from "../gameUI/lootWindow";


export class Item {
    private _canvas: UICanvas;
    private _image;
    private _actionBar: ActionBar;
    private _backPack: BackPack;
    private _lootimage;
    private _desc;
    private isMerchant: boolean;
    private isActionBar: boolean;
    private isLootWindow: boolean;
    private isBackpack: boolean;
    private isPurchase: boolean;
    private _player: Player;
    private _lw: LootWindow;
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
        srcw: number | null = null,
        srch: number | null = null,
        desc: string | null = null,
        type: string | null = null,
        price: number | null = null,
        itemtype: string | null = null,
        spellshape: string | null = null,
        spellstart: number | null = null,
        spellend: number | null = null,
        sound: AudioClip | null = null,
        lootwindow: LootWindow | TradeWindow | undefined,
        npc: Orc | NPC | null = null,
        tradewindow: TradeWindow | null = null
    ) {
        let obj = Singleton.getInstance()
        this._canvas = obj.canvas;
        this._image = image;
        this._itemtype = itemtype;
        //log('in Item constructor: ', this._image);
        //log(`srcw: ${srcw} srch: ${srch} desc: ${desc} slot: ${slot} type: ${type} price: ${price} itemtype: ${itemtype}, shape: ${spellshape}`);
        this._lootimage = new UIImage(this._canvas, this._image);

        if (tradewindow) {
            log('setting up tradewindow')
            this._tradewindow = tradewindow
        }

        if (desc) {
            this._desc = new UIText(this._canvas);
            //log('setting values for desc')
            this._desc.value = desc
            //log('setting values for potiontype')
            this._potiontype = desc
        }

        if (price) {
            this._potionprice = price
        }
        this._spellstart = spellstart;
        this._spellend = spellend;
        this._actionBar = obj.actionbar;
        this._backPack = obj.backpack;
        this._player = obj.player;
        this._questlootclicked = false;
        this._sound = sound;
        this._lw = lootwindow;
        this._npc = npc;

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

            default:
                break;
        }

        this._lootimage.sourceWidth = srcw;
        this._lootimage.sourceHeight = srch;

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
        }
    }

    public image() {
        return this._image;
    }

    public slot() {
        return this._slot;
    }

    public show() {
        log('in  item show')
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
        } else if (this._backPack.bpopen) {
            log('in bpopen')
            this._lootimage.visible = true;
            this._desc.visible = false;
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
        if (typeof this._spellshape == "object") {
            return "BoxShape"
        }
        return this._spellshape
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

    set setslot(val) {
        this._slot = val
    }

    get questlootclicked() {
        return this._questlootclicked
    }

    public quest(questinstance) {
        log("we have a quest match!");
        this._lootimage.onClick = new OnClick(() => {
            this._lootimage.visible = false;
            log('resetting slot: ', this.slot())
            this._actionBar.resetSlot(this.slot());
            log("clicked the quest item in slot ");
            this._questlootclicked = true;
            questinstance.acceptloot()

        })
        return 'Added quest click'
    }

    public updateLoc(slot) {
        log('in updateLoc')
        let ps
        this._lootimage.visible = true;
        if (this._spellshape) {
            ps = new ParticleSystem(2, 2, this._spellshape, this._sound)
            engine.addSystem(ps)
        }


        this._lootimage.onClick = new OnClick(() => {
            log("clicked the item in slot ", slot);

            if (this._player == undefined || !this._player.alive) {
                log('you cant heal if you are dead')
                return
            }


            if (this._isspell) {
                log("Cast a spell")
                ps.turnOn(new BoxShape(), this._spellstart, this._spellend)
                return
            }

            if (this._isweapon) {
                if (this._image.src.split('/')[2] == 'rustysword.png') {
                    this._player.weapon(resources.loot.rustysword, "Rusty Sword", this._actionBar, this._backPack, this, slot)
                } else if (this._image.src.split('/')[2] == 'rustydagger.png') {
                    this._player.weapon(resources.loot.rustydagger, "Rusty Dagger", this._actionBar, this._backPack, this, slot)
                } else if (this._image.src.split('/')[2] == 'rustyaxe.png') {
                    log('Sending the call to player.weapon')
                    this._player.weapon(resources.loot.rustyaxe, "Rusty Axe", this._actionBar, this._backPack, this, slot)
                }
                return
            }

            if (this._isconsumable) {
                //log(`clicked a consumable ${this._image.src.split("/")[2]}`)
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

            if (this._image.src.split('/')[3] == 'sandbeetle.png') {
                this._isquestloot = true;
                this._player.trinket("It looks like a petrified beetle shell", "Beetle Shell")
            } else if (this._image.src.split('/')[3] == "orctooth.png") {
                this._isquestloot = true;
                this._player.trinket("You hit him so hard a tooth fell out! Someone might want this.", "Orc Tooth");
            } else {
                this._player.unusable()
                this._lootimage.visible = false;
                this._actionBar.resetSlot(slot);
                this._backPack.resetSlot(slot);
            }


        });
    }

    public sendToBackpack() {
        let slot = this._actionBar.selectSlot(this);

        log('send to backpack, slot: ', slot)

        if (slot == 0) {
            slot = this._backPack.selectSlot(this);
            log('in slot = 0, slot is now: ', slot)
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
                //this.isBackpack = true;
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

        if (this._lw) {
            this._lw.hidelootwindow();
            this._lw.looted = true;
        }

        this.backpacksound.play();
        if (this._npc) {
            this._npc.hideOrc();
        }

    }

    public sendItemDown() {
        log('in sendItemDown')

        this._actionBar.exist()

        let slot = this._actionBar.selectSlot(this);
        //this.isActionBar = true;

        this._slot = slot

        log('slot ', slot)

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
            log(`calling selectSlot on backpack instead of actionBar`)
            slot = this._backPack.selectSlot(this);
            this._slot = slot
            log('slot from backpack selectslot call: ', slot)
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
            //this._desc.visible = false;
            if (!this._backPack.bpopen) {
                this._desc.visible = false;
                this._lootimage.visible = false;
            }
            this.isBackpack = true;
        }
    }

    private setItemForSale() {
        log('in setItemForSale. Changing position of the potion to sales window')
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

        this._lootimage.onClick = new OnClick(() => {
            this.sendItemDown();
        });
        this._tradewindow.purchase(this)
    }
}