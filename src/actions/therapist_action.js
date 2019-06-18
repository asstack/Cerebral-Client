import * as global_actions from './user_auth_action'
import { get_user_attr, make_headers } from './user_auth_action';
import axios from 'axios'

export const SET_THERAPIST = 'SET_THERAPIST'
export const SET_THERAPIST_STATE = 'SET_THERAPIST_STATE'
export const SET_QUESTIONS = "SET_QUESTIONS"
export const SET_REFER_ANSWERS = "SET_REFER_ANSWERS"
export const SET_REFER_INDEX = "SET_REFER_INDEX"
export const SET_REFER_PATIENTS = "SET_REFER_PATIENTS"
export const CLEAN_REFER_DATA = "CREAN_REFER_DATA"


const set_therapist_questions = data => ({
  type:SET_QUESTIONS,
  questions:data
})

const set_refer_answers = answers => ({
  type:SET_REFER_ANSWERS,
  ref_answers:answers
})

const set_refer_index = index => ({
  type:SET_REFER_INDEX,
  ref_index:index
})

const set_refer_patients = patients => ({
  type:SET_REFER_PATIENTS,
  ref_patients:patients
})


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
      var therapist = user_attr.therapist
      var body = {user_id: patient_user_info.id, answers: answers}
  
      return axios.post(`/api/therapists/${therapist.id}/patients`, body, {headers: make_headers(user_attr)})
      .then(function(resp){
          // TODO: update global store with patient information
          })
      })
}

export const create_therapist_from_user = () => (dispatch, getState) => {

    var user_attr = get_user_attr(getState())
    var body = {user_id: user_attr.id}

    return axios.post(`/api/therapists`, body, {headers: make_headers(user_attr)})
        .then(function(resp){
        dispatch(global_actions.set_therapist(resp.data))
        dispatch(set_therapist(resp.data))
        })
}

export const get_patients_for_therapist = () => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  var therapist = user_attr.therapist
  return axios.get(`/api/therapists/${therapist.id}/patients`, {headers: make_headers(user_attr)})

}

export const get_patient_details = (patient_id) => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  var therapist = user_attr.therapist
  return axios.get(`/api/therapists/${therapist.id}/patients/${patient_id}`, {headers: make_headers(user_attr)})
}

export const get_patient_info_questions = (bank_id) => (dispatch) => {
  return axios.get(`/api/question_banks/${bank_id}/questions`)
    .then(resp=>dispatch(set_therapist_questions(resp.data)))  
}

export const update_refer_answers = answers => (dispatch) => {
  return dispatch(set_refer_answers(answers))
}

export const update_refer_index = index => (dispatch) => {
  return dispatch(set_refer_index(index))
}

export const update_refer_patients = patients => (dispatch) => {
  return dispatch(set_refer_patients(patients))
}

export const clean_refer_data = () => dispatch => {
  return dispatch({type: CLEAN_REFER_DATA})
}


