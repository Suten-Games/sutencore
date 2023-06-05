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
        return json.dialogue

    } catch (error) {
        log(`fetchQuests.ts:22: Fetch Quests by npc and player failed ${error} `);
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