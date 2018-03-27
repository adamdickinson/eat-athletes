import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import ActionBarStageShuttle from "../../components/ActionBarStageShuttle"
import ActionBarTimer from "../../components/ActionBarTimer"
import ActionBarTimerControls from "../../components/ActionBarTimerControls"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import ProgressBar from "../../components/ProgressBar"
import PropTypes from "prop-types"
import Result from "../../components/Result"
import Sound from "react-sound"
import StageShuttleTimer from "../../helpers/StageShuttleTimer"
import beepTestAudio from "../../assets/beep-test.mp3"
import get from "lodash/get"
import isEmpty from "lodash/isEmpty"
import relayEnvironment from "../../config/relay"
import zipObject from "lodash/zipObject"
import { Component } from "preact"
import { commitMutation, graphql } from "react-relay"
import { connect } from "preact-redux"

// @TODO(adam): maybe put these into backend? undecided...
import resultTypes from "../../config/resultTypes"
import limitMetrics from "../../config/limitMetrics"



export class StageShuttleTest extends Component {

  constructor(props) {
    super(props)

    const timer = new StageShuttleTimer()
    timer.onProgress((stage, shuttle) => this.setState({ stage, shuttle }))
    timer.onChange(running => this.setState({ running }))

    this.state = {
      results: {},
      stage: 0,
      shuttle: 0,
      running: false,
      timer
    }
  }



  componentWillUnmount() {
    if( this.state.timer )
      this.state.timer.destroy()
  } 


  render({ participants, limit }) {

    const showSidebar = !isEmpty(participants)
    const isNotCurrentParticipant = participant => !!this.state.participant && participant.id != this.state.participant.id
    const timer = this.state.timer

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
                onClick={() => this.setParticipantResult(participant)}
                disabled={this.state.running && participant.id in this.state.results}
              />
            )) }
          </ContentCell>

          <ActionBar>
            <ActionBarTimerControls 
              disabled={isEmpty(this.props.participants) || (!this.state.running && !isEmpty(this.state.results) && !this.state.saved)} 
              onStart={this.start.bind(this)} 
              onStop={this.stop.bind(this)} 
              running={timer.running} 
            />
            <ActionBarStageShuttle stage={this.state.stage} shuttle={this.state.shuttle} />
            <ParticipantActionBar />
            <Sound playStatus={this.state.running ? Sound.status.PLAYING : Sound.status.STOPPED} url={beepTestAudio} />
          </ActionBar>
          <ProgressBar stages={21} progress={timer.progress} />

        </Column>


        { showSidebar && (
          <Column width="320px">
            <ContentCell title="Leaderboard" fill>

              { [...participants].sort(this.compareQuickestFirst.bind(this)).map(participant => {
                const result = get(this.state.results, participant.id, { stage: this.state.stage, shuttle: this.state.shuttle })
                const label = result.stage ? `${result.stage}.${result.shuttle}` : "not started"
                return (
                  <Result 
                    key={participant.id} 
                    disabled={participant.id in this.state.results} 
                    right={label}
                    onClick={() => this.selectParticipant(participant)}
                  >
                    { participant.firstName } { participant.lastName }
                  </Result>
              ) } ) }

            </ContentCell>
            { !isEmpty(this.state.results) && !this.state.running && !this.state.saving && !this.state.saved && (
              <ActionBar>
                <ActionBarButton fill icon={<CheckIcon />} onClick={this.persistResults.bind(this)}>Record Results</ActionBarButton>
                <ActionBarButton fill icon={<CloseIcon />} onClick={this.clearResults.bind(this)}>Clear Results</ActionBarButton>
              </ActionBar>
            ) }
          </Column>
        ) }

      </div>
    )
  }



  compareQuickestFirst(a, b) {
    const aResult = get(this.state.results, a.id, { stage: this.state.stage, shuttle: this.state.shuttle })
    const bResult = get(this.state.results, b.id, { stage: this.state.stage, shuttle: this.state.shuttle })

    const aTime = aResult.stage + aResult.shuttle / 100
    const bTime = bResult.stage + bResult.shuttle / 100

    return bTime - aTime
  }



  clearResults() {
    this.setState({ results: {} })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation StageShuttleTestRecordResultMutation ($results: [StageShuttleResultInput!]!) {
          recordStageShuttleResults(results: $results) { id }
        }
      `,
      variables: {
        results: Object.entries(this.state.results).map(([id, result]) => ({
          athlete:    id, 
          stage:      result.stage,
          shuttle:    result.shuttle,
          date:       new Date().toISOString(), 
          test:       this.props.id,
        }))
      }
    })

    this.setState({ saving: false, saved: true, stage: 0, shuttle: 0 })
  }



  selectParticipant(participant) {
    this.setState({ participant })
  }



  setParticipantResult({ id }) {
    if( !this.state.running ) return
    const { stage, shuttle } = this.state
    this.setState({
      results: { 
        ...this.state.results,
        [id]: { stage, shuttle }
      }
    })
  }



  start() {
    this.setState({ results: {}, saved: false })
    this.state.timer.start()
  }



  stop() {

    // Anyone who wasn't checked off at the time the test was stopped gets a top score
    const participants = this.props.participants
    const topResult = { stage: this.state.stage, shuttle: this.state.shuttle }
    const defaultResults = zipObject(participants.map(participant => participant.id), participants.map(() => topResult))
    const results = { ...defaultResults, ...this.state.results }

    this.setState({ results, saved: false })
    this.state.timer.stop()
  }

}



StageShuttleTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(StageShuttleTest)
