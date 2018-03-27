import Button from "../../components/Button"
import Overlay from "../../components/Overlay"
import debounce from "lodash/debounce"
import get from "lodash/get"
import gradients from "../../config/gradients"
import overlayStyle from "../../components/Overlay/style.styl"
import relayEnvironment from "../../config/relay"
import { Component } from "preact"
import { FieldContainer } from "@renegade/react-fields"
import { connect } from "preact-redux"
import { commitMutation, graphql, QueryRenderer } from "react-relay"
import "./style.styl"



export class CreateAthleteOverlay extends FieldContainer {

  constructor(props) {
    super(props)
    this.rules = {
      firstName: { required: true },
      lastName: { required: true },
      dateOfBirth: { type: "date", required: true },
      graduatingYear: { type: "number", min: (new Date).getFullYear(), max: (new Date).getFullYear() + 10 }
    }
  }



  componentWillMount() {
    Object.keys(this.rules)
      .forEach(rule => this.validateField(rule, get(this.state, rule)))
  }



  render({ onClose, onSelect }) {
    const onSelectAthlete = athlete => {
      this.setState({ search: "" })
      onSelect(athlete)
      onClose()
    }

    const connectField = this.connectField.bind(this)

    return (
      <Overlay>
        <h1>Create Athlete</h1>

        <div class="field">
          <input {...connectField("firstName")} placeholder="First Name" />
        </div>

        <div class="field">
          <input {...connectField("lastName")} placeholder="Last Name" />
        </div>

        <div class="field">
          <input {...connectField("dateOfBirth")} placeholder="Date of Birth" />
        </div>

        <div class="field">
          <input {...connectField("graduatingYear")} placeholder="Graduating Year (YYYY)" />
        </div>

        <div class="field">
          <input {...connectField("position")} placeholder="Position" />
        </div>

        <Button onClick={onClose}>Close</Button>
        { this.formValid && <Button onClick={this.createAthlete.bind(this)} gradient={gradients.good}>Create</Button> }
      </Overlay>
    )
  }



  async createAthlete() {
    this.setState({ saving: true })
    const { firstName, lastName, dateOfBirth, graduatingYear, position } = this.state

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation CreateAthleteOverlayCreateAthleteMutation ($athlete: AthleteInput) {
          createAthlete(athlete: $athlete) { id }
        }
      `,
      variables: {
        athlete: { firstName, lastName, dateOfBirth, graduatingYear, position }
      }
    })

    this.props.onClose()
  }

}



export const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch({ type: "CLOSE_OVERLAYS" }),
})



export default connect(undefined, mapDispatchToProps)(CreateAthleteOverlay)
