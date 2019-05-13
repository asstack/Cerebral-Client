import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import Qualification from './containers/patient/qualification'
import MainPage from './containers'
import Identification from './components/question_types/patient_identification'
import {update_app_state} from './actions'
import ReactGA from 'react-ga'
import ShippingPayment from './containers/patient/shipping_payment';
// import ErrorBoundary from './error_boundary'

class App extends Component{

  //Todo: get state before compoenet mounting
  //Routing : [/, patinet, therapist]
  constructor(props){
    super(props)
    this.state = {
      prv_state:"", 
      prv_path:"/"
    }
  }
  
  componentDidMount(){
    const {app_state} = this.props
    const init_state =  this.mapPathToState(this.props.location.pathname.split("/").pop())   
    if(!app_state){
      this.props.update_app_state(init_state) 
    } 
  }

  componentDidUpdate(){
    const {app_state} = this.props
    const current_path = this.props.location.pathname
    
    if(current_path!==this.state.prv_path){
      ReactGA.initialize('UA-139974495-1');
		  ReactGA.pageview(current_path);
      this.setState({prv_path:current_path});  
    }
    if(app_state!==this.state.prv_state){
      this.setState({prv_state:app_state})
      this.props.history.push(this.mapStateToPath(app_state))
    }
  }

  mapPathToState = path => {
    switch(path){
      case 'start':
        return 'qualification'
      default:
        return path
    }
  }

  target_component = state => {
    switch(state) {
      case 'patient':
        return Patient
      case 'checkout':
        return ShippingPayment
      case 'qualification':
        return Qualification
      default:
        return MainPage;
    }
  }

  mapStateToPath = state => {
    switch(state) {
      case 'checkout':
        return "/checkout"
      case 'patient':
        return "/patient"
      case 'qualification':
        return "/start"
      default:
        return "/";
    }
  }

  render(){
    return (
      <div className="App">
        <Route path={this.mapStateToPath(this.props.app_state)} component={this.target_component(this.props.app_state)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {global_reducer: {app_state}} = state
  return {app_state: app_state}
}

export default withRouter(connect(mapStateToProps,{update_app_state}) (App))
