import style from "./style.styl"



export const ActionBar = ({ children }) => (
  <div class={style["action-bar"]}>
    {children}
  </div>
)



export default ActionBar
