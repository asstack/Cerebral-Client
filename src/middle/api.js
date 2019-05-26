import axios from 'axios'
import { handleActions } from 'redux-actions'

const GET_PENDING = 'API_PENDING';
const GET_SUCCESS = 'API_SUCCESS';
const GET_FAILURE = 'API_FAILURE';


const api_axios = (url, header, body, type) => {
  if(type==='GET'){
    return axios.get(url, header) 
  }else if(type === 'POST'){
    return axios.post(url, body, header) 
  }
}


export const api_call = (url, header, body, type, update_data=null) => dispatch => {
  console.log("check api call:", body) 
  dispatch({type: GET_PENDING});

  return api_axios(url, header, body, type).then(
    (resp) => {
      resp.data.data['client'] = resp.headers.client
      resp.data.data['access-token'] = resp.headers['access-token']
         
      dispatch({
        type: GET_SUCCESS,
        data: resp.data
      })
      if(update_data) dispatch(update_data(resp.data))
    }
  ).catch(error => {
    dispatch({
      type: GET_FAILURE,
      error: error.data
    });
  })
}

const initial_api = {
  status: false,
  error: false,
  data: null,
}

export const api_middleware = handleActions({
  [GET_PENDING]: (state, action) => {
    return {
      ...state,
      status: 'PENDING',
      error: false
    };
  },
  [GET_SUCCESS]: (state, action) => {
    const { title, body } = action.payload.data;

    return {
      ...state,
      status: 'SUCCESS',
      data: {
          title, body
      }
    };
  },
  [GET_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: 'FAILURE',
      error: action.error
  }
  }
}, initial_api);

