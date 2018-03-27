import AccountMultiplePlusIcon from "react-material-icon-svg/dist/AccountMultiplePlusIcon"
import AccountPlusIcon from "react-material-icon-svg/dist/AccountPlusIcon"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import AddGroupOverlay from "../../containers/AddGroupOverlay"
import AddParticipantOverlay from "../../containers/AddParticipantOverlay"
import MinusIcon from "react-material-icon-svg/dist/MinusIcon"
import PropTypes from "prop-types"
import { Component } from "preact"
import { actions } from "../../config/redux"
import { connect } from "preact-redux"



export class ParticipantActionBar extends Component {

  render({ clearParticipants, disabled }) {
    return (
      <ActionBarSpace>
        <ActionBarButton 
          disabled={disabled || !this.props.participants.length}
          icon={<MinusIcon fill="white" />}
          onClick={() => clearParticipants()} 
        >
          Clear
        </ActionBarButton>

        <ActionBarButton 
          disabled={disabled}
          icon={<AccountPlusIcon fill="white" />}
          onClick={() => this.openOverlay("add-participant")} 
        >
          Add Participant
        </ActionBarButton>

        <ActionBarButton 
          disabled={disabled}
          icon={<AccountMultiplePlusIcon fill="white" />}
          onClick={() => this.openOverlay("add-group")} 
        >
          Add Group 
        </ActionBarButton>

        { this.state.overlay == "add-participant" && <AddParticipantOverlay onClose={() => this.closeOverlays()} /> }
        { this.state.overlay == "add-group" && <AddGroupOverlay onClose={() => this.closeOverlays()} /> }
      </ActionBarSpace>
    )
  }



  closeOverlays() {
    this.setState({ overlay: null })
  }



  openOverlay(overlay) {
    this.setState({ overlay })
  }



}



ParticipantActionBar.propTypes = ({
  clearParticipants: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired
})



export const mapDispatchToProps = dispatch => ({
  clearParticipants: () => dispatch(actions.clearParticipants())
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps, mapDispatchToProps)(ParticipantActionBar)
