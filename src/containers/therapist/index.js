import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Account from './account'
import ReferralProcess from './referral_process'
import {update_therapist_state} from '../../actions/therapist_action'

class Therapist extends Component{
  constructor(props){
    super(props) 
    this.state = {
      prv_state:this.props.therapist_state,
      view_type:null, 
    }
  }
  
  componentDidMount(){ 
    const init_state = this.props.location.pathname.split("/")[2];    
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
      this.setState({prv_state: new_state})
    }
 }
 
  type_change_handler = (type) => {
    this.setState({view_type:type}) 
  }
  
  render_view = state => {
    if(state==="member"){
      return <div>signin</div> 
    }else if(state==="dashboard"){
      return <div>working on</div> 
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



export default withRouter(connect(mapStateToProps, {update_therapist_state}) (Therapist))
