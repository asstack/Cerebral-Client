import axios from 'axios'
import {api_call} from '../middle/api'
import * as global_actions from './user_auth_action'
import { get_user_attr, make_headers } from './user_auth_action';

export const SET_STEP = 'patient/SET_STEP'
export const RESET_STATE = 'RESET'
export const RESET_QUESTIONS_AND_VISIT = 'patient/iRESET_QUESTIONS_AND_VISIT'
// these constants will not be used because answers will not be stored locally
// export const SET_ANSWER = 'profile/SET_ANSWER'
// export const SUBMIT_ANSWERS = 'profile/SUBMIT_ANSWERS'
// export const SET_QUESTION_ID = 'profile/SET_QUESTION_ID'
export const SET_PATIENT_STATE = 'patient/SET_STATE'
export const SET_STATE_WITH_STEP = 'patient/SET_STATE_WITH_STEP' 
export const SET_QUESTION_BANKS = 'patient/SET_QUESTION_BANKS'
export const SET_QUESTION_BANKS_STEP = 'patient/SET_QUESTION_BANKS_STEP'
export const SET_PATIENT_QUESTIONS = 'patient/SET_PATIENT_QUESTIONS'
export const SET_SERVICE_LINE = 'patient/SET_SERVICE_LINE'
export const REMOVE_PATIENT_QUESTIONS = 'patient/REMOVE_PATIENT_QUESTIONS'
export const REMOVE_PATIENT_QUESTION_BANKS = 'patient/REMOVE_PATIENT_QUESTION_BANKS'
export const SET_BRANCH_QUESTION = 'patient/SET_BRANCH_QUESTION'
export const SET_BRANCH_QUESTION_STEP ='patient/SET_BRANCH_QUESTION_STEP'
export const SET_BRANCH_QUESTION_ACTIVE = 'patient/SET_BRANCH_QUESTION_ACTIVE'
//step 2..9

export const SET_PATIENT = 'patient/SET_PATIENT'
export const SET_VISIT = 'patient/SET_VISIT'
export const SET_TREATMENT = 'patient/SET_TREATMENT'
export const SET_DOSAGE = 'patient/SET_DOSAGE'


const reset_state = () => ({
  type:RESET_STATE
})

const cleanup_questions_and_visit = () => ({
  type:RESET_QUESTIONS_AND_VISIT
})

//TODO: implement middleware for handling api call
export const set_step = (step_num, is_complete) => ({
  type:SET_STEP,
	step:step_num,
	is_complete:is_complete
})

// https://redux.js.org/basics/actions#actions
// https://redux.js.org/basics/actions#action-creators

const set_state_with_step = (state, new_step) => ({
  type:SET_STATE_WITH_STEP,
  new_state:state,
  new_step:new_step
})

const set_patient_questions = (questions, bank_id, bank_name, q_id, bank_step) => ({
  type:SET_PATIENT_QUESTIONS,
  questions:questions,
  total_step:questions.length,
  bank_id:bank_id,
  bank_name:bank_name,
  q_id:q_id,
  bank_step:bank_step
})

const set_question_banks = (question_bank_objects, questions_banks, bank_step=0) => ({
  type:SET_QUESTION_BANKS,
  question_bank_objects: question_bank_objects,
  question_banks:questions_banks,
  question_banks_step:bank_step
})

const set_branch_question=(data, bank_name)=>({
  type:SET_BRANCH_QUESTION,
  questions:data,
  bank_name:bank_name
})

export const set_question_banks_step = (question_banks_step) => ({
  type:SET_QUESTION_BANKS_STEP,
  question_banks_step:question_banks_step
})

export const set_patient = (patient_object) => ({
  type:SET_PATIENT,
  patient_object: patient_object
})

export const set_visit = (visit_object) => ({
  type:SET_VISIT,
  visit_object:visit_object
})

export const set_treatment = (treatment_object) => ({
  type:SET_TREATMENT,
  treatment_object:treatment_object
})

export const set_dosage = (dosage_object) => ({
  type:SET_DOSAGE,
  dosage_object:dosage_object
})

const remove_patient_questions = () => ({
	type:REMOVE_PATIENT_QUESTIONS
})

