import PropTypes from "prop-types"
import style from "./style.styl"



export const ActionBarSelect = ({ children, disabled, options, ...selectProps }) => (
  <label class={style["action-bar-select"]} disabled={disabled}>
    <select disabled={disabled} {...selectProps}>
      { options.map((option, o) => <option key={o} value={option.value}>{option.label}</option>) }
    </select>
    {children}
  </label>
)



ActionBarSelect.propTypes = ({
  children:    PropTypes.node,
  disabled:    PropTypes.bool,
  options:     PropTypes.array.isRequired,
  selectProps: PropTypes.object
})



export default ActionBarSelect
