import { SoundBox } from "src/gameObjects/soundBox";

export function createSoundBox(x: number, y: number, z: number, sound: AudioClip, loop: boolean): SoundBox {
    return new SoundBox(
        new Transform({ position: new Vector3(x, y, z) }),
        sound,
        loop
    );
}