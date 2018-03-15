import AgilityTest from "../routes/AgilityTest"
import BeepTest from "../routes/BeepTest"
import BodyTest from "../routes/BodyTest"
import Header from './Header'
import Portfolio from '../routes/Portfolio'
import ShootingTest from "../routes/ShootingTest"
import Sidebar from './Sidebar'
import SpeedTest from "../routes/SpeedTest"
import relayEnvironment from "../config/relay"
import store from "../config/redux"
import { Provider } from "preact-redux"
import { Router } from 'preact-router'
import { graphql, QueryRenderer } from 'react-relay'
import { h, Component } from 'preact'



const BlankTest = () => null
const BallTest = BlankTest
const LeapTest = BlankTest



if( module.hot ) require('preact/debug')



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
                  ... on User {
                    __typename
                  }
                  ...Sidebar_profile
                }
              }
            `}
            variables={{}}
            render={({ error, props }) => {
              if( error ) throw error
              if( !props ) return <div className="loader">Loading data...</div>

              return (
                <div style={{ display: "flex", height: "100%" }}>
                  <Sidebar profile={props.currentUser} />
                  { props.currentUser.__typename == "Athlete" && (
                    <Router onChange={this.handleRoute}>
                      <Portfolio path="/" />
                    </Router>
                  ) }

                  { props.currentUser.__typename == "Coach" && (
                    <Router onChange={this.handleRoute}>
                      <BeepTest path="/test/beep" />
                      <SpeedTest path="/test/speed" />
                      <AgilityTest path="/test/agility" />
                      <BodyTest path="/test/body" />
                      <ShootingTest path="/test/shooting" />
                      <BallTest path="/test/ball" />
                      <LeapTest path="/test/leap" />
                    </Router>
                  ) }
                </div>
              )
            }}
          />
        </div>
      </Provider>
    )
  }

}



export default App
