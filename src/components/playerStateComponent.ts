import { BackPack } from "src/gameUI/backPack";

@Component('playerState')
export class PlayerState {
    hp: number;
    maxhp: number;
    percentage: number;
    name: string;
    level: number;
    currentxp: number;
    basedamage: number;
    strength: number;
    agility: number;
    stamina: number;
    wisdom: number;
    charisma: number;
    armor: number;
    characterclass: string;
    levelmax: number;
    message:string;
    backpack:any;
    actionbar:any;
    primaryweapon: string;
}