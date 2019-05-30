import * as global_actions from './user_auth_action'
import { register_user, get_user_attr, make_headers } from './user_auth_action';
import axios from 'axios'

export const SET_THERAPIST = 'SET_THERAPIST'
export const SET_THERAPIST_STATE = 'SET_THERAPIST_STATE'
export const SET_QUESTIONS = "SET_QUESTIONS"

export const set_therapist = (therapist_object) => ({
    type:SET_THERAPIST,
    therapist_object: therapist_object
  })

export const set_therapist_state = state =>({
  type:SET_THERAPIST_STATE,
  state: state
})

export const update_therapist_state = state => (dispatch) => {
  return dispatch(set_therapist_state(state))
}

//TODO: update to use api middleware
export const refer_patient = (patient_info, answers) => (dispatch, getState) => {

  // create a user for the patient first
  // TODO: what happens if the user already exists here?
  
  
  return dispatch(global_actions.register_user(patient_info)).then ((patient_user_info) => {

      var user_attr = get_user_attr(getState())
      var therapist = getState().therapist_reducer.therapist_object

      var body = {user_id: patient_user_info.id, answers: answers}
  
      return axios.post(`/api/therapists/${therapist.id}/patients`, body, {headers: make_headers(user_attr)})
      .then(function(resp){
          // TODO: update global store with patient information
          //dispatch(set_patient(resp.data))
          })
      })
}

export const create_therapist_from_user = () => (dispatch, getState) => {

    var user_attr = get_user_attr(getState())
    var body = {user_id: user_attr.id}

    return axios.post(`/api/therapists`, body, {headers: make_headers(user_attr)})
        .then(function(resp){
        // TODO: update global store with patient information
        dispatch(set_therapist(resp.data))
        })
}




const set_therapist_questions = data => ({
  type:SET_QUESTIONS,
  questions:data
})

export const get_patient_info_questions = (bank_id) => (dispatch) => {
  return axios.get(`/api/question_banks/${bank_id}/questions`)
    .then(resp=>dispatch(set_therapist_questions(resp.data)))  
}

