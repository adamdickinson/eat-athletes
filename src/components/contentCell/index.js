import { h } from "preact"
import styles from "./style.styl"



export const ContentCell = ({ children, title, style }) => (
  <div class={styles.contentCell}>
    <h2>{title}</h2>
    <div class={styles.contentWrap} style={style}>
      {children}
    </div>
  </div>
)



export default ContentCell
