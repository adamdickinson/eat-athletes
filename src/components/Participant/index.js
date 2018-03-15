import avatar from "../../assets/avatar.png"
import style from "./style.styl"
import { h } from 'preact'



export const Participant = ({ disabled, title, onClick, photoUrl, subtext, badge }) => (
  <div class={style.participant} disabled={disabled} onClick={onClick}>
    <div class={style.photo} style={{ backgroundImage: `url(${photoUrl || avatar})` }}>
      {!!badge && <span class={style.badge}>{badge}</span>}
    </div>
    <p>
      {title}
      {!!title && !!subtext && <br />}
      {!!subtext && <strong>{subtext}</strong>}
    </p>
  </div>
)



export default Participant
