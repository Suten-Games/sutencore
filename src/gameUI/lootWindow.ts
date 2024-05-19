import resources from "../resources";
import { Item } from "../gameObjects/item";
import { apikey, local } from "suten";
import { Npc } from "src/gameObjects/npc";
import { Singleton } from "src/gameObjects/playerDetail";


const server = local
    ? "http://localhost:8080/loot/"
    : "https://sutenquestapi.azurewebsites.net/loot/";

export class LootWindow extends Entity {
    private _canvas;
    private _image;
    private _loot;
    private _closebutton;
    // private _actionbar;
    // private _backpack;
    private _player;
    private _lootitem: any;
    //private _activeloot: any;
    private _looted = false
    private _npc

    

    constructor(canvas: any, image: any, actionBar: any, backPack: any, player: any, orc: Npc) {
        super()
        this._canvas = canvas;
        this._image = image;
        this._loot = new UIImage(this._canvas, this._image);
        this._loot.hAlign = "left"
        this._loot.vAlign = "center";
        this._loot.width = "50%"; //Old Icons
        this._loot.height = "84%";
        this._loot.positionY = "10.2%";
        this._loot.positionX = "6%";
        this._loot.sourceWidth = 1440; //Old Style
        this._loot.sourceHeight = 1440; //Old Style
        this._loot.visible = false;
        // this._actionbar = actionBar;
        // this._backpack = backPack;
        this._player = player;
        this._npc = orc
        //this.addComponent(new LifeItem())
        this._closebutton = new UIImage(canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "left";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "7%";
        this._closebutton.height = "7%";
        this._closebutton.positionX = "35%";
        this._closebutton.positionY = "32%";
        this._closebutton.sourceWidth = 168;
        this._closebutton.sourceHeight = 164;
        this._closebutton.visible = false;
        this._closebutton.onClick = new OnPointerDown(
            (e) => {
                //log('lootwindow close button has been clicked')
                this.hide()
                this._closebutton.visible = false;
            },
            {
                button: ActionButton.PRIMARY,
                hoverText: "Close",
            }
        );
    }

    async getloot() {
        //log(`lootWindow:64 - in the getLoot Method`)
        if (this._looted) {
            this._looted = false;
        }

        //log(`lootWindow.ts:69 - mob name: ${this._npc.mobname}`)

        let json
        let mobtier: number

        if (!this._npc.level) {
            mobtier = 1
        } else {
            mobtier = this._npc.level
        }


        var obj = Singleton.getInstance();
        let actionbar = obj.actionbar
        obj.lootwindows.push(this)

        let lootfetched = true;
        let looturl = server + 'mob/' + mobtier + '/' + this._player.address + '/' + this._npc.id

        try {
            const response = await fetch(looturl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apikey
                }
            });
            //let response = await fetch(looturl)
            json = await response.json();
            lootfetched = true
        } catch (error) {
            lootfetched = false
        }


        if (json.statusCode !== 500) {
            let lootimg

            log(`FETCHED LOOT: ${JSON.stringify(json)}`)

            if (json.shape.includes("images")) {
                lootimg = json.shape
            } else {
                lootimg = "images/looticons/" + json.shape
            }

            //log(`lootWindow.ts:134 - Calling new Item(${lootimg})`)
            this._lootitem = new Item(
                new Texture(lootimg), //image
                40,                   //slot
                json.width,           //srcw
                json.height,          //srch
                json.name,            //name
                json.type,            //type
                json.price,           //price
                json.buybackprice,
                json.itemtype,        //itemtype
                json.itemdetail,
                json.stats,
                json.weaponaction,
                json.spellshape,      //spellshape
                json.spellstart,      //spellstart
                json.spellend,        //spellend
                json.sound,           //sound
                null,                //tradewindow
                this,                 //lootwindow
                this._npc,
                null                  //questwindow
            )
        } else if (!lootfetched) {
            //log('lootWindow.ts:154 - Failed to fetch loot. Creating an Empty Vial')
            this._lootitem = new Item(
                new Texture("images/looticons/manavial.png"),
                40,
                122,
                120,
                "Empty Vial",
                "consumable",
                50,
                30,
                "consumable",
                null,
                null,
                null,
                null,   //spellshape
                null,   //spellstart
                null,   //spellend
                null,   //sound
                null,    //tradewindow
                this,    //lootwindow),
                this._npc,
                null    //questwindow
            )
        } else {
            this._lootitem = new Item(
                new Texture("images/looticons/manavial.png"),
                40,
                122,
                120,
                "Mana Vial",
                "consumable",
                50,
                2,
                "consumable",
                null,
                null,
                null,
                null,   //spellshape
                null,   //spellstart
                null,   //spellend
                null,   //sound
                null,    //tradewindow
                this,    //lootwindow),
                this._npc,
                null    //questwindow
            )

        }

        this._lootitem.show()
    }

    public sendtobp() {
        //log(`lootWindow:234 - ${this._npc.id} lootWindow sendtobp`)
        this._lootitem.sendToBackpack()
    }

    get looted() {
        return this._looted
    }

    set looted(val: boolean) {
        this._looted = val
    }

    get visible() {
        return this._loot.visible
    }

    public flip(item = null) {
        //log(`lootWindow.ts:214 in flip`)
        if (this._loot.visible) {
            this.hide()
        } else {
            if (item) {
                this.show(item)
            } else {
                this.show()
            }

            //log(`lootWindow:260 - id: ${this._npc.id} Adding the lootallclick method`)
            //this._npc.addlootallclick()
        }
    }

    public hidelootwindow() {
        //log('lootWindow:266 - clicked hide loot window')
        var obj = Singleton.getInstance()
        obj.lootwindows.pop()
        this._loot.visible = false;
        this._closebutton.visible = false;
        //this._lootitem.hide()
    }

    public show(item = null) {
        //log('lootWindow:239 - in lootWindow show method')
        this._closebutton.visible = true;
        this._loot.visible = true;
        if (item) {
            //log('lootWindow:243 - in lootWindow, we have an item, creating a new lootItem')
            //log(`lootWindow:244 - the item ${item}`)
            this._lootitem = new Item(new Texture("images/looticons/manavial.png"), 40, 122, 120, "Mana Vial", "consumable", 50, 1, "consumable",
                null, null, null, null,null,null, null, null, this, null, null)
            this._lootitem.show()
        } else {
            //log('lootWindow:249 in lootWindow we do not have an item so calling getLoot')
            this.getloot()
        }

    }

    public hide() {
        //log('in lootWindow hide method')
        this._loot.visible = false;
        //log('calling hide on the lootitem')
        this._closebutton.visible = false;
    }
}