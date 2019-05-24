import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {set_question_banks_step, set_step, set_current_question_bank_by_name, update_patient_question_banks, upload_object_for_current_question, update_patient_state, create_patient_from_user,create_visit,update_service_line,answer_current_question } from '../../actions/patient_action'
import { register_user, sign_in} from '../../actions/user_auth_action'
import * as wrapper from '../../utils/wrapper.js'
import * as common from '../../utils/common.js'
import ReactGA from 'react-ga'


class QuestionBank extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      bank_step:this.props.question_banks_step,
      banks:this.props.question_banks,
      bank_name:this.props.bank_name,
      question_step:this.props.question_step
    }
  }
 
  update_bank_state = () => {
    this.setState({bank_step:this.props.question_banks_step, 
                   bank_name:this.props.bank_name,
                   banks:this.props.question_banks})}

  componentDidMount(){
    const {bank_name, question_banks_step, question_banks, patient_state, update_patient_state} = this.props
    const step = this.props.question_banks_step;
    const url_info = this.props.location.pathname.split("/")[2];    
    if(!bank_name || url_info==='qualification'){ 
      this.props.update_patient_question_banks(['qualification'], 0)		
      this.props.set_current_question_bank_by_name('qualification') 
      this.update_bank_state() 
      if(url_info!=='qualification') this.props.history.push("/patient/qualification")
    }else if(bank_name === question_banks[step]){
      this.update_bank_state()
    }else if(question_banks && question_banks[step]){
      update_patient_state(question_banks[step])
      this.props.set_current_question_bank_by_name(question_banks[step]) 
      this.props.history.push(`/patient/${question_banks[step]}`) 
    }
    //else need to redirect to somewhere..
  }

  componentDidUpdate(){
    const {bank_name, question_banks_step, question_banks, update_patient_state} = this.props

    if(this.state.bank_step!==question_banks_step){
      this.update_bank_state()
      update_patient_state(question_banks[question_banks_step])
      this.props.set_current_question_bank_by_name(question_banks[question_banks_step]) 
      this.props.history.push("/patient/"+question_banks[question_banks_step]) 
    }
  }

  /*local event this*/
  next_step_handler=(e)=>{
    this.patient_state_transition_helper();
  }

  set_selector_handler=(e, option)=>{
    const {answer_current_question} = this.props
    answer_current_question({answer: option.name}).then(() => {
      return this.patient_state_transition_helper();
    })
  }

  submit_answer_and_next_step = (ans) => {
    this.props.answer_current_question({answer: ans}).then(() => {
      return this.patient_state_transition_helper();
    })
  }

  set_bank_selector_handler=(e, option)=>{

		const {question_banks_step, answer_current_question, set_current_question_bank_by_name, update_patient_question_banks, update_service_line} = this.props
    answer_current_question({answer: option.name}).then(() => {

      if (option.question_bank_names.length > 0) {
        if (option.immediate) {
          update_patient_question_banks(option.question_bank_names, 0)
          this.state.bank_step=null
          this.props.history.push("/patient/"+option.question_bank_names[0]) 
        }
        else {
          update_patient_question_banks(this.props.question_banks.concat( option.question_bank_names), question_banks_step)
          if (option.name) update_service_line(option.name)	
          this.patient_state_transition_helper();
        }
      }else this.patient_state_transition_helper();
    })
  }
  
  did_create_patient = (state) => {
    const service_line = this.props.service_line.id;
    this.props.register_user(state)
      .then(() => {return this.props.sign_in(state)})
        .then(() => { return this.props.create_patient_from_user() })
          .then( () => {return this.props.create_visit(service_line)})
            .then(() => {this.patient_state_transition_helper()})
      .catch((err) => {
        console.log(err)
      })
  }
   
  patient_state_transition_helper = () => {
    const {question_banks, question_banks_step, questions, question_step,
           set_step, set_question_banks_step} = this.props 
    if(question_banks.length===question_banks_step+1 && questions.length === question_step+1){ 
      this.props.history.push("/patient/completed") 
    }else if(questions.length > question_step+1){ 
      this.props.set_step(question_step+1)
    }else{
      this.props.set_question_banks_step(question_banks_step+1)
    }
  }


  submit_and_upload_data = (data, type) => { 
    const {question_banks, question_banks_step, questions, question_step, 
           upload_object_for_current_question} = this.props
    
    upload_object_for_current_question(data, type).then(() => {
      this.patient_state_transition_helper()
    })
  }
  
 
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler.bind(this),
      set_selector_handler:this.set_selector_handler.bind(this),
      set_bank_selector_handler:this.set_bank_selector_handler.bind(this),
      did_create_patient: this.did_create_patient.bind(this),
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_and_upload_data:this.submit_and_upload_data.bind(this)
    }
    const question = this.props.questions[this.props.question_step]

    const component = common.map_type_to_component(question, handlers)
    const QuestionsWrapper = wrapper.questions_wrapper(component, this.props.questions, this.state) 
    return(
      <QuestionsWrapper/> 
    );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {

  const {
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_object, service_line, question_banks,question_banks_step, patient_state, step, question_bank_id, questions, current_bank_name, is_complete}
  } = state

  return {
    app_state: app_state,
		question_banks: question_banks,
    question_banks_step: question_banks_step,
    current_user: current_user,
    service_line: service_line,
    patient_state: patient_state,
    patient_object: patient_object,
    question_step: step,
    question_bank_id: question_bank_id,
    bank_name:current_bank_name,
    questions: questions,
    is_complete: is_complete
  }
}

export default withRouter(connect(mapStateToProps, {set_question_banks_step, set_step, update_patient_question_banks,upload_object_for_current_question, register_user, sign_in, create_patient_from_user, create_visit, update_service_line,answer_current_question, update_patient_state,set_current_question_bank_by_name}) (QuestionBank))
