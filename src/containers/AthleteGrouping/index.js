import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import ToggleItem from "../../components/ToggleItem"
import relayEnvironment from "../../config/relay"
import uniqBy from "lodash/uniqBy"
import { Component } from "preact"
import { commitMutation, graphql, QueryRenderer } from "react-relay"



const athleteGroupingQuery = graphql`
  query AthleteGroupingQuery {
    athletes {
      id
      age
      firstName
      lastName
    }

    groups {
      id
      name
      athletes {
        id
      }
    }
  }
`



export class AthleteGrouping extends Component {

  constructor(props) {
    super(props)
    this.state = {
      athletes: [],
      group:    undefined,
      groups:   []
    }
  }



  async addAthlete(athlete) {
    this.setState({ athletes: uniqBy([...this.state.athletes, athlete], a => a.id) })
    const response = await commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation AthleteGroupingAddAthleteMutation($athlete: ID!, $group: ID!) {
          addAthleteToGroup(athlete: $athlete, group: $group) { 
            athletes { id }
          }
        }
      `,
      variables: { athlete: athlete.id, group: this.state.group.id }
    })
  }



  async removeAthlete(athlete) {
    this.setState({ athletes: [...this.state.athletes].filter(a => a.id != athlete.id) })
    return commitMutation(relayEnvironment, { 
      mutation: graphql`
        mutation AthleteGroupingRemoveAthleteMutation($athlete: ID!, $group: ID!) {
          removeAthleteFromGroup(athlete: $athlete, group: $group) {
            athletes { id }
          }
        }
      `,
      variables: { athlete: athlete.id, group: this.state.group.id }
    })
  }



  render(props) {
    const athleteIds = this.state.athletes ? this.state.athletes.map(athlete => athlete.id) : []


    return (
      <QueryRenderer 
        environment={relayEnvironment}
        query={athleteGroupingQuery}
        variables={{}}
        render={({ error, props }) => {
          if( error ) throw error
          if( !props ) return <div className="loader">Loading data...</div>

          const { athletes, groups } = props
          const groupIds = this.state.groups.map(group => group.id)
          const getGroup = id => (groupIds.includes(id) ? this.state.groups : groups).find(group => group.id == id)


          return (
            <div class="test">
              <Column width="320px">
                <ContentCell title="Groups" fill padding="0">
                  { groups.map(group => (
                    <ToggleItem 
                      key={group.id} 
                      onToggle={() => this.setState({ group: getGroup(group.id), athletes: group.athletes || [] })}
                      onUntoggle={() => this.setState({ group: undefined, athletes: [] })}
                      toggled={this.state.group && this.state.group.id == group.id}
                    >
                      {group.name}
                    </ToggleItem>
                  )) }
                </ContentCell>
              </Column>

              <Column width="320px">
                <ContentCell title="Athletes" fill padding="0">
                  { !!this.state.group && athletes.map(athlete => (
                    <ToggleItem 
                      key={athlete.id} 
                      onToggle={() => this.addAthlete(athlete)}
                      onUntoggle={() => this.removeAthlete(athlete)}
                      toggled={athleteIds.includes(athlete.id)}
                    >
                      {athlete.firstName} {athlete.lastName} ({athlete.age})
                    </ToggleItem>
                  )) }
                </ContentCell>
              </Column>

              <Column>

              </Column>
            </div>
          )
        }}
      />
    )
  }

}



export default AthleteGrouping
