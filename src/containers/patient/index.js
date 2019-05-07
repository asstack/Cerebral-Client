import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PatientProfile from './profile'
import {delete_patient_questions} from '../../actions/patient_action'


class Patient extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
  }

  componentDidMount(){
    //TODO: 1. check app states [patient/profile, patient/assessment, ...]
    //if no user info and pages that need user info, redirect to login page
		//clear question data
		const {delete_patient_questions} = this.props
		delete_patient_questions()
    this.props.history.push('/patient/profile')	
  }

	//TODO: I am not sure it is right way
	componentDidUpdate(){	
		if(this.props.location.pathname==="/patient"){
			this.props.history.push('/patient/profile')
		}
	}

  map_type_to_style_class = (state, target) => {
    if(state.split('/')[0] === target){
      return "col d-flex justify-content-center p-2 solid-border-bottom text-small";
    }else{
      return "col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected";
    }
  }

  //TODO: update dynamic bounding by state
  //TODO: add redux state for size of questions
  render(){
    return(
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div className="p-2"><div className="btn-arrow"><a className="link-type1" href="">&lt;</a></div></div>
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className={this.map_type_to_style_class(this.props.patient_state, "profile")}>Patient Profile</div>
          <div className={this.map_type_to_style_class(this.props.patient_state, "assessment")}>Mental Health Assessment</div>
          <div className={this.map_type_to_style_class(this.props.patient_state, "treatment")}>Treatment Information</div>
          <div className={this.map_type_to_style_class(this.props.patient_state, "identity")}>Identity Verification</div>
          <div className={this.map_type_to_style_class(this.props.patient_state, "shipping")}>Shipping and Payment</div>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex justify-content-left text-middle">QUESTION {this.props.question_step+1} OF {this.props.total_step}</div>
          <div className="questions-container">
          	<Route path="/patient/profile" component={PatientProfile}/>
          </div>
        </div>
      </div>
    );

  }
}


const mapStateToProps = state => {
  const{
    global_reducer: {app_state},
    patient_reducer: {patient_state, step, total_step, questions}
  } = state
  return {
    app_state:app_state,
    patient_state:patient_state,
		questions:questions,
    question_step:step,
    total_step:total_step
  }
}

export default withRouter(connect(mapStateToProps, {delete_patient_questions}) (Patient))
