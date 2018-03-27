export class Timer {

  constructor({ countTo }) {
    this.changeSubscribers = []
    this.timeSubscribers = []
    this.running = false
    this.countTo = countTo * 1000
    this.time = 0
  }



  announceChange(running) {
    const announce = callback => callback(running)
    this.changeSubscribers.forEach(announce)
  }



  announceTime(time) {
    const announce = callback => callback(time)
    this.timeSubscribers.forEach(announce)
  }



  destroy() {
    if( this.running ) this.running = false
  }



  onChange(subscriber) {
    this.changeSubscribers.push(subscriber)
  }



  onTick(subscriber) {
    this.timeSubscribers.push(subscriber)
  }



  start() {
    this.startTime = performance.now()
    this.running = true
    this.tick()
    this.announceChange(this.running)
  }



  stop() {
    this.running = false
    this.announceChange(this.running)
    this.time = 0
  }



  tick() {
    if( this.running ) {
      const time = performance.now()
      this.time = time - this.startTime
    }

    if( this.time > this.countTo )
      this.stop()

    this.announceTime(this.countTo ? this.countTo - this.time : this.time)
    if( this.running )
      this.nextFrame = window.requestAnimationFrame(this.tick.bind(this))
  }

}



export default Timer
