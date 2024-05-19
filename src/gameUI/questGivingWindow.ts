import { acceptQuest } from "src/gameFunctions/fetchQuest";
import { Player } from "src/gameObjects/player";
import resources from "src/resources";
import { UI } from "./ui";

export class QuestGivingWindow extends Entity {
    private _canvas: any;
    private _image: Texture;
    private _questwindow;
    private _questText: UIText;
    private _closebutton;
    private _lootitem: any;
    private _acceptbutton: any;
    private _questId: string | null = null;
    private _player: Player;
    private _npcid: string;

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

        this._acceptbutton = new UIImage(this._canvas, resources.interface.acceptButton);
        this._acceptbutton.hAlign = "right"
        this._acceptbutton.vAlign = "center"
        this._acceptbutton.width = "5%"
        this._acceptbutton.height = "5%"
        this._acceptbutton.positionY = "-21%";
        this._acceptbutton.positionX = "-15%";
        this._acceptbutton.sourceWidth = 1314;
        this._acceptbutton.sourceHeight = 545;
        this._acceptbutton.visible = false;
        this._acceptbutton.onClick = new OnPointerDown(
            (e) => {
                this.acceptQuest()
            }
        )

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

    public acceptQuest() {
        log(`called acceptQuest`)
        acceptQuest(this._questId, this._player, this._npcid).then(acceptres => {
            log(`back from the accept quest call, this is the dialogue: ${acceptres.dialogue}`)
            log(`Setting the searchingfor results to: ${acceptres.searchingfor}`)
            this._player.searching = acceptres.searchingfor
            // chunks = chunkSentence(acceptres.dialogue, 7)
            // writeChunks(chunks)
            this.hide()
            this.openQuestAcceptedWindow(acceptres.dialogue)
        })
    }

    openQuestAcceptedWindow(val: string) {
        var ui = UI.getInstance();
        ui.qa.openQuestAcceptedWindow(val);
    }


    public openQuestGivingWindow(questText: string, questID: string, player:Player, npcid:string) {
        //this._questwindow.visible = true;
        this._questId = questID;
        this._player = player;
        this._npcid = npcid;

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
        this._acceptbutton.visible = true;
        //this.show()
    }

    get visible() {
        return this._questwindow.visible
    }

    public show() {
        this._questwindow.visible = true;
        this._questText.visible = true;
        this._closebutton.visible = true;
        this._acceptbutton.visible = true;
    }

    public hide() {
        this._questwindow.visible = false;
        this._questText.visible = false;
        this._closebutton.visible = false;
        this._acceptbutton.visible = false;
    }

    public hidequestwindow() {
        this._questwindow.visible = false;
        this._questText.visible = false;
        this._closebutton.visible = false;
        this._acceptbutton.visible = false;
    }
}