import resources from "../resources";
import { LifeItem } from "../components/lifeItemComponent";
import { Item } from "../gameObjects/item";
import { sLoot } from "suten";
import { Npc } from "src/gameObjects/npc";
import { Singleton } from "src/gameObjects/playerDetail";

export class LootWindow extends Entity {
    private _canvas;
    private _image;
    private _loot;
    private _closebutton;
    private _actionbar;
    private _backpack;
    private _player;
    private _lootitem: any;
    private _activeloot: any;
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
        this._actionbar = actionBar;
        this._backpack = backPack;
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
                log('lootwindow close button has been clicked')
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
        if (this._looted) {
            this._looted = false;
        }

        //log(`lootWindow.ts:129 - mob name: ${this._npc.mobname}`)

        let json
        let mobtier = 1

        switch (this._npc.mobname) {
            case 'Sand Orc Peon':
                mobtier = 1
                break;
            case 'Orc Peon':
                mobtier = 1
                break;
            case 'Orc Grunt':
                mobtier = 2
                break;
            case 'Sand Orc Archer':
                mobtier = 3
                break;
            case 'Orc Warrior':
                mobtier = 4
                break;
            case 'Orc Shaman':
                mobtier = 5
                break;
            case 'Orc Chief':
                mobtier = 1
                break;
            case 'Riverlands Orc Archer':
                mobtier = 1
                break;
            default:
                mobtier = 1
                break;
        }

        var obj = Singleton.getInstance();
        let actionbar = obj.actionbar
        obj.lootwindows.push(this)
        //log(`lootWindows.ts:167 - actionbar: ${actionbar}`)

        //Commenting out the API call to fetch the loot for now
        //Done of 4/12/22 for testing
        let lootfetched = true;
        try {
            //let response = await fetch("https://sutenquestapi.azurewebsites.net/loot/" + mobtier + '/' + 123456);
            let response = await fetch(sLoot + mobtier + '/' + 123456)
            json = await response.json();
            lootfetched = true
        } catch (error) {
            log("error: ", error);
            lootfetched = false
        }

        //log(`lootWindow.ts:176 - loot api response: `, json)
        //log(`lootWindow.ts:177 - loot api lootfetched: ${lootfetched}`)
        // log(`lootWindow.ts:178 - loot api statusCode: ${json.statusCode}`)

        // api response:
        // { id: "60fc83b3eb1e240fdefcdd17", name: "Sand Beetle", shape: "sandbeetle.png", width: 345, height: 400 }
        // height: 400
        // id: "60fc83b3eb1e240fdefcdd17"
        // name: "Sand Beetle"
        // shape: "sandbeetle.png"
        // width: 345

        // if (!json.shape) { json.shape = "sandbeetle.png" }



        if (json.statusCode !== 500) {
            let lootimg

            if (json.shape.includes("images")) {
                lootimg = json.shape
            } else {
                //log('Adding images/looticons to the shape')
                lootimg = "images/looticons/" + json.shape
            }

            //let lootimg = "images/looticons/" + json.shape
            //log(`lootWindow.ts:203 - Calling new Item(${lootimg})`)
            //log(`lootWindow.ts:204 - JSON.sound(${json.sound})`)
            this._lootitem = new Item(
                new Texture(lootimg), //image
                40,                   //slog
                json.width,           //srcw
                json.height,          //srch
                json.name,            //name
                json.type,            //type
                json.price,           //price
                json.itemtype,        //itemtype
                json.spellshape,      //spellshape
                json.spellstart,      //spellstart
                json.spellend,        //spellend
                json.sound,           //sound
                null,                //tradewindow
                this,                 //lootwindow
                this._npc
            )
        } else {
            //log('lootWindow.ts:212 - Calling new Item()')
            this._lootitem = new Item(
                new Texture("images/looticons/manavial.png"),
                40,
                122,
                120,
                "Mana Vial",
                "consumable",
                50,
                "consumable",
                null,   //spellshape
                null,   //spellstart
                null,   //spellend
                null,   //sound
                null,    //tradewindow
                this,    //lootwindow),
                this._npc
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
        //log(`lootWindow.ts:205 in flip`)
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
        //log('lootWindow:273 - in lootWindow show method')
        this._closebutton.visible = true;
        this._loot.visible = true;
        if (item) {
            //log('lootWindow:277 - in lootWindow, we have an item, creating a new lootItem')
            //log(`lootWindow:278 - the item ${item}`)
            this._lootitem = new Item(new Texture("images/looticons/manavial.png"), 40, 122, 120, "Mana Vial", "consumable", 50, "consumable",
                null, null, null, null, null, this)
            this._lootitem.show()
        } else {
            //log('lootWindow:288 in lootWindow we do not have an item so calling getLoot')
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