import MeasurementTest from "../MeasurementTest"
import ShotsTest from "../ShotsTest"
import SplitTest from "../SplitTest"
import StageShuttleTest from "../StageShuttleTest"
import TimeTest from "../TimeTest"
import style from "./style.styl"
import resultTypes from "../../config/resultTypes"



const testMap = {
  [resultTypes.MEASUREMENTS]: MeasurementTest,
  [resultTypes.SHOTS]: ShotsTest,
  [resultTypes.SPLIT]: SplitTest,
  [resultTypes.STAGE_SHUTTLE]: StageShuttleTest,
  [resultTypes.TIME]: TimeTest,
}



export const Test = props => {
  const RealTest = testMap[props.resultType]
  return <RealTest {...props} />
}



export default Test
