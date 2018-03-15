import Column from "../../components/Column"
import NavBar from "../../components/NavBar"
import Profile from "../Profile"
import moment from "moment"
import style from "./style.styl"
import { Component } from 'preact'
import { graphql, createFragmentContainer } from 'react-relay'



export const Sidebar = ({ profile }) => (
  <div class={style.sidebar}>
    <div style={{ height: "70px", background: "#263740", marginBottom: "-70px" }} />
    <Profile 
      title={`${profile.firstName} ${profile.lastName}`} 
      subtext={profile.position}
      photoUrl={profile.photoUrl}
    />
    <NavBar userType={profile.__typename} />
  </div>
)



const container = createFragmentContainer(Sidebar,
  graphql`
    fragment Sidebar_profile on CurrentUserResult {
      ... on User {
        __typename
        firstName
        lastName
        photoUrl
        position
      }
    }
  `
)



export default container
