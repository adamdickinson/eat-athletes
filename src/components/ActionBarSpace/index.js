import style from "./style.styl"



export const ActionBarSpace = ({ children, fill }) => (
  <div class={style["action-bar-space"]} style={ !!fill && { flex: "1 0 auto" } }>
    {children}
  </div>
)



export default ActionBarSpace
