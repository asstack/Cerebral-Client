import {combineReducers} from 'redux'
import * as app_types from '../actions'
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
  app_state: 'init',
}

const init_patient_state = {
  step:0,
  patient_type: '',
  patient_state: 'profile/register',
  question_bank_type: '',
  questions: '',
  branch_questions: '',
  branch_option:'',
  branch_step:'',
  answers: '',
  is_complete: false,
}

//global state storage, it will have user account information and current global state
const global_reducer = (state = init_global_state, action) => {

  switch(action.type){
    case user_auth_types.SET_USER:
      return{
        ...state,
        app_state:'patient',
        current_user: {
          ...state.current_user,
          user_type: 'patient',
          is_loading: true,
          is_signedIn: true,
          attributes : action.user_attr
        }
      }
      case app_types.SET_APP_STATE:
        return{
          ...state,
          app_state:action.new_app_state
        }
    default:
      return state
  }
}


//TODO: move independent file ex) patient_reducer.js
const patient_reducer = (state = init_patient_state, action) => {
  switch(action.type){
    case patient_action_types.SET_STEP:
      return{
        ...state,
        step : action.step
      }
    case patient_action_types.SET_STATE:
      return{
        ...state,
        step : action.new_step,
        patient_state : action.new_state
      }
    case patient_action_types.SET_PATIENT_QUESTIONS:
      return{
        ...state,
        question_bank_type : action.bank_type,
        questions : action.questinos
      }
    case patient_action_types.SET_BRANCH_QUESTIONS:
      return{
        ...state,
        questions : action.questions
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
