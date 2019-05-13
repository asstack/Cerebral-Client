import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  }
  app_state_update_handler = e => {
    const {update_app_state}=this.props
    update_app_state('qualification')
  }

  app_state_register_handler = e => {
    const {update_app_state}=this.props
    update_app_state('patient')
  }

  app_state_signin_handler = e => {

    this.props.update_patient_state('sign_in')
    this.props.update_app_state('patient')
  }

  app_state_checkout_handler = e => {
    const {update_app_state}=this.props
    update_app_state('checkout')
  }

  render(){
    return(
      <div>
        <h1> main page </h1>
        <input type='button' value='Get Started' onClick={this.app_state_update_handler.bind(this)}/>
        <input type='button' value='Register' onClick={this.app_state_register_handler.bind(this)}/>
        <input type='button' value='Sign In' onClick={this.app_state_signin_handler.bind(this)}/>
        <input type='button' value='Checkout' onClick={this.app_state_checkout_handler.bind(this)}/>
      </div>
    )
  }
}



export default connect(null, {update_app_state, update_patient_state}) (MainPage)
