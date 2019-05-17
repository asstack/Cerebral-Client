import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import Qualification from './containers/qualification'
import MainPage from './containers'
import Identification from './components/question_types/patient_identification'
import {update_app_state} from './actions'
import ReactGA from 'react-ga'
// import ErrorBoundary from './error_boundary'

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
    const init_state =  this.mapPathToState(this.props.location.pathname.split("/")[1])   
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

  mapPathToState = path => {
    switch(path){
      case 'start':
        return 'qualification'
      default:
        return path
    }
  }

  target_component = state => { 
    console.log(state)
    switch(state) {
      case 'patient':
        return Patient
      case 'start':
        return Qualification
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
      case 'start':
        return "/start"
      default:
        return "/";
    }
  }

  render(){
    let component = this.target_component(this.state.prv_state)
    let path = this.mapStateToPath(this.state.prv_state)
    
    return (
      <div className="App">
        <Route path={path} component={component}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {global_reducer: {app_state}} = state
  return {app_state: app_state}
}

export default withRouter(connect(mapStateToProps,{update_app_state}) (App))
