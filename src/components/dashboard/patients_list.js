import React, {Component} from 'react'
import { connect } from 'react-redux'
import {get_patients_for_therapist} from "../../actions/therapist_action"
import PatientInformation from './patient_information'
import uuidv1 from 'uuid'

//not sure patient and therapist can share this component
class PatientsList extends Component {

  constructor(props){
    super(props) 
    this.state = {
      patients: [],
      patient:null,
      view_type:null
    }
  }

  componentDidMount = () => {
    this.props.get_patients_for_therapist().then((resp) => {
      this.setState({patients:resp.data})
    })
  }

  prescription_status = type => {
    switch(type){
      case 'ready':
        return "Patient has not completed assessment"
      case 'pending':
        return "Prescription pending doctor’s approval"
      case 'approved':
        return "Prescription approved"
      case 'denied':
        return "Prescription denied"
      default:
        return "Unknown"
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
      default:
        return null
    }  
  }

  patient_info_handler= (type, patient=null) => {
    this.setState({view_type:type, patient:patient}) 
  }
  

  row_item = (css_style, patient) => (
    <div key={uuidv1()} onClick = {e => this.patient_info_handler("patient_info", patient)} className={"d-flex flex-row justify-content-start "+css_style}>
      <div className="d-flex justify-content-center align-items-center table-item-col-1"> <input type='checkbox'/> </div>
      <div className="d-flex justify-content-center align-items-center table-item-col-2">{patient.user.first_name + " " + patient.user.last_name}</div>
      <div className="d-flex justify-content-start align-items-center table-item-col-3">{patient.visit.service_line.title}</div> 
      <div className="d-flex justify-content-start align-items-center table-item-col-4">{patient.prescription_status || "None"}</div>
      <div className="d-flex justify-content-center align-items-center table-item-col-5"> 
        <img alt="detail" className="detail-btn" src={process.env.PUBLIC_URL + '/img/detail.png'}/>
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

  view= () => {
    if(this.state.view_type === "patient_info"){
      return <PatientInformation update_state_handler={this.patient_info_handler} patient={this.state.patient} />  
    }else{
      return (
        <div className="d-flex flex-column profile-main-content">
          <div className="d-flex justify-content-end text-main-title">PROFILE INFORMATION</div>
          <div className="d-flex flex-column">
          <div className="main-content-wide-card">
            <div className="patients-list-item-container-nb">
              <div className="d-flex flex-row justify-content-between search-bar-holder">
                <input type="text" placeholder="Search patient list"/>
                  <div className="d-flex align-items-center">
                    <img alt="search" className="search-img" src={process.env.PUBLIC_URL + '/img/search.png'}/>
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
          </div>
        </div>  
      )
    }
  }
  
  render(){
    return this.view() 
  }
}

export default connect(null, {get_patients_for_therapist}) (PatientsList)
