import style from "./style.styl"
import PropTypes from "prop-types"



export const Overlay = ({ children }) => (
  <div class={style.overlay}>
    <div class={style.wrap}>
      {children}
    </div>
  </div>
)



Overlay.propTypes = ({
  children: PropTypes.node
})



export default Overlay
