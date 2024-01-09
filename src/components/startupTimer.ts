@Component("startupTimer")
export class StartupTimeOut {
    timeLeft: number;
    constructor(time: number) {
        this.timeLeft = time;
    }
}