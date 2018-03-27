import PropTypes from "prop-types"
import styles from "./style.styl"



export const ContentCell = ({ children, fill, title, style }) => (
  <div class={styles.contentCell} style={ !!fill && { flex: "1 0 auto" }}>
    <h2>{title}</h2>
    <div class={styles.contentWrap} style={style}>
      {children}
    </div>
  </div>
)




ContentCell.propTypes = ({
  children: PropTypes.node,
  fill:     PropTypes.string,
  style:    PropTypes.object,
  title:    PropTypes.string
})



export default ContentCell
