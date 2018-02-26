import client from "./services/apolloClient.js"
import { combineReducers } from "redux"



export default combineReducers({
  apollo: client.reducer()
})
