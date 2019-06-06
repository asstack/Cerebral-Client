import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as components from '../question_components/components'
import {get_patients_for_therapist} from "../../actions/therapist_action"
import uuidv1 from 'uuid'

//not sure patient and therapist can share this component
class PatientsList extends Component {

  constructor(props){
    super(props) 
    this.state = {
      patients: []
    }
  }

  componentDidMount = () => {
    this.props.get_patients_for_therapist().then((resp) => {
      this.setState({patients:resp.data})
    })
  }

  prescription_status = type => {
    switch(type){
      case 'approved':
        return "Patient has not completed assessment"
      case 'pending':
        return "Prescription pending doctor’s approval"
      case 'approved':
        return "Prescription approved"
      case 'denied':
        return "Prescription denied"
    } 
  }

  warning_icon_src = type => {
    switch(type){
      case 'ready':
        return process.env.PUBLIC_URL + '/img/approved.png'
      case 'pending':
        return process.env.PUBLIC_URL + '/img/pending.png'
      case 'approved':
        return process.env.PUBLIC_URL + '/img/approved.png'
      case 'denied':
        return process.env.PUBLIC_URL + '/img/denied.png'
    }  
  }

  

  row_item = (css_style, patient) => (
    <div key={uuidv1()} className={"d-flex flex-row justify-content-start "+css_style}>
      <div className="d-flex justify-content-center align-items-center table-item-col-1"> <input type='checkbox'/> </div>
      <div className="d-flex justify-content-center align-items-center table-item-col-2">{patient.user.first_name + " " + patient.user.last_name}</div>
      <div className="d-flex justify-content-start align-items-center table-item-col-3">{patient.visit.service_line.title}</div> 
      <div className="d-flex justify-content-start align-items-center table-item-col-4">{patient.prescription_status || "None"}</div>
      <div className="d-flex justify-content-center align-items-center table-item-col-5"> 
        <img className="detail-btn" src={process.env.PUBLIC_URL + '/img/detail.png'}/>
      </div>
    </div> 
  )

  row_header = () => (
   <div className="d-flex flex-row justify-content-start table-item-head">
     <div className="d-flex justify-content-center align-items-center table-item-col-1"><input type='checkbox'/> </div>
      <div className="d-flex justify-content-center align-items-center table-item-col-2">Patient name</div>
      <div className="d-flex justify-content-start align-items-center table-item-col-3">Reason for referral</div> 
      <div className="d-flex justify-content-start align-items-center table-item-col-4">Patient Prescription status</div>
      <div className="d-flex justify-content-center align-items-center table-item-col-5"></div>
    </div> 
  )

  view= () => (
    <div className="main-content-wide-card">
      <div className="patients-list-item-container-nb">
        <div className="d-flex flex-row justify-content-between search-bar-holder">
          <input type="text" placeholder="Search patient list"/>
          <div className="d-flex align-items-center">
            <img className="search-img" src={process.env.PUBLIC_URL + '/img/search.png'}/>
          </div>
        </div>
      </div> 
      <div className="d-flex flex-column">
        {this.row_header()}
        {
          this.state.patients.map((value, index) => {
            return this.row_item("table-item", value)
        })}
      </div>
    </div> 
  )
  
  render(){
    return this.view() 
  }
}

export default connect(null, {get_patients_for_therapist}) (PatientsList)
