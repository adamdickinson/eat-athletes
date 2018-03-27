import ActionBarButton from "../ActionBarButton"
import ActionBarSpace from "../ActionBarSpace"
import PlayIcon from "react-material-icon-svg/dist/PlayIcon"
import PropTypes from "prop-types"
import StopIcon from "react-material-icon-svg/dist/StopIcon"
import { Component } from "preact"



export class ActionBarTimerControls extends Component {

  render({ disabled, fill, onStart, onStop, running }) {
    return (
      <ActionBarSpace fill={fill}>
        { !running && <ActionBarButton disabled={disabled} onClick={() => onStart()} icon={<PlayIcon fill="white" />}>Start Test</ActionBarButton> }
        { !!running && <ActionBarButton onClick={() => onStop()} icon={<StopIcon fill="white" />}>Stop Test</ActionBarButton> }
      </ActionBarSpace>
    )
  }



  tick(time) {
    this.nextFrame = this.props.running ? window.requestAnimationFrame(tick) : undefined
    this.setState({ time: time - this.props.startTime })
  }

}



ActionBarTimerControls.propTypes = ({
  fill:      PropTypes.string,
  startTime: PropTypes.float,
  running:   PropTypes.bool
})



export default ActionBarTimerControls
