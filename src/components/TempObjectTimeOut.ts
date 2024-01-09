@Component("objectTimer")
export class ObjectTimeOut {
    timeLeft: number;
    constructor(time: number) {
        this.timeLeft = time;
    }
}