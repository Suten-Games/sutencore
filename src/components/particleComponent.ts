@Component('particle')
class Particle {
    life = Math.random()
    seed = Math.random() - Math.random()
    constructor(public origin: Vector3, public initialColor: Color3) { }
}