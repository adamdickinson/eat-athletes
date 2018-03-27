import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import ActionBarTimer from "../../components/ActionBarTimer"
import ActionBarTimerControls from "../../components/ActionBarTimerControls"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import PropTypes from "prop-types"
import Result from "../../components/Result"
import Timer from "../../helpers/Timer"
import TimerProgressBar from "../../components/TimerProgressBar"
import get from "lodash/get"
import isEmpty from "lodash/isEmpty"
import relayEnvironment from "../../config/relay"
import { Component } from "preact"
import { commitMutation, graphql } from "react-relay"
import { connect } from "preact-redux"

// @TODO(adam): maybe put these into backend? undecided...
import resultTypes from "../../config/resultTypes"
import limitMetrics from "../../config/limitMetrics"



export class TimeTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: {},
      timer: this.setupTimer(props)
    }
  }



  componentWillUnmount() {
    if( this.state.timer )
      this.state.timer.destroy()
  }



  setupTimer({ limit, groupTest }) {
    if( this.state.timer )
      this.state.timer.destroy()

    const timerSpecs = {}
    if( limit && limit.metric == limitMetrics.TIME )
      timerSpecs.countTo = limit.value

    const timer = new Timer(timerSpecs)
    timer.onChange(running => {
      if(!running) {
        if(groupTest) this.finishRemainingParticipants(timer)
        else this.setResult(timer.time)
      } else 
        this.setState({ saved: false })

      this.setState({ running })
    })
    return timer
  }



  render({ participants, limit, groupTest }) {

    const showSidebar = !isEmpty(participants)
    const timer = this.state.timer

    const isNotSelectedParticipant = participant => !!this.state.participant && participant.id != this.state.participant.id
    const hasParticipantFinished   = participant => participant && participant.id in this.state.results
    const isParticipantDisabled    = groupTest ? hasParticipantFinished : isNotSelectedParticipant

    const onParticipantClick = groupTest ? this.finishParticipant.bind(this) : this.selectParticipant.bind(this)


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
                onClick={() => onParticipantClick(participant, timer)}
                disabled={isParticipantDisabled(participant)} 
              />
            )) }
          </ContentCell>

          <ActionBar>
            <ActionBarTimerControls 
              disabled={groupTest ? (isEmpty(participants) || (!isEmpty(this.state.results) && !this.saved)) : isEmpty(this.state.participant)} 
              onStart={timer.start.bind(timer)}
              onStop={timer.stop.bind(timer)} 
              running={timer.running} 
            />
            <ActionBarTimer timer={timer} />
            <ParticipantActionBar />
          </ActionBar>
          <TimerProgressBar timer={timer} />

        </Column>


        { showSidebar && (
          <Column width="320px">
            <ContentCell title="Leaderboard" fill padding="0">

              { [...participants].sort(this.compareQuickestFirst.bind(this)).map(participant => {
                const time = get(this.state.results, participant.id)
                const label = time ? ((time / 1000).toFixed(3) + "s") : (time === null ? "DNF" : "not started")
                return (
                  <Result 
                    key={participant.id} 
                    disabled={participant.id in this.state.results} 
                    right={label}
                    onClick={() => onParticipantClick(participant, timer)}
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



  clearResults() {
    this.setState({ results: {} })
  }



  compareQuickestFirst(a, b) {
    const aTime = this.state.results[a.id] || 999999
    const bTime = this.state.results[b.id] || 999999
    return aTime - bTime
  }



  finishParticipant(participant, timer) {
    if( !timer.running ) return
    this.setState({
      results: {
        ...this.state.results,
        [participant.id]: timer.time
      }
    })
  }



  finishRemainingParticipants(timer) {
    const results = { ...this.state.results }
    this.props.participants.forEach(participant => {
      if( participant.id in results ) return
      results[participant.id] = null
    })

    this.setState({ results })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation TimeTestRecordResultMutation ($results: [TimeResultInput!]!) {
          recordTimeResults(results: $results) { id }
        }
      `,
      variables: {
        results: Object.entries(this.state.results).map(([id, result]) => ({
          athlete:    id, 
          date:       new Date().toISOString(), 
          test:       this.props.id,
          time:       result,
        }))
      }
    })

    this.setState({ saving: false, saved: true, results: {} })
  }



  selectParticipant(participant) {
    this.setState({ participant })
  }



  setResult(time) {
    this.setState({
      results: { 
        ...this.state.results,
        [this.state.participant.id]: time 
      },
      running: false
    })
  }

}



TimeTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(TimeTest)
