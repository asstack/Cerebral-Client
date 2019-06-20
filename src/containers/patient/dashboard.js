import React, {Component} from 'react';
import {Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import default_icon from '../../img/user.png'
import {update_app_state} from '../../actions'
import {sign_out, update_service_line, update_patient_question_banks} from '../../actions/patient_action'
import DashboardContents from './dashboard.contents'

class PatientDashboard extends Component{

  constructor(props){
    super(props)
    this.state = {
      view_type:'profile_info', 
      user:this.props.user
    }  
  }

  componentDidMount(){
    console.log("dash board patient user:", this.props.user)
    if(!this.props.user.attributes['access-token']){ 
      this.props.history.push('/patient/sign_in') 
    }      
  }

  //updated user information
  componentWillReceiveProps = (next_props) => { 

    console.log("dash board patient user:", this.props.user)
    if(next_props.user.id===null || next_props.user.patient===null){ 
      this.props.history.push('/patient/sign_in') 
    }

    this.setState({user:next_props.user}) 
  }



  app_state_checkout_handler = e => {
    const {update_app_state}=this.props
		this.props.update_patient_question_banks(['checkout'], 0).then(() => {
      this.props.history.push('/patient/checkout') 
    })
  }

  sign_out_handler = e => {
    this.props.sign_out() 
    this.props.history.push('/patient/sign_in') 
  }

  update_type_handler = (type) => {
    this.setState({view_type:type}) 
  }
 
  type_to_view = () => {
    return <DashboardContents user={this.state.user} type={this.state.view_type} />      
  }



  view = () => {
    const type = this.state.view_type
    const menu_css = "d-flex justify-content-center align-items-center profile-side-item"
    const last_menu_css = "d-flex justify-content-center align-items-center profile-side-item-last"  
    return (
      <div className="d-flex flex-row therapist-noprogress">
        <div className="d-flex flex-column profile-side-bar-holder">
          <div className="d-flex justify-content-center profile-logo">
            <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
          </div>    
          <div className="profile-side-items-holder">
            <div className="profile-side-title-holder">
              <img className = "profile-image" src={default_icon}/> 
              <div className="d-flex justify-content-center profile-side-title">WELCOME {this.props.user.attributes.first_name}</div> 
            </div> 
            <div className= {type==='profile_info'?menu_css+' item-selected':menu_css} onClick={e => this.update_type_handler('profile_info')}>
              Profile Information
            </div> 
            <div className={type==='subscription_info'?menu_css+' item-selected':menu_css} onClick={e => this.update_type_handler('subscription_info')}>
              Subscription Information
            </div> 
            <div className={type==='message'?menu_css+' item-selected':menu_css} onClick={e => this.update_type_handler('message')}>
              Messages
            </div> 
            <div className={type==='result'?last_menu_css+' item-selected':last_menu_css} onClick={e => this.update_type_handler('result')}>
              My Assessment Results
            </div> 
          </div>                
        </div>

        <div className="d-flex flex-column profile-main-holder">
          <div className = "profile-main-container">
            <div className=" d-flex justify-content-end profile-top-menu">
              <div className = "log-out-holder text-logout" onClick={e=>this.sign_out_handler()}>Logout</div>
            </div>
            {this.type_to_view()}            
         </div>
        </div>
      </div> 
    ) 
  }


  render(){ 
    return( this.view() )
  } 
}

export default withRouter(connect(null, {sign_out, update_patient_question_banks, update_app_state, update_service_line}) (PatientDashboard))
