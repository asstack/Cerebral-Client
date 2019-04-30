import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import PatientProfile from './profile'

class Patient extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
  }

  componentDidMount(){
    //TODO: 1. check app states [patient/profile, patient/assessment, ...]
    //if no user info and pages that need user info, redirect to login page

  }

  //Todo: update dynamic bounding by state
  render(){
    return(
      <div>
        <Route path = "/:patient/:profile" component={PatientProfile}/>
      </div>
    );
  }
}
export default withRouter(Patient)
