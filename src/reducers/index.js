import {combineReducers} from 'redux'
import * as actionTypes from '../actions/patient_action'
import merge from 'merge'

const initialState = {

  currentUser: {
      user_type: null,
      isLoading: false,
      isSignedIn: false,
      attributes: {
        id: null,
        uid: null,
        email: null,
        first_name: null,
        last_name: null
      },
    },

  // App state and data, temp setting for default as 'patient/profile'
  state: 'patient/profile/register',
  step: 0,
  questions:{},
  answers:{}
}

//define app state, question date, token..
const appState = (state = initialState, action) => {
  if(action.response && action.response.appState){
    return merge({}, state, action.response.appState)
  }
  return state
}


//TODO: use in ../actions
const NEXT_STEP = 'patient/NEXT_STEP'
const PREV_STEP = 'patient/PREV_STEP'
const SET_ANSWER = 'patient/SET_ANSWER'
const SUBMIT_ANSWERS = 'patient/SUBMIT_ANSWERS'
const SET_QUESTION_ID = 'patient/SET_QUESTION_ID'
const SET_USER = 'patient/SET_USER'
//TODO: move independent file ex) patient_reducer.js
const patient_reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.NEXT_STEP:
      return{
        ...state,
        step : state.step+1
      }
    case actionTypes.PREV_STEP:
      return{
        ...state,
        step : state.step-1
      }
    case actionTypes.SET_USER:
      console.log("set user: ", action.user_attr)
      return{
        ...state,
        state:'patient/profile/questions',
        step: 1,
        currrent_user: {
          ...state.current_user,
          user_type: 'patient',
          isLoading: true,
          isSignedIn: true,
          attributes : action.user_attr
        }
      }
    case actionTypes.SET_ANSWER:
      return{}
    //TODO: implement after api done
    case actionTypes.SUBMIT_ANSWERS:
      return{}
    case actionTypes.SET_QUESTION_ID:
      return{}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  patient_reducer,
  appState
})

export default rootReducer
