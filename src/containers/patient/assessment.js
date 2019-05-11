import React, {Component} from 'react'
import ReactGA from 'react-ga'

class Assessment extends Component{
  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/Assessment');
  }

  componentDidUpdate(){
    const {update_patient_state, question_bank_id, patient_state, is_complete} = this.props
    if(is_complete){
      update_patient_state('treatment')
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

  set_selector_handler=(e)=>{
    const {move_next_step, answer_current_question} = this.props
    answer_current_question(e.target.value)
    move_next_step(this.props.question_step)
  }

  set_bank_selector_handler=(e)=>{
    const {move_next_step, update_patient_type} = this.props
    update_patient_type(e.target.value)
    move_next_step(this.props.question_step)
  }

  did_create_patient = (state) => {
    this.props.register_user(state)
      .then(() => {return this.props.sign_in(state)})
        .then(() => { return this.props.create_patient_from_user() })
          .then( () => {return this.props.create_visit()} )
            .then(() => {return this.props.move_next_step(this.props.question_step)})}


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
      did_create_patient: this.did_create_patient
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

