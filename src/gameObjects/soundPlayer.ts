export class SoundPlayer extends Entity {
    private transform: Transform;

    constructor(
        transform: TranformConstructorArgs,
        audio: AudioClip,
        loop: boolean
    ) {
        super();
        engine.addEntity(this);
        this.transform = new Transform(transform)
        this.addComponent(this.transform)

        if (audio) {
            let source = new AudioSource(audio)
            source.volume = 1;
            source.loop = loop;
            this.addComponent(source)
        }

    }

    play() {
        this.getComponent(AudioSource).playOnce()
    }

    stop() {
        this.getComponent(AudioSource).playing = false;
    }

    updatePosition(newPosition: Vector3) {
        this.transform.position = newPosition;
        //log(`SoundPlayer position updated to: ${this.transform.position}`);
    }
}