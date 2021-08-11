import resources from "../resources";
import { SoundBox } from "../gameUtils/soundbox";

export class ParticleSystem {
    private _timer: number;
    private _fireBurning: boolean = false;
    private _fireHeight: number;
    private _shape: Shape;
    private particles: Entity[] = []
    private soundbox:SoundBox
    
    group = engine.getComponentGroup(Particle)

    constructor(timer: number, height: number, shape: Shape, sound: AudioClip) {
        this._timer = timer;
        this._fireHeight = height;
        this._shape = shape;
        this.soundbox = new SoundBox(
            new Transform({ position: Camera.instance.feetPosition }),
            sound,
            false
        );
    }

    update(dt: number) {
        if (this._fireBurning) {
            if (this._timer > 0) {
                this._timer -= dt
            } else {
                this._fireBurning = false;
                this._timer = 0
                this.particles.forEach(particle => {
                  engine.removeEntity(particle)
                })
            }

            this._fireHeight = 3
            this._shape.visible = true
            for (const entity of this.group.entities) {
                const particle = entity.getComponent(Particle)
                const transform = entity.getComponent(Transform)
                const currentMaterial = (particle.life * 10) | 0
                particle.life += dt
                particle.life %= 1
                transform.position = new Vector3(
                    particle.origin.x +
                    Math.sin((particle.life + particle.seed) * 5) *
                    (1 - particle.life / 1.5) *
                    0.5,
                    particle.origin.y + particle.life * this._fireHeight,
                    particle.origin.z +
                    Math.cos((particle.life + particle.seed) * 5) *
                    (1 - particle.life / 1.5) *
                    0.5
                )
                const scale = 0.1 - particle.life / 5
                transform.scale = new Vector3(scale, scale, scale)
                transform.rotation = Quaternion.Euler(
                    0,
                    0,
                    particle.life * 360 + particle.seed * 360
                )
                const nextMaterial = (particle.life * 10) | 0
            }
        } else {
            this._fireHeight = 0
            this._shape.visible = false
        }
    }

    public turnOn(spellshape, start, end) {
        this._timer = 2
        this._fireBurning = true
        this.soundbox.play();

        const initialColor = new Color3(start, 0.3, 5)
        const finalColor = new Color3(end, 0, 0)
        const textColor = new Color3(14 / 255, 186 / 255, 255 / 255)

        const material = new Material()
        material.albedoColor = Color3.Lerp(initialColor, finalColor, 1 / 5)
        material.emissiveColor = Color3.Lerp(initialColor, finalColor, 1 / 11)
        material.emissiveIntensity = 2
        let fireHeight = 0

        const origin = Camera.instance.feetPosition
        const shape = spellshape
        shape.withCollisions = false;
        const billboard = new Billboard()

        for (let i = 0; i < 26; i++) {
            const particle = new Entity()
            particle.addComponent(shape)
            particle.addComponent(billboard)
            particle.addComponent(material)
            particle.addComponent(new Particle(origin, new Color3(-10, 0.3, 5)))
            particle.addComponent(
                new Transform({ position: origin, scale: new Vector3(.1, .1, .1) })
            )
            engine.addEntity(particle)
            this.particles.push(particle)
        }
    }
}