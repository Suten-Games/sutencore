import { UI } from 'src/gameUI/ui'
import { createDefaultPlayer } from './createPlayer'
import { registerPlayer } from './registerPlayer'
import { WaitSystem } from 'src/gameSystems/waitSystem'

let ws: WaitSystem

export function loadSutenQuest(ui: UI) {
    log(`debug: 1 Inside startGame`)

    void executeTask(async () => {
        const player = await createDefaultPlayer(ui)
        await registerPlayer(ui, player)
        ws = new WaitSystem()
        engine.addSystem(ws)
    })
}

export function unloadSystems() {
    log('reloadGame.ts: trying to unload systems')
    void executeTask(async () => {
        engine.removeSystem(ws)
    })
}
