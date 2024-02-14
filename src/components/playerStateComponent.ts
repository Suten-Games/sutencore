import { BackPack } from "src/gameUI/backPack";

@Component('playerState')
export class PlayerState {
    id:any;
    backpack: any;
    actionbar: any;
    questlog: any;
    spellbook: any;
    warriorstome: any;
    roguestoolbelt: any;
    address: string;
    name: string;
    maxhp: number;
    hp: number;
    percentage: number;
    level: number;
    currentxp: number;
    levelmax: number;
    basedamage: number;
    characterclass: string;
    strength: number;
    agility: number;
    stamina: number;
    wisdom: number;
    charisma: number;
    armor: number;
    primaryweapon: string; 
    message:string;
    factions: any;
    searchingfor: any;
}