import axios from 'axios'

export const SET_STEP = 'patient/SET_STEP'
export const RESET_STATE = 'RESET'
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

//step 2..9

export const SET_PATIENT = 'patient/SET_PATIENT'
export const SET_VISIT = 'patient/SET_VISIT'
export const SET_TREATMENT = 'patient/SET_TREATMENT'
export const SET_DOSAGE = 'patient/SET_DOSAGE'

const reset_state = () => ({
  type:RESET_STATE
})

//TODO: implement middleware for handling api call
const set_step = (step_num, is_complete) => ({
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

const set_patient_questions = (questions, bank_id, bank_name) => ({
  type:SET_PATIENT_QUESTIONS,
  questions:questions,
  total_step:questions.length,
  bank_id:bank_id,
  bank_name:bank_name
})

const set_question_banks = (questions_banks, bank_step=0) => ({
  type:SET_QUESTION_BANKS,
  question_banks:questions_banks,
  question_banks_step:bank_step
})

const set_question_banks_step = (question_banks_step) => ({
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

//TODO: sharing state can be updated by ohters and make side effects, so ,move to react part
export const move_next_step = (step_num) => (dispatch, getState) => {
  var is_complete = false
  var patient = getState().patient_reducer
  var length = patient.questions.length
  if (step_num + 1 >= length) {
    // we are done with the current question bank, move to the next one
    var banks_length = patient.question_banks.length
    if (patient.question_banks_step + 1 < banks_length) {
      return dispatch(set_current_question_bank_by_name(patient.question_banks[patient.question_banks_step + 1])).then (() => {
        return dispatch(set_question_banks_step(patient.question_banks_step + 1))
      })
    } else {
      // we are done! go to the CompletedPage
      return dispatch(update_patient_state('completed'));
    }
  }
	else {
    if (step_num+1 === length)
      is_complete=true
    return dispatch(set_step(step_num+1, is_complete))
  }
}

export const update_patient_question_banks = (bank_names, step) => (dispatch, getState) => {
  dispatch(set_question_banks(bank_names, step))
}

export const set_current_question_bank_by_name = (bank_name) => (dispatch, getState) => {
  var header = {'Content-Type': 'application/json'}
  return axios.get(`/api/question_banks/search?name=${bank_name}`)
    .then(function(resp){
      console.log("current bank:", bank_name, " ", resp.data)
      return dispatch(update_patient_questions(resp.data.id, bank_name))
    })
}

export const update_patient_questions = (bank_id, bank_name) => (dispatch, getState) => { 
  var header = {'Content-Type': 'application/json'}
  return axios.get(`/api/question_banks/${bank_id}/questions`)
    .then(function(resp){
      dispatch(set_patient_questions(resp.data, bank_id, bank_name))
    })
}

export const delete_patient_questions = () => (dispatch, getState) => {
	return dispatch(remove_patient_questions())
}

const  get_user_attr = (state) => {
  return  state.global_reducer.current_user.attributes
}

const make_headers = (user_attr) => {
  return {
    'Content-Type': 'application/json', 
    'access-token': user_attr['access-token'], 
    'client': user_attr.client, 
    'uid':user_attr.uid
  }
}

export const create_patient_from_user = () => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())
  var body = {user_id: user_attr.id}

  return axios.post(`/api/patients`, body, {headers: make_headers(user_attr)})
    .then(function(resp){
      // TODO: update global store with patient information
      dispatch(set_patient(resp.data))
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

export const create_payment = (full_name, token) => (dispatch, getState) => {
// export const create_payment = (full_name, card_number, exp_month, exp_year, cvc) => (dispatch, getState) => {

  return dispatch(get_current_patient_and_visit()).then((pv_resp) => {

      return dispatch(get_current_treatment_and_dosage()).then((td_resp) => {

        if (!td_resp.treatment || !td_resp.dosage) {
          return Promise.reject(new Error('Treatment and dosage are not selected yet'))
        } 

        var body = {
          full_name: full_name, token: token, treatment_id: td_resp.treatment.id, dosage_id: td_resp.dosage.id
        }
    
        return axios.post(`/api/patients/${pv_resp.patient.id}/visits/${pv_resp.visit.id}/payments`, body, {headers: make_headers(get_user_attr(getState()))})
      })
    })
}

export const create_visit = (line_id) => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())

  var patient = getState().patient_reducer.patient_object
  var body = {patient_id: patient.id, service_line_id: line_id}

  return axios.post(`/api/patients/${patient.id}/visits`, body, {headers: make_headers(user_attr)})
    .then(function(resp){
      // TODO: update global store with visit information
      return dispatch(set_visit(resp.data))
    })
}

export const get_patient_most_recent_visits = (patient) => (dispatch, getState) => {
  
  // the visit in app_state SHOULD BE the most recent visit
  var visit = getState().patient_reducer.visit_object
  if (visit) {
    return Promise.resolve([visit])
  }
  // TODO and NOTE: the first visit is always the most recent visit
  return dispatch(get_with_auth_and_return_just_data(`/api/patients/${patient.id}/visits`))
}

export const get_current_patient_and_visit = () => (dispatch, getState) => {
  // TODO! Get all this stuff from global state
  var patient = getState().patient_reducer.patient_object

  if (patient == null) {
    return Promise.resolve({patient: null, visit : null} )
  }

  return dispatch(get_patient_most_recent_visits(patient)).then((visits) => {
    return Promise.resolve({patient: patient, visit : visits[0]} )
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

export const answer_current_question = (answer) => (dispatch, getState) => {
  
  var user_attr = get_user_attr(getState())

  // get_current_patient_and_visit which will create new records if they are needed
  return dispatch(get_current_patient_and_visit()).then((resp) => {
    
    if (resp.patient == null || resp.visit == null) {
      // this answer does not need to be recorded...
      return Promise.resolve();
    }
  
    var patient_state = getState().patient_reducer
  
    var body = {
      ...answer,
      question_bank_id: patient_state.question_bank_id,
      question_id: patient_state.questions[patient_state.step].id,
      }
  
    return axios.post(`/api/patients/${resp.patient.id}/visits/${resp.visit.id}/answers`, body, {headers: make_headers(user_attr)})
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
    
      return axios.put(resp.data.object_url, file, option)
          .then(function(resp){
            return Promise.resolve()
          })
      })
}

export const sign_out = () => (dispatch, getState) => {
  return dispatch(reset_state())
}
