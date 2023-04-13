import { spawnRain } from "src/gameFunctions/spawnRain"
import { spawnSnow } from "src/gameFunctions/spawnSnow"
import { CurrentWeather } from "src/gameObjects/weather"

const dropShape = new PlaneShape()

const billboard = new Billboard(false, true, false)

// define reusable drop material
const dropTexture = new Texture('materials/drop.png', {
    hasAlpha: true,
    samplingMode: 1
})
const dropMaterial = new BasicMaterial()
dropMaterial.texture = dropTexture

const flakeMaterial: BasicMaterial[] = []
for (let i = 1; i < 5; i++) {
    const texture = new Texture('materials/flake' + i + '.png', {
        hasAlpha: true,
        samplingMode: 1
    })
    const material = new BasicMaterial()
    material.texture = texture
    flakeMaterial.push(material)
}

// Define a reusable shape
const flakeShape = new PlaneShape()

export class SpawnSystem implements ISystem {
    weather: CurrentWeather
    constructor(weather: CurrentWeather) {
        this.weather = weather
    }
    update(dt: number) {
        if (this.weather.dropsToAdd > 1) {
            this.weather.currentSpawnInterval += dt
            if (this.weather.currentSpawnInterval >= this.weather.spawnInterval) {
                spawnRain(dropShape,billboard,dropMaterial)
                this.weather.dropsToAdd -= 1
                log('spawning rain')
                this.weather.currentSpawnInterval = 0
            }
        }
        if (this.weather.flakesToAdd > 1) {
            this.weather.currentSpawnInterval += dt
            if (this.weather.currentSpawnInterval >= this.weather.spawnInterval) {
                spawnSnow(flakeShape,flakeMaterial)
                this.weather.flakesToAdd -= 1
                log('spawning snow')
                this.weather.currentSpawnInterval = 0
            }
        }
    }
}