import React, {Component} from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { update_patient_questions, move_next_step, create_patient_from_user,create_visit,update_bank_id,answer_current_question } from '../../actions/patient_action'
import { register_user, sign_in} from '../../actions/user_auth_action'
import { update_app_state } from '../../actions/'
import * as utils from '../../utils/common.js'

class PatientProfile extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
    this.state = {
      prv_state:this.props.patient_state
    }
  }

  //TODO: case to get this page -> california or have patient info 
  componentDidMount(){
    const {patient_state, update_patient_questions, question_bank_id} = this.props
    update_patient_questions(1)
    console.log("update patient question in profile")
    this.props.history.push("/patient/profile")
  }

  
  componentDidUpdate(){
    const {patient_state} = this.props

    if(patient_state!=this.state.prv_state){
      this.setState({prv_state: patient_state})
      this.props.history.push("/patient/profile")
    }
  }

  /*local event this*/
  next_step_handler=(e)=>{
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_selector_handler=(e)=>{
    console.log("set value check: ", e.target.value)
    answer_current_question(e.target.value)
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_bank_selector_handler=(e)=>{
    console.log("set value check: ", e.target.value)
    const {move_next_step, update_bank_id} = this.props
    update_bank_id(e.target.value)
    move_next_step(this.props.question_step)
  }

  did_create_patient = (state) => {
    this.props.register_user(state)
      .then(() => {return this.props.sign_in(state)})
        .then(() => { return this.props.create_patient_from_user() })
          .then( () => {return this.props.create_visit()} )
            .then(() => {return this.props.move_next_step(this.props.question_step)})}


  //Todo: update dynamic bounding by state
  //state global: patient local: profile/register profile/sign_in profile/questions
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler,
      set_selector_handler:this.set_selector_handler,
      set_bank_selector_handler:this.set_bank_selector_handler,
      did_create_patient: this.did_create_patient
    }
          
    return(
      <div>
        <div>
          {utils.map_type_to_component(this.props.questions, this.props.question_step, handlers)}
        </div>  
      </div>
    );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {

  const {
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_state, step, question_bank_id, questions, branch_questions, branch_step, branch_option, is_complete}
  } = state

  return {
    app_state: app_state,
    current_user: current_user,
    patient_state: patient_state,
    question_step: step,
    question_bank_id: question_bank_id,
    questions: questions,
    branch_questions: branch_questions,
    branch_step: branch_step,
    branch_option: branch_option,
    is_complete: is_complete
  }
}

export default withRouter(connect(mapStateToProps, {
update_app_state, update_patient_questions,register_user, sign_in, move_next_step, create_patient_from_user, create_visit, update_bank_id,answer_current_question
}) (PatientProfile))
