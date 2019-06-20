import React, {Component} from 'react';
import CreateProfile from './create_profile'
import SignIn from './sign_in'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'

import { ensure_visit, get_current_patient } from '../../actions/patient_action'

class RegisterManager extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:this.props.view_type
    }
  }

  componentDidMount = () => {
    this.setState({view_type:'register'})
  }
  

  //TODO: Check therapist and patient to use same
  state_update=(e, type)=>{
    if(type==='signin'){
      if(this.props.update_type) this.props.update_type('register')
      this.setState({view_type:'register'});
    }
    else {
      if(this.props.update_type) this.props.update_type('signin')
      this.setState({view_type:'signin'});
    }

    if(this.props.set_subcomp!==null){
      if(type===this.props.view_type) this.props.set_subcomp(true) 
      else this.props.set_subcomp(false)
    }
  }

  target_view = () => {
    if(this.state.view_type==='signin'){ 
      return <SignIn user_type = {this.props.user_type} submit_action={this.props.signin_submit_action} state_update={this.state_update}/> 
    }else{
      return <CreateProfile user_type = {this.props.user_type} submit_action={this.props.register_submit_action} state_update = {this.state_update}/>} 
    } 

  render(){ 
    const target_view = this.target_view()
    return (
      target_view
    );
  }
}

export default withRouter(connect(null, {ensure_visit, get_current_patient}) (RegisterManager)) 
