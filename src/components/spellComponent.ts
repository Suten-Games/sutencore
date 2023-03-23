export interface Ispell {
    mana: number, casttime: number, fizzletime: number, location: string, fizzleadj: number,
    blockable: boolean, dispellable: boolean, name: string,
    spelltype: string, skill: string, recasttime: number, range: number, size: number,
    class: string, level: number, timeofdate: string,
    deletable: boolean, focusable: boolean, interruptable: boolean, targettype: string,
    desc: string, levelmsg: Array<Imsg>, oncastmsg: Array<Imsg>,
    ondropmsg: Array<Imsg>, duration: number, image: Texture,
    itemtype: string, spellshape: string, spellstart: number, spellend: number, sound: AudioClip
}

export interface Imsg {
    line1: string
}