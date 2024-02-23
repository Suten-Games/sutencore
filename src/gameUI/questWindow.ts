import { getQuestReward } from "src/gameFunctions/fetchQuest";
import { Item } from "src/gameObjects/item";
import resources from "src/resources";

export class QuestWindow extends Entity {
    private _canvas: any;
    private _image: Texture;
    private _questwindow;
    private _questText: UIText;
    private _closebutton;
    private _lootitem: any;

    constructor(canvas: any, image: Texture) {
        super()
        this._canvas = canvas;
        this._image = image;
        this._questwindow = new UIImage(this._canvas, this._image);
        this._questwindow.hAlign = "right"
        this._questwindow.vAlign = "center";
        this._questwindow.width = "35%";
        this._questwindow.height = "80%";
        this._questwindow.positionY = "1%";
        this._questwindow.positionX = "-2%";
        this._questwindow.sourceWidth = 1053;
        this._questwindow.sourceHeight = 1712;
        this._questwindow.visible = false;

        // Initialize the UIText instance
        this._questText = new UIText(this._canvas);
        this._questText.vAlign = "center";
        this._questText.hAlign = "right";
        this._questText.positionX = "-22%";
        this._questText.positionY = "-4%";
        this._questText.fontSize = 14;
        this._questText.visible = false;
        this._questText.color = Color4.Black()

        this._closebutton = new UIImage(this._canvas, resources.interface.closebutton);
        this._closebutton.hAlign = "right";
        this._closebutton.vAlign = "center";
        this._closebutton.width = "5%";
        this._closebutton.height = "8%";
        this._closebutton.positionX = "-10%";
        this._closebutton.positionY = "26%";
        this._closebutton.sourceWidth = 168;
        this._closebutton.sourceHeight = 164;
        this._closebutton.visible = false;
        this._closebutton.onClick = new OnPointerDown(
            (e) => {
                this.hide()
            }
        )
    }

    async getLoot(questID: string,playerAddress: string){
        getQuestReward(questID, playerAddress).then(res => {
            log(`questWindow.ts: in the getQuestReward section of openQuestWindow: ${JSON.stringify(res)}`)
            let lootimg
            if (res.shape.includes("images")) {
                lootimg = res.shape
            } else {
                lootimg = "images/looticons/" + res.shape
            }

            this._lootitem = new Item(
                new Texture(lootimg),
                70,
                res.portraitwidth,
                res.portraitheight,
                res.name,
                res.itemtype,
                res.price,
                res.buybackprice,
                res.itemtype,
                res.itemdetail,
                res.stats,
                res.weaponaction,
                res.spellshape,
                res.spellstart,
                res.spellend,
                res.sound,
                null,
                null,
                null,
                this
            )

            this._lootitem.show()
        })

    }

    public openQuestWindow(questText: string, questID:string|null = null, playerAddress:string|null = null) {
        //this._questwindow.visible = true;

        if (questID && playerAddress) {
            this.getLoot(questID, playerAddress)
        }
        
        const charsPerLine = 42;
        let lines = [];
        let start = 0;

        while (start < questText.length) {
            let end = start + charsPerLine;

            if (end < questText.length) {
                // Walk backwards from the end of line till we find a space
                while (end > start && questText[end] !== ' ') {
                    end--;
                }
                // If we didn't find any space, we'll break in the middle of the word
                if (end == start) {
                    end = start + charsPerLine;
                }
            }

            lines.push(questText.slice(start, end));
            start = end + 1;
        }

        // Join lines with newline
        const displayText = lines.join('\n');

        // Display text
        this._questText.value = displayText;
        this._questText.color = Color4.Black();


        log('Calling questWindow.show()')
        this._questwindow.visible = true;
        this._questText.visible = true;
        this._closebutton.visible = true;
        //this.show()
    }

    get visible() {
        return this._questwindow.visible
    }

    public show() {
        this._questwindow.visible = true;
        this._questText.visible = true;
        this._closebutton.visible = true;
        this._lootitem.show()
    }

    public hide() {
        this._questwindow.visible = false;
        this._questText.visible = false;
        this._closebutton.visible = false;
        if(this._lootitem) {
           this._lootitem.hide()
        }
    }

    public hidequestwindow() {
        this._questwindow.visible = false;
        this._questText.visible = false;
        this._closebutton.visible = false;
    }
}