const remove_patient_question_banks = () => ({
	type:REMOVE_PATIENT_QUESTION_BANKS
})

const set_patient_state = pstate => ({
  type:SET_PATIENT_STATE,
  patient_state: pstate
})

const set_service_line = ptype => ({
	type:SET_SERVICE_LINE,
	service_line: ptype
})

export const update_service_line = name => (dispatch, getState) => {
  return axios.get(`/api/service_lines/search?name=${name}`, {headers: make_headers(get_user_attr(getState()))})
    .then(function(resp){
      // TODO: update global store with patient information
      return dispatch(set_service_line(resp.data))
    })
}  

export const set_profile_question = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/screening', 1))
}

export const move_patient_sign_in = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/sign_in', 0))
}

export const move_patient_sign_up = (state) => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/sign_up', 0))
}

export const update_patient_question_banks = (bank_names, step) => (dispatch, getState) => {

  return axios.get(`/api/question_banks`)
    .then(function(resp){

      // TODO: right now we are fetching and saving all of the question banks information because
      // it's just as easy to get all of it
      // dispatch(set_question_bank_objects(resp.data))
      dispatch(set_question_banks(resp.data, bank_names, step))
      return Promise.resolve()
    })
}

export const set_current_question_bank_by_name = (bank_name, flag=false, bank_step=0, skip=0) => (dispatch, getState) => {
  return axios.get(`/api/question_banks/search?name=${bank_name}`)
    .then(function(resp){
      return dispatch(update_patient_questions(resp.data.id, bank_name, flag, bank_step, skip))
    })
}

export const update_patient_questions = (bank_id, bank_name, flag=false, bank_step=0, skip=0) => (dispatch, getState) => { 
  return axios.get(`/api/question_banks/${bank_id}/questions`)
    .then(function(resp){
      let idx=flag?resp.data.length-1:0;
      dispatch(set_patient_questions(resp.data, bank_id, bank_name, idx+skip, bank_step)) 
      return resp
    })
}

export const get_branch_questions = (bank_name) => (dispatch, getState)  => {
  return axios.get(`/api/question_banks/search?name=${bank_name}`).then(resp=>{
    return axios.get(`/api/question_banks/${resp.data.id}/questions`).then(resp=>{
      dispatch(set_branch_question(resp.data, bank_name))
      return resp
    })
  })
}

export const delete_patient_questions = () => (dispatch, getState) => {
	return dispatch(remove_patient_questions())
}

export const create_patient_from_user = () => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())
  var body = {user_id: user_attr.id}

  return axios.post(`/api/patients`, body, {headers: make_headers(user_attr)})
    .then(function(resp){
      // TODO: update global store with patient information
      dispatch(set_patient(resp.data))
      dispatch(global_actions.set_patient(resp.data))
    })
}

export const get_side_effects = (service_line_id) => (dispatch, getState) => {
  return dispatch(get_with_auth_and_return_just_data(`/api/service_lines/${service_line_id}/side_effects`))
}

export const get_treatments = (service_line_id) => (dispatch, getState) => {
  return dispatch(get_with_auth_and_return_just_data(`/api/service_lines/${service_line_id}/treatments`))
}

export const get_treatment_dosages = (treatment_id) => (dispatch, getState) => {
  return dispatch(get_with_auth_and_return_just_data(`/api/treatments/${treatment_id}/dosages`))
}

export const get_treatment_by_name = (treatment_name) => (dispatch, getState) => {
  return dispatch(get_with_auth_and_return_just_data(`/api/treatments/search?name=${treatment_name}`))
}

export const get_patient_payments = () => (dispatch, getState) => {
  var patient = dispatch(get_current_patient())

  return dispatch(get_with_auth_and_return_just_data(`/api/patients/${patient.id}/payments`))
}

export const get_patient_shipping_address = () => (dispatch, getState) => {
  var patient = dispatch(get_current_patient())

  return dispatch(get_with_auth_and_return_just_data(`/api/patients/${patient.id}/shipping_addresses`))
}

export const update_patient_shipping_address = (addr) => (dispatch, getState)=>{
  let user_attr = get_user_attr(getState())
  var patient = dispatch(get_current_patient())
  return axios.post(`/api/patients/${patient.id}/shipping_addresses`,addr,{headers:make_headers(user_attr)}) 
}

