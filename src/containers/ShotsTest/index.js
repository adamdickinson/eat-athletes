import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarSpace from "../../components/ActionBarSpace"
import ActionBarStageShuttle from "../../components/ActionBarStageShuttle"
import ActionBarTimer from "../../components/ActionBarTimer"
import ActionBarTimerControls from "../../components/ActionBarTimerControls"
import Button from "../../components/Button"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import PropTypes from "prop-types"
import Result from "../../components/Result"
import ShotTracker from "../../components/ShotTracker"
import Timer from "../../helpers/Timer"
import TimerProgressBar from "../../components/TimerProgressBar"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { Component } from "preact"
import { connect } from "preact-redux"
import { commitMutation, graphql } from "react-relay"
import relayEnvironment from "../../config/relay"
import isEqual from "lodash/isEqual"

// @TODO(adam): maybe put these into backend? undecided...
import resultTypes from "../../config/resultTypes"
import limitMetrics from "../../config/limitMetrics"



const madeLabel = <span><CheckIcon style={{ marginRight: "8px" }} fill="#15A682" /> Shot made</span>
const missedLabel = <span><CloseIcon style={{ marginRight: "8px" }} fill="#F0285D" /> Shot missed</span>



export class ShotsTest extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      shots: [],
      limit: props.limit,
      timer: this.setupTimer(props)
    }
  }



  componentWillReceiveProps(props) {
    if( !isEqual(props.limit, this.state.limit) )
      this.setupTimer(props)

    if( props.participants && this.state.participant && !props.participants.find(participant => participant.id == this.state.participant.id) ) {
      this.setState({ participant: null, shots: [] })
      this.state.timer.stop()
    }
  }



  componentWillUnmount() {
    if( this.state.timer )
      this.state.timer.destroy()
  }



  setupTimer({ limit }) {
    if( this.state.timer )
      this.state.timer.destroy()

    const timerSpecs = {}
    if( limit && limit.metric == limitMetrics.TIME )
      timerSpecs.countTo = limit.value

    const timer = new Timer(timerSpecs)
    timer.onChange(running => this.setState({ running }))
    return timer
  }



  render({ participants, limit }) {

    const showSidebar = !isEmpty(participants)
    const isNotCurrentParticipant = participant => !!this.state.participant && participant.id != this.state.participant.id
    const isTimeLimited = limit && limit.metric == limitMetrics.TIME
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
                onClick={() => this.selectParticipant(participant)}
                disabled={isNotCurrentParticipant(participant)} 
              />
            )) }
          </ContentCell>

          <ActionBar>
            { isTimeLimited && (
              <ActionBarTimerControls 
                disabled={isEmpty(this.state.participant)} 
                onStart={timer.start.bind(timer)} 
                onStop={timer.stop.bind(timer)} 
                running={timer.running} 
              />
            ) }
            { isTimeLimited && <ActionBarTimer timer={timer} /> }
            { !isTimeLimited && <ActionBarSpace fill /> }
            <ParticipantActionBar />
          </ActionBar>
          <TimerProgressBar timer={timer} />

        </Column>


        { showSidebar && (
          <Column width="320px">
            <ContentCell title="Shot Tracking" padding="0">
              <ShotTracker timer={timer} disabled={!this.state.participant || (isTimeLimited && !this.state.running)} onShot={this.addShot.bind(this)} />
            </ContentCell>

            <div style={{ flex: "1 1 auto", overflow: "auto" }}>
              { this.state.shots.map((shot, s) => (
                <Result 
                  key={s} 
                  right={(
                    <span>
                      {shot.time ? (shot.time / 1000).toFixed(3) + "s" : ""}
                      <Button style={{ marginLeft: "16px" }} color="grey" outlined onClick={() => this.removeShot(s)} icon={<CloseIcon />} />
                    </span>
                  )}>
                  { shot.made ? madeLabel : missedLabel }
                </Result>
              )) }
            </div>

            { !!this.state.shots.length && !this.state.running && !this.state.saved && (
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



  addShot(shot) {
    this.setState({ shots: [...this.state.shots, shot] })
  }



  clearResults() {
    this.setState({ shots: [] })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation ShotsTestRecordResultMutation ( $result: ShootingResultInput!) {
          recordShootingResult(result: $result) { id }
        }
      `,
      variables: {
        result: {
          athlete:    this.state.participant.id, 
          attempts:   this.state.shots,
          date:       new Date().toISOString(), 
          test:       this.props.id,
        }
      }
    })

    this.setState({ saved: true, saving: false })
  }



  selectParticipant(participant) {
    this.setState({ participant, shots: [] })
    this.state.timer.stop()
  }

}



ShotsTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(ShotsTest)
