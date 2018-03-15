import style from "./style.styl"



export const ActionBarSelect = ({ children, disabled, icon, options, ...selectProps }) => (
  <label class={style["action-bar-select"]} disabled={disabled}>
    <select disabled={disabled} {...selectProps}>
      { options.map(option => <option value={option.value}>{option.label}</option>) }
    </select>
    {children}
  </label>
)



export default ActionBarSelect
