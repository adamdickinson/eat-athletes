import range from "lodash/range"
import style from "./style.styl"



export const ProgressBar = ({ progress, stages }) => (
  <div class={style["progress-bar"]}>
    { !!progress && <div class={style["progress-bar-progress"]} style={{ width: Math.min(100, (progress * 100)) + "%" }} /> }
    { range(stages || 1).map(s => <div key={s} class={style["progress-bar-stage"]} />) }
  </div>
)



export default ProgressBar
