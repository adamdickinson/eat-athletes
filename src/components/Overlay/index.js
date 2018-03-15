import style from "./style.styl"



export const Overlay = ({ children }) => (
  <div class={style.overlay}>
    <div class={style.wrap}>
      {children}
    </div>
  </div>
)



export default Overlay
