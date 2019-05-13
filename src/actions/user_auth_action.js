import axios from 'axios'

export const SIGN_IN = 'SIGN_IN'
export const REGISTER = 'REGISTER'
export const SET_USER = "SET_USER"

// set_user will update global state with information corresponding to the User object in the database
const set_user = user_info => ({
  type:SET_USER,
  user_attr:user_info
})

export const sign_in = user_info => (dispatch, getState) =>  {

  const {email, password} = user_info

  // sign in API call here
  var headers = {'Content-Type': 'application/json'}
    if(email && password){

      return axios.post("/api/auth/sign_in" ,{email:email, password:password}, {headers: headers})
      .then(function(resp){
          console.info(resp)
          var attr = { id: resp.data.data.id,
                          uid:resp.data.data.uid,
                          email:resp.data.data.email,
                          first_name:resp.data.data.first_name,
                          last_name:resp.data.data.last_name,
                          token: resp.headers['access-token'],
                          client: resp.headers.client
                        }
                                  
          dispatch(set_user(attr))

          console.log("sign_in", attr)
        })
    }
    else {
      return Promise.resolve()
    }
}

export const register_user = user_info => (dispatch, getState)=>{

  const {first_name, last_name, email, password, password_confirm} = user_info

  // register API call here
  var headers = {'Content-Type': 'application/json'}
    if(first_name && last_name && email && (password && password_confirm)){
      return axios.post("/api/users",
        {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm}, 
        {headers: headers})
        .then(function(resp){
          var attr = { id: resp.data.id,
                        uid:resp.data.uid,
                        email:resp.data.email,
                        first_name:resp.data.first_name,
                        last_name:resp.data.last_name
                      }

          dispatch(set_user(attr))

        })
    }
    else {
      return Promise.resolve()
    }
}
