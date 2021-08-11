export class SoundBox extends Entity {
    constructor(
      transform: TranformConstructorArgs,
      audio: AudioClip,
      loop:boolean
    ) {
      super();
      engine.addEntity(this);
      this.addComponent(new Transform(transform));
  
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
  }