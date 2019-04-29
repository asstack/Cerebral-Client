import {combineReducers} from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'


const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        email: null, // <-- Just an example. Attributes are whatever you specify in your cofig (below).
      },
    },
  },
  // All your other state
  state: null,
  questions:{}
}
/*
//define app state, question date, token..
const appState = (state = initialStateState, action) => {
  if(action.response && action.response.appState){
    return merge({}, state, action.response.appState)
  }
  return state
}*/

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,

  //appState
})

export default rootReducer
