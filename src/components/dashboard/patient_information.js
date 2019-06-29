import React, {Component} from 'react';
import { connect } from 'react-redux'
import Moment from 'moment';
import {write_note_for_patients, get_patient_details} from "../../actions/therapist_action"


//get_patient_details

//shared by patient and therapist, need to pass proper function to send message
//use data in props if we already got data in parent

class PatientInformation extends Component {

  constructor(props){
    super(props) 
    this.state = {
      patient:this.props.patient,
      details:null,
      notes:[],
      new_note:""
    }
    this.msg_input = React.createRef();
  }

  componentDidMount = () => {
    let notes = this.props.patient.note
    this.setState({notes:notes})
  }

  componentWillReceiveProps = (next_props) => { 
    this.setState({patient:next_props.patient}) 
  }


  //messenger -> better to get initial data in here to get all data before rendering the view and get correct scroll position
  back_btn_handler = () => {
    this.props.update_state_handler(null,null)
  }

  update_msg_handler = (e) => {
    this.setState({new_note:e.target.value})
  }

  submit_note_handler = () => { 
    this.props.write_note_for_patients(this.state.patient.id, this.state.new_note).then(resp => {
      let notes=this.state.notes;
      notes.push({note: this.state.new_note})
      this.setState({notes:notes, new_note:""})
      this.msg_input.current.value=""
    })   
  }

  patient_basic_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "small-card-title">Patient Profile Information</div>
            <div className = "d-flex flex-row"> 
              <div className = "d-flex align-items-center patient-info-photo-holder">
              
                <img alt="patient info" className = "patient-info-photo" src={process.env.PUBLIC_URL + '/img/photo.png'}/>
              </div>
              <div className = "d-flex flex-column patient-basic-right">
                <div className = "patient-basic-right title"> {this.state.patient.user.first_name + " "+ this.state.patient.user.last_name} </div>
                <div className = "d-flex flex-row patient-basic-right item">
                  <div className = "patient-basic-left-item">Email :</div>
                  <div className = "patient-basic-right-item">{this.state.patient.user.email}</div>
                </div> 
                <div className = "d-flex flex-row patient-basic-right item">
                  <div className = "patient-basic-left-item">Telephone number:</div>
                  <div className = "patient-basic-right-item">{this.get_named_answer('phone')}</div> 
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }


  patient_referral_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "referral-card-title">Patient referral Information</div>
             <div className = "d-flex flex-column">
               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Date of referral: 
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?Moment(this.state.patient.visit.service_line.created_at).format('MM/DD/YYYY'):null} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Referred for: 
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?this.state.patient.visit.service_line.title:null} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left patient-referral-last">   
                  Referral status: 
                </div>
                <div className = "patient-referral-right patient-referral-last">   
                  <img alt="ready for info" className = "patient-info-status-icon" src={process.env.PUBLIC_URL + '/img/ready.png'}/>
                  Patient has not completed assessment 
                </div>
               </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  get_named_answer = (name) => {
    if (!this.state.patient) return 'No patient information'
    const answer = this.state.patient.visit.answers.filter(answer => answer.question.name === name)
    return answer.length > 0 ? answer[0].response : 'No response to question'
  }

  patient_prescriber_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "referral-card-title">NOTES FOR PRESCRIBER</div>
             <div className = "d-flex flex-column">

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Treatment duration:
                </div>
                <div className = "patient-referral-right"> 
                  {this.get_named_answer('referral_how_long')}  
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Support network:
                </div>
                <div className = "patient-referral-right">   
                  {this.get_named_answer('referral_support_network')}  
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Self harm/Violent tendencies:
                </div>
                <div className = "patient-referral-right">   
                  {this.get_named_answer('referral_danger')}  
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Diagnosis notes:
                </div> 
                <div className = "d-flex flex-column patient-referral-right">   
                  {this.state.notes.map((val, idx)=>{
                    return <div className="patient-note">{val.note}</div> 
                  })}
                </div>
               </div>
               <div className="d-flex flex-row align-items-center patient-referral-msg-input">
                <input ref={this.msg_input} className="col message-input" onChange={this.update_msg_handler} type='text' placeholder='Add additional notes' defaultValue=""/> 
                <img alt="message submit" onClick={e=>this.submit_note_handler()} src={process.env.PUBLIC_URL + '/img/input_arrow.svg'} className="message-submit"/>
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  default_view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
            <div className="message-button-holder message-button" onClick={e=>this.back_btn_handler()}>
              {"<	Back to Patient list"}
            </div>
 
          <div className="d-flex justify-content-end text-main-title">PATIENT PROFILE</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {this.patient_basic_info()}   
          {this.patient_referral_info()} 
          {this.patient_prescriber_info()} 
        </div>
      </div> 
    ) 
  }


  //TODO: update url based on the type

  render(){
    return(
      this.default_view()
    ) 
  }
  
}

export default connect(null, {write_note_for_patients, get_patient_details})(PatientInformation)

