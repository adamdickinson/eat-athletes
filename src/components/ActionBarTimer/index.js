import ActionBarInput from "../ActionBarInput"
import ActionBarSpace from "../ActionBarSpace"
import PropTypes from "prop-types"
import { Component } from "preact"



export class ActionBarTimer extends Component {

  constructor(props) {
    super(props)
    this.state = { time: props.timer.countTo || 0 }
  }



  componentWillReceiveProps({ timer }) {
    if( this.timer !== timer ) {
      this.timer = timer
      timer.onTick(time => this.setState({ time }))
    }
  }



  render({ startTime, endTime, running }) {
    return (
      <ActionBarSpace fill>
        <ActionBarInput readonly value={Math.floor(this.state.time / 1000)}>Seconds</ActionBarInput>
        <span style={{ fontFamily: "\"DJB Friday Night Lights\", monospace", fontSize: 32 }}>:</span>
        <ActionBarInput readonly value={Math.floor(this.state.time % 1000).toString().padStart(3, "0")}>Milliseconds</ActionBarInput>
      </ActionBarSpace>
    )
  }

}



ActionBarTimer.propTypes = ({
  fill:      PropTypes.string,
  timer:     PropTypes.object.required
})



export default ActionBarTimer
