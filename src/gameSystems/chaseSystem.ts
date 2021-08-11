
export class ChaseSystem implements ISystem {
  transform: Transform
  targetPosition: Vector3
  targetRotation: Quaternion
  oppRotation: Quaternion
  lerpingSpeed: number 
  lowPosition: Vector3

  constructor(movingObject: IEntity, lerpingSpeed: number) {
    this.transform = movingObject.getComponent(Transform)
    this.lerpingSpeed = lerpingSpeed
  }

  update(deltaTime: number) {
    this.targetPosition = Camera.instance.position
    this.lowPosition = new Vector3(this.targetPosition.x,this.targetPosition.y - 1.75, this.targetPosition.z + 2)
    this.targetRotation = Camera.instance.rotation
    // this.oppRotation = new Quaternion(-(this.targetRotation.x),-(this.targetRotation.y),-(this.targetRotation.z))
    // log(this.targetRotation)
    // log(this.oppRotation)

    this.transform.position = Vector3.Lerp(
      this.transform.position,
      this.lowPosition,
      deltaTime * this.lerpingSpeed
    )

    this.transform.rotation = Quaternion.Slerp(
      this.transform.rotation,
      this.targetRotation,
      //this.oppRotation,
      deltaTime * this.lerpingSpeed
    )
  }
}