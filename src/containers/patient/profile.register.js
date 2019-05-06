import React, {Component} from 'react'
import { register_user, sign_in } from '../../actions/user_auth_action'
import { move_patient_sign_in, set_profile_question } from '../../actions/patient_action'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import { Route, withRouter } from 'react-router-dom'

class Register extends Component {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        password_confirm:''
      }
    }

    register_handler = e => {
      this.props.register_user(this.state)
    }

    state_update_handler = e => {
      const {move_patient_sign_in}=this.props
      move_patient_sign_in()
    }

    update_email = (e) => {
      const em = e.target.value
      this.setState({email:em})
    }

    update_firstname = (e) => {
      const fname = e.target.value
      this.setState({first_name:fname})
    }

    update_lastname = (e) => {
      const lname = e.target.value
      this.setState({last_name:lname})
    }

    update_password = (e) => {
      const pwd = e.target.value
      this.setState({password:pwd})
    }

    update_password_confirm = (e) => {
      const pwd_confirm = e.target.value
      this.setState({password_confirm:pwd_confirm})
    }

    render(){
      return (
        <div>
          {components.text_big_type_1("Complete your profile, before you get started with your mental health assessment.")}
          {components.input_type_1(this.update_email.bind(this), "Email Address")}
          {components.input_type_1(this.update_firstname.bind(this), "First Name")}
          {components.input_type_1(this.update_lastname.bind(this), "Last Name")}
          {components.input_password_type_1(this.update_password.bind(this), "Create Password")}
          {components.input_password_type_1(this.update_password_confirm.bind(this), "Retype Password")}
          {components.checkbox_type_1(null, 'I already have an account I consent to Telehealth, terms and privacy policy. All information is strictly confidential and is used to help our professionals provide the best care for you.')}
          {components.confirm_button_type_1(this.register_handler.bind(this), "Get started with online visit")}
          {components.text_button_type_1(this.state_update_handler.bind(this), "I already have an account.")}
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const{
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_state, step, question_bank_type, questions, branch_questions, branch_step, branch_option}
  } = state

  return {
    patient_state: patient_state,
    question_step: step,
    question_bank_type: question_bank_type,
    questions: questions,
    branch_questions: branch_questions,
    branch_step: branch_step,
    branch_option: branch_option
  }
}

export default withRouter(connect(mapStateToProps,{sign_in, move_patient_sign_in, set_profile_question, register_user}) (Register))
