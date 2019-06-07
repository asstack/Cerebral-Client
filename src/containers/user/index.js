import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {reset_password, change_password} from '../../actions/user_auth_action'
import * as components from '../../components/question_components/components'
import Alert from 'react-s-alert'

const queryString = require('query-string');

class PasswordReset extends Component{

  constructor(props){
    super(props)
    const parsed = queryString.parse(props.location.search)

    const path_parts = this.props.location.pathname.split('/')
    
    this.state = {
        email:'',
        mode: path_parts.slice(-1)[0],
        reset_password_token: parsed.reset_password_token,
        user_confirmation_token: parsed.user_confirmation_token,
        landing_page: parsed.landing_page,
        password: null,
        confirm_password: null
    }
  }
  
  componentDidMount(){
    console.log("PasswordReset")

    if (this.state.mode == 'confirmation') {
      // TODO: pass user_confirmation_token into the api
    }
  }

  reset_handler = e => {
    // TODO: get env variable for hostname
    this.props.reset_password(this.state.email, `${this.props.env.REACT_APP_BASE_URL}/user/change_password`).then((resp) => {
      this.setState({mode:'did_reset'})
      console.log(`reset_handler: ${resp.data}`)
    }).catch((error) => {
      Alert.error(error.response.data.errors[0])
    })
  }

  update_state = (state_name, e) => {
    const em = e.target.value
    const o ={}
    o[state_name] = em
    this.setState(o)
  }

  new_password_handler = (e) => {
    
    if (this.state.password != this.state.confirm_password) {
      Alert.error('Passwords must match')
    }
    else {
      this.props.change_password(this.state.reset_password_token, this.state.password, this.state.confirm_password, this.props.env.REACT_APP_API_SERVER_URL).then(() =>{
        // TODO: what if this is a therapist instead?
        const landing_page = this.state.landing_page || '/patient/dashboard'
        this.props.history.push(landing_page)
      }
      ).catch((error) => {
        
        var message = `An unknown error has occurred: ${error.message}`
        switch(error.response.status) {
          case 404:
            message = 'This password reset token is no longer valid'
            break;
          case 422:
              message = 'Passwords need to be at least 6 characters in length'
              break;
        }
        // error.response.status == 404
        Alert.error(message)
      })
    }
  }

  render(){
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div className="p-2">
            <div className="btn-arrow link-type1">
            Cerebral
            </div>
          </div>
        </div>
        {this.state.mode == 'new_password' && 
        <div className="d-flex flex-column question-container">
        <div className="d-flex justify-content-center text-big">
          <p>New Password</p>
        </div>
        <div className="d-flex justify-content-center">
          <p>Please type and confirm a new password.</p>
        </div> 
        <div className="patient_signin">
                  {components.input_password_type_1(this.update_state.bind(this, 'password'), "New password")}
                  {components.input_password_type_1(this.update_state.bind(this, 'confirm_password'), "Confirm password")}
                  {components.confirm_button_type_1(this.new_password_handler.bind(this), "Save new password")}
                </div>  
      </div>}
      {this.state.mode == 'confirmation' &&
          <div className="d-flex flex-column question-container">
            <div className="d-flex justify-content-center text-big">
              <p>Email confirmation</p>
            </div>
            <div className="d-flex justify-content-center">
              <p>Your email address has been confirmed.</p>
            </div> 
          </div>
        }
        {this.state.mode == 'did_reset' &&
          <div className="d-flex flex-column question-container">
            <div className="d-flex justify-content-center text-big">
              <p>Check Your Email</p>
            </div>
            <div className="d-flex justify-content-center">
              <p>A password resent link as been sent to {this.state.email}. Please check your inbox.</p>
            </div> 
          </div>
          }
        {this.state.mode == 'password_reset' &&
          <div className="d-flex flex-column question-container">
            <div className="d-flex justify-content-center text-big">
              <p>Reset Password</p>
            </div>
              <div className="patient_signin">
                  {components.input_type_1(this.update_state.bind(this, 'email'), "Email Address")}
                  {components.confirm_button_type_1(this.reset_handler.bind(this), "Reset password")}
                </div>  
          </div>
          }
      </div>
   );
  }
}

 const mapStateToProps = (state) => {
  const {global_reducer: {env}} = state
  return {env: env}
}


export default withRouter(connect(mapStateToProps, {reset_password, change_password}) (PasswordReset))
