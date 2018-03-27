import PropTypes from "prop-types"
import avatar from "../../assets/avatar.png"
import style from "./style.styl"



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



Participant.propTypes = ({
  badge:       PropTypes.node,
  disabled:    PropTypes.bool,
  onClick:     PropTypes.func,
  photoUrl:    PropTypes.string,
  subtext:     PropTypes.string,
  title:       PropTypes.string.isRequired
})



export default Participant
