import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PatientProfile from './profile'
import {update_patient_questions, delete_patient_questions} from '../../actions/patient_action'
import {CompleteProcess} from '../../components/static_components/complete_patient_process'
import ReactGA from 'react-ga'

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
    if(patient_state==="profile"){  
      this.props.history.push("/patient/profile") 
    }else if(patient_state==="assessment" ){
      this.props.history.push("/patient/accessment") 
    }else if(patient_state === "verification"){
    
    }else if(patient_state === "shipping_payment"){
    
    }else if(patient_state === "completed"){  
      this.props.history.push("/patient/completed")
    } 
  }

  componentDidMount(){
    this.map_state_to_view()
    ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/Patient');
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
    if(state === target){
      return "col d-flex justify-content-center p-2 solid-border-bottom text-small";
    }else{
      return "col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected";
    }
  }

  progress_menu = (bank_name, index) => { 
    return <div className={this.map_type_to_style_class(this.props.question_banks_step, index)}>{bank_name}</div> 
  }

  //TODO: update dynamic bounding by state
  //TODO: add redux state for size of questions
  // uses https://reacttraining.com/react-router/web/api/Route

  render_views(){
    if(this.props.patient_state==="completed"){  
      return <Route path="/patient/completed" component={CompleteProcess}/>
    }else{
      return( 
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="p-2"><div className="btn-arrow"><a className="link-type1" href="">&lt;</a></div></div>
          </div>
          <div className="d-flex justify-content-center flex-row">
            {this.props.question_banks.map((item, index) => (this.progress_menu(item, index)))}  
          </div>
          <div className="d-flex flex-column question-container">
           <div className="d-flex justify-content-left text-middle">QUESTION {this.props.question_step+1} OF {this.props.total_step}</div>
            <div className="questions-container">
              <div className="d-flex justify-content-left text_description"> {this.props.questions[this.props.question_step].description}</div> 
              <Route path="/patient/profile" component={PatientProfile}/>
            </div>
          </div>
        </div>    
      )   
    }  
  }
  
  render(){
    return(
      this.render_views()
    );
  }
}

const mapStateToProps = state => {
  const{
    global_reducer: {app_state},
    patient_reducer: {patient_type, patient_state, step, total_step, questions, question_banks, question_banks_step}
  } = state
  return {
    patient_type:patient_type,
    app_state:app_state,
    patient_state:patient_state,
		questions:questions,
    question_banks:question_banks,
    question_banks_step:question_banks_step,
    question_step:step,
    total_step:total_step
  }
}


// https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components
export default withRouter(connect(mapStateToProps, {update_patient_questions, delete_patient_questions}) (Patient))

