import React, {Component} from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './profile.register'
import SignIn from './profile.sign_in'
import QuestionsComponent from './profile.screening'

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
    const {app_state, current_user, patient_state, step} = this.props
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

  target_component = target_state => {
    switch(target_state) {
      case 'profile/sign_in':
        return SignIn
      case 'profile/screening':
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
        <Route path={"/patient/" + this.props.patient_state} component={this.target_component(this.props.patient_state)}/>
      </div>
    );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {

  const {
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_state, step}
  } = state

  return {
    app_state: app_state,
    current_user: current_user,
    patient_state: patient_state,
    step:step
  }
}

export default withRouter(connect(mapStateToProps,{}) (PatientProfile))
