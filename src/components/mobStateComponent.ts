@Component('mobState')
export class MobState {
    id: string
    damage: number = 2
    battle: boolean = false
    mobname: string;
    mobdead: boolean = false
    orcdead: boolean = false
    playerdead: boolean = false
    fraction: number = 0
    position: Vector3
    rotation: Quaternion
    clicked: boolean = false
    timeout: boolean = false
    playerpos: Vector3
    trackplayer: boolean = false;
    origin: number = 0;
    target: number = 1;
    array: Vector3[];
    respawned: boolean = false;
    mosthated: string | null = null;
    anotherplayer: boolean = false;
    gameover: boolean = false;
    winner: string;
    suppresslootwindow: boolean = false;
    suppresshealthbar: boolean = false;
    lootwindow: boolean = false;
}
