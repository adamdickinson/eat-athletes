import PropTypes from "prop-types"
import style from "./style.styl"



export const ActionBarSpace = ({ children, fill }) => (
  <div class={style["action-bar-space"]} style={ !!fill && { flex: "1 0 auto" } }>
    {children}
  </div>
)



ActionBarSpace.propTypes = ({
  children: PropTypes.node,
  fill:     PropTypes.string
})



export default ActionBarSpace
