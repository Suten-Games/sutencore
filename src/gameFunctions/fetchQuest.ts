import { Player } from "src/gameObjects/player";
import { local } from "suten";
import { writeToCl } from "./writeToCL";
import { Npc } from "src/gameObjects/npc";
import { setTimeout } from "src/gameUtils/timeOut";

const apiUrl = local
    ? "http://localhost:8080"
    : "https://sutenquestapi.azurewebsites.net";

export async function fetchQuest(npc: Npc, player: Player) {
    try {
        let response = await fetch(apiUrl + "/npc/" + npc.id + "/quests/" + player.address);
        let json = await response.json();
        //log(`called ${apiUrl}/npc/${npc.id}/quests/${player.address}`)
        if (Array.isArray(json) && json.length > 0) {
            //log(`passing json ${JSON.stringify(json[0])} to the npcFSM`);
            return json[0];
        } else { // Check if it's an object
            //log(`passing json ${JSON.stringify(json)} to the npcFSM`);
            return json;
        }

    } catch (error) {
        log(`fetchQuests.ts:22: Fetch Quests by npc and player failed ${error} `);
    }
}

export async function checkQuestCompletion(questId:string, playerAddress:string) {
    let playerQuestCompleteUrl = apiUrl + "/playerquest/" + questId + '/complete'
    const status = {
        "playerAddress":playerAddress
    }
    const options = {
        method: "PATCH",
        body: JSON.stringify(status),
        headers: {
            "Content-Type":"application/json"
        }
    }

    try {
        let response = await fetch(playerQuestCompleteUrl, options);
        let json = await response.json();
        log('quest complete api response: ', json)
        //log(`called ${playerQuestCompleteUrl}`)
        if (Array.isArray(json) && json.length > 0) {
            //log(`passing json ${JSON.stringify(json[0])} to the npcFSM`);
            return json[0];
        } else { // Check if it's an object
            //log(`passing json ${JSON.stringify(json)} to the npcFSM`);
            return json;
        }
    } catch (error) {
        log(`acceptQuest.ts:22: Check Quest Completion failed ${JSON.stringify(error)} `);
    }
}

export async function getQuestReward(questId: string, playerAddress: string) {
    let playerQuestRewardUrl = apiUrl + "/playerquest/" + questId + '/reward'
    const status = {
        "playerAddress": playerAddress
    }
    const options = {
        method: "PATCH",
        body: JSON.stringify(status),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let response = await fetch(playerQuestRewardUrl, options);
        let json = await response.json();
        //log(`called ${playerQuestRewardUrl}`)
        if (Array.isArray(json) && json.length > 0) {
            //log(`passing json ${JSON.stringify(json[0])} to the questWindow`);
            return json[0];
        } else { // Check if it's an object
            //log(`passing json ${JSON.stringify(json)} to the questWindow`);
            return json;
        }
    } catch (error) {
        log(`acceptQuest.ts:22: Get Quest Reward failed ${JSON.stringify(error)} `);
    }

}

export async function acceptQuest(quest: any, player: Player, npc:string) {

    let playerQuestUrl = apiUrl + "/playerquest";

    const status = {
        "playerId":player.address,
        "questId":quest,
        "questGiver": npc
    }

    const options = {
        method: "POST",
        body: JSON.stringify(status),
        headers: {
            "Content-Type":"application/json"
        }
    }

    try {
        let response = await fetch(playerQuestUrl, options);
        let json = await response.json();
        //log(`called ${playerQuestUrl}`)
        if (Array.isArray(json) && json.length > 0) {
            //log(`passing json ${JSON.stringify(json[0])} to the npcFSM`);
            return json[0];
        } else { // Check if it's an object
            //log(`passing json ${JSON.stringify(json)} to the npcFSM`);
            return json;
        }
    } catch (error) {
        log(`acceptQuest.ts:22: Accept Quest failed ${JSON.stringify(error)} `);
    }
}

export function chunkSentence(sentence: string, chunkSize: number): string[] {
    const words = sentence.split(' ');
    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(' '));
    }
    return chunks;
}

export function writeChunks(chunks: string[]): Promise<void> {
    return new Promise<void>((resolve) => {
        let i = 0;
        const writeNextChunk = () => {
            if (i < chunks.length) {
                writeToCl(chunks[i]);
                i++;
                setTimeout(100, writeNextChunk);
            } else {
                resolve();
            }
        };
        writeNextChunk();
    });
}