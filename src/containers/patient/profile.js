import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './profile.register'
import SignIn from './profile.sign_in'


class PatientProfile extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
  }

  componentDidUpdate(){
    //TODO: 1. check app states [patient/profile, patient/assessment, ...]
    const {all_state, login_info, app_state, step} = this.props
    console.log("app state: ", all_state)
    console.log("log info: ", step)
  }



  //Todo: update dynamic bounding by state
  render(){

    return(
      <div>
        <h1>Patinet page: {this.props.step}</h1>

        <p>Temp: Enter /profile/register for profile sign up in url</p>
        <Route path="/patient/profile/register" component={Register}/>

        <p>Temp: Enter /profile/sign_in for profile login in url</p>
        <Route path="/patient/profile/sign_in" component={SignIn}/>

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
