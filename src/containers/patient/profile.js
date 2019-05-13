import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {update_patient_state, move_next_step, create_patient_from_user,create_visit,update_patient_type,answer_current_question } from '../../actions/patient_action'
import { register_user, sign_in} from '../../actions/user_auth_action'
import { update_app_state } from '../../actions/'
import * as utils from '../../utils/common.js'
import ReactGA from 'react-ga'

class PatientProfile extends Component{
  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/PatientProfile');
  }

  componentDidUpdate(){
    const {update_patient_state, question_bank_id, patient_state, is_complete} = this.props
    if(is_complete){
      update_patient_state('assessment')
    }
    /*
    if(patient_state!==this.state.prv_state){
      this.setState({prv_state: patient_state})
      this.props.history.push("/patient/profile")
    }
    */
  }

  /*local event this*/
  next_step_handler=(e)=>{
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_selector_handler=(e, option)=>{
    const {move_next_step, answer_current_question} = this.props
    answer_current_question(option.option_name)
    move_next_step(this.props.question_step)
  }

  submit_answer_and_next_step = (ans) => {
		const {move_next_step, answer_current_question} = this.props
    answer_current_question(ans) 
		move_next_step(this.props.question_step)
  }

  set_bank_selector_handler=(e, option)=>{

		const { answer_current_question, set_current_question_bank_by_name, move_next_step, update_patient_question_banks, update_patient_type} = this.props

    answer_current_question(option.option_name) 

	  if (option.question_bank_names.length > 0) {
			if (option.immediate) {
				update_patient_question_banks(option.question_bank_names)
				set_current_question_bank_by_name(option.question_bank_names[0])
			}
			else {
        //TODO: Same with qualification.js. need to use react for functional
				update_patient_question_banks(this.props.question_banks.concat( option.question_bank_names))
			}
		}

		update_patient_type(option.option_name)	
		move_next_step(this.props.question_step)
  }

  did_create_patient = (state) => {
    this.props.register_user(state)
      .then(() => {return this.props.sign_in(state)})
        .then(() => { return this.props.create_patient_from_user() })
          .then( () => {return this.props.create_visit()} )
            .then(() => {return this.props.move_next_step(this.props.question_step)})
      .catch((err) => {
        console.log(err)
      })
    }


	display_title = (questions, step) =>{
		if(questions && questions[step]){
			return questions[step].title
		}
	}


  //Todo: update dynamic bounding by state
  //state global: patient local: profile/register profile/sign_in profile/questions
  render(){
    const handlers = {
      next_step_handler:this.next_step_handler,
      set_selector_handler:this.set_selector_handler,
      set_bank_selector_handler:this.set_bank_selector_handler,
      did_create_patient: this.did_create_patient,
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this)
    }
    
    return(
		  <div className="d-flex flex-column">
        <div className="d-flex flex-column question-container">
					<div className="d-flex justify-content-center text-big">
            <p>{this.display_title(this.props.questions, this.props.question_step)}</p>
          </div>
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
update_app_state, register_user, sign_in, move_next_step, create_patient_from_user, create_visit, update_patient_type,answer_current_question, update_patient_state}) (PatientProfile))
