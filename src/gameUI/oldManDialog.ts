import resources from "../resources";
import { SimpleDialog } from "../modules/simpleDialog";
import { SoundBox } from "src/gameUtils/soundbox";
import utils from "../../node_modules/decentraland-ecs-utils/index";

//const dialog1 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.hailtraveler)

export class PeasantDialog extends SimpleDialog {
    private dialogTree: SimpleDialog.DialogTree;

    public onSequenceComplete: () => void;
    public onPoorChoiceMade: () => void;
    public onDialogStarted: () => void;
    public onDialogEnded: () => void;
    public npcWon: () => void;
    public playerWon: () => void;

    constructor(gameCanvas: UICanvas) {
        // Create a new SimpleDialog to manage the dialog tree
        super({
            canvas: gameCanvas,
            leftPortrait: {
                width: 256,
                height: 256,
                sourceWidth: 256,
                sourceHeight: 256,
                positionX: "-17%"
            },
            rightPortrait: {
                width: 256,
                height: 256,
                sourceWidth: 256,
                sourceHeight: 256,
                positionX: "15%"
            },
            dialogText: {
                width: "30%",
                height: "12%",
                vAlign: "bottom",
                hAlign: "center",
                positionY: "16%",
                textSpeed: 5,
                textIdleTime: 2,
                textConfig: { fontSize: 14, paddingLeft: 25, paddingRight: 25 },
                background: resources.interface.combatlog,
                backgroundConfig: { sourceWidth: 1018, sourceHeight: 456 }
            },
            optionsContainer: {
                stackOrientation: UIStackOrientation.VERTICAL,
                width: "30%",
                height: "12%",
                vAlign: "bottom",
                hAlign: "center",
                positionY: "16%",
                background: resources.interface.combatlog,
                backgroundConfig: { sourceWidth: 1018, sourceHeight: 456 },
                optionsTextConfig: { fontSize: 12, vAlign: 'center', positionX: '20', positionY: '-10' }
                //optionsTextConfig: { fontSize: 12, paddingLeft: 20, vAlign: 'bottom', vTextAlign: 'bottom', color: Color4.Red()}
            }
        });

        // Variables used in the dialog tree
        let firstTimeDialog = true;
        let unlockDoor = false;

        // Dialog text colors
        const npcColor = Color4.White();



        this.dialogTree = new SimpleDialog.DialogTree()
            .call(() => this.onDialogStarted())
            .if(() => firstTimeDialog)
            .call(() => (firstTimeDialog = false))
            .say(() =>
                "Those orcs sure are mean aren't they?",
                { color: npcColor }
            )
            .beginOptionsGroup()
            .say(() => "Press 'esc' to unlock your mouse cursor.")
            .say(() => "Click to choose your response", { color: npcColor })
            .option(() => "-> Yeah I got beat down.")
            .say(() =>
                'Anpu-  Indeed. Since it is your first time in the Duat I will resurrect you for free.',
                { color: npcColor }
            )
            .beginOptionsGroup()
            .option(() => "-> Rez me bro!")
            .say(() =>
                "Anpu- Indeed.",
                { color: npcColor }
            )
            .call(() => this.onDialogEnded())
            .endOption()
            .option(() => "-> A resurrect would be nice!")
            .call(() => this.onDialogEnded())
            //.call(() => this.onPoorChoiceMade())
            .endOption()
            .option(() => "-> I like being dead.")
            .say(() =>
                'Anpu says, "The Duat is not for visitors mortal. Begone from this realm."',
                { color: npcColor }
            )
            .call(() => (firstTimeDialog = true))
            .call(() => this.onDialogEnded())
            .endOption()
            .endOptionsGroup()
            .endOption()
            .option(() => "-> Yeah, this is too hard, I'm out of here.")
            .say(() =>
                'Anpu- No problem. Fare well adventurer. Safe travels.',
                { color: npcColor }
            )
            .call(() => (firstTimeDialog = true))
            .call(() => this.onDialogEnded())
            .endOption()
            // .option(() => "3:- Your mother is an orc!")
            //   .call(() => this.onPoorChoiceMade())
            // .endOption()
            .endOptionsGroup()
            .else()
            .if(() => !unlockDoor)
            .say(() => 'Anpu- Hello again. Did that old witch send you back here?')
            .beginOptionsGroup()
            .option(() => "1:- She did. I want to free her, she said she would reward me!")
            .say(() => 'Anpu- You\'ve made a poor choice. If you can best me I will tell you about her prison.', { color: npcColor })
            .call(() => this.onPoorChoiceMade())
            .endOption()
            .option(() => "2:- No. I just wanted to say hello again.")
            .say(() => 'Anpu- Ah. I understand. Good to see you as well adventurer.', { color: npcColor })
            .call(() => this.onDialogEnded())
            .endOption()
            .option(() => "3:- No. I was not able to find Agatha.")
            .say(() => 'Anpu-  Ah. Then you are very stupid I see. Time to die.', { color: npcColor })
            .call(() => this.onPoorChoiceMade())
            .endOption()
            .endOptionsGroup()
            .else()
            .say(() => 'Anpu-  Hello adventurer.')
            .call(() => this.onDialogEnded())
            .endif()
            .endif();
    }

    public run(): void {
        if (!this.isDialogTreeRunning()) {
            this.runDialogTree(this.dialogTree);
        }
    }
}
