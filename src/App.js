import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import Patient from './containers/patient'
import Therapist from './containers/therapist'
import MainPage from './containers'
import PasswordReset from './containers/user'
import {update_app_state, set_env} from './actions'
import ReactGA from 'react-ga'
import ErrorBoundary from './error_boundary'
import ModalContainer from 'react-modal-promise'
import 'react-s-alert/dist/s-alert-default.css'
import Alert from 'react-s-alert'
class App extends Component {

  constructor(props){
    super(props)
    props.set_env(props.env)
    if (props.env.REACT_APP_AW_KEY){ 
      ReactGA.initialize(props.env.REACT_APP_AW_KEY, {
        debug: true,
        titleCase: false,
        gaOptions: {
          userId: 123
        }
      });
      /*
      ReactGA.initialize([{
        trackingId: props.env.REACT_APP_GA_KEY,
          gaOptions: {
            name: 'trackerGA',
          }
        }, {
        trackingId: props.env.REACT_APP_AW_KEY,
          gaOptions: { name: 'trackerAD' }}
        ,{ debug: true, alwaysSendToDefaultTracker: false }
      ]
      ); 
      */
    }
    ReactGA.pageview("client main page");
    this.state = {
      current_state:'' 
    }
  }

  componentDidMount(){
    const init_state =  this.props.location.pathname.split("/")[1]  
    if(!init_state){  
      this.props.history.push("/") 
    }else{
      this.setState({current_state:init_state}) 
    }
  }

  componentDidUpdate(){ 

    const new_state =  this.props.location.pathname.split("/")[1]  
    if(this.state.current_state!==new_state){
      console.log("App did update:", new_state)
      this.setState({current_state:new_state});  
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

  render(){
    let component = this.target_component(this.state.current_state) 
    console.log('App rendering: ',this.state.current_state)
    return (
      <div className="App d-flex justify-content-center container">
        <ModalContainer />
        <ErrorBoundary airbrake_project={process.env.REACT_APP_AIRBRAKE_PROJECT_ID} airbrake_key={process.env.REACT_APP_AIRBRAKE_API_KEY}>
          <Route path='/' component={component} />
          <Alert stack={{limit: 3}} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default withRouter(connect(null,{update_app_state, set_env}) (App))
