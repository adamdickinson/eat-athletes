import Button from "../../components/Button"
import Overlay from "../../components/Overlay"
import debounce from "lodash/debounce"
import overlayStyle from "../../components/Overlay/style.styl"
import relayEnvironment from "../../config/relay"
import { Component } from "preact"
import { graphql, QueryRenderer } from "react-relay"
import { connect } from "preact-redux"
import gradients from "../../config/gradients"



export class AddGroupOverlay extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateSearch = debounce(e => this.setState({ query: e.target.value }), 500)
    this.updateQuery = e => {
      this.setState({ search: e.target.value }) 
      this.updateSearch(e)
    }
  }



  render({ onClose, onSelect }) {
    const onSelectGroup = group => {
      this.setState({ search: "" })
      onSelect(group)
      onClose()
    }

    return (
      <Overlay>
        <h1>Add Group</h1>

        <input 
          className="search" 
          onInput={this.updateQuery} 
          value={this.state.search} 
          placeholder="Type to search groups"
        />
        { this.state.query && (
          <QueryRenderer
            environment={relayEnvironment}
            query={graphql`
              query AddGroupOverlaySearchQuery($query: String!) {
                searchGroups(query: $query) {
                  id
                  name
                  athletes {
                    id
                    firstName
                    lastName
                    photoUrl
                  }
                }
              }
            `}
            variables={{ query: this.state.query }}
            render={ ({ error, props }) => {
              if( error ) return null // @TODO(adam): handle
              else if( props && props.searchGroups.length ) {
                return (
                  <ul class={overlayStyle.results}>
                    { props.searchGroups.map(group => <li key={group.id} onClick={() => onSelectGroup(group)}>{group.name}</li>) }
                  </ul>
                )
              }
              else if( props && !props.searchGroups.length )
                return <p class={overlayStyle.searching}>No results found</p>


              return <p class={overlayStyle.searching}>Searching...</p>
            } }
          />
        ) }

        <div style={{ marginTop: "20px" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => this.props.onOpen("create-group")} gradient={gradients.good}>Create Group</Button>
        </div>

      </Overlay>
    )
  }

}



export const mapDispatchToProps = dispatch => ({
  onClose:     ()      => dispatch({ type: "CLOSE_OVERLAYS" }),
  onOpen:      overlay => dispatch({ type: "OPEN_OVERLAY", overlay }),
  onSelect:    group   => dispatch({ type: "ADD_PARTICIPANTS", newParticipants: group.athletes }),
  openOverlay: overlay => dispatch({ type: "OPEN_OVERLAY", overlay }),
})



export default connect(undefined, mapDispatchToProps)(AddGroupOverlay)
