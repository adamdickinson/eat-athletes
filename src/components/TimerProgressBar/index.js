import PropTypes from "prop-types"
import range from "lodash/range"
import style from "./style.styl"
import { Component } from "preact"



export class TimerProgressBar extends Component {

  constructor(props) {
    super(props)
    props.timer.onTick(time => this.setState({ time }))
  }


  render({ timer }) {
    const progress = timer.countTo
      ? this.state.time / timer.countTo
      : 1 - (1 / ((5000 + this.state.time) / 5000))

    return (
      <div class={style["progress-bar"]}>
        { !!progress && <div class={style["progress-bar-progress"]} style={{ width: Math.min(100, 100 * progress) + "%" }} /> }
        { range(timer.countTo / 1000 || 1).map(s => <div key={s} class={style["progress-bar-stage"]} />) }
      </div>
    )
  }

}



TimerProgressBar.propTypes = ({
  timer: PropTypes.object
})



export default TimerProgressBar
