import { CheckWeather, CurrentWeather, LightningSystem } from "src/gameObjects/weather"
import { FallSystem } from "./FallSystem"
import { RotateSystem } from "./flakeRotation"
import { SpawnSystem } from "./SpawnSystem"
import { setTimeout } from "src/gameUtils/timeOut"
import { Singleton } from "src/gameObjects/playerDetail"
import { SoundBox } from "src/gameObjects/soundBox"
import { Ispell } from "src/components/spellComponent"
import { IsPrecip } from "src/components/precipitationComponent"

// WEATHER CONTROLLER


export function openHeavens(completespell:Ispell, sound: AudioClip) {
    const obj = Singleton.getInstance();
    obj.currentweather = completespell.skill
    
    obj.combatlog.text = completespell.oncastmsg[0].line1

    log(`checking currentWeather in the obj: ${obj.currentweather}`)
    
    const weatherObject = new CurrentWeather()

    const soundbox = new SoundBox(
        new Transform({ position: Camera.instance.feetPosition }),
        sound,
        false,
        800
    );

    soundbox.play()

    // ADD HOUSE

    const house = new Entity()
    house.addComponent(
        new Transform({
            position: new Vector3(8, 0, 8),
            scale: new Vector3(1.59, 1.59, 1.59),
        })
    )

    house.addComponent(new GLTFShape('models/house_dry.gltf'))
    //engine.addEntity(house)

    weatherObject.house = house

    // ADD CLOUDS

    const clouds = new Entity()
    clouds.addComponent(
        new Transform({
            position: new Vector3(8, 10, 8),
            scale: new Vector3(4, 4, 4),
        })
    )
    weatherObject.clouds = clouds

    // DEFINE LIGHTNING COMPONENTS AS AN ARRAY OF GLTF COMPONENTS

    const lightningModels: GLTFShape[] = []
    for (let i = 1; i < 6; i++) {
        const modelPath = 'models/ln' + i + '.gltf'
        const lnModel = new GLTFShape(modelPath)
        lightningModels.push(lnModel)
    }

    // ADD LIGHTNING ENTITY

    const lightning = new Entity()
    lightning.addComponent(new Transform())
    lightning.getComponent(Transform).position.set(8, 10, 8)
    lightning.getComponent(Transform).scale.setAll(5)
    engine.addEntity(lightning)

    const systems = [
        new CheckWeather(weatherObject),
        new FallSystem(),
        new RotateSystem(),
        new SpawnSystem(weatherObject),
        new LightningSystem(weatherObject, lightning, lightningModels),
    ];

    systems.forEach((system) => engine.addSystem(system));

    setTimeout(completespell.duration, () => {
        const drops = engine.getComponentGroup(IsPrecip)
        for (const drop of drops.entities) {
            log('removing drop')
            engine.removeEntity(drop)
        }
        systems.forEach((system) => engine.removeSystem(system));
        obj.combatlog.text = completespell.ondropmsg[0].line1
        const flakes = engine.getComponentGroup(IsPrecip)
        for (const flake of flakes.entities) {
            log('removing flake')
            engine.removeEntity(flake)
        }
    });
}

