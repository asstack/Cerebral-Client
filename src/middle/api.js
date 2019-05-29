import axios from 'axios'
import { handleActions } from 'redux-actions'

export const API_IDLE  = 'API_IDLE';
export const API_PENDING = 'API_PENDING';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILURE = 'API_FAILURE';
export const API_REAUTH  = 'API_REAUTH';

const api_axios = (url, header, body, type) => {
  if(type==='GET'){
    return axios.get(url, header) 
  }else if(type === 'POST'){
    return axios.post(url, body, header) 
  } else{
    throw "Unimplemented REST type in api middleware"
  }
}

export const api_reset = () => dispatch => {
  dispatch({
    type: API_IDLE
  });
}

export const api_call = (type, url, header, body = null, update_data=null) => dispatch => {
  console.log("check api call:", body) 
  dispatch({type: API_PENDING});

  return api_axios(url, header, body, type).then(
    (resp) => {

      // resp.data.data['client'] = resp.headers.client
      // resp.data.data['access-token'] = resp.headers['access-token']
         
      dispatch({
        type: API_SUCCESS,
        data: resp.data
      })
      if(update_data) dispatch(update_data(resp.data))
    }
  ).catch(error => {

    if (error.response.status == 401) {
      dispatch({
        type: API_REAUTH,
        error: error.data
      });
    } else {
      dispatch({
        type: API_FAILURE,
        error: error.data
      });
    }
  })
}

export const initial_api = {
  status: false,
  error: false,
  data: null,
}

export const api_middleware = handleActions({
  [API_PENDING]: (state, action) => {
    return {
      ...state,
      status: 'PENDING',
      error: false
    };
  },
  [API_SUCCESS]: (state, action) => {

    return {
      ...state,
      status: 'SUCCESS',
      data: action.data 
    };
  },
  [API_FAILURE]: (state, action) => {
    return {
      ...state,
      status: 'FAILURE',
      error: action.error
    }
  },
  [API_REAUTH]: (state, action) => {
    return {
      ...state,
      status: 'REAUTH',
      error: action.error
    }
  },
  [API_IDLE]: (state, action) => {
    return {
      ...state,
      status: 'IDLE',
      error: false
    }
  }
}, initial_api);

