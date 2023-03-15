import { getspell } from "src/gameObjects/spells";

export  function setSpell(canvas: UICanvas, spellname:string) {
    let spell = getspell(spellname)

    let image = new UIImage(canvas, spell.image)
    image.hAlign = "center";
    image.vAlign = "bottom";
    image.width = "5%";
    image.height = "8%";
    image.positionY = "68%";
    image.positionX = "-30%";
    image.sourceWidth = 122;
    image.sourceHeight = 120;
    image.visible = true;
}