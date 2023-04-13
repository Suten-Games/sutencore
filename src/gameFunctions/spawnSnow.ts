import { IsPrecip, PrecipType } from "src/components/precipitationComponent"
import { SpinVel } from "src/gameSystems/flakeRotation"

export function spawnSnow(flakeShape: PlaneShape, flakeMaterial: any[]) {
    const flake = new Entity()
    flake.addComponent(new IsPrecip(PrecipType.flake))
    const pos = new Vector3(Math.random() * 8 + 4, 10, Math.random() * 8 + 4)
    flake.addComponent(
        new Transform({
            position: pos,
            rotation: Quaternion.Euler(
                Math.random() * 180,
                Math.random() * 180,
                Math.random() * 180
            ),
            scale: new Vector3(0.3, 0.3, 0.3)
        })
    )

    const flakeSpin = new Vector3(
        Math.random() * 30,
        Math.random() * 30,
        Math.random() * 30
    )

    const flakeSpeed = Math.random() * 2

    flake.addComponent(new SpinVel(flakeSpin, flakeSpeed))

    flake.addComponent(flakeShape)

    const materialIndex = Math.floor(Math.random() * 4)
    flake.addComponent(flakeMaterial[materialIndex])

    engine.addEntity(flake)
}