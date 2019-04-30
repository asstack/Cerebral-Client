export const NEXT_STEP = 'profile/NEXT_STEP'
export const PREV_STEP = 'profile/PREV_STEP'
export const SET_ANSWER = 'profile/SET_ANSWER'
export const SUBMIT_ANSWERS = 'profile/SUBMIT_ANSWERS'
export const SET_QUESTION_ID = 'profile/SET_QUESTION_ID'
export const SET_STATE = 'profile/SET_STATE'

//step 2..9


//TODO: implement middleware for handling api call
const set_step = page_number => ({
  type:NEXT_STEP,
  page:page_number
})

const set_state_with_step = (state, step_step) => ({
  type:SET_STATE,
  new_state:state,
  new_step:step_step
})

export const set_profile_question = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/questions', 1))
}

export const move_patient_sign_in = () => (dispatch, getState) => {
  return dispatch(set_state_with_step('profile/sign_in', 0))
}

export const move_next_step = () => (dispatch, getState) => {
  var page_number=1
  return dispatch(set_step(page_number))
}
