import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import QuestionBank from './question_bank'
import PatientDashboard from './dashboard'
import SignIn from './sign_in'
import CompleteProcess from '../../components/static_components/complete_patient_process'
import * as global_actions from '../../actions/user_auth_action'
import ReactGA from 'react-ga'
import Alert from 'react-s-alert'

class Patient extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      state:'',
    }
  }

  componentDidMount(){ 

    // setTimeout(console.log("set q bank did update"), 2000)
    const {global_actions, location, user} = this.props
    const init_state = location.pathname.split("/")[2];    
    const user_attr = user.attributes;

    if(!user.patient && user_attr.therapist){
      global_actions.reset_state()      
      Alert.info("Please sign in by using patient account.") 
    }

    if(user["access-token"]){
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
  
  render_views_2 =(state) => {
    if(state==='sign_in'){
      return <Route path="/patient/sign_in" component={SignIn}/>
    }else if (state==='dashboard'){ 
      return <Route path="/patient/dashboard" render = {(props) => 
        <PatientDashboard user={this.props.user} />
      }/>
    }else if (state==='completed'){     
      return <Route path="/patient/completed" component={CompleteProcess}/>
    }else{
      return (
        <Route path="/patient/:bank_name" render = {(props) => 
          <QuestionBank user={this.props.user.attributes} />}/>
     )
    }  
  }
  
  render(){
    const target_view = this.render_views_2(this.state.state) 
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

