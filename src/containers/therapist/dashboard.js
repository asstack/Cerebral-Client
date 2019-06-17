import React, {Component} from 'react';
import {Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as components from '../../components/question_components/components'
import DashboardContents from './dashboard.contents' 
import * as therapist_actions from '../../actions/therapist_action'
import * as global_actions from '../../actions/user_auth_action'


class TherapistDashboard extends Component{

  constructor(props){
    super(props)
    this.state = {
      view_type:'profile_info', 
      user:this.props.user
    } 
  }

  //therapist info check in here
  componentDidMount(){
    const user_info = this.props.user.attributes

    if(user_info.id===null || user_info.therapist===null){
      this.props.history.push("/therapist/member") 
    } 
  }

  //don't need to check token in here. will check at entry point  
  componentWillReceiveProps = (next_props) => { 
    if(next_props.user.id===null || next_props.user.therapist===null){
      this.props.history.push("/therapist/member") 
    }
    this.setState({user:next_props.user}) 
  }

  update_type_handler = (type) => {
    this.setState({view_type:type}) 
  }
  
  //TODO: update url in router ex) dashboard/message 
  type_to_view = () => {
    return <DashboardContents user={this.state.user} type={this.state.view_type} patients_list = {null}/>      
  }

  redirect_to_refer= ()  => { 
    this.props.history.push("/therapist/patient_refer") 
  }

  logout_handler = () => {
    this.props.global_actions.reset_state()
    this.props.history.push("/therapist/cover") 
  }


  render(){ 
    const type = this.state.view_type
    const menu_css = "d-flex justify-content-center align-items-center profile-side-item"
    const last_menu_css = "d-flex justify-content-center align-items-center profile-side-item-last"
    
    return(
      <div className="d-flex flex-row therapist-noprogress">
        <div className="d-flex flex-column profile-side-bar-holder">
          <div className="d-flex justify-content-center profile-logo">
            <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
          </div>    
           <div className="profile-side-items-holder">
              <div className="profile-side-title-holder">
                <div className="d-flex justify-content-center profile-side-title">WELCOME {this.props.user.attributes.first_name}</div> 
              </div> 
              <div className= {type==='profile_info'?menu_css+' item-selected':menu_css} onClick={e => this.update_type_handler('profile_info')}>
                Profile Information
              </div> 
              <div className={type==='patients_list'?menu_css+' item-selected':menu_css} onClick={e => this.update_type_handler('patients_list')}>
                Patient Lists
              </div> 
              <div className={type==='message'?last_menu_css+' item-selected':last_menu_css} onClick={e => this.update_type_handler('message')}>
                Messages
              </div> 
              <div className="d-flex justify-content-center confirm-btn-holder">
                <input className ="col dashboard-side-btn text-btn" onClick={this.redirect_to_refer} type="button" value="Refer patients"/>
              </div>
          </div>                
        </div>

        <div className="d-flex flex-column profile-main-holder">
          <div className = "profile-main-container">
            <div className=" d-flex justify-content-end profile-top-menu">
              <div className = "log-out-holder text-logout" onClick={e=>this.logout_handler()}>Logout</div>
            </div>
            {this.type_to_view()}            
         </div>
        </div>
      </div>
    ) 
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    therapist_actions: bindActionCreators(therapist_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  }
}


export default withRouter(connect(null, mapDispatchToProps) (TherapistDashboard))
