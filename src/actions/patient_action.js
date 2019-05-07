import axios from 'axios'

export const SET_STEP = 'patient/SET_STEP'
// these constants will not be used because answers will not be stored locally
// export const SET_ANSWER = 'profile/SET_ANSWER'
// export const SUBMIT_ANSWERS = 'profile/SUBMIT_ANSWERS'
// export const SET_QUESTION_ID = 'profile/SET_QUESTION_ID'
export const SET_STATE = 'patient/SET_STATE'
export const SET_BRANCH_QUESTIONS = 'patient/SET_BRANCH_QUESTIONS'
export const SET_PATIENT_QUESTIONS = 'patient/SET_PATIENT_QUESTIONS'
export const SET_BANK_TYPE = 'patient/SET_BANK_TYPE'
export const REMOVE_PATIENT_QUESTIONS = 'patient/REMOVE_PATIENT_QUESTIONS'

//step 2..9

export const SET_PATIENT = 'patient/SET_PATIENT'
export const SET_VISIT = 'patient/SET_VISIT'


//TODO: implement middleware for handling api call
const set_step = (step_num, is_complete) => ({
  type:SET_STEP,
	step:step_num,
	is_complete:is_complete
})

// https://redux.js.org/basics/actions#actions
// https://redux.js.org/basics/actions#action-creators

const set_state_with_step = (state, new_step) => ({
  type:SET_STATE,
  new_state:state,
  new_step:new_step
})

const set_patient_questions = (questions,type) => ({
  type:SET_PATIENT_QUESTIONS,
  questinos:questions,
  total_step:questions.length,
  bank_type:type
})

const set_branch_questions = (questions,type) => ({
  type:SET_BRANCH_QUESTIONS,
  questions:questions
})


const set_patient = (patient_object) => ({
  type:SET_PATIENT,
  patient_object: patient_object
})

const set_visit = (visit_object) => ({
  type:SET_VISIT,
  visit_object:visit_object
})

const set_bank_type = btype => ({
	type:SET_BANK_TYPE,
	bank_type: btype
})

const remove_patient_questions = () => ({
	type:REMOVE_PATIENT_QUESTIONS
})

export const set_profile_question = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/screening', 1))
}

export const move_patient_sign_in = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/sign_in', 0))
}

export const move_patient_sign_up = (state) => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/sign_up', 0))
}

export const move_next_step = (step_num) => (dispatch, getState) => {
	var is_complete = false
	if(step_num+1 === getState().patient_reducer.questions.length)
		is_complete=true
  return dispatch(set_step(step_num+1, is_complete))
}

export const update_patient_questions = (bank_id)=> (dispatch, getState) => {
  
  var header = {'Content-Type': 'application/json'}
    axios.get(`/api/question_banks/${bank_id}/questions`)
      .then(function(resp){
        console.log("resp: ", resp)
        dispatch(set_patient_questions(resp.data, bank_id))
      }).catch(function(err){
        console.log("err", err)
      })
}

export const delete_patient_questions = () => (dispatch, getState) => {
	return dispatch(remove_patient_questions())
}

export const update_branch_questions = questions => (dispatch, getState) => {
  return dispatch(set_branch_questions(questions))
}

const  get_user_attr = (getState) => {
  return  getState().global_reducer.current_user.attributes
}

const make_headers = (user_attr) => {
  return {'Content-Type': 'application/json', 
  'access-token': user_attr.token, 
  'client': user_attr.client, 
  'uid':user_attr.uid}
}

export const create_patient_from_user = () => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())
  var body = {user_id: user_attr.id}

  return axios.post(`/api/patients`, body, make_headers(user_attr))
    .then(function(resp){
      // TODO: update global store with patient information
      console.log("create_patient resp: ", resp)
      dispatch(set_patient(resp))
    })
}

export const create_visit = () => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())

  var patient = getState().patient_reducer.patient_object

  var body = {patient_id: patient.id}

  return axios.post(`/api/patients/${patient.id}/visits`, body, make_headers(user_attr))
    .then(function(resp){
      // TODO: update global store with visit information
      console.log("create_visit resp: ", resp)
      return dispatch(set_visit(resp.data))
    })
  }

export const update_bank_type = bank_type => (dispatch, getState) => {
	return dispatch(set_bank_type(bank_type))
}

export const answer_current_question = (answer) => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())

  // TODO! Get all this stuff from global state
  var patient = null; // TODO!!!
  var visit = null; // TODO!!!
  var bank_id = null; // TODO!!!

  var body = {vis: patient.id}

  return axios.get(`/api/patients/${patient.id}/visits/${visit.id}`, body, make_headers(user_attr))
    .then(function(resp){
      console.log("answer_current_question esp: ", resp)
      return dispatch(set_patient_questions(resp.data, bank_id))
    })
}
