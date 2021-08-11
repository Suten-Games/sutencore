export class ActionWindow {
    private _canvas;
    private _image;
    private _ab;

    constructor(canvas: UICanvas, image: Texture) {
      this._canvas = canvas;
      this._image = image;
      this._ab = new UIImage(this._canvas, this._image);
      this._ab.hAlign = "center"
      this._ab.vAlign = "bottom";
      this._ab.width = "32%";
      this._ab.height = "14%";
      this._ab.positionY = "14%"
      this._ab.sourceWidth = 1018;
      this._ab.sourceHeight = 456;
    }

    public show() {
       this._ab.visible = true;
    }
    
    public hide() {
       this._ab.visible = false;
    }
}