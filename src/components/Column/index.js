import PropTypes from "prop-types"
import cx from "classnames"
import style from "./style.styl"



export const Column = ({ children, width }) => (
  <div class={cx(style.column, !!width && style["fixed-column"])} style={{ width }}>
    { children }
  </div>
)



Column.propTypes = ({
  children: PropTypes.node,
  width:    PropTypes.string
})



export default Column
