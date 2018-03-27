import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarInput from "../../components/ActionBarInput"
import ActionBarSpace from "../../components/ActionBarSpace"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import PlayIcon from "react-material-icon-svg/dist/PlayIcon"
import ProgressBar from "../../components/ProgressBar"
import Result from "../../components/Result"
import StopIcon from "react-material-icon-svg/dist/StopIcon"
import gradients from "../../config/gradients"
import relayEnvironment from "../../config/relay"
import style from "./style.styl"
import { Component } from "preact"
import { connect } from "preact-redux"
import { commitMutation, graphql } from "react-relay"
import PropTypes from "prop-types"



export class SpeedTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      badTime:      7000,
      distance:     35,
      duration:     10000,
      goodTime:     3000,
      participant:  undefined,
      results:      {},
      running:      false,
      saved:        false,
      start:        undefined,
      time:         0
    }
  }



  render({ participants }) {
    const compareProgress = (participantA, participantB) => {
      const results = this.state.results
      const hasResultDiff = (participantA._id in results ? 1 : 0) - (participantB._id in results ? 1 : 0)
      if( hasResultDiff ) return hasResultDiff

      return results[participantA._id] - results[participantB._id]
    }


    return (
      <div class={style["speed-test"]}>

        <Column>
          <ContentCell title="Participants" fill style={{ margin: "20px" }}>
            { !participants.length && "Add participants using the buttons below" }
            { participants.map((participant, a) => (
              <Participant
                key={a}
                photoUrl={participant.photoUrl} 
                title={`${participant.firstName} ${participant.lastName}`}
                onClick={() => this.selectParticipant(participant)}
                disabled={this.state.participant && this.state.participant._id != participant._id }
              />
            )) }
          </ContentCell>
          <ActionBar>
            { !this.state.running && <ActionBarButton disabled={!this.state.participant} onClick={() => this.start()} icon={<PlayIcon fill="white" />}>Start Test</ActionBarButton> }
            { !!this.state.running && <ActionBarButton onClick={() => this.stop()} icon={<StopIcon fill="white" />}>Stop Test</ActionBarButton> }

            <ActionBarInput 
              readonly={!!Object.values(this.state.results).length}
              disabled={this.state.running || !!Object.values(this.state.results).length} 
              value={this.state.distance} 
              onInput={e => this.setState({ distance: e.target.value })}
            >
              Distance (m)
            </ActionBarInput>

            <ActionBarSpace fill>
              <ActionBarInput readonly value={Math.floor(this.state.time / 1000)}>Seconds</ActionBarInput>
              <span style={{ fontFamily: "\"DJB Friday Night Lights\", monospace", fontSize: 32 }}>:</span>
              <ActionBarInput readonly value={(this.state.time % 1000).toString().padStart(3, "0")}>Milliseconds</ActionBarInput>
            </ActionBarSpace>

            <ParticipantActionBar disabled={this.state.running} />
          </ActionBar>
          <ProgressBar progress={this.state.time / this.state.duration} stages={21} />
        </Column>

        <Column width="360px">
          <div style={{ flex: "1 1 auto" }}>
            <ContentCell title="Leaderboard">
              { [...participants].sort(compareProgress).map((participant, a) => {
                const time = participant._id in this.state.results ? this.state.results[participant._id] : 0
                const label = time ? ((time / 1000).toFixed(3) + "s") : "not started"
                const progress = time / this.state.duration 
                const gradient = time < this.state.goodTime ? gradients.good : (time > this.state.badTime ? gradients.bad : gradients.average)

                return (
                  <Result 
                    key={a} 
                    disabled={participant._id in this.state.results} 
                    gradient={gradient} 
                    progress={progress} 
                    right={label}
                  >
                    { participant.firstName } { participant.lastName }
                  </Result>
                )
              }) }
            </ContentCell>
          </div>

          { !!Object.values(this.state.results).length && !this.state.saved && (
            <ActionBar>
              <ActionBarButton fill icon={<CheckIcon />} onClick={() => this.persistResults()}>Record Results</ActionBarButton>
              <ActionBarButton fill icon={<CloseIcon />} onClick={() => this.clearResults()}>Clear Results</ActionBarButton>
            </ActionBar>
          ) }
        </Column>
      </div>
    )
  }



  clearResults() {
    this.setState({ results: {}, saved: false })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation SpeedTestRecordResultsMutation ( $results: [ResultInput!]!) {
          recordResults(results: $results) { _id }
        }
      `,
      variables: {
        results: Object.entries(this.state.results).map(([athlete, value]) => ({
          athlete, 
          date: new Date().toISOString(), 
          test: "Speed Test", 
          value, 
          variation: `${this.state.duration / 1000}s`
        }))
      }
    })

    this.setState({ saving: false, saved: true })
  }



  recordResult(participant) {
    this.setState({
      results: { ...this.state.results, [participant._id]: {...this.state.currentStage} }
    })
  }



  selectParticipant(participant) {
    this.setState({ participant })
  }



  start() {
    this.setState({ running: true, start: Date.now(), time: 0 })
    this.tick()
  }



  stop() {
    const results = { ...this.state.results, [this.state.participant._id]: this.state.time }
    this.setState({ running: false, results })
  }



  tick() {
    if( !this.state.running ) return
    this.setState({ time: Date.now() - this.state.start })
    window.requestAnimationFrame(() => this.tick())
  }

}



SpeedTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(SpeedTest)
