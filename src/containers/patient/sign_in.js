import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { sign_in } from '../../actions/user_auth_action'
import { update_patient_state, move_patient_sign_up, set_profile_question } from '../../actions/patient_action'
import * as components from '../../components/question_components/components'


class SignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      email:'',
      name:'',
      password:''
    }
  }

  componentDidMount(){
    if(this.props.login_info.attributes.token){    
      this.props.history.push('/patient/dashboard') 
    } 
  } 
  componentDidUpdate(){
    if(this.props.login_info.attributes.token){    
      this.props.history.push('/patient/dashboard') 
    } 
  }

  update_email = (e) => {
    const em = e.target.value
    this.setState({email:em})
  }
  update_password = (e) => {
    const pwd = e.target.value
    this.setState({password:pwd})
  }

  state_update_handler = e => {
    const {move_patient_sign_up}=this.props
    move_patient_sign_up()
  }

  sign_in_handler = e => {
    this.props.sign_in(this.state)
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
            <p>Sign In</p>
          </div>
             <div className="patient_signin">
                {components.input_type_1(this.update_email.bind(this), "Email Address")}
                {components.input_password_type_1(this.update_password.bind(this), "Password")}
                {components.confirm_button_type_1(this.sign_in_handler.bind(this), "Get started with online visit")}
                {components.text_button_type_1(this.state_update_handler.bind(this), "I don't have an account.")}
              </div>  
          </div>
      </div>
  
   );
  }
}

const mapStateToProps = (state) => ({
  login_info : state.global_reducer.current_user
})

export default connect(mapStateToProps, {update_patient_state, sign_in,set_profile_question, move_patient_sign_up},)(SignIn)
