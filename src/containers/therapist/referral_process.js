import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as therapist_actions from '../../actions/therapist_action'
import * as global_actions from '../../actions/user_auth_action'
import Account from './account'
import PatientsRefer from './patients_refer' 
import PatientInfo from './patient_info' 
import ReferralComplete from './referral_complete' 

//TODO: implement with local state first, than update to use redux (minimize complexity by using redux/actions)

class ReferralProcess extends Component{
  constructor(props){
    super(props) 
    this.state = {
      view_type:null, 
      patients:null,
      ref_index:0,
    }
  }

  type_change_handler = (type) => {
    this.setState({view_type:type}) 
  }

  sign_in_handler = info => { 
    const {global_actions} = this.props
    global_actions.sign_in(info).then ((resp) => {
      this.setState({view_type:'patient_refer'})
    }) 
  }

  update_type_handler = (type) => {
      this.setState({view_type:type}) 
  }

  componentDidMount(){ 
     
  }

  componentDidUpdate(){ 
    const url = this.props.location.pathname.split("/")[2];    
    if(this.state.view_type !=='patient_refer' && this.state.view_type!=='account' && (!this.state.patients || this.state.ref_index >= this.state.patients)){
      this.setState({view_type:'account'})
      this.props.history.push("/therapist/account") 
    }else if(this.state.view_type && url!==this.state.view_type){
      this.props.history.push("/therapist/"+this.state.view_type) 
    }
  }

  //NOTE: don't know why we use multiple steps for registraion, worry about data redundancy and inconsistany in server side by errors
  register_handler = info => {
    const {therapist_actions, global_actions}=this.props
    global_actions.register_and_set_user(info)
      .then(() => {return global_actions.sign_in(info)})
        .then(() => { return therapist_actions.create_therapist_from_user() })
          .then(() => {this.setState({view_type:'patient_refer'})})
      .catch((err) => {
        console.log(err)
      })
  }
 
  patient_refer_handler = (infos, idx=0) => {
    //here save data both client and backend 
    this.setState({patients:infos, view_type:'patient_info', ref_index:idx})
    //redux action to update patient infos
  }

  cover_page = () => {  
    return (
      <div className="d-flex flex-column therapist-noprogress">
        <div className="d-flex flex-row justify-content-between align-items-center therapist-header">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
          <div className="therapist-cover-top-menu">Member Login</div>
        </div>
        <div className="d-flex flex-column justify-content-center align-self-center therapist-cover-main">
          <div className="therapist-cover-title">
            <h1>For Therapists. </h1>
          </div>
          <div className="d-flex justify-content-center align-self-start therapist-cover-description">
            Cerebral provides a platform for you to connect your patients to prescribing physicians. 
          </div>
          <div className="d-flex flex-row justify-content-between align-items-start"> 
            <div className="d-flex flex-column justify-content-center">
              <img className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/group.png'}/> 
              <span className="therapist-cover-img-desc">Refer patients</span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <img className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/visit_image.png'}/> 
              <span className="therapist-cover-img-desc"> We connect your patients to a doctor for an online visit </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <img className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/connect_message.png'}/> 
              <span className="therapist-cover-img-desc"> Connect with prescribing physician for follow-ups</span>
            </div>
          </div>
          <div className="d-flex justify-content-center confirm-btn-holder">
            <input className ="col btn-confirm text-btn"  onClick={e=>this.type_change_handler('account')} type="button" value='Refer Patient'/>
          </div>
          <div className="d-flex justify-content-center link-btn-holder">
            <input className ="col btn-link btn"  onClick={e=>this.type_change_handler('signin')} type="button" value='Login to my account'/>
          </div>  
        </div>
      </div>
    )
  }
   
  
  //pateintInfo -> map by patients (router will be added with index)
  type_to_view = (actions) => {
    switch(this.state.view_type){
      case 'account':
        return <Account next_url = "/therapist/patient_refer" default_type="register" sign_in_handler = {this.sign_in_handler} skip_handler = {this.update_type_handler}  register_handler={this.register_handler}/> 
      case 'patient_refer':
        return <PatientsRefer submit_action = {this.patient_refer_handler}
                              update_ref_patients = {actions.update_refer_patients}/>
      case 'patient_info':
        return <PatientInfo patients_info = {this.state.patients}
                            ref_index = {this.state.ref_index}
                            actions = {actions}
                            complete_action = {this.update_type_handler}/>
      case 'complete':
        return <ReferralComplete />
      default: 
        return this.cover_page() 
    }
  }

  render(){
    const therapist_actions = this.props.therapist_actions
    return(
      this.type_to_view(therapist_actions)
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    therapist_actions: bindActionCreators(therapist_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps) (ReferralProcess))


