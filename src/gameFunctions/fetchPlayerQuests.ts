import { Player } from "src/gameObjects/player";
import { local } from "suten";

const apiUrl = local
    ? "http://localhost:8080/playerquest/"
    : "https://sutenquestapi.azurewebsites.net/playerquest/";

export async function fetchPlayerQuests(player:Player) {
    log(`in fetchPlayerQuests`)

    try {
        let response = await fetch(apiUrl + player.address);
        let json = await response.json();
        log(`in fetchPlayerQuests, the json is ${JSON.stringify(json)}`)
        let questIds = json.map((quest: PlayerQuest) => quest.questId._id);
        questIds.forEach((id: string) => {
            player.quest = id;
        });
    } catch (error) {
        log(`fetchPlayerQuests.ts:19: Unable to fetch the player's quests ${error} `);
    }

}

export interface PlayerQuest {
    _id: string;
    playerId: string;
    questId: QuestDto
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    objectives: PlayerQuestObjectiveDto[];
}

export class PlayerQuestObjectiveDto {
    objectiveId: string; // This is a reference to the corresponding QuestObjective
    quantity: number; // The number of targets already collected/killed by the player
}

export class QuestDto {
    _id: string;
    name: string;
    description: string;
    prerequisites: string[]; // IDs of prerequisite quests
    rewards: string[];
}