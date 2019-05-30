import * as therapist_action_types from '../actions/therapist_action'
import { handleActions } from 'redux-actions'

export const init_therapist_state = {
  
  therapist_state: '',
  therapist_object: null,
  questions:null
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
    console.log("actions: ", action)
    return{
      ...state,
      questions:action.questions
    }
  }
}, init_therapist_state)


