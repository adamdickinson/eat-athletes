import style from "./style.styl"



export const ActionBarInput = ({ children, disabled, icon, ...inputProps }) => (
  <div class={style["action-bar-input"]} disabled={disabled}>
    <input {...inputProps} />
    {children}
  </div>
)



export default ActionBarInput
