import ActionBarInput from "../ActionBarInput"
import ActionBarSpace from "../ActionBarSpace"
import PropTypes from "prop-types"
import { Component } from "preact"



export class ActionBarStageShuttle extends Component {

  render({ stage, shuttle }) {
    return (
      <ActionBarSpace fill>
        <ActionBarInput readonly value={stage || 0}>Stage</ActionBarInput>
        <span style={{ fontFamily: "\"DJB Friday Night Lights\", monospace", fontSize: 32 }}>:</span>
        <ActionBarInput readonly value={shuttle || 0} >Shuttle</ActionBarInput>
      </ActionBarSpace>
    )
  }

}



export default ActionBarStageShuttle
