import * as therapist_action_types from '../actions/therapist_action'
import { handleActions } from 'redux-actions'

export const init_therapist_state = {
  
  therapist_state: '',
  therapist_object: null,
  questions:null,
  ref_patients:null,
  ref_index:null,
  ref_answers:null
}

export const therapist_reducer = handleActions({

  [therapist_action_types.SET_THERAPIST]: (state, action) => {
    return{
      ...state,
      therapist_object: action.therapist_object
    }
  },
  [therapist_action_types.SET_THERAPIST_STATE]: (state, action) => {
    return{
      ...state,
      therapist_state:action.state
    } 
  },
  [therapist_action_types.SET_QUESTIONS] : (state, action) => {
    return{
      ...state,
      questions:action.questions
    }
  },
  [therapist_action_types.SET_REFER_ANSWERS] : (state, action) => {
    return{
      ...state,
      ref_answers:action.ref_answers
    }
  },
  [therapist_action_types.SET_REFER_INDEX] : (state, action) => {
    return{
      ...state,
      ref_index:action.ref_index
    }
  },
  [therapist_action_types.SET_REFER_PATIENTS] : (state, action) => {
    return{
      ...state,
      ref_patients:action.ref_patients,
      ref_index:0
    }
  },
  [therapist_action_types.CLEAN_REFER_DATA] : (state, action) => {
    return{
      ...state,
      ref_patients:null,
      ref_answers:null,
      ref_index:null
    }
  },

}, init_therapist_state)


