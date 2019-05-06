import axios from 'axios'

export const SET_STEP = 'profile/SET_STEP'
// these constants will not be used because answers will not be stored locally
// export const SET_ANSWER = 'profile/SET_ANSWER'
// export const SUBMIT_ANSWERS = 'profile/SUBMIT_ANSWERS'
// export const SET_QUESTION_ID = 'profile/SET_QUESTION_ID'
export const SET_STATE = 'profile/SET_STATE'
export const SET_BRANCH_QUESTIONS = 'profile/SET_BRANCH_QUESTIONS'
export const SET_PATIENT_QUESTIONS = 'profile/SET_PATIENT_QUESTIONS'
//step 2..9


//TODO: implement middleware for handling api call
const set_step = step_num => ({
  type:SET_STEP,
  step:step_num
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
  return dispatch(set_step(step_num+1))
}

export const update_patient_questions = (bank_id)=> (dispatch, getState) => {
  
  var header = {'Content-Type': 'application/json'}
    axios.get(`/api/question_banks/${bank_id}/questions`)
      .then(function(resp){
        console.log("resp: ", resp)
        return dispatch(set_patient_questions(resp.data, bank_id))
      }).catch(function(err){
        console.log("err", err)
      })
}

export const update_branch_questions = questions => (dispatch, getState) => {
  return dispatch(set_branch_questions(questions))

}
