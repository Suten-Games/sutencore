import resources from "../resources";
import { ActionBar } from "../gameUI/actionBar";
import { BackPack } from "../gameUI/backPack";
import { TradeWindow } from "../gameUI/tradeWindow";
import { SoundBox } from "./soundBox";
import { Singleton } from "./playerDetail";
import { slotPicker } from "src/gameUtils/slotPicker";
import { Player } from "./player";
import { setTimeout } from "src/gameUtils/timeOut";
import { SpellScroll } from "src/gameUI/spellScroll";
import { spellAction } from "src/gameFunctions/spellAction";
import { getspell } from "./spells";
import { Ispell } from "src/components/spellComponent";
import { LootWindow } from "src/gameUI/lootWindow";
import { Npc } from "./npc";
import { trinketAction } from "src/gameFunctions/trinketAction";
import { QuestWindow } from "src/gameUI/questWindow";
import { chunkSentence, writeChunks } from "src/gameFunctions/fetchQuest";
import { updateCurrency } from "src/gameFunctions/updateCurrency";
import { writeToCl } from "src/gameFunctions/writeToCL";


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
    private isQuestWindow: boolean;
    private isBackpack: boolean;
    private isPurchase: boolean;
    private isActiveSpell: boolean;
    private isScribedSpell: boolean;
    private _player: Player;
    private _potiontype;
    private _potionprice;
    private _buybackprice;
    private _slot: number;
    private _type: string | null;
    private _spellshape;
    private _spellstart;
    private _spellend;
    private _sound;
    private _npc: { hideOrc: () => void; } | null;
    private _tradewindow;
    private _lootwindow:LootWindow;
    private _questwindow:QuestWindow;
    private _itemtype;

    private _isquestloot;
    private _questlootclicked;
    private _isconsumable;
    private _isweapon;
    private _isspell;
    private _isability;
    private _isscroll;
    private _isclothing;
    private _scribedspell;
    private _iscurrency;

    private originalOnClick: () => void;

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

    private coinssound = new SoundBox(
        new Transform({ position: new Vector3(8, 0, 8) }),
        resources.sounds.coins,
        false 
    )
    
    constructor(
        image: Texture,
        slot: number,
        srcw: number,
        srch: number,
        desc: string,
        type: string | null = null,
        price: number | { copper: number, silver: number, gold: number, platinum: number },
        buybackprice: number | null = null,
        itemtype: string | null = null,
        spellshape: string | null = null,
        spellstart: number | null = null,
        spellend: number | null = null,
        sound: AudioClip | null = null,
        tradewindow: TradeWindow | null = null,
        lootwindow: LootWindow | null,
        npc: Npc | null = null,
        questwindow: QuestWindow | null
    ) {
        let obj = Singleton.getInstance()
        this._canvas = obj.canvas;
        //log(`Setting this._image to ${JSON.stringify(image)}`)
        this._image = image;
        this._slot = slot;
        this._type = type;
        this._itemtype = itemtype;
        this._lootimage = new UIImage(this._canvas, this._image);
        this._lootimage.visible = false;
        this._activespellimage = new UIImage(this._canvas, this._image);
        this._activespellimage.visible = false;

        this.originalOnClick = () => { };

        if (npc) {
            this._npc = npc
        }

        this._tradewindow = null

        if (tradewindow) {
            if (this._itemtype == "spell") {
                log('item.ts:83 - setting up tradewindow')
            }

            this._tradewindow = tradewindow
        }

        if (questwindow) {
            this._questwindow = questwindow
        }

        if(lootwindow) {
            this._lootwindow = lootwindow
        }

        this._desc = new UIText(this._canvas);
        if (desc) {
            //log(`Setting desc.value to ${desc}`)
            this._desc.value = desc
            this._potiontype = desc
        } else {
            this._desc.value = 'Item'
            this._potiontype = 'Item'
        }

        if (price) {
            this._potionprice = price
        } else {
            this._potionprice = 1
        }

        if (buybackprice) {
            log(`Set buybackprice: ${buybackprice}`)
            this._buybackprice = buybackprice
        }

        this._spellstart = spellstart;
        this._spellend = spellend;

        this._actionBar = obj.actionbar;
        this._backPack = obj.backpack;
        this._spellScroll = obj.spellscroll;
        this._player = obj.player;
        this._questlootclicked = false;
        this._sound = sound;

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
                break;
            
            case "clothing":
                this._isclothing = true;
                break;
            
            case "currency":
                this._iscurrency = true;
                break;

            default:
                break;
        }

        this._lootimage.sourceWidth = srcw;
        this._lootimage.sourceHeight = srch;

        //log('item.ts still in constructor, calling slotPicker with slot: ', slot)
        let slotposition = slotPicker(slot)
        this.isActionBar = slotposition.ab
        this.isBackpack = slotposition.bp
        this.isMerchant = slotposition.mc
        this.isPurchase = slotposition.pc
        this.isLootWindow = slotposition.lw
        this.isActiveSpell = slotposition.as
        this.isSpellBook = slotposition.sb
        this.isQuestWindow = slotposition.qw
        
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
            this._lootimage.onClick = new OnPointerDown(() => {
                this.setItemForSale();
            });
        } else if (this.isPurchase) {
            this._lootimage.onClick = new OnPointerDown(() => {
                this.sendToBackpack()
            });
        } else if (this.isLootWindow) {
            this._lootimage.onClick = new OnPointerDown(() => {
                if(this._iscurrency) {
                    let currencyobject: { copper: number, silver: number, gold: number, platinum: number }
                    if (typeof this.potionprice === 'number') {
                        currencyobject = { copper: 1, silver: 0, gold: 0, platinum: 0 }
                    } else {
                        currencyobject = this.potionprice
                    }
                    this.handleCurrencyItem(currencyobject);
                } else {
                    this.sendToBackpack()
                }
            })
        } else if (this.isSpellBook) {
            let stuff = "stuff"
        } else if (this.isQuestWindow) {
            //log(`item.ts - Created the loot item. Attaching the click handler to the loot`)
            this._lootimage.onClick = new OnPointerDown(() => {
                this.sendToBackpack()
            })
        }
    }

    private consumeAction = (slot: number) => {
        if (this._image.src.split("/")[2] == "redHealthPotion.png") {
            this._isconsumable = true;
            this._player.heal(20, true);
        } else if (this._image.src.split("/")[2] == "greenHealthPotion.png") {
            this._isconsumable = true;
            this._player.heal(50, true);
        } else if (this._image.src.split("/")[2] == "blueHealthPotion.png") {
            this._isconsumable = true;
            this._player.heal(500, true);
        }

        let camera = Camera.instance
        this.potionsound.getComponent(Transform).position = camera.position
        this.potionsound.play()

        this._lootimage.visible = false;
        this._actionBar.resetSlot(slot);
        this._backPack.resetSlot(slot); 
    }

    private handleQuestLoot = (slot:number) => {
        trinketAction(this)
        if (this._image.src.split('/')[2] == 'sandbeetle.png') {
            this._isquestloot = true;
            this._player.trinket("It looks like a petrified beetle shell", "Beetle Shell", slot, this)
        } else if (this._image.src.split('/')[2] == "orctooth.png") {
            this._isquestloot = true;
            this._player.trinket("You hit him so hard a tooth fell out! Someone might want this.", "Orc Tooth", slot, this);
        }
    }
    
    private equipWeaponAction = (slot: number) => {
        if (this._image.src.split('/')[2] == 'rustysword.png') {
            this._player.weapon(resources.loot.rustysword, "Rusty Sword", this._actionBar, this._backPack, this, slot)
        } else if (this._image.src.split('/')[2] == 'rustydagger.png') {
            this._player.weapon(resources.loot.rustydagger, "Rusty Dagger", this._actionBar, this._backPack, this, slot)
        } else if (this._image.src.split('/')[2] == 'rustyaxe.png') {
            this._player.weapon(resources.loot.rustyaxe, "Rusty Axe", this._actionBar, this._backPack, this, slot)
        } else if (this._image.src.split('/')[2] == "crackedstaff.png") {
            this._player.weapon(resources.loot.crackedstaff, "Cracked Staff", this._actionBar, this._backPack, this, slot)
        } 
    }

    private inspectScroll = () => {
        this._spellScroll.setSpell(this._desc.value, this)
    }

    private inspectClothing = () => {
        trinketAction(this)
        const statement = `This is ${this.lootdesc()}, a SutenQuest Wearable NFT. It can be safely deleted from your game inventory. Its either already present in your wallet, or on the way.
        Dbl click, then click on the trash icon to delete it from inventory.`
        const chunks = chunkSentence(statement, 7)
        writeChunks(chunks)
    }

    private castSpell = () => {
        let completespell = getspell(this._desc.value)
        spellAction(this, completespell)
    }

    public setOnClickForSelling(tradewindow:TradeWindow): void {
        this._lootimage.onClick = new OnPointerDown(() => {
            this.saleResetItem()

            const slotPosition1 = slotPicker(36);
            this.setSlotProperties(slotPosition1);

            if(this._tradewindow) {
                log("Calling tradewindow.sell")
                this._tradewindow.sell(this) 
            } else {
                tradewindow.sell(this)
            }
        });
    }

    public setOriginalAction(slot:number) {
        // Based on the item type, assign the correct action method
        if (this._isconsumable) {
            this.setOriginalOnClick(() => this.consumeAction(slot));
        } else if (this._isweapon) {
            this.setOriginalOnClick(() => this.equipWeaponAction(slot));
        } else if (this._isquestloot) {
            this.setOriginalOnClick(() => this.handleQuestLoot(slot));
        } else if (this._isscroll)  {
            this.setOriginalOnClick(() => this.inspectScroll()); 
        } else if (this._isclothing) {
            this.setOriginalOnClick(() => this.inspectClothing());
        } else if (this._isspell) {
            this.setOriginalOnClick(() => this.castSpell());
        } else {
            this._player.unusable()
        }
    }

    // Call this method with the original onClick logic
    public setOriginalOnClick(onClickFunction: () => void): void {
        this.originalOnClick = onClickFunction;
        this._lootimage.onClick = new OnPointerDown(() => onClickFunction());
    }

    // Call this method to switch to a selling action or any other temporary action
    public setTemporaryOnClick(action: () => void): void {
        this._lootimage.onClick = new OnPointerDown((e) => action());
    }

    // Method to restore the original onClick logic
    public restoreOriginalOnClick(): void {
        this._lootimage.onClick = new OnPointerDown(() => this.originalOnClick());
    }


    public image() {
        return this._image;
    }

    public slot() {
        return this._slot;
    }

    public show() {
        if (this.isLootWindow) {
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else if (this.isQuestWindow) {
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else if (this.isMerchant) {
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else if (this._backPack) {
            this._lootimage.visible = true;
            this._desc.visible = true;
        } else {
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

    get lootimage() {
        return this._lootimage
    }

    set itemtype(type) {
        this._itemtype = type
    }

    public spelltype() {
        return this._type
    }

    get itemtype() {
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

    get buybackprice() {
        return this._buybackprice;
    }

    set buybackprice(val) {
        this._buybackprice = val;
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

    public saleResetItem() {
        //Don't want to make the item invisible, just want to reset its old slot

        if (this.slot() < 10) {
            this._actionBar.resetSlot(this._slot);
        } else {
            this._backPack.resetSlot(this._slot);
        } 
    }

    public removeItem() {
        //log('inside removeItem')
        //log('slot ', this.slot())
        this._lootimage.visible = false;
        if(this.slot() < 10 ) {
            this._actionBar.resetSlot(this._slot);
        } else {
            this._backPack.resetSlot(this._slot);
        }
    }

    public addSpellClick() {
        //log('inside addSpellClick')
        this._lootimage.onClick = new OnPointerDown(
            (e) => {
                log('Clicked in addSpellClick')
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Add to ActionBar",
            }
        );
    }

    public updateLoc(slot: number) {
        //log(`in item updateLoc method`)
        this._lootimage.visible = true;

        this.setOriginalAction(slot);
    }

    public activateSpell(spell: Ispell) {
        //log('item.ts:478 - inside activateSpell');
        const slot = 60;
        const slotPosition = slotPicker(slot);
        this.setActiveSpellImageProperties(slotPosition);
        this._activespellimage.sourceWidth = this._lootimage.sourceWidth;
        this._activespellimage.sourceHeight = this._lootimage.sourceHeight;
        this._activespellimage.visible = true;

        this._player.setShield(spell.size, spell.oncastmsg[0].line1);

       setTimeout(spell.duration, () => {
            this._activespellimage.visible = false;
            this._player.setShield(0, spell.ondropmsg[0].line1);
        })
    }

    public sendToBackpack() {
        //log(`STEP ONE: item.ts: Clicked on the Loot Item, now in sendToBackpack func`)
        let obj = Singleton.getInstance()
        let myactionbarcontents = obj.fetchactionbar()
        let mybackpackcontents = obj.fetchbackpack()
        //let slot = this._actionBar.selectSlot(this);
        let slot = this._actionBar.checkSlot()

        //log(`item.ts:476 - The actionBar checkSlot method thinks I should use: slot ${slot}`)

        if (slot === 0) {
            //log(`Because its 0, Calling selectSlot on the backpack`)
            //slot = this._backPack.selectSlot(this);
            slot = this._backPack.checkSlot()
            //log(`item.ts:476 - The backpack checkSlot method thinks I should use: slot ${slot}`)
        }

        //log(`STEP 3 - Processing the slot update`)
        if (slot === 50) {
            //log(`STEP 4 - NO SPACE ANYWHERE`)
            this._player.bagsfull();
            this._desc.visible = false;
            this._lootimage.visible = false;
        } else {
            this._slot = slot;
            const slotPosition = slotPicker(slot);
            if(slotPosition.bp) {
                this.isBackpack = true
            }
            this.setSlotProperties(slotPosition);
            //log(`slotPosition backpack: ${slotPosition.bp}`)
            if(this.isBackpack) {
                //log(`STEP 4 - BACKPACK`)
                //log(`item.ts: ts a backback`)
                this._backPack.setSlot(slot)
                this.updateLoc(slot)
                let camera = Camera.instance
                this.backpacksound.getComponent(Transform).position = camera.position
                this.backpacksound.play();
                mybackpackcontents.push(this)
                this._desc.visible = false;
                if(this._backPack.bpopen) {
                    this._lootimage.visible = true; 
                } else {
                    this._lootimage.visible = false;
                }
            } else {
                log(`STEP 4 - ACTIONBAR`)
                this._actionBar.setSlot(slot)
                this.updateLoc(slot)
                myactionbarcontents.push(this)
                this.isActionBar = true;
                this._lootimage.visible = true;
                this._desc.visible = false;
            }

            if (this._lootwindow) {
                this._lootwindow.hidelootwindow();
                this._lootwindow.looted = true;
                this._npc?.hideOrc()
            }

            if (this._questwindow) {
                //this._questwindow.hide()
                this._questwindow.hidequestwindow()
            }
            
        }
    }

    setSlotProperties(slotPosition:any) {
        this.isActionBar = slotPosition.ab;
        this.isBackpack = slotPosition.bp;
        this.isMerchant = slotPosition.mc;
        this.isPurchase = slotPosition.pc;
        this.isLootWindow = slotPosition.lw;
        this._lootimage.hAlign = slotPosition.ha;
        this._lootimage.vAlign = slotPosition.va;
        this._lootimage.width = slotPosition.w;
        this._lootimage.height = slotPosition.h;
        this._lootimage.positionY = slotPosition.y;
        this._lootimage.positionX = slotPosition.x;
        this._desc.fontSize = slotPosition.fs;
        this._desc.width = slotPosition.fw;
        this._desc.height = slotPosition.fh;
        this._desc.hAlign = slotPosition.fha;
        this._desc.vAlign = slotPosition.fva;
        this._desc.positionY = slotPosition.fy;
        this._desc.positionX = slotPosition.fx;
        this._desc.visible = false;
        if(this.isPurchase) { this._desc.visible = true}
    }

    setActiveSpellImageProperties(slotPosition:any) {
        this._activespellimage.hAlign = slotPosition.ha;
        this._activespellimage.vAlign = slotPosition.va;
        this._activespellimage.width = slotPosition.w;
        this._activespellimage.height = slotPosition.h;
        this._activespellimage.positionY = slotPosition.y;
        this._activespellimage.positionX = slotPosition.x;
    }

    private setItemForSale() {
        log(`item.ts: setItemForSale() - In Set Item for Sale`)
        this._tradewindow?.purchase(this)

        const slotPosition = slotPicker(36);
        this.setSlotProperties(slotPosition);
       
    }

    private handleCurrencyItem(currency: { copper: number, silver: number, gold: number, platinum: number }) {
        // Extract currency details
        const { copper, silver, gold, platinum } = currency;

        // Call the player controller to update the currency
        updateCurrency(copper, silver, gold, platinum, this._player.address);

        if (this._lootwindow) {
            this._lootwindow.hidelootwindow();
            this._lootwindow.looted = true;
            this._npc?.hideOrc()
        }

        // Make the currency loot item disappear from the UI
        this._lootimage.visible = false;
        this._desc.visible = false;

        // Optionally, play a sound or show a message to indicate currency has been added
        this.showCurrencyAddedFeedback(copper, silver, gold, platinum);
    }

    // Method to provide feedback to the player about the currency added
    private showCurrencyAddedFeedback(copper: number, silver: number, gold: number, platinum: number) {
        let camera = Camera.instance;
        this.coinssound.getComponent(Transform).position = camera.position;
        this.coinssound.play();
        // Show message (this is a placeholder, replace with your UI logic)
        log(`Added copper: ${copper}, silver: ${silver}, gold: ${gold}, platinum: ${platinum} to the player.`);
        if(copper > 0 && silver == 0 && gold == 0 && platinum == 0) {
            writeToCl(`Looted ${copper} copper`)
        } else if (copper > 0 && silver > 0 && gold == 0 && platinum == 0) {
            writeToCl(`Looted ${silver} silver, ${copper} copper`) 
        } else if (copper > 0 && silver > 0 && gold > 0 && platinum == 0) {
            writeToCl(`Looted ${gold} gold, ${silver} silver, ${copper} copper`) 
        } else {
            writeToCl(`Looted copper: ${copper}, silver: ${silver}, gold: ${gold}, platinum: ${platinum}`)
        }
    } 
}