import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {reset_password} from '../../actions/user_auth_action'
import ReactGA from 'react-ga'
import * as components from '../../components/question_components/components'

class PasswordReset extends Component{

  constructor(props){
    super(props)
    this.state = {
        email:''
    }
  }
  
  componentDidMount(){
    //ReactGA.initialize('UA-139974495-1');
    //ReactGA.pageview('/MainPage');
    console.log("PasswordReset")
  }

  reset_handler = e => {
    // TODO: get env variable for hostname
    this.props.reset_password(this.state.email, 'http://localhost:3006/user/confirmation').then((resp) => {
        console.log(`reset_handler: ${resp.data}`)
    })
  }

  update_email = (e) => {
    const em = e.target.value
    this.setState({email:em})
  }

  render(){
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div className="p-2">
            <div className="btn-arrow link-type1">
            Cerebral
            </div>
          </div>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex justify-content-center text-big">
            <p>Reset Password</p>
          </div>
             <div className="patient_signin">
                {components.input_type_1(this.update_email.bind(this), "Email Address")}
                {components.confirm_button_type_1(this.reset_handler.bind(this), "Reset password")}
              </div>  
          </div>
      </div>
  
   );
  }
}



export default withRouter(connect(null, {reset_password}) (PasswordReset))
