export const SET_APP_STATE = 'SET_APP_STATE'


const set_app_state = state => ({
  type:SET_APP_STATE,
  new_app_state:state,
})


export const update_app_state = state => (dispatch, getState) => {
  return dispatch(set_app_state(state))
}
