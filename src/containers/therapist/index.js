import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Account from './account'
import TherapistDashboard from './dashboard'
import ReferralProcess from './referral_process'
import {update_therapist_state} from '../../actions/therapist_action'
import {reset_state, is_signed_in} from '../../actions/user_auth_action'


class Therapist extends Component{
  constructor(props){
    super(props) 
    this.state = {
      prv_state:this.props.therapist_state,
    }
  }
   
  componentDidMount(){ 
    const init_state = this.props.location.pathname.split("/")[2];    
    const user = this.props.user.attributes 
    
    //clean up if user is not therapist or token is not valid 
    if(user.patient){
      this.props.reset_state()      
    }
    if(user["access-token"]){
      this.props.is_signed_in().then((resp) => {
        if(!resp) this.props.reset_state()
      }) 
    } 

    if(!init_state){
      this.props.history.push("/therapist/cover") 
    }else if(init_state!==this.state.prv_state){  
      this.setState({prv_state:init_state})
      update_therapist_state(init_state)
    }
  }

	componentDidUpdate(){	
        
    const current_path = this.props.location.pathname
    const new_state = current_path.split("/")[2]

    if(!new_state){  
      this.props.history.push("/therapist/cover") 
    }else if(new_state!==this.state.prv_state){
      this.props.history.push("/therapist/" + new_state)
      this.setState({prv_state: new_state})
    }
 }
 
  update_type_handler = (type) => {
    this.props.history.push("/therapist/"+type) 
  }
  
  render_view = state => {
    if(state==="member"){
      return <Route path = "/therapist/member" render = {props => 
          <Account next_type = "dashboard" default_type="signin"
            update_type_handler = {this.update_type_handler}/>}/> 
    }else if(state==="dashboard"){
      return <Route path = "/therapist/dashboard" render = {props=>
          <TherapistDashboard user = {this.props.user}/>}/> 
    }else{
      return <Route path = "/therapist/:state" render = {(props)=>
          <ReferralProcess user={this.props.user}/>}/>
    }  
  }

  render(){
    return(
      this.render_view(this.state.prv_state)
    )
  }
}

const mapStateToProps = state => {
  const{
    global_reducer: {app_state, current_user},
    therapist_reducer: {therapist_state}
  } = state
  return {
    user:current_user,
    app_state:app_state,
    therapist_state:therapist_state,
  }
}

export default withRouter(connect(mapStateToProps, {is_signed_in, reset_state, update_therapist_state}) (Therapist))
