export const NEXT_STEP = 'profile/NEXT_STEP'
export const PREV_STEP = 'profile/PREV_STEP'
export const SET_ANSWER = 'profile/SET_ANSWER'
export const SUBMIT_ANSWERS = 'profile/SUBMIT_ANSWERS'
export const SET_QUESTION_ID = 'profile/SET_QUESTION_ID'
export const SET_STATE = 'profile/SET_STATE'
export const SET_BRANCH_QUESTIONS = 'profile/SET_BRANCH_QUESTIONS'
export const SET_PATIENT_QUESTIONS = 'profile/SET_PATIENT_QUESTIONS'
//step 2..9


//TODO: implement middleware for handling api call
const set_step = page_number => ({
  type:NEXT_STEP,
  page:page_number
})

const set_state_with_step = (state, new_step) => ({
  type:SET_STATE,
  new_state:state,
  new_step:new_step
})

const set_patient_questions = (questions,type) => ({
  type:SET_PATIENT_QUESTIONS,
  questinos:questions,
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

export const move_next_step = () => (dispatch, getState) => {
  var page_number=1
  return dispatch(set_step(page_number))
}

export const update_patient_questions = (questions , bank_type)=> (dispatch, getState) => {
  return dispatch(set_patient_questions(questions, bank_type))
}

export const update_branch_questions = questions => (dispatch, getState) => {
  return dispatch(set_branch_questions(questions))

}
