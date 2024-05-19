// SoundManager.ts
import { SoundPlayer } from "src/gameObjects/soundPlayer";
import resources from "src/resources";

export class SoundManager {
    private static instance: SoundManager;
    private playerHitSound: SoundPlayer;
    private mobHitSound: SoundPlayer;
    private killSound: SoundPlayer;

    private constructor() {
        this.playerHitSound = new SoundPlayer(
            new Transform(),
            resources.sounds.playerHit2,
            false
        );
        // this.mobHitSound = new SoundPlayer(
        //     new Transform(),
        //     resources.sounds.playerHit,
        //     false
        // );
        this.killSound = new SoundPlayer(
            new Transform(),
            resources.sounds.killping,
            false
        );
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    public playPlayerHitSound() {
        let position = Camera.instance.position;
        this.playerHitSound.updatePosition(position);
        this.playerHitSound.play();
    }

    // public playMobHitSound() {
    //     let position = Camera.instance.position;
    //     this.mobHitSound.updatePosition(position);
    //     this.mobHitSound.play();
    // }
    public playMobHitSound(mobSound: AudioClip) {
        let position = Camera.instance.position;
        const mobHitSound = new SoundPlayer(new Transform(), mobSound, false);
        mobHitSound.updatePosition(position);
        mobHitSound.play();
    }

    public playKillSound() {
        let position = Camera.instance.position;
        this.killSound.updatePosition(position);
        this.killSound.play();
    }
}