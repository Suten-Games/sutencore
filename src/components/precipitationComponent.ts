// flag an entity as drop or flake
@Component('isPrecip')
export class IsPrecip {
    type: PrecipType
    constructor(type: PrecipType = PrecipType.drop) {
        this.type = type
    }
}

// types of precipitation
export enum PrecipType {
    drop,
    flake
}