export const create_payment = (full_name, token) => (dispatch, getState) => {
// export const create_payment = (full_name, card_number, exp_month, exp_year, cvc) => (dispatch, getState) => {

  return dispatch(get_current_patient_and_visit()).then((pv_resp) => {

      return dispatch(get_current_treatment_and_dosage()).then((td_resp) => {

        /*
        if (!td_resp.treatment || !td_resp.dosage) {
          return Promise.reject(new Error('Treatment and dosage are not selected yet'))
        } 
        */

        //TODO: I manually added dosage id for no preference, since we skip the dosage selection for no preference. We may automatically check it in the backend
        var body = {
          full_name: full_name,
          token: token,
          treatment_id: td_resp.treatment.id,
          dosage_id: td_resp.dosage?td_resp.dosage.id:13,
          visit_id: pv_resp.visit.id
        }
    
        return axios.post(`/api/patients/${pv_resp.patient.id}/payments`, body, {headers: make_headers(get_user_attr(getState()))})
      })
    })
}

export const create_visit = (service_line_name) => (dispatch, getState) => {
  
  let user_attr = get_user_attr(getState())

  let patient = dispatch(get_current_patient())

  //TODO: update backend to pass service line name and they will get the id of service line
  let line_id = service_line_name==="ins"?2:1;
  let body = {patient_id: patient.id, service_line_id: line_id}
  return axios.post(`/api/patients/${patient.id}/visits`, body, {headers: make_headers(user_attr)})
    .then(function(resp){
      dispatch(set_visit(resp.data))
      return Promise.resolve(resp.data)
    })
}

export const ensure_visit = (force) => (dispatch, getState) => {
  
  var visit = getState().patient_reducer.visit_object
  var service_line = getState().patient_reducer.service_line

  // TODO: wecould also check to make sure the visit is not expired
  if (visit && !visit.complete && service_line.id === visit.service_line.id) {
    return Promise.resolve(visit)
  }
  // NOTE: the server will take care of creating a new visit or giving us back an existing visit if needed
  return dispatch(create_visit(service_line.name)).then((new_visit) => {
    dispatch(set_visit(new_visit))
    return Promise.resolve(new_visit)
  })
}

export const get_current_patient = ()  => (dispatch, getState) => {
  var patient = getState().patient_reducer.patient_object
  
  // TODO: why is this necessary? the patient object should be set after register or login
  if (!patient) {
    patient = getState().global_reducer.current_user.attributes.patient
  }
  return patient
}

export const get_current_patient_and_visit = () => (dispatch, getState) => {
  
  var patient = dispatch(get_current_patient())

  // TODO: if there is not patient in current state, we could get the patient object using user_id

  if (patient == null) {
    return Promise.resolve({patient: null, visit : null} )
  }

  var service_line = getState().patient_reducer.service_line

  return dispatch(ensure_visit(false, service_line)).then((visit) => {
    return Promise.resolve({patient: patient, visit : visit} )
  })
}

export const get_current_treatment_and_dosage = () => (dispatch, getState) => {
  // TODO: get treatment and dosage from current answers if needed
  return Promise.resolve({treatment: getState().patient_reducer.treatment_object, dosage : getState().patient_reducer.dosage_object} )
}

// makes an authenticated GET call to the server and unwraps the response nicely
export const get_with_auth_and_return_just_data = (url) => (dispatch, getState) => {
  return axios.get(url, {headers: make_headers(get_user_attr(getState()))})
  .then((resp) => {
    return Promise.resolve(resp.data)
  })
}

// given a question name, get the answer for that question in the *current* visit
export const get_current_answer_by_name = (name) => (dispatch, getState) => {
  return dispatch(get_current_patient_and_visit()).then((resp) => {
    return dispatch(get_with_auth_and_return_just_data(`/api/patients/${resp.patient.id}/visits/${resp.visit.id}/answers/search?question[name]=${name}`))
  })
}

