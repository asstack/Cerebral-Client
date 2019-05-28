import React, {Component} from 'react'
import * as components from '../question_components/components'
import CustomSelector from './custom_selector'
import RadioDetails from './radio_details'


//get submit and skip handler
class PatientInfo extends Component {
	constructor(props){
		super(props)
		this.state = {
      items: []
		}
	}


  //TODO: change wording to title 
  render(){	
 	  return(
      <div className="d-flex flex-column therapist-question-container">
        <div className="d-flex justify-content-start patient-refer-description">
          <span>Patient Profile Information:</span>
        </div>

        {components.patient_info_text("Patient Full Name:","Taejun")}
        {components.patient_info_text("Patient Email:","taejun.song.87@gmail.com")}
        {components.patient_info_input("Patient Telephone #:","Telephone #")}
        {components.patient_info_checkbox("Patient Telephone #:","Telephone #")}
        <CustomSelector />
        <RadioDetails />
        <div className="d-flex patient-info-submit-btn-holder">
          <input id='submit_refer' className="patient-refer-submit-btn" onClick={this.submit_item_handler}  type="button" value="Submit and Continue"/>
        </div>
     </div>
		)
	}
}

export default PatientInfo
