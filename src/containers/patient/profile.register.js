import React, {Component} from 'react'
import { register_user, sign_in } from '../../actions/user_auth_action'
import { move_patient_sign_in, set_profile_question } from '../../actions/patient_action'
import { connect } from 'react-redux'
import * as components from '../../components/question_components'
import axios from 'axios'


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

    register_handler = (e) => {
      e.preventDefault()
      const {first_name, last_name, email, password, password_confirm} = this.state
      const {sign_in, set_profile_question}=this.props
      var header = {'Content-Type': 'application/json'}
      if(first_name && last_name && email && (password && password_confirm)){
        axios.post("http://localhost:3000/api/users",
          {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm}, header)
          .then(function(resp){
            var attr = {attributes: { id: resp.data.id,
                                      uid:resp.data.uid,
                                      email:resp.data.email,
                                      first_name:resp.data.first_name,
                                      last_name:resp.data.last_name
                                    }}
            //TODO: NEVER use the dispatches like here. will move to action with err handling
            sign_in(attr)
            set_profile_question()

          }).catch(function(err){
            console.log("err", err)
          })
      }
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

export default connect(null,{sign_in, move_patient_sign_in, set_profile_question}) (Register)
