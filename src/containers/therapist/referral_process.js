import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as therapist_actions from '../../actions/therapist_action'
import * as global_actions from '../../actions/user_auth_action'
import Account from './account'
import PatientsRefer from './patients_refer' 
import PatientInfo from './patient_info' 

//TODO: implement with local state first, than update to use redux (minimize complexity by using redux/actions)

class ReferralProcess extends Component{
  constructor(props){
    super(props) 
    this.state = {
      view_type:null, 
      patient:null,
    }
  }

  type_change_handler = (type) => {
    this.setState({view_type:type}) 
  }

  cover_page = () => {  
    return (
      <div>
        <input type='button' value='refer patient' onClick={e=>this.type_change_handler('account')}/>
        <input type='button' value='login for patient'/>
     </div>
    )
  }
 
  sign_in_handler = info => { 
    const {global_actions} = this.props
    global_actions.sign_in(info).then ((resp) => {
      this.setState({view_type:'temp_refer'})
    }) 
  }

  //NOTE: don't know why we use multiple steps for registraion, worry about data redundancy and inconsistany in server side by errors
  register_handler = info => {

    const {therapist_actions, global_actions}=this.props
    global_actions.register_and_set_user(info)
      .then(() => {return global_actions.sign_in(info)})
        .then(() => { return therapist_actions.create_therapist_from_user() })
          .then(() => {this.setState({view_type:'temp_refer'})})
      .catch((err) => {
        console.log(err)
      })
  }
 
  patient_refer_handler = infos => {
    //here save data both client and backend 
    this.setState({patients:infos, view_type:'temp_info'})
  }

  //pateintInfo -> map by patients (router will be added with index)
  type_to_view = () => {
    switch(this.state.view_type){
      case 'account':
        return <Account next_url = "/therapist/refer" default_type="register" sign_in_handler = {this.sign_in_handler} register_handler={this.register_handler}/> 
      case 'temp_refer':
        return <PatientsRefer submit_action = {this.patient_refer_handler}/>
      case 'temp_info':
        return <PatientInfo patient_info = {null} />
      default: 
        return this.cover_page() 
    }
  }

  render(){
    return(
      <div>
        {this.type_to_view()}
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

export default withRouter(connect(null, mapDispatchToProps) (ReferralProcess))


