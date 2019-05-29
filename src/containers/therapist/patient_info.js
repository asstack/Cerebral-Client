import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import CustomSelector from '../../components/question_types/custom_selector'
import RadioDetails from '../../components/question_types/radio_details'
import TherapistPatientsInfo from '../../components/question_types/therapist_patients_info'
import TherapistCheckbox from '../../components/question_types/therapist_checkbox'
import { get_patient_info_questions } from '../../actions/therapist_action' 

//get submit and skip handler
class PatientInfo extends Component {
	constructor(props){
		super(props)
		this.state = {
      items: this.props.patients_info,
      ref_index:0,
      answers:[]
		}
	}
  //answers->2d matrix  ref_index*questions
  componentDidMount(){
    if(!this.state.items){
      //redirect to somewhere
      //
    }
    this.props.get_patient_info_questions(4)
  }
  
  componentDidUpdate(){
  
  }

  update_answer_handler = (value, patient_index, question_index)=>{
  
  }

  submit_item_handler = () =>{
    if(this.state.ref_index===this.state.items.length-1){
      //done
    }else{
      this.setState({ref_index:this.state.ref_index+1})  
    }
  
  }

  map_question_to_view = (item, index, patient) =>{
    //const patient = this.state.items[this.state.ref_index]
    switch(item.question_type){
      case 'therapist_patients_info': 
        return(
          <TherapistPatientsInfo submit_action = {this.update_answer_handler} patient={patient} q_id={index} ref_id={this.state.ref_index}/>)
      case 'checkboxes':
        return( 
          <TherapistCheckbox submit_action = {this.update_answer_handler} patient={patient} q_id={index} question={item}/>
        )
      case 'selector': 
        return( 
          <CustomSelector submit_action = {this.update_answer_handler} 
                          question={item} q_index={index}/>
        )
      case 'yes_no_details': 
        return(  
          <RadioDetails submit_action = {this.update_answer_handler} 
                        question={item} q_index={index}/>
        )
    } 
  }

  //TODO: change wording to title 
  render(){	
    const patient = this.state.items[this.state.ref_index]
    const questions = this.props.questions
 	  return(
      <div className="d-flex flex-column therapist-question-container">
        <h1> {this.state.ref_index+1} of {this.state.items.length} </h1>
        <div className="d-flex justify-content-start patient-refer-description">
          <span>Patient Profile Information:</span>
        </div>
        {questions.map((item, index)=> (this.map_question_to_view(item, index, patient)) )}
       <div className="d-flex patient-info-submit-btn-holder">
          <input id='submit_refer' className="patient-refer-submit-btn" onClick={this.submit_item_handler}  type="button" value="Submit and Continue"/>
        </div>
     </div>
		)
	}
}

const mapStateToProps = state => {
  const{therapist_reducer : {questions}}=state  
  return {
    questions:questions
  }
}

export default connect(mapStateToProps, {get_patient_info_questions}) (PatientInfo)
