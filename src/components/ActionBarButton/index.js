import style from "./style.styl"
import PropTypes from "prop-types"



export const ActionBarButton = ({ children, disabled, icon, onClick, fill }) => (
  <div class={style["action-bar-button"]} disabled={disabled} onClick={!disabled && onClick} style={!!fill && { flex: "1 0 auto" }}>
    <span class={style["action-bar-icon"]}>{ icon }</span>
    {children}
  </div>
)



ActionBarButton.propTypes = ({
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fill:     PropTypes.string,
  icon:     PropTypes.node,
  onClick:  PropTypes.func.isRequired
})



export default ActionBarButton
