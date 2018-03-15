import style from "./style.styl"
import { h } from "preact"
import cx from "classnames"



export const Result = ({ children, disabled, gradient, onClick, progress, right }) => {
  const progressStyle = { width: Math.min(100, (progress * 100)) + "%" }
  if( gradient ) progressStyle.backgroundImage = `linear-gradient(to right, ${gradient.from}, ${gradient.to})`

  return (
    <div class={cx(style.result, progress !== undefined && style["result-progress"])} disabled={disabled} onClick={onClick}>
      <span class={style["result-left"]}>{ children }</span>
      { right && <span class={style["result-right"]}>{right}</span> }
      { !!progress && <div class={style["result-progress-bar"]} style={progressStyle} /> }
    </div>
  )
}



export default Result
