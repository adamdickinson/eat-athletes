import { applyMiddleware, createStore, compose } from "redux"
import createSagaMiddleware from 'redux-saga'
import uniqBy from "lodash/uniqBy"
import sagas from "../sagas"



export const actions = {
  addParticipant: newParticipant => ({ type: "ADD_PARTICIPANT", newParticipant }),
  addParticipants: newParticipants => ({ type: "ADD_PARTICIPANTS", newParticipants }),
  clearParticipants: () => ({ type: "CLEAR_PARTICIPANTS" }),
  closeOverlays: () => ({ type: "CLOSE_OVERLAYS" }),
  downloadResults: () => ({ type: "DOWNLOAD_RESULTS" }),
  openOverlay: overlay => ({ type: "OPEN_OVERLAY", overlay }),
}



export const reducers = {

  ADD_PARTICIPANT: ({ participants, ...state }, { newParticipant }) => ({
    participants: uniqBy([...participants, newParticipant], "id"),
    ...state
  }),

  ADD_PARTICIPANTS: ({ participants, ...state }, { newParticipants }) => ({
    participants: uniqBy([...participants, ...newParticipants], "id"),
    ...state
  }),

  CLEAR_PARTICIPANTS: state => ({
    ...state,
    participants: []
  }),

  CLOSE_OVERLAYS: ({ overlay, ...state }) => state,

  OPEN_OVERLAY: (state, { overlay }) => ({
    ...state,
    overlay
  })

}



export const initial = {
  participants: []
}



const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  (state, action) => action && reducers[action.type] ? reducers[action.type](state, action) : state, 
  initial, 
  compose(
    applyMiddleware(sagaMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)


sagaMiddleware.run(sagas)



export default store
