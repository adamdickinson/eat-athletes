const INITIAL_DELAY = 12000
const SHUTTLES = [7,8,8,9,9,10,10,11,11,11,12,12,13,13,13,14,14,15,15,16,16]
const TIMES = [63,64,60.6,64.8,61.7,65.5,62.6,66,63.4,60.9,64,61.7,64.6,62.4,60.4,63,61.1,63.5,61.7,64,62.3]



export class StageShuttleTimer {

  constructor() {
    this.changeSubscribers = []
    this.running = false
    this.shuttle = 0
    this.stage = 0
    this.time = 0
    this.progressSubscriber = []
    this.progress = 0
  }



  announceChange(running) {
    const announce = callback => callback(running)
    this.changeSubscribers.forEach(announce)
  }



  announceProgress(stage, shuttle) {
    const announce = callback => callback(stage, shuttle)
    this.progressSubscriber.forEach(announce)
  }



  destroy() {
    this.stop()
  }



  onChange(subscriber) {
    this.changeSubscribers.push(subscriber)
  }



  onProgress(subscriber) {
    this.progressSubscriber.push(subscriber)
  }



  nextShuttle() {

    // Increment shuttle
    this.shuttle++
    const maxShuttles = this.stage ? SHUTTLES[this.stage - 1] : 0
    if( this.shuttle > maxShuttles ) {
      this.shuttle = 1
      this.stage++
    }

    // Schedule next
    const numShuttles = SHUTTLES[this.stage - 1]
    const timeToNextShuttle = 1000 * TIMES[this.stage - 1] / numShuttles 
    this.nextStageDue += timeToNextShuttle
    this.timeout = setTimeout(() => this.nextShuttle(), this.nextStageDue - performance.now())
    this.progress = getProgress(this.stage, this.shuttle)

    // Announce progress
    this.announceProgress(this.stage, this.shuttle)
  }



  start() {
    this.running = true 
    this.startTime = performance.now()
    this.nextStageDue = this.startTime + INITIAL_DELAY
    this.timeout = setTimeout(() => this.nextShuttle(), INITIAL_DELAY)
    this.stage = 0
    this.shuttle = 0
    this.announceChange(this.running)
  }



  stop() {
    clearTimeout(this.timeout)
    this.running = false
    this.stage = 0
    this.shuttle = 0
    this.announceChange(this.running)
  }

}



export const getProgress = (stage, shuttle) => {
  if( !stage || !shuttle ) return 0
  const shuttleProgress = 1 / SHUTTLES.length
  const numShuttles = SHUTTLES[stage - 1]
  return (stage - 1) * shuttleProgress + ((shuttle - 1) / numShuttles) * shuttleProgress 
}



export default StageShuttleTimer
