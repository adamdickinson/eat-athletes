import ActionBar from "../../components/ActionBar"
import ActionBarSpace from "../../components/ActionBarSpace"
import ActionBarStageShuttle from "../../components/ActionBarStageShuttle"
import ActionBarTimer from "../../components/ActionBarTimer"
import ActionBarTimerControls from "../../components/ActionBarTimerControls"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import PropTypes from "prop-types"
import { Component } from "preact"
import { connect } from "preact-redux"

// @TODO(adam): maybe put these into backend? undecided...
import resultTypes from "../../config/resultTypes"
import limitMetrics from "../../config/limitMetrics"



export class SplitTest extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }



  render({ participants, limit, resultType, groupTest }) {

    const showStageShuttle = resultType == resultTypes.STAGE_SHUTTLE
    const showTimer = limit && limit.metric == limitMetrics.TIME

    const showBeepResults  = !!(resultType == resultTypes.STAGE_SHUTTLE && participants.length > 0)
    const showTimes        = !!(resultType == resultTypes.TIME && participants.length > 0)
    const showMeasurements = !!(resultType == resultTypes.MEASUREMENT && this.state.participant)
    const showShots        = !!(resultType == resultTypes.SHOTS && this.state.participant)
    const showSplits       = !!(resultType == resultTypes.SPLIT && this.state.participant)

    const isNotCurrentParticipant = participant => !!this.state.participant && participant.id != this.state.participant.id
    const participantHasResults = participant => this.state.running && this.state.results && participant.id in this.state.results

    
    return (
      <div class="test">

        <Column>
          
          <ContentCell title="Participants" fill padding="20px">
            { !participants.length && "Add participants using the buttons below" }
            { participants.map((participant, a) => (
              <Participant
                key={a}
                photoUrl={participant.photoUrl} 
                title={`${participant.firstName} ${participant.lastName}`}
                onClick={() => this.clickParticipant(participant)}
                disabled={isNotCurrentParticipant(participant) || participantHasResults(participant)} 
              />
            )) }
          </ContentCell>

          <ActionBar>
            <ActionBarTimerControls running={this.state.running} onStart={this.start.bind(this)} onStop={this.stop.bind(this)} />
            { showStageShuttle && <ActionBarStageShuttle /> }
            { showTimer && <ActionBarTimer startTime={this.state.startTime} running={this.state.running} fill /> }
            { !showTimer && !showStageShuttle && <ActionBarSpace fill /> }
            <ParticipantActionBar />
          </ActionBar>

        </Column>


        { showBeepResults && (
          <Column width="320px">
            <ContentCell title="Leaderboard">

            </ContentCell>
          </Column>
        ) }

        { showTimes && (
          <Column width="320px">
            <ContentCell title="Leaderboard">

            </ContentCell>
          </Column>
        ) }

        { showMeasurements && (
          <Column width="320px">
            <ContentCell title="Measurements">

            </ContentCell>
          </Column>
        ) }

        { showShots && (
          <Column width="320px">
            <ContentCell title="Shots">

            </ContentCell>
          </Column>
        ) }

        { showSplits && (
          <Column width="320px">
            <ContentCell title="Splits">

            </ContentCell>
          </Column>
        ) }

      </div>
    )
  }



  clickParticipant(participant) {
    if( this.props.resultType == resultTypes.STAGE_SHUTTLE ) {
      if( this.state.running ) 
        this.recordStageShuttleResult(participant)
    }

    if( this.props.resultType == resultTypes.TIME )
      this.setState({ participant })

  }



  recordResult(participant) {
  }



  start() {
    this.setState({ running: true, startTime: performance.now() })
  }



  stop() {
    this.setState({ running: false })
  }

}



SplitTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(SplitTest)
