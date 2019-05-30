export const SET_APP_STATE = 'SET_APP_STATE'
export const SET_ENV = 'SET_ENV'

// https://redux.js.org/basics/actions#action-creators
const set_app_state = state => ({
  type:SET_APP_STATE,
  new_app_state:state,
})

const set_app_env = env => ({
  type:SET_ENV,
  env:env,
})

export const update_app_state = state => (dispatch, getState) => {
  return dispatch(set_app_state(state))
}

export const set_env = env => (dispatch, getState) => {
  return dispatch(set_app_env(env))
}
