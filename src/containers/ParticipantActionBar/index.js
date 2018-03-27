import AccountMultiplePlusIcon from "react-material-icon-svg/dist/AccountMultiplePlusIcon" 
import AccountPlusIcon from "react-material-icon-svg/dist/AccountPlusIcon"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import MinusIcon from "react-material-icon-svg/dist/MinusIcon"
import PropTypes from "prop-types"
import { Component } from "preact"
import { actions } from "../../config/redux"
import { connect } from "preact-redux"



export const ParticipantActionBar = ({ clearParticipants, disabled, openOverlay, participants }) => (
  <ActionBarSpace>
    <ActionBarButton 
      disabled={disabled || !participants.length}
      icon={<MinusIcon fill="white" />}
      onClick={() => clearParticipants()} 
    >
      Clear
    </ActionBarButton>

    <ActionBarButton 
      disabled={disabled}
      icon={<AccountPlusIcon fill="white" />}
      onClick={() => openOverlay("add-participant")} 
    >
      Add Participant
    </ActionBarButton>

    <ActionBarButton 
      disabled={disabled}
      icon={<AccountMultiplePlusIcon fill="white" />}
      onClick={() => openOverlay("add-group")} 
    >
      Add Group 
    </ActionBarButton>
  </ActionBarSpace>
)



ParticipantActionBar.propTypes = ({
  clearParticipants: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired
})



export const mapDispatchToProps = dispatch => ({
  clearParticipants: () => dispatch(actions.clearParticipants()),
  openOverlay: overlay => dispatch(actions.openOverlay(overlay))
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps, mapDispatchToProps)(ParticipantActionBar)
