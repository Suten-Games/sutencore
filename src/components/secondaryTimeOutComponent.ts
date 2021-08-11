@Component("secondarytimeOut")
export class SecondaryTimeOut {
  timeLeft: number;
  constructor(time: number) {
    this.timeLeft = time;
  }
}