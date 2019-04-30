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

//step 2..9
function register_user(user_info){
  var resp = api_post_call(user_info, 'http://localhost:3000/api/auth/sign_in', 'application/json')
  //call dispatch
  //if okay than go NEXT_STEP
  //else error page
}

function sign_in(user_info){
  var resp = api_post_call(user_info, 'http://localhost:3000/api/users', 'application/json')
  //call dispatch and step+1
  //if okay than go NEXT_STEP
  //else error page
}

function user_validation(user_info){
  //api

}

function set_next_step(){
  //get current step and check if it is last step

}

function set_prv_step(){
  //get current step and check if it is first

}

function get_questions(){
  //api call to get questions

}

function set_questions(){
  //call get question

}

//Todo: mode api code to middleware dir
function api_post_call(data, url, type){
  var header = {'Content-Type': type}
  axios.post(url ,data, header)
    .then(function(resp){
      console.log("resp", resp)
      return resp
    }).catch(function(err){
      console.log("err", err)
      return err
    })
}

//add actions to createAction
export{
  register_user,
  sign_in,
  user_validation,
  set_next_step,
  set_prv_step
}
