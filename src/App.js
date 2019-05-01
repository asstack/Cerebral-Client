import React, {Component} from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import MainPage from './containers'

class App extends Component{

  //Todo: get state before compoenet mounting
  //Routing : [/, patinet, therapist]
  constructor(props){
    super(props)
  }

  //[patient/]
  componentDidMount(){

  }

  target_component = state => {
    switch(state) {
      case 'patient':
        return Patient
      default:
        return Patient;
    }
  }

  mapStateToPath = state => {
    switch(state) {
      case 'patient':
        return "/patient"
      default:
        return "";
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Route path={this.mapStateToPath(this.props.app_state)} component={this.target_component(this.props.app_state)}/>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (state) => {
  const {global_reducer: {app_state}} = state
  return state
}

export default withRouter(connect(mapStateToProps,{}) (App))
