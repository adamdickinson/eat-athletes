import PropTypes from "prop-types"
import avatar from "../../assets/avatar.png"
import style from "./style.styl"



export const Profile = ({ title, description, photoUrl, subtext }) => (
  <div class={style.profile}>
    <div class={style.photo} style={{ backgroundImage: `url(${photoUrl || avatar})` }} />
    <h2>{title}</h2>
    <p>
      {description}
      {!!description && !!subtext && <br />}
      {!!subtext && <strong>{subtext}</strong>}
    </p>
  </div>
)



Profile.propTypes = ({
  description: PropTypes.string,
  photoUrl:    PropTypes.string,
  subtext:     PropTypes.string,
  title:       PropTypes.string.isRequired
})



export default Profile
