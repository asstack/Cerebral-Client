import React, {Component} from 'react';
import * as components from '../question_components/components'

class PatientPayment extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:''
    }
  }

  update_handler = e => { 
    const {is_consent, email, first_name, 
      last_name, password, password_confirm} = this.state
      this.props.submit_action(this.state) 
   }
  
  render(){
    return (
      <div className="patient_payment">
        {components.input_type_1(this.update_email.bind(this), "Email Address")}
        {components.input_password_type_1(this.update_password.bind(this), "Password")}
        {components.confirm_button_type_1(this.sign_in_handler.bind(this), "Get started with online visit")}
        {components.text_button_type_1(this.state_update_handler.bind(this), "I don't have an account.")}
      </div>
    );
  }
}

export default PatientPayment
