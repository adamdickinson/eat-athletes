import AthleteGrouping from "../containers/AthleteGrouping"
import Header from "./Header"
import Overlays from "../containers/Overlays"
import Sidebar from "./Sidebar"
import Test from "../containers/Test"
import relayEnvironment from "../config/relay"
import store from "../config/redux"
import uniqBy from "lodash/uniqBy"
import { Component } from "preact"
import { Provider } from "preact-redux"
import { Router } from "preact-router"
import { graphql, QueryRenderer } from "react-relay"


if( module.hot ) require("preact/debug")



export class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Header />
          <QueryRenderer 
            environment={relayEnvironment}
            query={graphql`
              query AppQuery {
                currentUser {
                  __typename
                  ...Sidebar_profile
                }

                tests {
                  id
                  name
                  variation
                  specs {
                    id
                    name
                    metric
                  }
                  limit {
                    metric
                    value
                  }
                  resultType
                  groupTest
                  ...Sidebar_tests
                }
              }
            `}
            variables={{}}
            render={({ error, props }) => {
              if( error ) throw error
              if( !props ) return <div className="loader">Loading data...</div>

              return (
                <div style={{ display: "flex", height: "100%" }}>
                  <Sidebar profile={props.currentUser} tests={props.tests} />
                  { props.currentUser.__typename == "Coach" && (
                    <Router onChange={this.handleRoute}>
                      { props.tests.map(test => (
                        <Test 
                          key={test.id} 
                          path={`/test/${test.id.split(":", 2)[1]}`} 
                          {...test} 
                        />
                      ) ) }
                      <AthleteGrouping path="/groups" />
                    </Router>
                  ) }
                </div>
              )
            }}
          />
          <Overlays />
        </div>
      </Provider>
    )
  }

}



export default App
