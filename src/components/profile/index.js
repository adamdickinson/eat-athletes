import avatar from "../../assets/avatar.png"
import gql from 'graphql-tag'
import style from "./style.styl"
import { graphql } from "react-apollo"
import moment from "moment"



export const Profile = ({ data }) => {
  const { loading } = data
  if(loading) return (
    <div class={style.placeholder}>
      <div class={style.photo} />
      <h2 />
      <p />
    </div>
  )

  const { age, dateOfBirth, firstName, lastName, photoUrl, position } = data.currentStudent || {}

  return (
    <div class={style.profile}>
      <div class={style.photo} style={ !loading && { background: `url(${photoUrl || avatar})` }} />
      <h2>{firstName} {lastName}</h2>
      <p>
        {moment(dateOfBirth).format("d MMMM Y")} ({age})<br />
        <strong>{position}</strong>
      </p>
    </div>
  )
}



const CurrentStudent = gql`
  query {
    currentStudent {
      firstName
      lastName
      photoUrl
      position
      dateOfBirth
      age
    }
  }
`



export default graphql(CurrentStudent)(Profile)
