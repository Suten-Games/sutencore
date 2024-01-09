import { Singleton } from "src/gameObjects/playerDetail";

// class HealthRestorationSystem {
//     obj = Singleton.getInstance();
//     private restoreInterval: number = 1; // Health restore interval in seconds
//     private timeSinceLastRestore: number = 0;

//     update(dt: number) {
//         //log(`in HealthRestorationSystem, battle flag: ${this.obj.player.battle}`)
//         if (!this.obj.player.battle && this.obj.player.hp < this.obj.player.maxhp) {
//             this.timeSinceLastRestore += dt;

//             if (this.timeSinceLastRestore >= this.restoreInterval) {
//                 // Calculate the amount of health to restore (5% of max health)
//                 let healthToRestore = this.obj.player.maxhp * 0.05;

//                 // Round the health to restore to the nearest whole number
//                 healthToRestore = Math.round(healthToRestore);

//                 // Update the player's health
//                 this.obj.player.hp = Math.min(this.obj.player.hp + healthToRestore, this.obj.player.maxhp);

//                 // Update UI elements, if necessary
//                 let percentage = (this.obj.player.hp / this.obj.player.maxhp * 100).toFixed(0);
//                 this.obj.player.initialhp(Number(percentage) / 100);
//                 this.obj.player.healthValue.set(this.obj.player.hp);

//                 // Reset the timer
//                 this.timeSinceLastRestore = 0;
//             }
//         }
//     }
// }

// // Adding the HealthRestorationSystem to the engine
// engine.addSystem(new HealthRestorationSystem());


class HealthRestorationSystem {
    obj = Singleton.getInstance();
    private restoreInterval: number = 1; // Health restore interval in seconds
    private timeSinceLastRestore: number = 0;

    update(dt: number) {
        if (!this.obj.player.battle && this.obj.player.hp < this.obj.player.maxhp) {
            this.timeSinceLastRestore += dt;

            if (this.timeSinceLastRestore >= this.restoreInterval) {
                // Calculate the amount of health to restore (5% of max health)
                let healthToRestore = this.obj.player.maxhp * 0.05;

                // Round the health to restore to the nearest whole number
                healthToRestore = Math.round(healthToRestore);

                // Update the player's health
                this.obj.player.hp = Math.min(this.obj.player.hp + healthToRestore, this.obj.player.maxhp);

                // Update UI elements, if necessary
                let percentage = (this.obj.player.hp / this.obj.player.maxhp * 100).toFixed(0);
                this.obj.player.initialhp(Number(percentage) / 100);
                this.obj.player.healthValue.set(this.obj.player.hp);

                // Call notdeadyet method if health is above 50%
                this.obj.player.notdeadyet(percentage);

                // Reset the timer
                this.timeSinceLastRestore = 0;
            }
        }
    }
}

// Adding the HealthRestorationSystem to the engine
engine.addSystem(new HealthRestorationSystem());
