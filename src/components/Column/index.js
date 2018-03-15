import { h } from 'preact'
import style from "./style.styl"
import cx from "classnames"



export default ({ children, side, width }) => (
  <div class={cx(style.column, !!width && style["fixed-column"])} style={{ width }}>
    { children }
  </div>
)
