import AccountMultiplePlusIcon from "react-material-icon-svg/dist/AccountMultiplePlusIcon"
import AccountPlusIcon from "react-material-icon-svg/dist/AccountPlusIcon"
import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import AddGroupOverlay from "../../containers/AddGroupOverlay"
import AddParticipantOverlay from "../../containers/AddParticipantOverlay"
import Button from "../../components/Button"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ProgressBar from "../../components/ProgressBar"
import Result from "../../components/Result"
import range from "lodash/range"
import relayEnvironment from "../../config/relay"
import style from './style.styl'
import uniqBy from "lodash/uniqBy"
import { Component } from 'preact'
import { commitMutation } from "react-relay"
import { connect } from "preact-redux"



export class BodyTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      measurement: {},
      participant:  undefined,
      results:      {}
    }
  }



	render({ participants }) {
    const metricStyle = { display: "inline-block", width: "30px" }
    const badge = () => <span style={{ backgroundImage: "linear-gradient(to right, #00AB9D, #2AA167)", display: "block", padding: "4px" }}><CheckIcon style={{ display: "block" }} fill="#FFF" /></span>
		return (
      <div class={style["body-test"]}>

        <Column>
          <ContentCell title="Participants" fill style={{ margin: "20px" }}>
            { !participants.length && "Add participants using the buttons below" }
            { participants.map((participant, a) => (
              <Participant
                badge={participant._id in this.state.results && badge()}
                key={a}
                photoUrl={participant.photoUrl} 
                title={`${participant.firstName} ${participant.lastName}`}
                onClick={() => this.selectParticipant(participant)}
                disabled={this.state.participant && this.state.participant._id != participant._id }
              />
            )) }
          </ContentCell>
          <ActionBar>
            <ActionBarSpace fill />
            <ActionBarButton 
              icon={<AccountPlusIcon fill="white" />}
              onClick={() => this.openOverlay("add-participant")} 
            >
              Add Participant
            </ActionBarButton>

            <ActionBarButton 
              icon={<AccountMultiplePlusIcon fill="white" />}
              onClick={() => this.openOverlay("add-group")} 
            >
              Add Group 
            </ActionBarButton>

          </ActionBar>
        </Column>

        { this.state.participant && (
          <Column width="360px">
            <div style={{ flex: "1 0 auto" }}>
              <ContentCell title="Measurements">
                <Result right={<span><input type="number" value={this.state.measurement.height} onInput={e => this.updateMeasurement("height", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Height (without shoes)</Result>
                <Result right={<span><input type="number" value={this.state.measurement.heightWithShoes} onInput={e => this.updateMeasurement("heightWithShoes", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Height (with shoes)</Result>
                <Result right={<span><input type="number" value={this.state.measurement.weight} onInput={e => this.updateMeasurement("weight", e.target.value)} /><span style={metricStyle}>kg</span></span>}>Weight</Result>
                <Result right={<span><input type="number" value={this.state.measurement.wingspan} onInput={e => this.updateMeasurement("wingspan", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Wingspan</Result>
                <Result right={<span><input type="number" value={this.state.measurement.standingReach} onInput={e => this.updateMeasurement("standingReach", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Standing Reach</Result>
                <Result right={<span><input type="number" value={this.state.measurement.bodyFat} onInput={e => this.updateMeasurement("bodyFat", e.target.value)} /><span style={metricStyle}>%</span></span>}>Body Fat</Result>
                <Result right={<span><input type="number" value={this.state.measurement.handLength} onInput={e => this.updateMeasurement("handLength", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Hand Length</Result>
                <Result right={<span><input type="number" value={this.state.measurement.handWidth} onInput={e => this.updateMeasurement("handWidth", e.target.value)} /><span style={metricStyle}>cm</span></span>}>Hand Width</Result>
              </ContentCell>
            </div>

            { Object.values(this.state.measurement).length == 8 && !this.state.saved && (
              <ActionBar>
                <ActionBarButton fill icon={<CheckIcon />} onClick={() => this.persistResults()}>Record Results</ActionBarButton>
                <ActionBarButton fill icon={<CloseIcon />} onClick={() => this.clearResults()}>Clear Results</ActionBarButton>
              </ActionBar>
            ) }
          </Column>
        ) }

        { this.state.overlay == "add-participant" && <AddParticipantOverlay onClose={() => this.closeOverlays()} /> }
        { this.state.overlay == "add-group" && <AddGroupOverlay onClose={() => this.closeOverlays()} /> }
      </div>
    )
	}



  clearMeasurements() {
    this.setState({ measurement: {}, participant: undefined })
  }



  closeOverlays() {
    this.setState({ overlay: null })
  }



  openOverlay(overlay) {
    this.setState({ overlay })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation BodyTestRecordMeasurementsultsMutation ( $measurement: MeasurementInput!) {
          recordMeasurement(measurement: $measurement) { _id }
        }
      `,
      variables: {
        measurement: {
          ...this.state.measurement,
          athlete: this.state.participant._id, 
          date:    new Date().toISOString(), 
        }
      }
    })

    this.setState({ 
      measurement: {},
      participant: undefined,
      results: { ...this.state.results, [this.state.participant._id]: { ...this.state.measurements} },
      saved: true, 
      saving: false, 
    })
  }



  recordResult(participant) {
    this.setState({
      results: { ...this.state.results, [participant._id]: {...this.state.measurement} }
    })
  }



  selectParticipant(participant) {
    this.setState({ 
      participant, 
      measurement: participant._id in this.state.results ? this.state.results[participant._id] : {} 
    })
  }



  updateMeasurement(measurement, value) {
    this.setState({ 
      measurement: {
        ...this.state.measurement,
        [measurement]: value
      }
    })
  }

}



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(BodyTest)
