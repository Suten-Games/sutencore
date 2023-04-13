import { IsPrecip, PrecipType } from "src/components/precipitationComponent"
import { rainSpeed, snowSpeed } from "suten"

// drop and reposition for both raindrops and snowflakes
export const drops = engine.getComponentGroup(IsPrecip)

export class FallSystem implements ISystem {
    update(dt: number) {
        for (const drop of drops.entities) {
            const position = drop.getComponent(Transform).position
            const type = drop.getComponent(IsPrecip).type

            if (type === PrecipType.drop) {
                position.y = position.y - dt * rainSpeed
            } else if (type === PrecipType.flake) {
                position.y = position.y - dt * snowSpeed
            }
            if (position.y < 0) {
                position.x = Math.random() * 8 + 4
                position.y = 12
                position.z = Math.random() * 8 + 4
            }
        }
    }
}