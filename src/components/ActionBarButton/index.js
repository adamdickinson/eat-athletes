import style from "./style.styl"



export const ActionBarButton = ({ children, disabled, icon, onClick, fill }) => (
  <div class={style["action-bar-button"]} disabled={disabled} onClick={!disabled && onClick} style={!!fill && { flex: "1 0 auto" }}>
    <span class={style["action-bar-icon"]}>{ icon }</span>
    {children}
  </div>
)



export default ActionBarButton
