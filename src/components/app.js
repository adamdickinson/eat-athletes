import ApolloClient from "apollo-boost"
import Header from './header'
import Sidebar from './sidebar'
import Portfolio from '../routes/portfolio'
import Profile from '../routes/profile'
import { ApolloProvider, Query } from "react-apollo"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { Router } from 'preact-router'
import { h, Component } from 'preact'



const client = new ApolloClient({ 
  uri: "https://mj3p040wn9.lp.gql.zone/graphql",
  link: new HttpLink({ uri: "https://mj3p040wn9.lp.gql.zone/graphql" }),
  cache: new InMemoryCache()
})


if( module.hot ) require('preact/debug')



export default () => (
  <ApolloProvider client={client}>
    <div id="app">
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Router onChange={this.handleRoute}>
          <Portfolio path="/" />
        </Router>
      </div>
    </div>
  </ApolloProvider>
)
