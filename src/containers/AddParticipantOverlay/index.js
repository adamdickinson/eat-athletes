import Overlay from "../../components/Overlay"
import debounce from "lodash/debounce"
import overlayStyle from "../../components/Overlay/style.styl"
import relayEnvironment from "../../config/relay"
import { Component } from "preact"
import { graphql, QueryRenderer } from 'react-relay'
import { connect } from "preact-redux"



export class AddParticipantOverlay extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateSearch = debounce(e => this.setState({ query: e.target.value }), 500)
    this.updateQuery = e => {
      this.setState({ search: e.target.value }) 
      this.updateSearch(e)
    }
  }



  render({ onClose, onSelect }) {
    const onSelectAthlete = athlete => {
      this.setState({ search: "" })
      onSelect(athlete)
      onClose()
    }

    return (
      <Overlay>
        <h1>Add Participant</h1>
        <input 
          className="search" 
          onInput={this.updateQuery} 
          value={this.state.search} 
          placeholder="Type to search athletes"
        />
        { this.state.query && (
          <QueryRenderer
            environment={relayEnvironment}
            query={graphql`
              query AddParticipantOverlaySearchQuery($query: String!) {
                findAthletes(query: $query) {
                  _id
                  firstName
                  lastName
                  photoUrl
                }
              }
            `}
            variables={{ query: this.state.query }}
            render={ ({ error, props }) => {
              if( error ) return null // @TODO(adam): handle
              else if( props && props.findAthletes.length ) {
                return (
                  <ul class={overlayStyle.results}>
                    { props.findAthletes.map(athlete => <li onClick={() => onSelectAthlete(athlete)}>{athlete.firstName} {athlete.lastName}</li>) }
                  </ul>
                )
              }
              else if( props && !props.findAthletes.length )
                return <p class={overlayStyle.searching}>No results found</p>

              return <p class={overlayStyle.searching}>Searching...</p>
            } }
          />
      ) }
      </Overlay>
    )
  }

}



export const mapDispatchToProps = dispatch => ({
  onSelect: athlete => dispatch({ type: "ADD_PARTICIPANT", newParticipant: athlete }),
})



export default connect(undefined, mapDispatchToProps)(AddParticipantOverlay)
