import axios from 'axios'


export const RESET_STATE = 'RESET'
export const SIGN_IN = 'SIGN_IN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const REGISTER = 'REGISTER'
export const SET_USER = "SET_USER"
export const SET_QUESTIONS = "SET_QUESTIONS"
export const SET_PATIENT = "SET_USER_PATIENT"
export const SET_THERAPIST = "SET_USER_THERAPIST"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO" 

//const proxy = require('http-proxy-middleware');

// set_user will update global state with information corresponding to the User object in the database
const set_user = user_info => ({
  type:SET_USER,
  user_attr:user_info
})

const update_user_info = user_info=> ({
  type:UPDATE_USER_INFO,
  user_info:{first_name:user_info.first_name, last_name:user_info.last_name, email:user_info.email}
})

export const remove_token = () => ({
  type:REMOVE_TOKEN
})

export const reset_password = (email, redirect_url) => (dispatch, getState) =>  {

  // sign in API call here
  var headers = {'Content-Type': 'application/json'}
  return axios.post("/api/auth/password" ,{email:email, redirect_url:redirect_url}, {headers: headers})
}

export const change_password = (token, password, password_confirmation, redirect_url_base) => (dispatch, getState) =>  {

  var headers = {'Content-Type': 'application/json'}

  return axios.get(`/api/auth/password/edit?reset_password_token=${token}&redirect_url=${redirect_url_base}/api/auth/validate_token`, {headers: headers}).then((resp) => {
    console.info(resp)

    resp.data.data['client'] = resp.headers.client
    resp.data.data['access-token'] = resp.headers['access-token']

    console.log("sign_in data", resp.data.data)
                            
    dispatch(set_user(resp.data.data))

    return axios.put('/api/auth/password', {password: password, password_confirmation: password_confirmation}, {headers: make_headers(resp.data.data)})
  })
}

export const update_password = (new_pwd, new_pwd_confirm) => (dispatch, getState) => {

  return axios.put(`/api/auth/password`, {password:new_pwd, password_confirmation:new_pwd_confirm}, {headers:make_headers(get_user_attr(getState()))})
}

export const is_signed_in = () => (dispatch, getState) =>  {
  return axios.get('/api/auth/validate_token', {headers: make_headers(get_user_attr(getState()))}).then((resp) => {
    return Promise.resolve(true)
  }).catch ((error) => {
    return Promise.resolve(false)
  })
}

export const sign_in = user_info => (dispatch, getState) =>  {

  const {email, password} = user_info

  // sign in API call here
  var headers = {'Content-Type': 'application/json'}
    if(email && password){

      return axios.post("/api/auth/sign_in" ,{email:email, password:password}, {headers: headers})
      .then(function(resp){
          console.info(resp)

          resp.data.data['client'] = resp.headers.client
          resp.data.data['access-token'] = resp.headers['access-token']
                                  
          return dispatch(set_user(resp.data.data))
        })
    }
    else {
      return Promise.reject(new Error('Please provide an email address and password'))
    }
}

export const register_user = user_info => (dispatch, getState)=>{

  const {first_name, last_name, email, password, password_confirm, skip_password_validation} = user_info

  // NOTE: you can pass in both skip_password_validation and password+password_confirm but the server will basically ignore the password

  // register API call here
  var headers = {'Content-Type': 'application/json'}
    if(first_name && last_name && email && ((password && password_confirm) || skip_password_validation)){
      
      return axios.post("/api/users",
        {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm, skip_password_validation: skip_password_validation}, 
        {headers: headers})
        .then(function(resp){
          var attr = { id: resp.data.id,
                        uid:resp.data.uid,
                        email:resp.data.email,
                        first_name:resp.data.first_name,
                        last_name:resp.data.last_name
                      }

          return Promise.resolve(attr)
        })
    }
    else {
      return Promise.reject(new Error('Please provide first_name, last_name, email, password+password_confirm or skip_password_validation'))
    }
}

export const update_user_information = user_info => (dispatch, getState) => {
  const {first_name, last_name, email} = user_info
  var user_attr = get_user_attr(getState())
  if(first_name, last_name, email){
    return axios.put(`/api/users/${user_attr.id}`, {last_name:last_name, first_name:first_name, email:email}, {headers:make_headers(user_attr)}).then(resp=>{
      dispatch(update_user_info(user_info))
      return Promise.resolve(resp)
    })
  }
}


export const register_and_set_user = user_info => (dispatch, getState)=>{
  return dispatch(register_user(user_info)).then((resp) => {
    return dispatch(set_user(resp))
  })
}

export const  get_user_attr = (state) => {
  return  state.global_reducer.current_user.attributes
}

export const make_headers = (user_attr) => {
  return {
    'Content-Type': 'application/json', 
    'access-token': user_attr['access-token'], 
    'client': user_attr.client, 
    'uid':user_attr.uid
  }
}

export const set_patient = patient => (dispatch, getState) => {
  return dispatch({type:SET_PATIENT, patient:patient})
}

export const set_therapist = therapist => (dispatch, getState) => {
  return dispatch({type:SET_THERAPIST, therapist:therapist})
}

export const reset_state = () => (dispatch, getState) => {
  return dispatch({type:RESET_STATE})
}

export const get_message_threads_for_current_user = () => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  return axios.get(`/api/users/${user_attr.id}/message_threads`, {headers: make_headers(user_attr)})
}

export const create_message_thread = (recipient_id, sender_id) => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  var body = {recipient_id: recipient_id, sender_id:sender_id}
  return axios.post(`/api/users/${user_attr.id}/message_threads`, body, {headers: make_headers(user_attr)})
}

export const create_message = (sender_id, thread_id, recipient_id, message) => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  var body = {message: message, recipient_id:recipient_id,sender_id:sender_id}
  return axios.post(`/api/message_threads/${thread_id}/messages`, body, {headers: make_headers(user_attr)})
}

export const get_messages_for_thread = (thread_id) => (dispatch, getState) => {
  var user_attr = get_user_attr(getState())
  return axios.get(`/api/message_threads/${thread_id}/messages`, {headers: make_headers(user_attr)})
}


