@Component("spawnTimer")
export class SpawnTimeOut {
  timeLeft: number;
  constructor(time: number) {
    this.timeLeft = time;
  }
}