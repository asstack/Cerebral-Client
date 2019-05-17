import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {upload_photo_id, set_current_question_bank_by_name, update_patient_question_banks, update_patient_questions, move_next_step, create_patient_from_user,create_visit,update_service_line,answer_current_question } from '../../actions/patient_action'
import { register_user, sign_in} from '../../actions/user_auth_action'
import { update_app_state } from '../../actions/'
import * as utils from '../../utils/common.js'
import ReactGA from 'react-ga'

class ShippingPayment extends Component{
	//in here, will call componentDidMount and route for profile, assessment, treatment, verification and shipping]
	//route will state/number or state/ for init assessment
	constructor(props){
		super(props)
		this.state = {
			step: 0,
			title: ''
		}
	}

	componentDidMount(){
    /*
		ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/ShippingPayment');
    */	
		const {update_patient_questions, update_patient_question_banks} = this.props
		
		update_patient_question_banks(['checkout'])
		
		// TODO: we should wait for the question banks to load then get the id of the first
		update_patient_questions(4)
	}

	//TODO: move checking part to action and middleware
	componentDidUpdate(){
		if(this.props.is_complete){
			const {update_app_state} = this.props

			// TODO: changing the app state here causes a new object to load
			// update_app_state("patient")		
		}
	}

	next_step_handler=(e)=>{
		const {move_next_step} = this.props
		move_next_step(this.props.question_step)
	}

	set_selector_handler=(option)=>{
		const {move_next_step, answer_current_question} = this.props
		answer_current_question(option.option_name)
		move_next_step(this.props.question_step)
	}

  submit_answer_and_next_step = (e, ans) => {
		const {move_next_step, answer_current_question} = this.props
    answer_current_question(ans) 
		move_next_step(this.props.question_step)
  }

	// TODO: REMOVE
	set_bank_selector_handler=(e, option)=>{
		const { answer_current_question, set_current_question_bank_by_name, move_next_step, update_patient_question_banks, update_service_line} = this.props

    answer_current_question(option.option_name) 
		if (option.question_bank_names.length > 0) {
			if (option.immediate) {
				// replace current questions banks with the new ones
				update_patient_question_banks(option.question_bank_names)
				set_current_question_bank_by_name(option.question_bank_names[0])
			}
			else {
        //TODO: Need to update code to use react not redux, it makes component use shared state
				// append question banks to the end
				update_patient_question_banks(this.props.question_banks.concat( option.question_bank_names))
			}
		}
    
    update_service_line(option.name)	
		move_next_step(this.props.question_step)
	}
  
  submit_and_upload_id = (data, type) => { 
    const { upload_photo_id, move_next_step, answer_current_question,
            current_user} = this.props
    //upload_photo_id(current_user.attributes.id, data, type)
    move_next_step(this.props.question_step)
  }

	display_title = (questions, step) =>{
		if(questions[step]){
			return questions[step].title
		}
	}

	//TODO: next step hanlder should be replaced to proper event this
	did_create_patient = (state) => {

		this.props.register_user(state)
			.then(() => {return this.props.sign_in(state)})
				.then(() => { return this.props.create_patient_from_user() })
					.then( () => {return this.props.create_visit()} )
						.then(() => {return this.props.move_next_step(this.props.question_step)})
	}


	//Todo: update dynamic bounding by state
	//state global: patient local: profile/register profile/sign_in profile/questions
	render(){
		const handlers = {
			next_step_handler:this.next_step_handler,
			set_selector_handler:this.set_selector_handler,
			set_bank_selector_handler:this.set_bank_selector_handler,
			did_create_patient: this.did_create_patient,
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_and_upload_id:this.submit_and_upload_id.bind(this)
		}

		return(
			<div className="d-flex flex-column">
					<div className="d-flex flex-row">
						<div className="p-2">
							<div className="btn-arrow link-type1">
							Cerebral
							</div>
						</div>
					</div>
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

const mapStateToProps = (state) => {
	const{
		global_reducer: {app_state, current_user},
		patient_reducer: {patient_state, step, question_bank_id, question_banks, questions, is_complete}
	} = state

	return {
    current_user: current_user,
		patient_state: patient_state,
		question_banks: question_banks,
		question_step: step,
		question_bank_id: question_bank_id,
		questions: questions,
		is_complete: is_complete
	}
}

export default withRouter(connect(mapStateToProps,{upload_photo_id, update_app_state, update_patient_questions, update_patient_question_banks, set_current_question_bank_by_name,
	register_user, sign_in, move_next_step, create_patient_from_user, create_visit, update_service_line, answer_current_question}) (ShippingPayment))
