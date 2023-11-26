import resources from "../resources";
import { DeathItem } from "../components/deathItemComponent";
import { duatX, duatZ } from "suten";


export class DeathScene extends Entity {
    constructor() {
        super();
        engine.addEntity(this);

        log('deathScene.ts:9 - Creating the Death Scene');

        const parcelsCountX = duatX;
        const parcelsCountZ = duatZ;
        //const groundShape = new GLTFShape("models/skullsandbones.glb");
        const groundShape = resources.models.skullsandbones;
        let outerwall = resources.models.duatwall;

        for (let i = 0; i < parcelsCountX; i++) {
            for (let j = 0; j < parcelsCountZ; j++) {
                let lowground = new Entity();
                lowground.addComponent(groundShape);
                lowground.addComponent(new DeathItem());
                lowground.addComponent(
                    new Transform({ position: new Vector3(i * 16 + 8, 0, j * 16 + 8) })
                );

                engine.addEntity(lowground);
            }
        }
        // 0 * 16 = 0 + 8 = 8, 0, 8
        // 4 * 16 = 40 + 24 = 64 + 8 = 72, 0, 72

        if (duatX == 5 && duatZ == 5) {
            const bonemound = new Entity("bonemound");
            bonemound.addComponent(new DeathItem())
            engine.addEntity(bonemound);
            bonemound.addComponent(resources.models.bonemound);
            bonemound.addComponent(
                new Transform({
                    position: new Vector3(40, 0.1, 40),
                    rotation: Quaternion.Euler(0, 0, 0),
                    scale: new Vector3(1, 1, 1),
                })
            );
        }

    }

    public randomNum(num: number) {
        let max = num * 16 + 8
        return Math.floor(Math.random() * (max - 8 + 1)) + 8
    }

    unloadScene() {
        log('in deathScene unloadScene trying to remove DeathItems')
        const items = engine.getComponentGroup(DeathItem);
        while (items.entities.length) {
            engine.removeEntity(items.entities[0]);
        }
    }
}
