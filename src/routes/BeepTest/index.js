import AccountMultiplePlusIcon from "react-material-icon-svg/dist/AccountMultiplePlusIcon"
import AccountPlusIcon from "react-material-icon-svg/dist/AccountPlusIcon"
import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarInput from "../../components/ActionBarInput"
import ActionBarSpace from "../../components/ActionBarSpace"
import AddGroupOverlay from "../../containers/AddGroupOverlay"
import AddParticipantOverlay from "../../containers/AddParticipantOverlay"
import CachedIcon from "react-material-icon-svg/dist/CachedIcon"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import PlayIcon from "react-material-icon-svg/dist/PlayIcon"
import ProgressBar from "../../components/ProgressBar"
import Result from "../../components/Result"
import Sound from "react-sound"
import StopIcon from "react-material-icon-svg/dist/StopIcon"
import beepTestAudio from "../../assets/beep-test.mp3"
import gradients from "../../config/gradients"
import range from "lodash/range"
import relayEnvironment from "../../config/relay"
import style from './style.styl'
import uniqBy from "lodash/uniqBy"
import { Component } from 'preact'
import { LineStat } from "../../components/LineStat"
import { commitMutation } from "react-relay"
import { connect } from "preact-redux"
import { start as startBeepTest, getProgress as getBeepTestProgress } from "../../helpers/beepTest"




export class BeepTest extends Component {

  constructor(props) {
    const currentStage = { stage: 0, shuttle: 0 }
    super(props)
    this.state = {
      currentStage,
      results:      {},
      running:      false,
      saving:       false,
      saved:        false,
      start:        undefined
    }
  }



	render({ participants }) {
    const currentStageLabel = this.state.currentStage.stage + "." + this.state.currentStage.shuttle
    const currentStageProgress = getBeepTestProgress(this.state.currentStage.stage, this.state.currentStage.shuttle)

    const getParticipantStage = participant =>
      participant._id in this.state.results 
        ? this.state.results[participant._id] 
        : this.state.currentStage

    const getStageLabel = participant => {
      if( !(participant._id in this.state.results) && !this.state.running ) return "not started"
      const { stage, shuttle } = getParticipantStage(participant)
      return `${stage}.${shuttle}`
    }

    const getStageProgress = participant => {
      const { stage, shuttle } = getParticipantStage(participant)
      return getBeepTestProgress(stage, shuttle)
    }

    const compareProgress = (participantA, participantB) => {
      const progressDiff = getStageProgress(participantB) -  getStageProgress(participantA)
      if( progressDiff ) return progressDiff

      const activeDiff = (participantA._id in this.state.results ? 1 : 0) - (participantB._id in this.state.results ? 1 : 0)
      if( activeDiff ) return activeDiff

      return `${participantA.firstName} ${participantA.lastName}`
        .localeCompare(`${participantB.firstName} ${participantB.lastName}`)
    }

		return (
      <div class={style["beep-test"]}>

        <Column>
          <ContentCell title="Participants" fill style={{ margin: "20px" }}>
            { !participants.length && "Add participants using the buttons below" }
            { participants.map((participant, a) => (
              <Participant
                key={a}
                photoUrl={participant.photoUrl} 
                title={`${participant.firstName} ${participant.lastName}`}
                subtext={getStageLabel(participant)}
                onClick={() => this.state.running && this.recordResult(participant)}
                disabled={this.state.running && participant._id in this.state.results}
              />
            )) }
          </ContentCell>
          <ActionBar>
            { !this.state.running && <ActionBarButton disabled={!participants.length} onClick={() => this.start()} icon={<PlayIcon fill="white" />}>Start Test</ActionBarButton> }
            { !!this.state.running && <ActionBarButton onClick={() => this.stop()} icon={<StopIcon fill="white" />}>Stop Test</ActionBarButton> }
            <ActionBarSpace fill>
              <ActionBarInput readonly value={this.state.currentStage.stage}>Stage</ActionBarInput>
              <span style={{ fontFamily: '"DJB Friday Night Lights", monospace', fontSize: 32 }}>:</span>
              <ActionBarInput readonly value={this.state.currentStage.shuttle}>Shuttle</ActionBarInput>
            </ActionBarSpace>

            <ActionBarButton 
              disabled={this.state.running}
              icon={<AccountPlusIcon fill="white" />}
              onClick={() => this.openOverlay("add-participant")} 
            >
              Add Participant
            </ActionBarButton>

            <ActionBarButton 
              disabled={this.state.running}
              icon={<AccountMultiplePlusIcon fill="white" />}
              onClick={() => this.openOverlay("add-group")} 
            >
              Add Group 
            </ActionBarButton>

          </ActionBar>
          <ProgressBar progress={currentStageProgress} stages={21} />

          <Sound playStatus={this.state.running ? Sound.status.PLAYING : Sound.status.STOPPED} url={beepTestAudio} />
        </Column>

        <Column width="360px">
          <div style={{ flex: "1 0 auto" }}>
            <ContentCell title="Leaderboard">
              { [...participants].sort(compareProgress).map((participant, a) => {
                const progress = getStageProgress(participant)
                const label = getStageLabel(participant)
                const gradient = progress < getBeepTestProgress(4, 1) ? gradients.bad : (progress > getBeepTestProgress(8, 1) ? gradients.good : gradients.average)

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

        { this.state.overlay == "add-participant" && <AddParticipantOverlay onClose={() => this.closeOverlays()} /> }
        { this.state.overlay == "add-group" && <AddGroupOverlay onClose={() => this.closeOverlays()} /> }
      </div>
    )
	}



  clearResults() {
    this.setState({ results: {}, saved: false })
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
        mutation BeepTestRecordResultsMutation ( $results: [ResultInput!]!) {
          recordResults(results: $results) { _id }
        }
      `,
      variables: {
        results: Object.entries(this.state.results).map(([athlete, value]) => ({
          athlete, 
          date: new Date().toISOString(), 
          test: "Beep Test", 
          value: value.stage + value.shuttle / 100
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



  start() {
    const test = startBeepTest()
    this.setState({ test, running: true, results: {} })

    test.onNext((stage, shuttle) => {
      this.setState({ currentStage: { stage, shuttle } })
    })
  }



  stop() {
    const results = { ...this.state.results }
    if( this.state.currentStage.stage )
       this.props.participants 
        .map(participant => participant._id)
        .filter(id => !(id in this.state.results))
        .forEach(id => results[id] = { ...this.state.currentStage })

    this.state.test.stop()
    this.setState({ test: undefined, running: false, results })
  }

}



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(BeepTest)
