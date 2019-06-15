import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import QuestionBank from './question_bank'
import PatientDashboard from './dashboard'
import SignIn from './sign_in'
import CompleteProcess from '../../components/static_components/complete_patient_process'

import * as patient_actions from '../../actions/patient_action'
import * as global_actions from '../../actions/user_auth_action'
import uuidv1 from 'uuid'
import ReactGA from 'react-ga'
import Alert from 'react-s-alert'

class Patient extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      prev_state:this.props.patient_state,
      width: window.innerWidth,
    }
    this.q_number = React.createRef();    
  }

  update_width_handler = () =>{
    this.setState({width: window.innerWidth}); 
  }

  back_btn_handler = () => {
    const {question_banks_step, question_step, patient_actions} = this.props 
    if(question_step > 0){
      //just change the step  
      patient_actions.set_step(question_step-1)
    }else if(question_step === 0 && question_banks_step > 0){
      patient_actions.set_question_banks_step(question_banks_step-1)       
    }
  }


  componentDidMount(){ 

    const {patient_actions, global_actions} = this.props
    const init_state = this.props.location.pathname.split("/")[2];    
    const user = this.props.user.attributes;
    this.update_width_handler()
    if(!user.patient && user.therapist){
      global_actions.reset_state()      
      Alert.info("Please sign in by using patient account.") 
    }

    if(user["access-token"]){
      global_actions.is_signed_in().then((resp) => {
        if(!resp) global_actions.reset_state()
      }) 
    }  

    if(!init_state){
      this.props.history.push("/patient/sign_in") 
    }else if(init_state!==this.state.prev_state){  
      this.setState({prev_state:init_state})
      patient_actions.update_patient_state(init_state)
    }

    /*
    ReactGA.initialize('UA-139974495-1');
		ReactGA.pageview('/Patient');
    */
    //take state from url, if default sign_in
  }
 
	componentDidUpdate(){	
    
    window.addEventListener("resize", this.update_width_handler);
    const current_path = this.props.location.pathname
    const new_state = current_path.split("/")[2]
    if(!new_state){  
      this.props.history.push("/patient/sign_in") 
    }else if(new_state!==this.state.prev_state){
      this.setState({prev_state: new_state})
    }
 }

  componentWillReceiveProps = (next_props) => { 
    const user = next_props.user.attributes 
    const {global_actions} = this.props
    if(!user.patient && user.therapist){
      global_actions.reset_state()
      Alert.info("Please sign in by using patient account.") 
      this.props.history.push("/patient/sign_in") 
    }
  }


  componentWillUnmount(){
    window.removeEventListener('resize', this.update_width_handler);
  }
  
  map_type_to_style_class = (state, target) => {
    if(state === target){
      return "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder";
    }else{
      return "col d-flex justify-content-between solid-border-bottom__unselected text-small__unselected menu-bar-item-holder";
    }
  }
  
  // TODO: I could not get this to show up here with this.question_bank_title.bind below?!?!?
  question_bank_title = (that, bank_name) => {
    // look up question bank title in that.props.question_bank_objects
    return that.props.question_bank_objects.filter(qbo => qbo.name == bank_name)[0].title
  }
  
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

  display_title = (questions, step) =>{
		if(questions[step]){
			return questions[step].title
		}
	}


  // uses https://reacttraining.com/react-router/web/api/Route
  render_views(state){
    
   if(state==="completed"){  
      return(
        <Route path="/patient/completed" component={CompleteProcess}/>
      )
    }else if(state==="dashboard"){ 
      return (
        <Route path="/patient/dashboard" render = {(props) => 
            <PatientDashboard user={this.props.user} />
        }/>
      )
    }else if(state==="sign_in"){ 
      return( 
        <Route path="/patient/sign_in" component={SignIn}/>
      )
    }else if(this.props.question_banks.length===1){
      return(
        <div className="d-flex flex-column container-noprogress">
            <div className="d-flex flex-row justify-content-left therapist-header">
              <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
            </div>
            <Route path="/patient/:bank_name" component={QuestionBank}/>
          </div>
      )	 
    }else if(this.props.questions && this.props.questions[this.props.question_step]){
      const question = this.props.questions[this.props.question_step]
      const q_bank = this.props.current_bank_name
      let total = this.props.total_step
      let step = this.props.question_step+1
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
              {this.state.width>820? this.props.question_banks.map((item, index) => (this.progress_menu(item, index))) : this.single_progress_menu(state) }
            </div>
            <div className="d-flex flex-column question-container">
              <div ref={this.q_number} className="d-flex justify-content-left text-middle">{wording}</div>
              <div className="questions-container">
                <Route path="/patient/:bank_name" render={(props) => 
                    <QuestionBank q_number_ref={this.q_number}/>}/>
              </div>
            </div>
          </div>    
        </div>
      )   
    }else {
      return (  
          <Route path="/patient/qualification" component={QuestionBank}/>
      ) 
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
    global_reducer: {app_state, current_user},
    patient_reducer: {current_bank_name, service_line, patient_state, step, total_step, questions, question_banks, question_bank_objects, question_banks_step}
  } = state
  return {
    app_state:app_state,
    user:current_user,
    service_line:service_line,
    patient_state:patient_state,
		questions:questions,
    question_banks:question_banks,
    question_banks_step:question_banks_step,
    question_bank_objects: question_bank_objects,
    question_step:step,
    current_bank_name:current_bank_name,
    total_step:total_step
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    patient_actions: bindActionCreators(patient_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch),
  }
}


// https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Patient))

