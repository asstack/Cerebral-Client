export const SIGN_IN = 'SIGN_IN'
export const REGISTER = 'REGISTER'
export const SET_USER = "SET_USER"
//TODO: implement middleware for handling api call
const set_user = user_info => ({
  type:SET_USER,
  user_attr:user_info
})

export const sign_in = user_info => (dispatch, getState) => {
  return dispatch(set_user(user_info))
}

export const register_user = user_info => (dispatch, getState)=>{
  return dispatch(set_user(user_info))
}
