import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {update_app_state} from '../actions'
import {update_patient_state, set_profile_question} from '../actions/patient_action'
import ReactGA from 'react-ga'

class MainPage extends Component{

  constructor(props){
    super(props)
  }
  
  componentDidMount(){
    //ReactGA.initialize('UA-139974495-1');
    //ReactGA.pageview('/MainPage');
    console.log("main page here")
  }
  app_state_update_handler = e => {
    const {update_app_state}=this.props

    //update_app_state('qualification')
    this.props.history.push('patient/qualification') 
  }

  app_state_register_handler = e => {
    const {update_app_state}=this.props
    this.props.history.push('patient/profile')
  }

  app_state_signin_handler = e => {
    this.props.history.push('patient/sign_in')
  }

  app_state_reset_password_handler = e => {
    this.props.history.push('user/password_reset')
  }

  render(){
    return(
      <div>
        <h1> main page </h1>
        <input type='button' value='Get Started' onClick={this.app_state_update_handler.bind(this)}/>
        <input type='button' value='Register' onClick={this.app_state_register_handler.bind(this)}/>
        <input type='button' value='Sign In' onClick={this.app_state_signin_handler.bind(this)}/>
        <input type='button' value='Reset Password' onClick={this.app_state_reset_password_handler.bind(this)}/>      
      </div>
    )
  }
}



export default withRouter(connect(null, {update_app_state, update_patient_state}) (MainPage))
