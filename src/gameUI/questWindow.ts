import resources from "src/resources";

export class QuestWindow {
    private _canvas: any;
    private _image: Texture;
    private _bp;
    private _questText: UIText;
    private _closebutton;

    constructor(canvas: any, image: Texture) {
        this._canvas = canvas;
        this._image = image;
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "right"
        this._bp.vAlign = "center";
        this._bp.width = "35%";
        this._bp.height = "80%";
        this._bp.positionY = "1%";
        this._bp.positionX = "-2%";
        this._bp.sourceWidth = 1053;
        this._bp.sourceHeight = 1712;
        this._bp.visible = false;

        // Initialize the UIText instance
        this._questText = new UIText(this._canvas);
        this._questText.vAlign = "center";
        this._questText.hAlign = "right";
        this._questText.positionX = "-22%";
        this._questText.positionY = "0%";
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

    public openQuestWindow(questText: string) {
        this._bp.visible = true;

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
        this._questText.visible = true;
        this._closebutton.visible = true;
    }


    public show() {
        this._bp.visible = true;
        this._questText.visible = true;
        this._closebutton.visible = true;
    }

    public hide() {
        this._bp.visible = false;
        this._questText.visible = false;
        this._closebutton.visible = false;
    }
}