import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import Register from './profile.register'
import SignIn from './profile.sign_in'

class Patient extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
  }

  //Todo: update dynamic bounding by state
  render(){
    return(
      <div>
        <h1>Patinet page</h1>

        <p>Temp: Enter /profile/register for profile sign up in url</p>
        <Route path="/:patient/:profile/register" component={Register}/>

        <p>Temp: Enter /profile/sign_in for profile login in url</p>
        <Route path="/:patient/:profile/sign_in" component={SignIn}/>


      </div>
    );
  }
}

export default Patient
