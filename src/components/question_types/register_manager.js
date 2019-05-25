import React, {Component} from 'react';
import * as components from '../question_components/components'
import CreateProfile from './create_profile'
import SignIn from './sign_in'

class RegisterManager extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:this.props.view_type
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

export default RegisterManager
