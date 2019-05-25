import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import * as app_types from '../actions'
import * as user_auth_types from '../actions/user_auth_action'
import * as patient_action_types from '../actions/patient_action'
import {patient_reducer, init_patient_state} from './patient_reducer'


// https://redux.js.org/basics/reducers#designing-the-state-shape
const init_global_state = {

  current_user: {
    user_type: null,
    is_loading: false,
    is_signedIn: false,
    attributes: {
      id: null,
      uid: null,
      email: null,
      first_name: null,
      last_name: null,
      'access-token': null,
      client: null
    },
  },
  app_state: '',
}

//global state storage, it will have user account information and current global state
// https://redux.js.org/basics/reducers#handling-actions
const global_reducer = handleActions({

  [user_auth_types.SET_USER]:(state, action) => {
    return {
      // https://redux.js.org/recipes/using-object-spread-operator
      ...state,
      app_state:'',
      current_user: {
        ...state.current_user,
        user_type: '',
        is_loading: true,
        is_signedIn: true,
        attributes : action.user_attr
      }
    }
  },
  [app_types.SET_APP_STATE]: (state, action) => {
    return{
      ...state,
      app_state:action.new_app_state
    }
  }
}, init_global_state)

const appReducer = combineReducers({
  patient_reducer,
  global_reducer
})

const rootReducer = (state, action) => {

  if(action.type==='RESET'){
    state = {global_reducer: init_global_state,
             patient_reducer: init_patient_state}
  }
  return appReducer(state, action)
} 

export default rootReducer
