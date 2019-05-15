import {combineReducers} from 'redux'
import { handleActions } from 'redux-actions'
import * as app_types from '../actions'
import * as user_auth_types from '../actions/user_auth_action'
import * as patient_action_types from '../actions/patient_action'


// https://redux.js.org/basics/reducers#designing-the-state-shape
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
      last_name: null,
      token: null,
      client: null
    },
  },
  app_state: '',
}

const init_patient_state = {
  
  patient_type: '',
  patient_state: '',

  // all of the question_banks for the current user
  question_banks: [],
  // which question bank the user is currently looking at 
  question_banks_step: 0,
  
  // equal to questions_banks[question_bank_step].id
  question_bank_id: '',

  // question bank name that for current questions
  current_bank_name:'',

  // questions from current question_bank_id
  questions: '',
  step:0,
  total_step:1,
  
  // NOTE: answers are never stored locally
  // answers: '',
  is_complete: false,
  // contains a copy of patient/visit information from the database
  patient_object: null,
  visit_object: null,
	is_valid_state: false
}

//global state storage, it will have user account information and current global state
// https://redux.js.org/basics/reducers#handling-actions
const global_reducer = handleActions({

  [user_auth_types.SET_USER]:(state, action) => {
    return {
      // https://redux.js.org/recipes/using-object-spread-operator
      ...state,
      // TODO: don't assume that user is patient... they may be a therapist
      // probably don't want to change app_state here at all
      app_state:'patient',
      current_user: {
        ...state.current_user,
        user_type: 'patient',
        is_loading: true,
        is_signedIn: true,
        attributes : action.user_attr
      }
    }
  },
  [app_types.SET_APP_STATE]: (state, action) => {
    return{
      ...state,
      app_state:action.new_app_state
    }
  }
}, init_global_state)


//TODO: move independent file ex) patient_reducer.js

const patient_reducer = handleActions({
  [patient_action_types.SET_STEP]: (state, action) => {
    return{
      ...state,
      step : action.step,
      is_complete: action.is_complete
    }
  },
  [patient_action_types.SET_PATIENT]: (state, action) => {
    return{
      ...state,
      patient_object: action.patient_object
    }
  },
  [patient_action_types.SET_VISIT]: (state, action) => {
    return{
      ...state,
      visit_object: action.visit_object
    } 
  },
  [patient_action_types.SET_STATE_WITH_STEP]:(state, action) => {
    return{
      ...state,
      step : action.new_step,
      patient_state : action.new_state
    }
  },
  [patient_action_types.SET_PATIENT_QUESTIONS]:(state, action) => {
    return{
      ...state,
      step:0,
      question_bank_id : action.bank_id,
      current_bank_name : action.bank_name,
      questions : action.questions,
      total_step : action.total_step
    }
  },
  [patient_action_types.SET_QUESTION_BANKS]: (state, action) => {
    return{
      ...state,
      question_banks : action.question_banks,
      question_banks_step : action.question_banks_step 
    }
  },
  [patient_action_types.SET_QUESTION_BANKS_STEP]: (state, action) => {
    return{
      ...state,
      question_banks_step : action.question_banks_step
    }
  },
	[patient_action_types.SET_PATIENT_TYPE]: (state, action) => {
    return{
      ...state,
      patient_type : action.patient_type
    }
  },
  [patient_action_types.REMOVE_PATIENT_QUESTIONS]: (state, action) => {
    return{
      ...state,
      questions: null,
      total_step:1,
      step: 0
    }
  },
  [patient_action_types.REMOVE_PATIENT_QUESTION_BANKS]: (state, action) => {
    return{
      ...state,
      question_banks: []
    }
  },
  [patient_action_types.SET_PATIENT_STATE]:(state, action) => {
    return{
      ...state,
      patient_state:action.patient_state
    }
  },
}, init_patient_state)

const rootReducer = combineReducers({
  patient_reducer,
  global_reducer
})

export default rootReducer
