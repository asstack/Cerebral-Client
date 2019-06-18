import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as patient_actions from '../../actions/patient_action'
import * as global_actions from '../../actions/user_auth_action'
import * as api_actions from '../../middle/api'
import * as wrapper from '../../utils/wrapper.js'
import * as common from '../../utils/common.js'
import { Modal } from 'react-bootstrap'
import ReactGA from 'react-ga'

import Alert from 'react-s-alert'

//TODO: temporarily use modal for loading but may change to react component
class QuestionBank extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      bank_step:this.props.question_banks_step,
      banks:this.props.question_banks,
      bank_name:this.props.bank_name,
      question_step:this.props.question_step,
      questions:this.props.questions,
      is_loading:false
    }
    props.api_actions.api_reset()
    this.subscript_ref = React.createRef();
    this.title_ref = React.createRef();    
  }
 
  update_bank_state = () => {
    this.setState({bank_step:this.props.question_banks_step, 
                   bank_name:this.props.bank_name,
                   question_step:this.props.question_step,
                   banks:this.props.question_banks})
                }

  componentDidMount(){
    const {bank_name, question_banks_step, question_banks, patient_state, patient_actions} = this.props
    const step = this.props.question_banks_step;
    const url_info = this.props.location.pathname.split("/")[2];    
    
    if(!bank_name || url_info==='qualification'){ 
      //this.setState({bank_step:0})
      patient_actions.update_patient_question_banks(['qualification'], 0).then(() => {
        patient_actions.set_current_question_bank_by_name('qualification').then(resp => {
          this.setState({questions:resp.data, bank_step:0})
          //this.update_bank_state() 
        }) 
      })	
      
      if(url_info!=='qualification') this.props.history.push("/patient/qualification")
    }else if(bank_name === question_banks[step]){
      this.update_bank_state()
    }else if(question_banks && question_banks[step]){
      this.setState({bank_step:0})
      patient_actions.set_current_question_bank_by_name(question_banks[step]).then(resp => { 
        patient_actions.update_patient_state(question_banks[step])
        this.setState({questions:resp.data, bank_step:step})
        this.props.history.push(`/patient/${question_banks[step]}`) 
      }) 
    }
    //else need to redirect to somewhere..
  }

  componentDidUpdate(){

    const {bank_name, question_banks_step, question_banks, patient_actions} = this.props

    const url_info = this.props.location.pathname.split("/")[2];    
    if( url_info!=='qualification' && this.state.bank_step < question_banks_step){

      this.setState({bank_step:question_banks_step, is_loading:true})
      patient_actions.set_current_question_bank_by_name(question_banks[question_banks_step]).then(resp => { 

        setTimeout(console.log("set q bank did update"), 2000)
        this.setState({questions:resp.data, is_loading:false})
        this.update_bank_state()
        patient_actions.update_patient_state(question_banks[question_banks_step])
        this.props.history.push("/patient/"+question_banks[question_banks_step]) 
      })
    }else if(url_info!=='qualification' && this.state.bank_step > question_banks_step){
      this.setState({bank_step:question_banks_step})
      patient_actions.set_current_question_bank_by_name(question_banks[question_banks_step], true).then(resp => {

        patient_actions.update_patient_state(question_banks[question_banks_step])
        this.update_bank_state()
        this.setState({questions:resp.data})
        this.props.history.push("/patient/"+question_banks[question_banks_step]) 
      })
    }
  }


  componentWillReceiveProps = (next_props) => { 
  }



  /*local event this*/
  next_step_handler=(e)=>{
    this.patient_state_transition_helper();
  }

  set_selector_handler=(e, option)=>{
    const {patient_actions} = this.props

    this.patient_state_transition_helper();
    patient_actions.answer_current_question({answer: option.name}).then(() => {
      //return this.patient_state_transition_helper();
    })
  }

  //TODO: It is hacky way only for the demo
  submit_answer_and_next_step = (ans) => {
    const {patient_actions} = this.props
    this.patient_state_transition_helper()
    patient_actions.answer_current_question({answer: ans}).then(() => {
      //return this.patient_state_transition_helper(); 
    })  
  }

  submit_answer_and_next_step_2 = (ans) => {
    const {patient_actions} = this.props
    patient_actions.answer_current_question({answer: ans}).then(() => {
      return this.patient_state_transition_helper(); 
    }).catch((err) => {
        return this.patient_state_transition_helper(); 
    })
  }



  set_bank_selector_handler=(e, option)=>{

		const {question_banks_step, patient_actions} = this.props

    if (option.question_bank_names.length > 0) {
      if (option.immediate) {
        patient_actions.update_patient_question_banks(option.question_bank_names, 0).then(() => {
          this.props.history.push("/patient/"+option.question_bank_names[0]) 
          this.setState({bank_step:-1})
        })
      }else{
        if(!this.props.question_banks.includes(option.question_bank_names[0])){
          patient_actions.update_patient_question_banks([this.props.question_banks[0]].concat( option.question_bank_names), question_banks_step).then(()=>{
            if (option.name) patient_actions.update_service_line(option.name)	
            this.patient_state_transition_helper(); 
          })
        }else { 
          this.patient_state_transition_helper(); 
        }
     }
    }else this.patient_state_transition_helper();
  }
  
  did_create_patient = (state) => {
    const {patient_actions, global_actions}=this.props
    global_actions.register_and_set_user(state)
      .then(() => {return global_actions.sign_in(state)})
        .then(() => { return patient_actions.create_patient_from_user() })
      .then(() => { this.patient_state_transition_helper()
      })
      .catch((err) => {
        console.log(err)
      })
  }
   
  patient_state_transition_helper = () => {
    const {question_banks, question_banks_step, question_step, patient_actions} = this.props 
    const questions = this.state.questions
    if (this.props.api_middleware.status == 'REAUTH') {
      this.props.global_actions.remove_token()
      this.props.history.push("/patient/sign_in") 
    }
    else if(question_banks.length===question_banks_step+1 && questions.length === question_step+1){ 
      this.props.history.push("/patient/completed") 
    }else if(questions.length > question_step+1){ 
      patient_actions.set_step(question_step+1)
    }else{
      patient_actions.set_question_banks_step(question_banks_step+1)
    }
  }

  
  submit_and_upload_data = (data, type) => { 
    const {question_banks, question_banks_step, question_step, 
           patient_actions} = this.props
    const questions = this.state.questions 
    this.setState({is_loading:true}) 
    patient_actions.upload_object_for_current_question(data, type).then((resp) => {
      this.setState({is_loading:false}) 
      this.patient_state_transition_helper()
    })
      .catch((err) => {
        this.setState({is_loading:false}) 
        this.patient_state_transition_helper()
      })
  }

  sign_in_and_next = (info) => { 
    const {patient_actions, global_actions} = this.props

    global_actions.sign_in(info).then ((resp) => {
      if (resp.user_attr.patient) {
        patient_actions.set_patient(resp.user_attr.patient);
        patient_actions.ensure_visit(true).then((visit) => {
          this.patient_state_transition_helper()
        })
      }
    }).catch((err) => {
      Alert.error(err.message)
    })
  }


  modal = ({ open, close, message}) => (
    <Modal className="loading-modal" show={open} onHide={() => console.log("cannot close")}>
          <Modal.Body className="loading-modal-body">
            <div className="spinner-border loading-icon-color" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Modal.Body>
    </Modal>
  )
 
 
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler.bind(this),
      set_selector_handler:this.set_selector_handler.bind(this),
      set_bank_selector_handler:this.set_bank_selector_handler.bind(this),
      did_create_patient: this.did_create_patient.bind(this),
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_answer_and_next_step_2: this.submit_answer_and_next_step_2.bind(this),
      submit_and_upload_data:this.submit_and_upload_data.bind(this),
      patient_sign_in:this.sign_in_and_next.bind(this)
    }
    const question = this.state.questions[this.props.question_step]

    //TODO: using ref to change title and subtitle in child component, but it's hacky way. will take that part as a component 
    const component = common.map_type_to_component(question, handlers, this.props.user, this.subscript_ref, this.title_ref, this.props.q_number_ref)
    const QuestionsWrapper = wrapper.questions_wrapper(component, question, this.state, this.subscript_ref, this.title_ref) 
    return(
      <div className="d-flex flex-row justify-content-center">
        <QuestionsWrapper/>  
        {this.state.is_loading?this.modal({open:true}): null}
      </div>
    );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {
  const {
    api_middleware: api_middleware,
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_object, question_banks,question_banks_step, patient_state, step, question_bank_id,current_bank_name}
  } = state

  return {
    user: current_user,
    app_state: app_state,
    api_middleware: api_middleware,
		question_banks: question_banks,
    question_banks_step: question_banks_step,
    current_user: current_user,
    patient_state: patient_state,
    patient_object: patient_object,
    question_step: step,
    question_bank_id: question_bank_id,
    bank_name:current_bank_name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    patient_actions: bindActionCreators(patient_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch),
    api_actions: bindActionCreators(api_actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (QuestionBank))


