import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
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
      view_type:'cover', 
      patients:null,
      ref_index:0,
    }
  }

  update_type_handler = (type) => {
    this.setState({view_type:type}) 
  }

  componentDidMount(){ 
    const index =this.props.ref_index;
    const patients = this.props.ref_patients
    const url = this.props.location.pathname.split("/")[2];    
    if(url==='patient_info' && patients && index < patients.length){
      this.patient_refer_handler(this.props.ref_patients, this.props.ref_index); 
    }  
  }

  componentDidUpdate(){ 
    const url = this.props.location.pathname.split("/")[2];    
    if(this.state.view_type==='patient_info' && (!this.state.patients || this.state.ref_index >= this.state.patients)){
      this.setState({view_type:'cover'})
      this.props.history.push("/therapist/cover") 
    }else if(this.state.view_type && url!==this.state.view_type){
      this.props.history.push("/therapist/"+this.state.view_type) 
    }
  }

  patient_refer_handler = (infos, idx=0) => {
    this.setState({patients:infos, view_type:'patient_info', ref_index:idx})
  }

  redirect_url = (url) => {
    this.props.history.push(url)
  }

  cover_page = () => {  
    const id = this.props.user.attributes.id
    return (
      <div className="d-flex flex-column therapist-noprogress">
        <div className="d-flex flex-row justify-content-between align-items-center therapist-header">
          <a href={process.env.REACT_APP_MAIN_PAGE_URL}>
            <img alt="link to mainpage" className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
          </a>
          <div className="therapist-cover-top-menu" onClick={e=>this.redirect_url("/therapist/member") }>{id?"PROFILE":"Member Login"}</div>
        </div>
        <div className="d-flex flex-column justify-content-center align-self-center therapist-cover-main">
          <div className="therapist-cover-title">
            <h1>For Therapists. </h1>
          </div>
          <div className="d-flex justify-content-center align-self-start therapist-cover-description">
            Cerebral provides a platform for you to connect your patients to prescribing physicians. 
          </div>
          <div className="d-flex flex-row justify-content-between align-items-start"> 
            <div className="col d-flex flex-column justify-content-center padding-left-0">
              <img alt="patint" className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/patient.png'}/> 
              <span className="therapist-cover-img-desc">Refer patients</span>
            </div>
            <div className="col d-flex flex-column justify-content-center">
              <img alt="visit" className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/visit_image.png'}/> 
              <span className="therapist-cover-img-desc"> We connect your patients to a doctor for an online visit </span>
            </div>
            <div className="col d-flex flex-column justify-content-center padding-right-0">
              <img alt="message" className="therapist-cover-img align-self-center" src={process.env.PUBLIC_URL + '/img/connect_message.png'}/> 
              <span className="therapist-cover-img-desc"> Connect with prescribing physician for follow-ups</span>
            </div>
          </div>
          <div className="d-flex justify-content-center confirm-btn-holder">
            <input className ="col btn-confirm text-btn"  onClick={e=>this.update_type_handler('account')} type="button" value='Refer Patients'/>
          </div>
          <div className="d-flex justify-content-center link-btn-holder">
            {id?null:<input className ="col btn-link btn"  onClick={e=>this.update_type_handler('signin')} type="button" value='Login to my account'/>}
          </div>  
        </div>
      </div>
    )
  }
   
  
  //pateintInfo -> map by patients (router will be added with index)
  type_to_view = (actions) => {
    switch(this.state.view_type){
      case 'account':
        return <Account next_type = "patient_refer" default_type="register" 
                        update_type_handler = {this.update_type_handler}/> 
      case 'signin':
        return <Account next_type = "patient_refer" default_type="signin" 
                        update_type_handler = {this.update_type_handler}/>  
      case 'patient_refer':
        return <PatientsRefer submit_action = {this.patient_refer_handler}
                              ref_patients = {this.props.ref_patients}
                              ref_index = {this.props.ref_index}
                              update_type_handler = {this.update_type_handler}
                              update_ref_patients = {actions.update_refer_patients}/>
      case 'patient_info':
        return <PatientInfo patients_info = {this.state.patients}
                            update_type_handler = {this.update_type_handler}
                            ref_index = {this.state.ref_index}
                            actions = {actions}
                            complete_action = {this.update_type_handler}/>
      case 'complete':
        return <ReferralComplete />
      case 'cover': 
        return this.cover_page() 
      default:
        return "Invalid URL"
    }
  }

  render(){
    const therapist_actions = this.props.therapist_actions
    return(
      this.type_to_view(therapist_actions)
    )
  }
}

const mapStateToProps = state => { 
  const {
    therapist_reducer: {ref_patients, ref_index} 
  }=state;

  return {
    ref_patients:ref_patients,
    ref_index:ref_index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    therapist_actions: bindActionCreators(therapist_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ReferralProcess))

