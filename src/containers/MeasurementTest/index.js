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



const metricStyle = { display: "inline-block", width: "30px" }
const specSuffixes = {
  CM_FT: { metric: "cm", imperial: "ft" },
  CM_IN: { metric: "cm", imperial: "in" },
  KG_LB: { metric: "kg", imperial: "lb" },
  PERCENTAGE: { metric: "%", imperial: "%" }
}



export class MeasurementTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: {},
    }
  }



  render({ participants, specs }) {

    const showSidebar = !isEmpty(this.state.participant)
    const isNotCurrentParticipant = participant => !!this.state.participant && participant.id != this.state.participant.id

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
            <ActionBarSpace fill />
            <ParticipantActionBar />
          </ActionBar>

        </Column>


        { showSidebar && (
          <Column width="320px">
            <ContentCell title="Measurements" fill>

              { specs.map(spec => {
                const suffix = specSuffixes[spec.metric].metric

                return (
                  <Result 
                    right={(
                      <span>
                        <input type="number" value={this.state.results[spec.id]} onInput={e => this.setResult(spec.id, e.target.value)} />
                        <span style={metricStyle}>{suffix}</span>
                      </span>
                    )}
                  >
                    { spec.name } 
                  </Result>
                ) 
              } ) }

            </ContentCell>

            { !isEmpty(this.state.results) && !this.state.saved && (
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
    this.setState({ results: {}, saved: false })
  }



  async persistResults() {
    this.setState({ saving: true })

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation MeasurementTestRecordResultMutation ( $results: [MeasurementResultInput!]!) {
          recordMeasurementResults(results: $results) { id }
        }
      `,
      variables: {
        results: Object.entries(this.state.results).map(([specId, value]) => ({
          athlete:    this.state.participant.id, 
          date:       new Date().toISOString(), 
          test:       this.props.id,
          specId,
          value,
        }))
      }
    })

    this.setState({ saved: true, saving: false })
  }



  selectParticipant(participant) {
    this.setState({ participant, saved: false, results: {} })
  }



  setResult(specId, value) {
    this.setState({
      results: { 
        ...this.state.results,
        [specId]: value 
      }
    })
  }



}



MeasurementTest.propTypes = ({
  participants: PropTypes.array.isRequired
})



export const mapStateToProps = state => ({
  participants: state.participants
})



export default connect(mapStateToProps)(MeasurementTest)
