import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import QuestionBank from './question_bank'
import PatientDashboard from './dashboard'
import SignIn from './sign_in'
import CompleteProcess from '../../components/static_components/complete_patient_process'
import * as global_actions from '../../actions/user_auth_action'
import Alert from 'react-s-alert'

class Patient extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      state:'',
    }
  }

  componentDidMount(){ 

    const {global_actions, location, user} = this.props
    const init_state = location.pathname.split("/")[2];    
    const user_attr = user.attributes;

    console.log("check user attr:", user_attr)
    if(!user_attr.patient && user_attr.therapist){
      global_actions.reset_state()      
      Alert.info("Please sign in by using patient account.") 
    }

    if(user_attr["access-token"]){
      global_actions.is_signed_in().then((resp) => {
        if(!resp) global_actions.reset_state()
      }) 
    }  

    if(!init_state){
      this.props.history.push("/patient/sign_in") 
    }else{
      this.setState({state:init_state}) 
    }

  }
 
	componentDidUpdate(){	
    const current_path = this.props.location.pathname
    const new_state = current_path.split("/")[2]
    
    if(!new_state){  
      this.props.history.push("/patient/sign_in") 
    }else if(new_state!==this.state.state){
      this.setState({state: new_state})
    }
 }

  componentWillReceiveProps = (next_props) => { 

    const user = next_props.user.attributes 
    const {global_actions} = this.props
    if(!user.patient && user.therapist){
      global_actions.reset_state()
      Alert.info("Please sign in by using patient account.") 
      this.props.history.push("/patient/sign_in") 
    }
  }
  
  render_views= state => {
    console.log("render view :", state)
    switch(state){
      case 'sign_in': 
        return <Route path="/patient/sign_in" component={SignIn}/>
      case 'dashboard':
        return (
          <Route path="/patient/dashboard" render = {(props) => 
            <PatientDashboard user={this.props.user} />}/>)
      case 'completed':
        return <Route path="/patient/completed" component={CompleteProcess}/>
      case 'question_bank':
        console.log("render view stat:", state) 
        return (
          <Route path="/patient/question_bank/" render = {(props) => 
            <QuestionBank user={this.props.user.attributes} />}/>)
      default: 
        return <div>Invalid URL</div>
    }

  }
  
  render(){
    const target_view = this.render_views(this.state.state) 
    return(
      target_view
    );
  }
}

const mapStateToProps = state => {
  const{
    global_reducer: {current_user},
  } = state
  return {
    user:current_user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    global_actions: bindActionCreators(global_actions, dispatch),
  }
}

// https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Patient))

