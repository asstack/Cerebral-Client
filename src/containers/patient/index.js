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

    this.props.history.push('/patient/profile')
  }

  //Todo: update dynamic bounding by state
  render(){
    return(
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div className="p-2"><div className="btn-arrow"><a className="link-type1" href="">&lt;</a></div></div>
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className="col d-flex justify-content-center p-2 solid-border-bottom text-small">Patient Profile</div>
          <div className="col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected">Mental Health Assessment</div>
          <div className="col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected">Treatment Information</div>
          <div className="col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected">Identity Verification</div>
          <div className="col d-flex justify-content-center p-2 solid-border-bottom__unselected text-small__unselected">Shipping and Payment</div>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex justify-content-left text-middle">QUESTION 1 OF 9</div>
          <div className="questions-container">
            <Route path="/patient/profile" component={PatientProfile}/>
          </div>
        </div>
      </div>
    );

  }
}
export default withRouter(Patient)
