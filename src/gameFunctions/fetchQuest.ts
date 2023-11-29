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
        //log(`passing json ${JSON.stringify(json)} to the npcFSM`)
        return json

    } catch (error) {
        log(`fetchQuests.ts:22: Fetch Quests by npc and player failed ${error} `);
    }
}

export async function acceptQuest(quest: any, player: Player) {

    let playerQuestUrl = apiUrl + "/playerquest";

    const status = {
        "playerId": player.address,
        "questId": quest,
        "status": "NOT_STARTED"
    }

    const options = {
        method: "POST",
        body: JSON.stringify(status),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        fetch(playerQuestUrl, options)
            .then((res) => res.json())
            .then((data) => {
                log(`Player Quest Added`)
                player.quest = data.questId
            })
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