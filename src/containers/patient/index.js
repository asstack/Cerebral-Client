import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PatientProfile from './profile'
import {update_patient_questions, delete_patient_questions} from '../../actions/patient_action'


class Patient extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
    this.state = {
      prev_state:this.props.patient_state
    }
  }

  map_state_to_view = () => {
 		const {update_patient_questions, patient_state, patient_type, delete_patient_questions} = this.props
    console.log("check patient index: ", patient_state)
    if(patient_state==="profile"){  
      console.log("check patient profile: ", patient_state)
      update_patient_questions(0)
      this.props.history.push("/patient/profile") 
    }else if(patient_state==="assessment" ){
      if(patient_type==="Insomnia"){ 
        update_patient_questions(1)
      }else if(patient_type==="Depression & Anxiety"){ 
        update_patient_questions(2)
      }   
      this.props.history.push("/patient/accessment") 
    }else if(patient_state === "verification"){
    
    }else if(patient_state === "shipping_payment"){
    
    }else {  

    } 
  }

  componentDidMount(){
    this.map_state_to_view()
  }

	componentDidUpdate(){	
    const {patient_state} = this.props
    if(patient_state!==this.state.prv_state){
      this.setState({prv_state: patient_state})
      this.map_state_to_view() 
    }

    /*
    //may need to check path name
    if(this.props.location.pathname==="/patient"){
			this.props.history.push('/patient/profile')
    }*/
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
  // uses https://reacttraining.com/react-router/web/api/Route
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
    patient_reducer: {patient_type, patient_state, step, total_step, questions}
  } = state
  return {
    patient_type:patient_type,
    app_state:app_state,
    patient_state:patient_state,
		questions:questions,
    question_step:step,
    total_step:total_step
  }
}


// https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components
export default withRouter(connect(mapStateToProps, {update_patient_questions, delete_patient_questions}) (Patient))

