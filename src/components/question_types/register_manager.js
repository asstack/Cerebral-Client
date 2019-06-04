import React, {Component} from 'react';
import * as components from '../question_components/components'
import CreateProfile from './create_profile'
import SignIn from './sign_in'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'

import { is_signed_in } from '../../actions/user_auth_action'
import Alert from 'react-s-alert'

class RegisterManager extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:this.props.view_type
    }
  }

  componentDidMount = () => {
    //TODO: it can make error when we use it for general signin flow (shared by general signin and question bank). so, it will be better to check user_info in container
    if(this.props.skip_action){
      this.props.is_signed_in().then((resp) => {
        if (resp) {
          this.props.skip_action()
          Alert.info('You are already signed in')
        }
      })
    }    
  }

  state_update=(e, type)=>{
    if(type==='signin') this.setState({view_type:'register'});
    else this.setState({view_type:'signin'});
  }

  target_view = () => {
    if(this.state.view_type==='signin'){ 
      return <SignIn submit_action={this.props.signin_submit_action} state_update={this.state_update}/> 
    }else{
      return <CreateProfile submit_action={this.props.register_submit_action} state_update = {this.state_update}/>} 
    } 

  render(){ 
    const target_view = this.target_view()
    return (
      target_view
    );
  }
}

export default withRouter(connect(null, {is_signed_in}) (RegisterManager)) 
