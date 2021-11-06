import { Room } from 'colyseus.js'


// list of all cubes
export let mobs: Mob[] = []

export class Mob extends Entity {
    id: number
    room: Room
    name: string
    spawnloc: Array<number>
    //constructor(position: TranformConstructorArgs, id: number, room:Room, name: string){
    constructor(id: number, room: Room, name: string, spawnloc: Array<number>) {

        super()
        this.room = room
        this.id = id
        this.name = name
        this.spawnloc = spawnloc

        // this.addComponent(
        //   new Transform(position)
        // )
        // this.addComponent(new BoxShape())
        // this.addComponent(
        //   new OnPointerDown(
        //     (e) => {
        //       //this.activate(playerColor)
        //       room.send('setColor', {id: this.id})
        //     },
        //     { button: ActionButton.POINTER, hoverText: 'Activate' }
        //   )
        // )
        // engine.addEntity(this)

        mobs.push(this)
    }
}

