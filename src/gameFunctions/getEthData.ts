import { getUserAccount } from "@decentraland/EthereumController";
import { getUserData } from "@decentraland/Identity";
import { Player } from "src/gameObjects/player";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";
import { writeToCl } from "./writeToCL";

export async function getEthData(ui: UI, player:Player) {
    //log('calling getUserAccount()')
    let lowerCaseAddress: string = "";
    let address = await getUserAccount();
    let userdata = await getUserData();
    
    if (userdata == null) {
        writeToCl(`:(  Userdata failed to load  :(`, `Please refresh/reload the scene`)
        //writeToCl(ui, `:(  Userdata failed to load  :(`, `Please refresh/reload the scene`)
        return;
    } else if (!userdata.hasConnectedWeb3) {
        writeToCl(`Web3 must be connected`, `Please add '&ENABLE_WEB3' to URL`)
        //writeToCl(ui, `Web3 must be connected`, `Please add '&ENABLE_WEB3' to URL`)
        return;
    }
    // //const balance = await matic.balance(address)
    const balance = 0
    var obj = Singleton.getInstance();
    // obj.maticbalance = balance.l2
    obj.maticbalance = 0
    if (address) {
        lowerCaseAddress = address.toLowerCase();
    } else {
        lowerCaseAddress = userdata.userId.toLowerCase();
        address = lowerCaseAddress;
    }

    let playerName = userdata.displayName;
    player.address = address;
    player.name = playerName;
    obj.playeraddress = address;
    obj.playername = player.name;
    obj.player = player;
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp;
    obj.spellscroll = ui.ss;
    obj.spellbook = ui.sb;
    obj.combatlog = ui.cl;

    return lowerCaseAddress
}