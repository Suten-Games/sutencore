import { BackPack } from "./backPack";

export class Khepra {
    private _canvas: any;
    private _image: Texture;
    private _bp;
    private _blocked: boolean;
    constructor(canvas: any, image: Texture, backpack: BackPack) {
        this._canvas = canvas;
        this._image = image;
        this._bp = new UIImage(this._canvas, this._image);
        this._bp.hAlign = "right"
        this._bp.vAlign = "bottom";
        this._bp.width = "10%";
        this._bp.height = "10%";
        this._bp.positionY = "1%";
        this._bp.positionX = "-2%";
        this._bp.sourceWidth = 7000;
        this._bp.sourceHeight = 4172;
        this._blocked = false;
        this._bp.onClick = new OnPointerDown(() => {
            if (backpack.visible) {
                backpack.hide()
            } else {
                backpack.show()
            }
        })
    }

    public show() {
        this._bp.visible = true;
    }

    public hide() {
        this._bp.visible = false;
    }
}