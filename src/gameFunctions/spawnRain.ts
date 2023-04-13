import { IsPrecip, PrecipType } from "src/components/precipitationComponent"

export function spawnRain(dropShape: PlaneShape, billboard: Billboard, dropMaterial: BasicMaterial) {
    const drop = new Entity()
    drop.addComponent(new IsPrecip(PrecipType.drop))
    const pos = new Vector3(Math.random() * 8 + 4, 10, Math.random() * 8 + 4)
    drop.addComponent(
        new Transform({
            position: pos,
            scale: new Vector3(0.15, 0.15, 0.15)
        })
    )
    // add predefined shape
    drop.addComponent(dropShape)

    // Make drop rotate to always face you in the Y axis
    drop.addComponent(billboard)

    // Apply drop texture
    drop.addComponent(dropMaterial)

    engine.addEntity(drop)
}