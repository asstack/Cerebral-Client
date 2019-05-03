import React, {Component} from 'react';
import {Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import PatientInit from './containers/patient/patient_init'
import MainPage from './containers'

class App extends Component{

  //Todo: get state before compoenet mounting
  //Routing : [/, patinet, therapist]
  constructor(props){
    super(props)
    this.state = {
      prv_state:this.props.app_state
    }
  }
  //[patient/]
  componentDidMount(){
    const {app_state} = this.props
    this.props.history.push(this.mapStateToPath(app_state))
  }

  componentDidUpdate(){
    const {app_state} = this.props
    if(app_state!==this.state.prv_state){
      this.setState({prv_state:app_state})
      this.props.history.push(this.mapStateToPath(app_state))
    }
  }

  target_component = state => {
    switch(state) {
      case 'patient':
        return Patient
      case 'patient/initial_step':
        return PatientInit
      default:
        return MainPage;
    }
  }

  mapStateToPath = state => {
    switch(state) {
      case 'patient':
        return "/patient"
      case 'patient/initial_step':
        return "/patient/initial_step"
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

export default withRouter(connect(mapStateToProps,{}) (App))
