import { Player } from 'src/gameObjects/player'
import { UI } from 'src/gameUI/ui'

const lowerCaseAddress: string = ''

export async function createDefaultPlayer(ui: UI) {
    //log(`debug: 2 Inside createPlayer, setting hp to 40`)

    const player = new Player(lowerCaseAddress, 40, ui.gc, ui.cl, ui.ab, ui.bp)

    return player
}
