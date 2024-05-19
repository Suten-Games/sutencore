import { Player } from 'src/gameObjects/player';
import { UI } from 'src/gameUI/ui';
import { playerSearch } from './playerSearch';
import { local, apikey } from 'suten'; // Import the API key
import { writeToCl } from './writeToCL';

const apiUrl = local ? 'http://localhost:8080/player' : 'https://sutenquestapi.azurewebsites.net/player';

export async function fetchPlayer(lowerCaseAddress: string, ui: UI, player: Player) {
    log(`debug: 6 Inside fetchPlayer`)
    log(`debug: 6 apikey: ${apikey}`)
    log(`debug: 6 lowerCaseAddress: ${lowerCaseAddress}`)

    try {
        log(`debug: 6 Calling: ${apiUrl}/${lowerCaseAddress}`)
        //const response = await fetch(apiUrl + '/' + lowerCaseAddress)
        const response = await fetch(apiUrl + '/' + lowerCaseAddress, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apikey
            }
        });

        const json = await response.json();
        log(json)
        void playerSearch(json, ui, lowerCaseAddress, player);
    } catch (error) {
        void writeToCl(`Issue connecting to SutenQuest.`, `Please reload the browser window`);
        log(`game.ts:21: Player search by ether address failed ${error}`);
    }
}

