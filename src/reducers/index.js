import {combineReducers} from 'redux'
import * as user_auth_types from '../actions/user_auth_action'
import * as patient_action_types from '../actions/patient_action'

import merge from 'merge'

const init_global_state = {

  current_user: {
    user_type: null,
    is_loading: false,
    is_signedIn: false,
    attributes: {
      id: null,
      uid: null,
      email: null,
      first_name: null,
      last_name: null
    },
  },
  state: 'patient',
}

const init_patient_state = {
  step:0,
  patient_state: 'profile/register',
  questions: '',
  answers: ''
}

//global state storage, it will have user account information and current global state
const global_reducer = (state = init_global_state, action) => {

  switch(action.type){
    case user_auth_types.SET_USER:
      return{
        ...state,
        global_state:'patient',
        current_user: {
          ...state.current_user,
          user_type: 'patient',
          is_loading: true,
          is_signedIn: true,
          attributes : action.user_attr
        }
      }
    default:
      return state
  }
}


//TODO: move independent file ex) patient_reducer.js
const patient_reducer = (state = init_patient_state, action) => {
  switch(action.type){
    case patient_action_types.NEXT_STEP:
      return{
        ...state,
        step : state.step+1
      }
    case patient_action_types.PREV_STEP:
      return{
        ...state,
        step : state.step-1
      }
    case patient_action_types.SET_STATE:
      return{
        ...state,
        step : action.new_step,
        patient_state : action.new_state
      }
    //TODO: implement after api done
    case patient_action_types.SUBMIT_ANSWERS:
      return{}
    case patient_action_types.SET_QUESTION_ID:
      return{}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  patient_reducer,
  global_reducer
})

export default rootReducer
