import axios from 'axios'
//define action types
//setuser, setNextStep etc
//will update question_id

//step 1 :signin and register
export const NEXT_STEP = 'patient/NEXT_STEP'
export const PREV_STEP = 'patient/PREV_STEP'
export const SIGN_IN = 'patient/SIGN_IN'
export const REGISTER = 'patient/REGISTER'
export const SET_ANSWER = 'patient/SET_ANSWER'
export const SUBMIT_ANSWERS = 'patient/SUBMIT_ANSWERS'
export const SET_QUESTION_ID = 'patient/SET_QUESTION_ID'
export const SET_USER = 'patient/SET_USER'
export const USER_SUCCESS = 'patient/USER_SUCCESS'
export const USER_FAILURE = 'patient/USER_FAILURE'

//step 2..9



//TODO: implement middleware for handling api call
const set_user = user_info => ({
  type:SET_USER,
  user_attr:user_info
})

export const sign_in = user_info => (dispatch, getState) => {
  console.log("user info:", user_info)
  return dispatch(set_user(user_info))
}

export const register_user = user_info => (dispatch, getState)=>{
  return dispatch(set_user(user_info))
}
