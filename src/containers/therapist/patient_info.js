import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import CustomSelector from '../../components/question_types/custom_selector'
import RadioDetails from '../../components/question_types/radio_details'
import TherapistPatientsInfo from '../../components/question_types/therapist_patients_info'
import TherapistCheckbox from '../../components/question_types/therapist_checkbox'
import Alert from 'react-s-alert'

//get submit and skip handler
class PatientInfo extends Component {
	constructor(props){
		super(props)
		this.state = {
      msg:null,
      items: this.props.patients_info,
      ref_index:this.props.ref_index,
      answers:[],
      questions:this.props.questions
		}
	}


  //TODO: use id or name from question 
  clean_up_answers = () => {  
   
    this.setState({answers: [{name: 'phone', answers: null}, {name: 'referral_reason', answers: null},
                             {name: 'referral_how_long', answers:null}, {name: 'referral_support_network', answers:'NO'},
                             {name: 'referral_danger', answers:'NO'}, {name: 'referral_notes', answers:'NO'}] 
    })
  }
  
  shouldComponentUpdate=()=>{
    return false
  }
 

  //answers->1d matrix  ref_index*questions
  componentDidMount(){
    this.clean_up_answers()
    if(!this.state.items){
      //redirect to somewhere
    }
    this.props.actions.get_patient_info_questions(4)
  }
  
  componentWillReceiveProps = (next_props) => { 
    this.setState({questions:next_props.questions}) 
    this.forceUpdate() 
  }

  update_answer_handler = (value, index)=>{
    let prv_answer = this.state.answers
    prv_answer[index].answers = value

    this.setState({answers:prv_answer})
    this.props.actions.update_refer_answers(prv_answer)
  }

  submit_item_handler = () =>{

    const answers = this.state.answers
    let patient = this.state.items[this.state.ref_index]
    let warning_msg=null
    let i =0;
    //TODO: temporarily use this code for checking required answers. However, we need to add req option in question object and update code
    for(i = 0; i < answers.length; i++){
      if((answers[i].name==='referral_reason' || answers[i].name==='referral_how_long') && answers[i].answers===null)(
        warning_msg="Please answer all required questions" 
      ) 
    }
  
    if(warning_msg){
      this.setState({msg:warning_msg}) 
      Alert.info(warning_msg) 
    }else{
      patient.skip_password_validation=true
      this.props.actions.refer_patient(patient, answers)
      this.clean_up_answers() 
     
      if(this.state.ref_index===this.state.items.length-1){
        this.props.actions.clean_refer_data()
        this.props.complete_action("complete")
      }else{
        this.setState({ref_index:this.state.ref_index+1})  
        this.props.actions.update_refer_index(this.state.ref_index+1)
        this.props.actions.update_refer_answers(null)
        this.forceUpdate()
        window.scrollTo(0, 0);
      } 
    }
  }

  //TODO: we can use wrapped components since they have same props
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
                          question={item} q_id={index}/>
        )
      case 'yes_no_details': 
        return(  
          <RadioDetails submit_action = {this.update_answer_handler} 
                        question={item} q_id={index}/>
        )
    } 
  }

  view = (patient, questions) => {
    return (
      <div className="container-progress">
        <div className="d-flex flex-column patient-info-background">
          <div className="d-flex justify-content-center flex-row menu-bar">
            <div className= "col d-flex justify-content-between solid-border-bottom__unselected text-small__unselected menu-bar-item-holder">
              <img src={process.env.PUBLIC_URL + '/img/arrow.png'} onClick={e => this.props.update_type_handler('cover')} className="arrow-btn"/>
              <div className="align-self-end menu-item">  Therapist Information </div>
              <div></div>
            </div>      
            <div className= "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder">
              <div></div>
              <div className="align-self-end menu-item">  Patient Information </div>
              <div></div>
            </div>       
          </div>
          <div className="d-flex flex-column justify-content-start">
            <div className="patient-info-title">Patient Referral Information</div> 
            <div className="patient-info-indicator">Please complete the following patient information for each referred patient. </div>
          </div>
        <div className="d-flex flex-column therapist-info-container">
          <div className="d-flex justify-content-start patient-info-description align-items-center">
            <span> 
              {"PATIENT "+ (this.state.ref_index+1) +" of "+ this.state.items.length+": "+patient.first_name +" "+ patient.last_name} 
            </span>
          </div>
          {questions?questions.map((item, index)=> (this.map_question_to_view(item, index, patient)) ):null}
          <div className="d-flex flex-column patient-info-submit-btn-holder">
            {this.state.msg?
              <div className="d-flex justify-content-center text-small-red">
                {this.state.msg}</div>:null}
            <input id='submit_refer' className="patient-refer-submit-btn" onClick={this.submit_item_handler}  type="button" value="Submit patient information >"/>
          </div>
       </div>	
      </div>    
     </div>
    )
  }


  //TODO: change wording to title 
  render(){	
    const patient = this.state.items[this.state.ref_index]
    const questions = this.state.questions
 	  return(
      this.view(patient, questions) 
    )
	}
}

const mapStateToProps = state => {
  const{therapist_reducer : {questions}}=state  
  return {
    questions:questions
  }
}

export default connect(mapStateToProps, null) (PatientInfo)
