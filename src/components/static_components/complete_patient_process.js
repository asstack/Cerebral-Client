import React, {Component} from 'react'
import logo from './complete_patient.png';
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import * as components from '../../components/question_components/components'
import { complete_current_visit } from '../../actions/patient_action'

class CompleteProcess extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount = () => {

    const {complete_current_visit} = this.props

    this.props.complete_current_visit()
  }
  
  btn_handler = () => {
      this.props.history.push('/patient/dashboard') 
  }

  render(){
     return (

      <div className="d-flex flex-column therapist-noprogress">
        <div className="d-flex flex-row justify-content-between align-items-center therapist-header">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
 
        <div className="d-flex flex-column justify-content-center container-noprogress align-items-center">
          <div className="description_noprogress">
            <h1>Thanks for choosing Cerebral. </h1>
          </div>
          <div className="d-flex justify-content-center text-mid-title">
            <p>What happens now?</p>
          </div>

          <div className="d-flex justify-content-center image-holder">
            <img src={logo} />
          </div>

          <div className="d-flex justify-content-center complete-message-holder text-small-2">
            Your doctor will contact you within the next 24 hours via email with your prescription approval notice or follow-up questions.  This email will grant you access to our secure messaging portal for follow-ups with the prescribing doctor. 
          </div>
          {components.confirm_button_type_1(this.btn_handler, "Go to your profile >")}
        </div>
      </div>
    )

  
  
  }
}

export default connect(null, {complete_current_visit}) (CompleteProcess)
