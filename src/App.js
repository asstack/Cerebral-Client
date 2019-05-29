import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import Therapist from './containers/therapist'
import MainPage from './containers'
import PasswordReset from './containers/user'
import Identification from './components/question_types/patient_identification'
import {update_app_state} from './actions'
import ReactGA from 'react-ga'
import ErrorBoundary from './error_boundary'

class App extends Component{

  //Todo: get state before compoenet mounting
  //Routing : [/, patinet, therapist]
  constructor(props){
    super(props)
    this.state = {
      prv_state:this.props.app_state, 
      prv_path:"/"
    }
  }
  
  componentDidMount(){
    const init_state =  this.props.location.pathname.split("/")[1]  
    if(init_state!=this.state.prv_state){
      this.setState({prv_state:init_state})
      this.props.update_app_state(init_state) 
    }
  }

  componentDidUpdate(){
    const {app_state} = this.props
    const current_path = this.props.location.pathname
    const new_state = current_path.split("/")[1]

    if(current_path!==this.state.prv_path){
      ReactGA.initialize('UA-139974495-1');
		  ReactGA.pageview(current_path);
      this.setState({prv_path:current_path});  
    }
    if(new_state!==this.state.prv_state){
      this.setState({prv_state:new_state})
    }
  }


  target_component = state => { 
    switch(state) {
      case 'patient':
        return Patient
      case 'user':
          return PasswordReset
      case 'therapist':
          return Therapist 
      default:
        return MainPage;
    }
  }

  mapStateToPath = state => {
    switch(state) {
      case 'checkout':
        return "/checkout"
      case 'treatment':
        return "/treatment"
      case 'patient':
        return "/patient"
      case 'therapist':
        return "/therapist"
      case 'user':
        return "/user"
      default:
        return "/";
    }
  }

  render(){
    let component = this.target_component(this.state.prv_state)
    let path = this.mapStateToPath(this.state.prv_state)
    
    console.log(path, ",", this.state.prv_state)
    return (
      <div className="App d-flex justify-content-center container">
        <ErrorBoundary>
          <Route path={path} component={component}/>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {global_reducer: {app_state}} = state
  return {app_state: app_state}
}

export default withRouter(connect(mapStateToProps,{update_app_state}) (App))
