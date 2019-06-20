import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as patient_actions from '../../actions/patient_action'
import * as global_actions from '../../actions/user_auth_action'
import * as api_actions from '../../middle/api'
import * as wrapper from '../../utils/wrapper.js'
import * as common from '../../utils/common.js'
import { createModal } from 'react-modal-promise'
import { Modal } from 'react-bootstrap'
import uuidv1 from 'uuid'
import ReactGA from 'react-ga'
import Alert from 'react-s-alert'


const MyModal = ({ open, close, message}) => (
  <Modal show={open} onHide={() => close()}>
    <Modal.Header closeButton>
      <Modal.Title>Resume Assessment</Modal.Title>
    </Modal.Header>
    <Modal.Body>It looks like you were in the process of completing an assessment process. Would you like to begin where you left off?</Modal.Body>
    <Modal.Footer>
      <button variant="secondary" onClick={() => close(false)}>
        No
      </button>
      <button variant="primary" onClick={() => close(true)}>
        Yes
      </button>
    </Modal.Footer>
  </Modal>
)

const myPromiseModal = createModal(MyModal)


//TODO: temporarily use modal for loading but may change to react component
class QuestionBank extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      bank_step:0,
      banks:[],
      question_step:0,
      questions:[],
      width: window.innerWidth,
      visit:[],
      is_loading:false,
      is_ready:false,
      is_subcomp:false,
    }
    props.api_actions.api_reset()
    this.subscript_ref = React.createRef();
    this.title_ref = React.createRef();    
  }
  
  update_and_set_question = (bank_name, index, is_last=false) => {
    const {patient_actions} = this.props
    patient_actions.update_patient_question_banks([bank_name], 0).then(() => {
      patient_actions.set_current_question_bank_by_name(bank_name, is_last).then(resp => {
        this.setState({is_ready:true})
      })
    })  
  }

  //TODO: checking visit is not clear.
  componentDidMount(){
    const url_info = this.props.location.pathname.split("/")[3];    
    if(!this.props.user['access-token']){
      this.update_and_set_question('qualification', 0); 
      if(url_info!=='qualification'){  
        this.props.history.push("/patient/question_bank/qualification") 
      } 
    }else{
      if(url_info==='qualification'){
        //TODO: create new visit and start from profile 
        if(!this.props.questions){
          this.update_and_set_question('profile', 0)  
          this.props.history.push("/patient/quesion_bank/profile") 
        }else{
          return myPromiseModal({open:true}).then(value=>{
            if(!value){
              this.update_and_set_question('profile',0) 
              this.props.history.push("/patient/question_bank/profile") 
            }else{  
              let bank_name = this.props.question_banks[this.props.question_banks_step]
              this.props.history.push("/patient/question_bank/"+bank_name) 
              this.setState({is_ready:true})
            } 
          }) 
        }
      }else{
        let bank_name = this.props.question_banks[this.props.question_banks_step]
        if(url_info !== bank_name){ 
          this.props.history.push("/patient/question_bank/"+bank_name) 
        }
        this.setState({is_ready:true})
        //if ensure visit
        // modal to ask  
        //else
        // create_new_visit and set qualification
      }  
    }  
  }

  componentDidUpdate(){

    //window.addEventListener("resize", this.update_width_handler);
  }
  
  //TODO: redux storage bank name is not correct
  componentWillReceiveProps = (next_props) => { 
    this.setState({visit: next_props.visit, questions:next_props.questions, question_step:next_props.question_step, bank_step:next_props.question_banks_step, banks:next_props.question_banks, is_subcomp:false})

  }


  componentWillUnmount(){
    //window.removeEventListener('resize', this.update_width_handler);
  }
  
  shouldComponentUpdate(next_props, next_state){
    return !next_state.is_subcomp  
  }

  skip_questions = (step, skip_step) => {  
    let q_type = this.state.questions[step].question_type;
    if(q_type==='create_profile' && this.props.user['access-token']){
      this.props.patient_actions.set_step(skip_step);
    }else if(q_type==='dosage_preference' && this.props.user['access-token']){
      this.props.patient_actions.get_current_answer_by_name('medication_preference').then(resp => {
        if(!resp.response){ 
          if(this.state.questions.length > skip_step+1){
            this.props.patient_actions.set_step(skip_step);
          }else{
            this.props.patient_actions.set_current_question_bank_by_name(this.state.banks[this.state.bank_step+1], false, this.state.bank_step+1)
          }
        }else{
          this.props.patient_actions.set_step(step);
        } 
      })  
    }else{ 
      this.props.patient_actions.set_step(step);
    }
   }

  back_btn_handler = () => {
    const {questions, banks, bank_step, question_step, is_subcomp} = this.state
    if(is_subcomp){
      this.setState({is_subcomp:false}) 
    }else{
      if(question_step > 0){
        //just change the step  
        this.skip_questions(question_step-1, question_step-2);   
      }else if(question_step === 0 && bank_step > 0){
        this.props.patient_actions.set_current_question_bank_by_name(banks[bank_step-1], true, bank_step-1)
      }
    }
  }
   
  patient_state_transition_helper = () => {
    const {questions, banks, bank_step, question_step} = this.state
    
    if(banks.length===bank_step+1 && questions.length === question_step+1){ 
      this.props.history.push("/patient/completed") 
      this.props.patient_actions.clean_up_patient_process()
    }else if(questions.length > question_step+1){ 
      this.skip_questions(question_step+1, question_step+2);
    }else{
      this.props.patient_actions.set_current_question_bank_by_name(banks[bank_step+1], false, bank_step+1)
    }
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
    patient_actions.answer_current_question({answer: ans}).then(() => {
      this.patient_state_transition_helper()
      //return this.patient_state_transition_helper(); 
    })  
  }


  //TODO: now assuming service_line selector only use !option.immediate. we may make special question type for service_line selector 
  set_bank_selector_handler=(e, option)=>{

		const {question_banks_step, patient_actions} = this.props

    if (option.question_bank_names.length > 0) {
      if (option.immediate) {
        patient_actions.update_patient_question_banks(option.question_bank_names, 0).then(() => {
          patient_actions.set_current_question_bank_by_name(option.question_bank_names[0]).then(resp=> 
            this.props.history.push("/patient/question_bank/"+option.question_bank_names[0]) 
          )
        })
      }else{
        //TODO: I am using this line only for service line selector
        if(!this.props.question_banks.includes(option.question_bank_names[0])){
          patient_actions.update_patient_question_banks([this.props.question_banks[0]].concat(option.question_bank_names), question_banks_step).then(()=>{
            if (option.name) patient_actions.update_service_line(option.name)	 
            if (this.props.user['access-token']){
              if(!this.state.visit || this.state.visit.service_line.name!==option.name){
                patient_actions.create_visit(option.name) 
              }
            }
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

    this.setState({is_loading:true}) 
    global_actions.register_and_set_user(state)
      .then(() => {return global_actions.sign_in(state)})
        .then(() => { return patient_actions.create_patient_from_user() })
          .then(() => { 
            this.patient_state_transition_helper() 
            this.setState({is_loading:false}) 
          })
      .catch((err) => {
        console.log(err)
        this.setState({is_loading:false}) 
      })
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

    this.setState({is_loading:false}) 
    global_actions.sign_in(info).then ((resp) => {
      if (resp.user_attr.patient) {
        patient_actions.set_patient(resp.user_attr.patient);
        patient_actions.ensure_visit(true).then((visit) => {
          this.patient_state_transition_helper()
          this.setState({is_loading:false}) 
        })
      }
    }).catch((err) => {
      Alert.error(err.message)
      this.setState({is_loading:false}) 
    })
  }

  //TODO: check components that has child components and save the status for rerendering (mobile view, back btn, or something), will be deprecated if we use tree structure for questions
  set_subcomp_handler = (flag) => {
    this.setState({is_subcomp:flag}) 
  }

  //---------------- view ------------------//
  progress_modal = ({ open, close, message}) => (
    <Modal className="loading-modal" show={open} onHide={() => console.log("cannot close")}>
          <Modal.Body className="loading-modal-body">
            <div className="spinner-border loading-icon-color" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Modal.Body>
    </Modal>
  )
  
  progress_menu = (bank_name, index) => {
    return (
      <div key={uuidv1()} className= {this.map_type_to_style_class(this.props.question_banks_step, index)}>
         {index===0?<img src={process.env.PUBLIC_URL + '/img/arrow.png'} className="arrow-btn" onClick={this.back_btn_handler}/>:<div></div>}
         <div className="align-self-end menu-item"> {this.question_bank_title(this, bank_name)} </div>
         <div></div>
      </div>
    )
  }

  single_progress_menu = (bank_name) => {
    return (
       <div className= "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder">
         <img src={process.env.PUBLIC_URL + '/img/arrow.png'} className="arrow-btn" onClick={this.back_btn_handler}/>
         <div className="align-self-end menu-item"> {this.question_bank_title(this, bank_name)} </div>
         <div></div>
      </div> 
    )
  }

  non_progress_view = (component, question) => {

    const QuestionsWrapper = wrapper.questions_wrapper(component, question, this.state, this.subscript_ref, this.title_ref) 
    return(
      <div className="d-flex flex-column container-noprogress">
        <div className="d-flex flex-row justify-content-left therapist-header">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <QuestionsWrapper/>  
        </div>
      </div>
    )	 
  }

  progress_view =  (component, question) => {

    const q_bank = this.state.banks[this.state.bank_step]
    const QuestionsWrapper = wrapper.questions_wrapper(component, question, this.state, this.subscript_ref, this.title_ref) 
    let total = this.state.questions.length
    let step = this.state.question_step+1
    if(q_bank === 'anxiety_mha' || q_bank === 'insomnia_a' || q_bank==='checkout'){
      step--; 
      total--;
    }
    let wording = step>0? "QUESTION "+step+" OF "+ total:"";
    if(q_bank==='checkout' && step===0){
      wording = "Identity Verification"
    }
    return( 
      <div className="container-progress">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center flex-row menu-bar">
            {this.state.width>820? this.state.banks.map((item, index) => (this.progress_menu(item, index))) : this.single_progress_menu(q_bank) }
          </div>
          <div className="d-flex flex-column question-container">
            <div className="d-flex justify-content-left text-middle">{wording}</div>
            <div className="questions-container">

            <div className="d-flex flex-row justify-content-center">
              <QuestionsWrapper/>  
              {this.state.is_loading?this.progress_modal({open:true}): null}
            </div>
           </div>
          </div>
        </div>    
      </div>
    )   
  }

  mobile_progress_view = (component) => {
  
  
  }

  question_bank_title = (that, bank_name) => {
    // look up question bank title in that.props.question_bank_objects
    return that.props.question_bank_objects.filter(qbo => qbo.name == bank_name)[0].title
  }
 
  map_type_to_style_class = (state, target) => {
    if(state === target){
      return "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder";
    }else{
      return "col d-flex justify-content-between solid-border-bottom__unselected text-small__unselected menu-bar-item-holder";
    }
  }
  
 
  type_to_view = (component, question) => {

    let bank_len = this.state.banks.length
    if(this.state.is_ready && bank_len === 1){
      return this.non_progress_view(component, question)
    }else if(this.state.is_ready && bank_len > 1){ 
      return this.progress_view(component, question)  
    }else return null 
  }
 
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler.bind(this),
      set_selector_handler:this.set_selector_handler.bind(this),
      set_bank_selector_handler:this.set_bank_selector_handler.bind(this),
      did_create_patient: this.did_create_patient.bind(this),
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_and_upload_data:this.submit_and_upload_data.bind(this),
      patient_sign_in:this.sign_in_and_next.bind(this),
      set_subcomp:this.set_subcomp_handler.bind(this)
    }

    //TODO: using ref to change title and subtitle in child component, but it's hacky way. will take that part as a component 
    const question = this.state.questions[this.state.question_step]
    const component = common.map_type_to_component(question, handlers, this.props.user, this.subscript_ref, this.title_ref)
    return(
      this.type_to_view(component, question)
   );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {
  const {
    patient_reducer: {questions, visit_object, question_banks, question_bank_objects, question_banks_step, patient_state, step, question_bank_id}
  } = state

  return {
    patient_state: patient_state,
		question_banks: question_banks,
    visit: visit_object,
    question_bank_objects: question_bank_objects,
    question_banks_step: question_banks_step,
    question_step: step, 
		questions: questions,
    question_bank_id: question_bank_id,
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

