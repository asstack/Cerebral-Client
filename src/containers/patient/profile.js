import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './profile.register'
import SignIn from './profile.sign_in'
import QuestionsComponent from './profile.questions'

class PatientProfile extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
    this.state = {
      prv_state:this.props.patient_state
    }
  }

  componentDidMount(){
    const {global_state, current_user, patient_state, step} = this.props
    this.props.history.push("/patient/"+patient_state)
  }

  componentDidUpdate(){
    const {patient_state} = this.props
    if(patient_state!=this.state.prv_state){
      this.setState({prv_state: patient_state})
      //window.history.pushState('', '', "/patient/"+patient_state);
      this.props.history.push("/patient/"+patient_state)
    }
  }


  mount_component = target_state => {
    switch(target_state) {
      case 'profile/sign_in':
        return SignIn
      case 'profile/questions':
        return QuestionsComponent
      default:
        return Register
    }
  }

  //Todo: update dynamic bounding by state
  //state global: patient local: profile/register profile/sign_in profile/questions
  render(){
    return(
      <div>
        <h1>question {this.props.step + 1} of 9</h1>
        <Route path={"/patient/" + this.props.patient_state} component={this.mount_component(this.props.patient_state)}/>
      </div>
    );
  }
}
//TODO: elaborate to save memory
const mapStateToProps = (state) => {

  const {
    global_reducer: {global_state, current_user},
    patient_reducer: {patient_state, step}
  } = state

  return {
    global_state: global_state,
    current_user: current_user,
    patient_state: patient_state,
    step:step
  }
}

export default withRouter(connect(mapStateToProps,{}) (PatientProfile))
