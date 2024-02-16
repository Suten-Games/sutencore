import { Player } from 'src/gameObjects/player'
import { UI } from 'src/gameUI/ui'
import { fetchPlayer } from './fetchPlayer'
import { getEthData } from './getEthData'
import { writeToCl } from './writeToCL'

export async function registerPlayer(ui: UI, player: Player) {
    log(`debug: 4 Inside registerPlayer`)

    void executeTask(async () => {
        try {
            let lowerCaseAddress = await getEthData(ui, player)
            if (!lowerCaseAddress) {
                lowerCaseAddress = '12345678'
            }
            void fetchPlayer(lowerCaseAddress, ui, player)
        } catch (error: any) {
            void writeToCl(
                `Unable to access ETH Accounts!`,
                `Web3 Must be connected to play`,
                `Please add '&ENABLE_WEB3' to URL`
            )
        }
    })
}
