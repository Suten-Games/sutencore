// export class Adventurer extends Entity {
//     constructor(model: GLTFShape, transform: Transform) {
//       super()
//       engine.addEntity(this)
//       this.addComponent(model)
//       this.addComponent(transform)
  
//       this.addComponent(new Animator())
//       this.getComponent(Animator).addClip(new AnimationState("walking", { looping: true }))
//       this.getComponent(Animator).addClip(new AnimationState("idle", { looping: true }))
//     }
//     // Play running animation
//     playRunning() {
//       this.stopAnimations()
//       this.getComponent(Animator).getClip("walking").play()
//     }
  
//     // Play idle animation
//     playIdle() {
//       this.stopAnimations()
//       this.getComponent(Animator).getClip("idle").play()
//     }
  
//     // Bug workaround: otherwise the next animation clip won't play
//     private stopAnimations() {
//       this.getComponent(Animator).getClip("walking").stop()
//       this.getComponent(Animator).getClip("idle").stop()
//     }
//   }