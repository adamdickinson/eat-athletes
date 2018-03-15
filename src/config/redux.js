import { createStore } from "redux"
import uniqBy from "lodash/uniqBy"



export const actions = {
  addParticipant: newParticipant => ({ type: "ADD_PARTICIPANT", newParticipant }),
  addParticipants: newParticipants => ({ type: "ADD_PARTICIPANTS", newParticipants }),
  clearParticipants: () => ({ type: "CLEAR_PARTICIPANTS" }),
}



export const reducers = {

  ADD_PARTICIPANT: ({ participants, ...state }, { newParticipant }) => ({
    participants: uniqBy([...participants, newParticipant], "_id"),
    ...state
  }),

  ADD_PARTICIPANTS: ({ participants, ...state }, { newParticipants }) => ({
    participants: uniqBy([...participants, ...newParticipants], "_id"),
    ...state
  }),

  CLEAR_PARTICIPANTS: state => ({
    ...state,
    participants: []
  })

}



export const initial = {
  participants: []
}



export const store = createStore((state, action) => action && reducers[action.type] ? reducers[action.type](state, action) : state, initial, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )



export default store
