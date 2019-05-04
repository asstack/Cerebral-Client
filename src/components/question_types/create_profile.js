import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import * as components from '../question_components/components'

class CreateProfile extends Component {

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

    update_handler = e => {
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
          {components.input_type_1(this.update_email.bind(this), "Email Address")}
          {components.input_type_1(this.update_firstname.bind(this), "First Name")}
          {components.input_type_1(this.update_lastname.bind(this), "Last Name")}
          {components.input_password_type_1(this.update_password.bind(this), "Create Password")}
          {components.input_password_type_1(this.update_password_confirm.bind(this), "Retype Password")}
          {components.checkbox_type_1(null, 'I already have an account I consent to Telehealth, terms and privacy policy. All information is strictly confidential and is used to help our professionals provide the best care for you.')}
          {components.confirm_button_type_1(this.props.next_step_handler, "Sign up for Cerebral Updates")}
        </div>
      );
    }
}

export default CreateProfile