import PropTypes from "prop-types"
import style from "./style.styl"



export const ActionBarInput = ({ children, disabled, ...inputProps }) => (
  <div class={style["action-bar-input"]} disabled={disabled}>
    <input {...inputProps} />
    {children}
  </div>
)



ActionBarInput.propTypes = ({
  children:   PropTypes.node,
  disabled:   PropTypes.bool,
  inputProps: PropTypes.object
})



export default ActionBarInput