export const complete_current_visit = () => (dispatch, getState) => {
  return dispatch(get_current_patient_and_visit()).then((resp) => {
    var user_attr = get_user_attr(getState())
    return dispatch(api_call('PUT', `/api/patients/${resp.patient.id}/visits/${resp.visit.id}/complete`, {headers: make_headers(user_attr)}, {complete: true})).then((new_visit) => {
      //dispatch(set_visit(new_visit))
      return Promise.resolve(new_visit)
    })
  })
}

export const answer_current_question = (answer, question=null) => (dispatch, getState) => {

  var user_attr = get_user_attr(getState())

  var patient_state = getState().patient_reducer

  var current_question = question?question:patient_state.questions[patient_state.step]

  // this answer does not need to be recorded because we have been explicitly told not to do so 
  if (current_question == null || !current_question.save_answer) return Promise.resolve();

  // get_current_patient_and_visit which will create new records if they are needed
  return dispatch(get_current_patient_and_visit()).then((resp) => {
    
    if (resp.patient == null || resp.visit == null) {
      // this answer does not need to be recorded because there is no current patient or visit
      return Promise.resolve();
    }
  
    var body = {
      ...answer,
      question_bank_id: patient_state.question_bank_id,
      question_id: current_question.id,
      }
  
    return dispatch(api_call('POST', `/api/patients/${resp.patient.id}/visits/${resp.visit.id}/answers`, {headers: make_headers(user_attr)}, body))
    // return axios.post(`/api/patients/${resp.patient.id}/visits/${resp.visit.id}/answers`, body, {headers: make_headers(user_attr)})
  })

}

export const update_patient_state = state => (dispatch, getState) => {
  return dispatch(set_patient_state(state))
}

export const upload_object_for_current_question = (file, file_type) => (dispatch, getState) => {

  return dispatch(answer_current_question({upload: true, file_type: file_type})).then((resp) => {

    var option = {headers:
                  {'ContentEncoding': 'base64', 
                  'Content-Type': file_type}}
    
      return axios.put(resp.object_url, file, option)
          .then(function(resp){
            return Promise.resolve()
          })
      })
}

export const get_answers_for_visit = (patient_id, visit_id) => (dispatch, getState) => {
  let user_attr = get_user_attr(getState())
  return axios.get(`/api/patients/${patient_id}/visits/${visit_id}/answers`, {headers:make_headers(user_attr)}) 
}

export const is_valid_visit = (patient_id, visit_id) => (dispatch, getState) => {
  let user_attr = get_user_attr(getState())
  return axios.get(`/api/patients/${patient_id}/visits/${visit_id}`, {headers:make_headers(user_attr)}) 
}

export const get_visits_for_patient = (patient_id) => (dispatch, getState) => {
  let user_attr = get_user_attr(getState())
  return axios.get(`/api/patients/${patient_id}/visits`, {headers:make_headers(user_attr)}) 
}

export const get_payment_info = (patient_id) => (dispatch, getState) => {
  let user_attr = get_user_attr(getState())
  return axios.get(`/api/patients/${patient_id}/payments`, {headers:make_headers(user_attr)}) 

}

export const update_payment_info = (full_name, token, patient_id)=> (dispatch, getState) => {
  let body = {full_name:full_name, token:token}
  let user_attr = get_user_attr(getState())
  return axios.post(`/api/patients/${patient_id}/payment_methods/`, body, {headers: make_headers(get_user_attr(getState()))})
}
///clients?status=activated
export const validate_referral_code = (patient_id, code)=> (dispatch, getState) => {
  let user_attr = get_user_attr(getState())
  return axios.get(`/api/patients/${patient_id}/referral_codes?referral_code=${code}`, {headers: make_headers(get_user_attr(getState()))})
}

export const clean_up_patient_process = () => (dispatch) => {
  return dispatch(cleanup_questions_and_visit())
}

export const sign_out = () => (dispatch, getState) => {
  return dispatch(reset_state())
}

export const set_b_question_step = (step) => (dispatch, getState)=>{
  return dispatch({type:SET_BRANCH_QUESTION_STEP, step:step})
}

export const set_b_question_active = (is_active) => (dispatch, getState)=>{
  return dispatch({type:SET_BRANCH_QUESTION_ACTIVE, is_active:is_active})
}
