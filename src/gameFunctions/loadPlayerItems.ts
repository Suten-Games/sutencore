import { PlayerState } from "src/components/playerStateComponent";
import { Singleton } from "src/gameObjects/playerDetail";
import { UI } from "src/gameUI/ui";

export function loadPlayerItems(ui:UI,json:PlayerState ) {
    log(`debug: 11 Inside loadPlayerItems`)

    var obj = Singleton.getInstance();

    ui.bp.playerclass = obj.playerclass
    log('calling backpack resetCharWindow')
    //ui.bp.resetCharWindow()

    //       // obj.manal1 = balance.l1
    obj.manal1 = 0

    ui.bp.resetCharWindow()

    log('json.actionbar ', json.actionbar)
    log('json.backpack ', json.backpack)

    ui.bp.bootLoadBackPack(json.backpack);
    ui.ab.bootLoadActionBar(json.actionbar);
    obj.actionbar = ui.ab;
    obj.backpack = ui.bp


}