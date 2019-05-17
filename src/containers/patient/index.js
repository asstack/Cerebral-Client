import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import PatientProfile from './profile'
import PatientDashboard from './dash_board'
import SignIn from './sign_in'
import {update_patient_state, update_patient_questions, delete_patient_questions} from '../../actions/patient_action'
import CompleteProcess from '../../components/static_components/complete_patient_process'
import uuidv1 from 'uuid'
import ReactGA from 'react-ga'

class Patient extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      prev_state:this.props.patient_state
    }
  }

  //TODO: code refactoring for states that sharing redux state (qualification, profile, shipping_payment)
  //TODO: Higher order components for question bank related containers 
  componentDidMount(){ 
    const init_state = this.props.location.pathname.split("/")[2];    
    if(!init_state){
      this.props.history.push("/patient/sign_in") 
    }else if(init_state!==this.state.prev_state){  
      this.setState({prev_state:init_state})
      update_patient_state(init_state)
    }

    //this.map_state_to_view(init_state)
       
    console.log("patient check:", this.state.prev_state)
    /*
    ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/Patient');
    */
    //take state from url, if default sign_in
  }
 
	componentDidUpdate(){	
    const current_path = this.props.location.pathname
    const new_state = current_path.split("/")[2]
    
    if(!new_state){  
      this.props.history.push("/patient/sign_in") 
    }else if(new_state!==this.state.prev_state){
      console.log("patient update :", new_state)
      this.setState({prev_state: new_state})
    }
	}

  map_type_to_style_class = (state, target) => {
    if(state === target){
      return "col d-flex justify-content-center p-2 solid-border-bottom text-small";
    }else{
      return "col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected";
    }
  }

  progress_menu = (bank_name, index) => { 
    return <div key = {uuidv1()} className={this.map_type_to_style_class(this.props.question_banks_step, index)}>{bank_name}</div> 
  }

  display_title = (questions, step) =>{
		if(questions[step]){
			return questions[step].title
		}
	}



  //TODO: update dynamic bounding by state
  //TODO: add redux state for size of questions
  // uses https://reacttraining.com/react-router/web/api/Route
  render_views(state){
    
    if(state==="completed"){  
      return(
        <Route path="/patient/completed" component={CompleteProcess}/>
      )
    }else if(state==="dashboard"){ 
      return (
        <Route path="/patient/dashboard" component={PatientDashboard}/>
      )
    }else if(state==="sign_in"){ 
      return( 
        <Route path="/patient/sign_in" component={SignIn}/>
      )
    }else if(this.props.question_banks.length===1){
      //TODO: temporarily hard coded. It is only for selecting type of q banks, this question may be moved to qualification bank 
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
              <Route path="/patient/profile" component={PatientProfile}/>
						</div>
				</div>
      )	 
    }else if(this.props.questions && this.props.questions[this.props.question_step]){
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
    }else {
      return <div>{this.props.history.push('/start')}</div>
    }  
  }
  
  render(){
    const target_view = this.render_views(this.state.prev_state)
    return(
      target_view
    );
  }
}

const mapStateToProps = state => {
  const{
    global_reducer: {app_state},
    patient_reducer: {service_line, patient_state, step, total_step, questions, question_banks, question_banks_step}
  } = state
  return {
    service_line:service_line,
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
export default withRouter(connect(mapStateToProps, { update_patient_state, update_patient_questions, delete_patient_questions}) (Patient))

