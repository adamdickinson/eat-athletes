import ActionBar from "../../components/ActionBar"
import ActionBarButton from "../../components/ActionBarButton"
import ActionBarInput from "../../components/ActionBarInput"
import ActionBarSelect from "../../components/ActionBarSelect"
import ActionBarSpace from "../../components/ActionBarSpace"
import Button from "../../components/Button"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import Participant from "../../components/Participant"
import ParticipantActionBar from "../../containers/ParticipantActionBar"
import PlayIcon from "react-material-icon-svg/dist/PlayIcon"
import ProgressBar from "../../components/ProgressBar"
import PropTypes from "prop-types"
import Result from "../../components/Result"
import ShotTracker from "../../components/ShotTracker"
import StopIcon from "react-material-icon-svg/dist/StopIcon"
import relayEnvironment from "../../config/relay"
import style from "./style.styl"
import { Component } from "preact"
import { commitMutation, graphql, QueryRenderer } from "react-relay"
import { connect } from "preact-redux"



export class ShootingTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      duration:     undefined,
      participant:  undefined,
      running:      false,
      shots:        [],
      start:        undefined,
      time:         undefined 
    }
  }



  render({ participants }) {
    const madeLabel = <span><CheckIcon style={{ marginRight: "8px" }} fill="#15A682" /> Shot made</span>
    const missedLabel = <span><CloseIcon style={{ marginRight: "8px" }} fill="#F0285D" /> Shot missed</span>

    return (
      <div class={style["shooting-test"]}>

        <Column>
          <ContentCell title="Participants" fill style={{ margin: "20px" }}>
            { !participants.length && "Add participants using the buttons below" }
            { participants.map((participant, a) => {
              const faded = this.state.participant && this.state.participant._id != participant._id
              const disabled = this.state.running || !!this.state.shots.length
              return (
                <Participant
                  key={a}
                  photoUrl={participant.photoUrl} 
                  title={`${participant.firstName} ${participant.lastName}`}
                  onClick={() => !disabled && this.selectParticipant(participant)}
                  disabled={faded}
                />
              )
            } ) }
          </ContentCell>
          <ActionBar>
            { !this.state.running && <ActionBarButton disabled={!this.state.participant || !!this.state.shots.length || !this.state.duration} onClick={() => this.start()} icon={<PlayIcon fill="white" />}>Start Test</ActionBarButton> }
            { !!this.state.running && <ActionBarButton onClick={() => this.stop()} icon={<StopIcon fill="white" />}>Stop Test</ActionBarButton> }

            <QueryRenderer 
              environment={relayEnvironment}
              query={graphql`
                query ShootingTestVariationQuery {
                  test(name: "Shooting Test") {
                    variations {
                      name
                      duration
                    }
                    duration
                  }
                }
              `}
              render={({ error, props }) => {
                if( error ) throw error
                if( !props ) return (
                  <ActionBarSpace fill>
                    <ActionBarSelect options={[{ label: "Loading...", value: "" }]}>
                      Shooting Test
                    </ActionBarSelect>
                    <ActionBarSpace fill />
                  </ActionBarSpace>
                )

                if( !this.state.variation )
                  this.switchToVariation(Object.values(props.test.variations)[0], props.test)

                return (
                  <ActionBarSpace fill>
                    <ActionBarSelect 
                      disabled={this.state.running || !!this.state.shots.length}
                      onChange={e => this.switchToVariation(props.test.variations[e.target.value], props.test)}
                      options={ props.test.variations.map((variation, v) => ({ label: variation.name, value: v })) }
                    >
                      Shooting Test
                    </ActionBarSelect>

                    {!!this.state.duration && (
                      <ActionBarSpace fill>
                        <ActionBarInput 
                          readonly={this.state.running} 
                          type="number" 
                          onInput={e => this.setState({ duration: e.target.value * 1000, time: e.target.value * 1000 })} 
                          value={Math.floor(this.state.time / 1000)}
                        >
                          Seconds
                        </ActionBarInput>

                        <span style={{ fontFamily: "\"DJB Friday Night Lights\", monospace", fontSize: 32 }}>:</span>

                        <ActionBarInput 
                          readonly 
                          value={(this.state.time % 1000).toString().padStart(3, "0")}
                        >
                          Milliseconds
                        </ActionBarInput>
                      </ActionBarSpace>
                    ) }

                    {!this.state.duration && <ActionBarSpace fill />}
                  </ActionBarSpace>
                )
              }}
            />

            <ParticipantActionBar disabled={this.state.running} />
          </ActionBar>
          <ProgressBar progress={(this.state.duration - this.state.time) / this.state.duration} stages={this.state.duration / 1000} />
        </Column>

        { this.state.participant && (
          <Column width="360px">
            <ContentCell title="Shot Tracking">
              <ShotTracker disabled={!this.state.running && this.state.duration} onShot={shot => this.addShot({ made: shot.made, time: this.state.duration ? shot.time - this.state.start : undefined })} />
            </ContentCell>

            <div style={{ flex: "1 1 auto", overflow: "auto" }}>
              { this.state.shots.map((shot, s) => (
                <Result 
                  key={s} 
                  right={(
                    <span>
                      {this.state.duration ? (shot.time / 1000).toFixed(3) + "s" : ""}
                      <Button style={{ marginLeft: "16px" }} color="grey" outlined onClick={() => this.removeShot(s)} icon={<CloseIcon />} />
                    </span>
                  )}>
                  { shot.made ? madeLabel : missedLabel }
                </Result>
              )) }
            </div>

            { !!this.state.shots.length && !this.state.saved && (
              <ActionBar>
                <ActionBarButton fill icon={<CheckIcon />} onClick={() => this.persistResults()}>Record Results</ActionBarButton>
                <ActionBarButton fill icon={<CloseIcon />} onClick={() => this.clearResults()}>Clear Results</ActionBarButton>
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
    this.setState({ saved: false, shots: [] })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation ShootingTestRecordResultMutation ( $result: ShootingResultInput!) {
          recordShootingResult(result: $result) { _id }
        }
      `,
      variables: {
        result: {
          athlete:    this.state.participant._id, 
          attempts:   this.state.shots,
          date:       new Date().toISOString(), 
          test:       "Shooting Test",
          variation:  this.state.variation.name
        }
      }
    })

    this.setState({ saved: true, saving: false })
  }



  recordShots() {
    this.setState({ shots: [] })
  }



  removeShot(index) {
    const shots = [...this.state.shots]
    shots.splice(index, 1)
    this.setState({ shots })
  }



  selectParticipant(participant) {
    this.setState({ participant, shots: [], saved: false })
  }



  start() {
    const timer = setTimeout(() => this.setState({ running: false, time: this.state.duration }), this.state.duration)
    this.setState({ running: true, start: Date.now(), time: this.state.duration, timer })
    this.tick()
  }



  stop() {
    clearTimeout(this.state.timer)
    this.setState({ running: false, time: this.state.duration, timer: null })
  }



  switchToVariation(variation, test) {
    const duration = 1000 * (variation.duration === null ? test.duration : variation.duration)
    this.setState({ variation, duration, time: duration, shots: [] })
  }



  tick() {
    if( !this.state.running ) return
    this.setState({ time: this.state.duration - (Date.now() - this.state.start) })
    window.requestAnimationFrame(() => this.tick())
  }

}



ShootingTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(ShootingTest)
