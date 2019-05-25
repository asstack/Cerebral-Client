import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as patient_actions from '../../actions/patient_action'
import * as global_actions from '../../actions/user_auth_action'
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
                   question_step:this.props.question_step,
                   banks:this.props.question_banks})}

  componentDidMount(){
    const {bank_name, question_banks_step, question_banks, patient_state, patient_actions} = this.props
    const step = this.props.question_banks_step;
    const url_info = this.props.location.pathname.split("/")[2];    
    
    if(!bank_name || url_info==='qualification'){ 
      patient_actions.update_patient_question_banks(['qualification'], 0)		
      patient_actions.set_current_question_bank_by_name('qualification') 
      this.update_bank_state() 
      if(url_info!=='qualification') this.props.history.push("/patient/qualification")
    }else if(bank_name === question_banks[step]){
      this.update_bank_state()
    }else if(question_banks && question_banks[step]){
      patient_actions.update_patient_state(question_banks[step])
      patient_actions.set_current_question_bank_by_name(question_banks[step]) 
      this.props.history.push(`/patient/${question_banks[step]}`) 
    }
    //else need to redirect to somewhere..
  }

  componentDidUpdate(){
    const {bank_name, question_banks_step, question_banks, patient_actions} = this.props

    if(this.state.bank_step!==question_banks_step){
      this.update_bank_state()
      patient_actions.update_patient_state(question_banks[question_banks_step])
      patient_actions.set_current_question_bank_by_name(question_banks[question_banks_step]) 
      this.props.history.push("/patient/"+question_banks[question_banks_step]) 
    }
  }

  /*local event this*/
  next_step_handler=(e)=>{
    this.patient_state_transition_helper();
  }

  set_selector_handler=(e, option)=>{
    const {patient_actions} = this.props
    patient_actions.answer_current_question({answer: option.name}).then(() => {
      return this.patient_state_transition_helper();
    })
  }

  submit_answer_and_next_step = (ans) => {
    const {patient_actions} = this.props
    console.log("submit_answer",patient_actions)
    patient_actions.answer_current_question({answer: ans}).then(() => {
      return this.patient_state_transition_helper();
    })
  }

  set_bank_selector_handler=(e, option)=>{

		const {question_banks_step, patient_actions} = this.props
    patient_actions.answer_current_question({answer: option.name}).then(() => {

      if (option.question_bank_names.length > 0) {
        if (option.immediate) {
          patient_actions.update_patient_question_banks(option.question_bank_names, 0)
          this.state.bank_step=null
          this.props.history.push("/patient/"+option.question_bank_names[0]) 
        }
        else {
          patient_actions.update_patient_question_banks(this.props.question_banks.concat( option.question_bank_names), question_banks_step)
          if (option.name) patient_actions.update_service_line(option.name)	
          this.patient_state_transition_helper();
        }
      }else this.patient_state_transition_helper();
    })
  }
  
  did_create_patient = (state) => {
    const service_line = this.props.service_line.id;
    const {patient_actions, global_actions}=this.props
    global_actions.register_user(state)
      .then(() => {return global_actions.sign_in(state)})
        .then(() => { return patient_actions.create_patient_from_user() })
          .then( () => {return patient_actions.create_visit(service_line)})
            .then(() => {this.patient_state_transition_helper()})
      .catch((err) => {
        console.log(err)
      })
  }
   
  patient_state_transition_helper = () => {
    const {question_banks, question_banks_step, questions, question_step, patient_actions} = this.props 
    if(question_banks.length===question_banks_step+1 && questions.length === question_step+1){ 
      this.props.history.push("/patient/completed") 
    }else if(questions.length > question_step+1){ 
      patient_actions.set_step(question_step+1)
    }else{
      patient_actions.set_question_banks_step(question_banks_step+1)
    }
  }


  submit_and_upload_data = (data, type) => { 
    const {question_banks, question_banks_step, questions, question_step, 
           patient_actions} = this.props
    
    patient_actions.upload_object_for_current_question(data, type).then(() => {
      this.patient_state_transition_helper()
    })
  }

  sign_in_and_next = (info) => { 
    const {patient_actions, global_actions} = this.props
    global_actions.sign_in(info).then ((resp) => {
      if (resp.user_attr.patient) {
        patient_actions.set_patient(resp.user_attr.patient);
        patient_actions.get_patient_most_recent_visits(resp.user_attr.patient).then((visits) => {
          patient_actions.set_visit(visits[0])
          this.patient_state_transition_helper()
        })
      }
    }) 
  }
  
 
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler.bind(this),
      set_selector_handler:this.set_selector_handler.bind(this),
      set_bank_selector_handler:this.set_bank_selector_handler.bind(this),
      did_create_patient: this.did_create_patient.bind(this),
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_and_upload_data:this.submit_and_upload_data.bind(this),
      patient_sign_in:this.sign_in_and_next.bind(this)
    }
    const question = this.props.questions[this.props.question_step]

    const component = common.map_type_to_component(question, handlers)
    const QuestionsWrapper = wrapper.questions_wrapper(component, question, this.state) 
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

const mapDispatchToProps = (dispatch) => {
  return {
    patient_actions: bindActionCreators(patient_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (QuestionBank))


