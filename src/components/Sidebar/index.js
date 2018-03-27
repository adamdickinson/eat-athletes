import NavBar from "../../components/NavBar"
import Profile from "../Profile"
import style from "./style.styl"
import { graphql, createFragmentContainer } from "react-relay"
import PropTypes from "prop-types"



export const Sidebar = ({ profile, tests }) => (
  <div class={style.sidebar}>
    <div style={{ height: "70px", background: "#263740", marginBottom: "-70px" }} />
    <Profile 
      title={`${profile.firstName} ${profile.lastName}`} 
      subtext={profile.position}
      photoUrl={profile.photoUrl}
    />
    <NavBar tests={tests} userType={profile.__typename} />
  </div>
)



Sidebar.propTypes = ({
  profile: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    position: PropTypes.string,
  })
})



export default createFragmentContainer(Sidebar,
  graphql`
    fragment Sidebar_profile on CurrentUserResult {
      ... on User {
        __typename
        firstName
        lastName
      }
      ... on Coach {
        photoUrl
        position
      }
      ... on Athlete {
        photoUrl
        position
      }
    }
    fragment Sidebar_tests on Test @relay(plural: true) {
      id
      name
      variation
    }
  `
)
