import { UI } from "src/gameUI/ui";

export async function writeToCl(ui: UI, t1:string="", t2:string="", t3:string="", t4:string="") {
    ui.cl.text = ``;
    ui.cl.text = `Welcome to SutenQuest!`;
    ui.cl.text = t1;
    if (t2) { ui.cl.text = t2; }
    if (t3) { ui.cl.text = t3; }
    if (t4) { ui.cl.text = t4; }
        
    
}