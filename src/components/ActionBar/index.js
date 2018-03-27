import PropTypes from "prop-types"
import style from "./style.styl"



export const ActionBar = ({ children }) => (
  <div class={style["action-bar"]}>
    {children}
  </div>
)



ActionBar.propTypes = ({
  children: PropTypes.node
})



export default ActionBar
