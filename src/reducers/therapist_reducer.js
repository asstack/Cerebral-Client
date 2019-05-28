import * as therapist_action_types from '../actions/therapist_action'
import { handleActions } from 'redux-actions'

export const init_therapist_state = {
  
  therapist_state: '',
  therapist_object: null
}

export const therapist_reducer = handleActions({

  [patient_action_types.SET_THERAPIST]: (state, action) => {
    return{
      ...state,
      therapist_object: action.therapist_object
    }
  }
}, init_therapist_state)


