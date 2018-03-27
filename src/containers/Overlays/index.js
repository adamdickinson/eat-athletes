import AddGroupOverlay from "../AddGroupOverlay"
import AddParticipantOverlay from "../AddParticipantOverlay"
import CreateAthleteOverlay from "../CreateAthleteOverlay"
import CreateGroupOverlay from "../CreateGroupOverlay"
import { connect } from "preact-redux"



export const Overlays = ({ overlay }) => {
  return (
    <div>
      { overlay == "add-group" && <AddGroupOverlay /> }
      { overlay == "add-participant" && <AddParticipantOverlay /> }
      { overlay == "create-athlete" && <CreateAthleteOverlay /> }
      { overlay == "create-group" && <CreateGroupOverlay /> }
    </div>
  )
}



export const mapStateToProps = state => ({
  overlay: state.overlay
})



export default connect(mapStateToProps)(Overlays)
