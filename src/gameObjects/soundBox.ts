import { setTimeout } from "src/gameUtils/timeOut";

export class SoundBox extends Entity {
    private source: AudioSource;
    private transform: Transform;
    private loop: boolean;
    private duration: number; // Duration in milliseconds

    constructor(
        initialTransform: TransformConstructorArgs,
        audio: AudioClip,
        loop: boolean = false,
        duration: number
    ) {
        super();
        engine.addEntity(this);

        this.transform = new Transform(initialTransform);
        this.addComponent(this.transform);

        this.source = new AudioSource(audio);
        this.source.loop = loop;
        this.source.volume = 1;
        this.addComponent(this.source);

        this.loop = loop;
        this.duration = duration; // Set the expected duration of the sound

        //log(`SoundBox created at position: ${this.transform.position} with loop: ${this.loop} and duration: ${this.duration}ms`);
    }

    play() {
        if (!this.source.playing) {
            this.source.playOnce();
            //log(`Playing sound at position: ${this.transform.position}`);
        } else {
            log("Attempted to play sound, but it's already playing.");
        }
    }

    stop() {
        if (this.source.playing) {
            this.source.playing = false;
            log("Stopped sound.");
        } else {
            log("Attempted to stop sound, but it wasn't playing.");
        }
    }

    updatePosition(newPosition: Vector3) {
        this.transform.position = newPosition;
        //log(`SoundBox position updated to: ${this.transform.position}`);
    }

    playWithCallback(onFinished: () => void) {
        this.play();
        if (!this.loop) { // No need to set a timer if the sound is looping
            setTimeout(this.duration, () => {
                onFinished();
                log("Sound finished playing.");
            });
        }
    }
}