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



export class CreateGroupOverlay extends FieldContainer {

  constructor(props) {
    super(props)
    this.rules = {
      name: { required: true }
    }
  }



  componentWillMount() {
    Object.keys(this.rules)
      .forEach(rule => this.validateField(rule, get(this.state, rule)))
  }



  render({ onClose, onSelect }) {
    const onSelectGroup = group => {
      this.setState({ search: "" })
      onSelect(group)
      onClose()
    }

    const connectField = this.connectField.bind(this)

    return (
      <Overlay>
        <h1>Create Group</h1>

        <div class="field">
          <input {...connectField("name")} placeholder="Group Name" />
        </div>

        <Button onClick={onClose}>Close</Button>
        { this.formValid && <Button onClick={this.createGroup.bind(this)} gradient={gradients.good}>Create</Button> }
      </Overlay>
    )
  }



  async createGroup() {
    this.setState({ saving: true })
    const { name } = this.state

    await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation CreateGroupOverlayCreateGroupMutation ($group: GroupInput!) {
          createGroup(group: $group) { id }
        }
      `,
      variables: {
        group: { name }
      }
    })

    this.props.onClose()
  }

}



export const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch({ type: "CLOSE_OVERLAYS" }),
})



export default connect(undefined, mapDispatchToProps)(CreateGroupOverlay)
