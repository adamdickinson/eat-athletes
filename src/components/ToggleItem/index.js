import PropTypes from "prop-types"
import styles from "./style.styl"
import cx from "classnames"



export const ToggleItem = ({ children, onToggle, onUntoggle, toggled }) => (
  <div 
    className={cx(styles["toggle-item"], !!toggled && styles.toggled)} 
    onClick={toggled ? onUntoggle : onToggle} 
  >
    {children}
  </div>
)



ToggleItem.propTypes = ({
  children:   PropTypes.node,
  onToggle:   PropTypes.func,
  onUntoggle: PropTypes.func,
  toggled:    PropTypes.bool
})



export default ToggleItem
