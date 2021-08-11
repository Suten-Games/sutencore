import { ParticleSystem } from "../gameSystems/ParticleSystem"

export class Spells {
    private timer = 2
    private height = 4
    private shape = new BoxShape()
    private initialColor = new Color3(1, 0.3, 5)
    private finalColor = new Color3(110, 0, 0)
    private textColor = new Color3(14 / 255, 186 / 255, 255 / 255)
    private material = new Material()
    private canvas = new UICanvas()
    private imageTexture = new Texture('src/protect-blue-2.png')
    private clickableImage = new UIImage(this.canvas, this.imageTexture)


    constructor() {
        this.material.albedoColor = Color3.Lerp(this.initialColor, this.finalColor, 1 / 5)
        this.material.emissiveColor = Color3.Lerp(this.initialColor, this.finalColor, 1 / 11)
        this.material.emissiveIntensity = 2

        this.clickableImage.width = "72px"
        this.clickableImage.height = "72px"
        this.clickableImage.sourceWidth = 256
        this.clickableImage.sourceHeight = 256
        this.clickableImage.hAlign = "center";
        this.clickableImage.vAlign = "bottom";
        this.clickableImage.width = "2.5%";
        this.clickableImage.height = "7.3%";
        this.clickableImage.positionY = "7%";
        this.clickableImage.positionX = "-16%";
        this.clickableImage.isPointerBlocker = true
        this.clickableImage.onClick = new OnClick(() => {
            log('hey now, calling turnOn')
            ps.turnOn()
        })
    }

    
}

const ps = new ParticleSystem(2,2,new BoxShape())
engine.addSystem(ps)



