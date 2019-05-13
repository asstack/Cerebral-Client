import React, {Component} from 'react';
import {Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import default_icon from '../../img/user.png';

class PatientDashboard extends Component{

  constructor(props){
    super(props)
  }

  render(){ 
    return(
      <div className="d-flex flex-row">
        <div class="d-flex flex-column profile-side-bar-holder">
          <div className="d-flex justify-content-center p-2 profile-logo">
            Cerebral 
          </div>    
           <div className="profile-side-items-holder">
              <div className="profile-image-content">
                <img className = "profile-image" src={default_icon}/> 
                <div className="d-flex justify-content-center profile-image-name">name</div> 
              </div> 
              <div className="p-2 d-flex justify-content-center profile-side-item">Profile Information</div> 
              <div className="p-2 d-flex justify-content-center profile-side-item">Subscription Information</div> 
              <div className="p-2 d-flex justify-content-center profile-side-item">Messages</div> 
              <div className="p-2 d-flex justify-content-center profile-side-item-last">My Assessment Results</div> 
          </div>                
        </div>

        <div className="d-flex flex-column profile-main-holder">
          <div className = "profile-main-container">
            <div className="p-2 d-flex justify-content-end profile-top-menu">
              <div className = "p-2 log-out-divider"></div>
              <div className = "p-2 log-out-holder text-logout">Logout</div>
            </div>
            <div className="d-flex flex-column p-2 profile-main-content">
              <div className="d-flex justify-content-end text-main-title">main page title</div>
              <div className="d-flex flex-column main-content-column">
                <div className="d-flex flex-row justify-content-between main-content-row">
                  <div className="main-content-small-card">item 1</div> 
                  <div className="main-content-small-card">item 2</div> 
                </div>
                <div className="d-flex flex-row justify-content-between main-content-row">
                  <div className="main-content-small-card">item 3</div> 
                  <div className="main-content-small-card">item 4</div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
  } 
}

export default PatientDashboard
