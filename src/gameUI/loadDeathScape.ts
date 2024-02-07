import resources from '../resources'
import { DeathItem } from '../components/deathItemComponent'
import { duatX, duatZ, sutenBase } from 'suten'

export class DeathScene extends Entity {
    constructor() {
        super()
        engine.addEntity(this)

        log('deathScene.ts:9 - Creating the Death Scene')

        const parcelsCountX = duatX
        const parcelsCountZ = duatZ
        //const groundShape = new GLTFShape("models/skullsandbones.glb");
        const groundShape = resources.models.skullsandbones
        const outerwall = resources.models.duatwall

        for (let i = 0; i < parcelsCountX; i++) {
            for (let j = 0; j < parcelsCountZ; j++) {
                const lowground = new Entity()
                lowground.addComponent(groundShape)
                lowground.addComponent(new DeathItem())
                lowground.addComponent(new Transform({ position: new Vector3(i * 16 + 8, 0, j * 16 + 8) }))

                engine.addEntity(lowground)
            }
        }
        // 0 * 16 = 0 + 8 = 8, 0, 8
        // 4 * 16 = 40 + 24 = 64 + 8 = 72, 0, 72

        if (duatX === 5 && duatZ === 5) {
            const bonemound = new Entity('bonemound')
            bonemound.addComponent(new DeathItem())
            engine.addEntity(bonemound)
            bonemound.addComponent(resources.models.bonemound)
            bonemound.addComponent(
                new Transform({
                    position: new Vector3(40, 0.1, 40),
                    rotation: Quaternion.Euler(0, 0, 0),
                    scale: new Vector3(1, 1, 1)
                })
            )
        }

        const anpuartifact = new Entity('anpuartifact')
        anpuartifact.addComponent(new DeathItem())
        engine.addEntity(anpuartifact)
        anpuartifact.addComponent(resources.models.anpuartifact)
        anpuartifact.addComponent(
            new Transform({
                position: new Vector3(60, 1.5, 60),
                rotation: Quaternion.Euler(0, 90, 0),
                scale: new Vector3(1, 1, 1)
            })
        )
        if (sutenBase === '30,30') {
            anpuartifact.addComponentOrReplace(
                new OnPointerDown(
                    (e) => {
                        log('Teleport to Saqqara')
                        const dclWorldUrl = 'https://play.decentraland.org/?NETWORK=mainnet&position=4%2C4&realm=saqqara.dcl.eth'
                        openExternalURL(dclWorldUrl)
                    },
                    {
                        button: ActionButton.PRIMARY,
                        showFeedback: true,
                        hoverText: 'Teleport to Saqqara',
                        distance: 30
                    }
                )
            )
        } else {
            anpuartifact.addComponentOrReplace(
                new OnPointerDown(
                    (e) => {
                        log('Finding Anpu ')
                        const dclWorldUrl = 'https://play.decentraland.org/?NETWORK=mainnet&position=4%2C4&realm=duat.dcl.eth'
                        openExternalURL(dclWorldUrl)
                    },
                    {
                        button: ActionButton.PRIMARY,
                        showFeedback: true,
                        hoverText: 'Locate Anpu',
                        distance: 30
                    }
                )
            )
        }
    }

    public randomNum(num: number) {
        const max = num * 16 + 8
        return Math.floor(Math.random() * (max - 8 + 1)) + 8
    }

    unloadScene() {
        log('in deathScene unloadScene trying to remove DeathItems')
        const items = engine.getComponentGroup(DeathItem)
        while (items.entities.length) {
            engine.removeEntity(items.entities[0])
        }
    }
}
