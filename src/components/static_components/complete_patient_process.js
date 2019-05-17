import React, {Component} from 'react'
import logo from './complete_patient.png';
import {withRouter} from "react-router-dom"
import * as components from '../../components/question_components/components'


class CompleteProcess extends Component{

  constructor(props){
    super(props)
  }
  
  btn_handler = () => {
      this.props.history.push('/patient/dashboard') 
  }

  render(){
     return (
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center text-big">
          <p>Thanks for choosing Cerebral. </p>
        </div>
        <div className="d-flex justify-content-center text-mid-title">
          <p>What happens now?</p>
        </div>

        <div className="d-flex justify-content-center image-holder">
          <img src={logo} />
        </div>

        <div className="d-flex justify-content-center text-small-2">
          Your doctor will contact you within the next 24 hours via email with your prescription approval notice or follow-up questions.  This email will grant you access to our secure messaging portal for follow-ups with the prescribing doctor.  Learn more.
        </div>
        {components.confirm_button_type_1(this.btn_handler, "Go to your profile >")}
      </div>
    )

  
  
  }
}

export default withRouter(CompleteProcess)

