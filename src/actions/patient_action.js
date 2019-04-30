export const NEXT_STEP = 'patient/NEXT_STEP'
export const PREV_STEP = 'patient/PREV_STEP'
export const SET_ANSWER = 'patient/SET_ANSWER'
export const SUBMIT_ANSWERS = 'patient/SUBMIT_ANSWERS'
export const SET_QUESTION_ID = 'patient/SET_QUESTION_ID'


//step 2..9


//TODO: implement middleware for handling api call
const set_step = page_number => ({
  type:NEXT_STEP,
  page:page_number
})

export const next_step = () => (dispatch, getState) => {
  var page_number=1
  return dispatch(set_step(page_number))
}
