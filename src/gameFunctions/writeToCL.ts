import { UI } from "src/gameUI/ui";

export async function writeToCl(t1: string = "", t2: string = "", t3: string = "", t4: string = "", callback: () => void = () => { }) {
    var ui = UI.getInstance();

    ui.cl.text = t1;
    if (t2) { ui.cl.text = t2; }
    if (t3) { ui.cl.text = t3; }
    if (t4) { ui.cl.text = t4; }

    // Add the callback to the most recent clickableOverlay
    ui.cl._clickableCallbacks[ui.cl._clickableCallbacks.length - 1] = callback;
}