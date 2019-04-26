import {combineReducers} from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'

//define app state repos token..
const store = (state = {user:{}, questions: {}}, action) => {
  if(action.response && action.response.appState){
    return merge({}, state, action.response.appState)
  }
  return state
}


const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  store
})

export default rootReducer
