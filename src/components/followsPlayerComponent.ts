@Component("FollowsPlayer")
export class FollowsPlayer {  
  defaultHeight:number = 0 
  speed:number = 0.2
  randomOffsetX:number =  (Math.random()*2-1)
  randomOffsetZ:number =  (Math.random()*2-1) 
  moving:boolean = true
  elapsedTime:number = 0  
}