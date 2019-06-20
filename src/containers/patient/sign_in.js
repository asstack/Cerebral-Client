import React, {Component} from 'react'
import { connect } from 'react-redux'
import { sign_in } from '../../actions/user_auth_action'
import { set_visit, update_patient_state, move_patient_sign_up, set_profile_question, set_patient } from '../../actions/patient_action'
import * as components from '../../components/question_components/components'

import { createModal } from 'react-modal-promise'
import { Modal } from 'react-bootstrap'

import Alert from 'react-s-alert'

import promiseModal from '../../utils/modal_dialog'

class SignIn extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      email:'',
      name:'',
      password:'',
      message: ''
    }
  }

  componentDidMount(){
    if (this.props.api_middleware.status == 'REAUTH') { 
      Alert.info('You have been logged out for security reasons, please log back in to continue')
    }
    if(this.props.login_info.attributes['access-token']){    
      this.props.history.push('/patient/dashboard') 
    } 
  } 

  componentDidUpdate(){
    
    if(this.props.login_info.attributes['access-token']){    
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
    this.props.history.push('/patient/qualification') 
  }

  handle_patient_previous_state = () => {
    // check to see if patient was in the middle of answering questions by checking patient state
    if (this.props.patient_reducer.question_banks.length > 0 && this.props.patient_reducer.question_banks_step < this.props.patient_reducer.question_banks.length
      & this.props.patient_reducer.step < this.props.patient_reducer.total_step) {
        return promiseModal({ open: true , title: 'Resume Assessment', message:'It looks like you were in the process of completing an assessment when you were logged out. Would you like to begin where you left off?' }).then(value => {
          if (value) {
            // redirect to patient qualification
            this.props.history.push(`${this.props.patient_reducer.question_banks[this.props.patient_reducer.question_banks_step]}`) 
          }
          else {
            // wipe out question_bank stuff
          }
        })
      }
      else {
        // nothing to see here
        return Promise.resolve()
      }
  }

  sign_in_handler = e => {

      this.props.sign_in(this.state).then((resp) => {
        this.handle_patient_previous_state().then(() => {
        if (resp.user_attr.patient) {
          this.props.set_patient(resp.user_attr.patient);
        }
      })
    }).catch((error) => {
      Alert.error(error.message)
    })
  }

  render(){
    return (
      <div className="d-flex flex-column container-noprogress">
        <div className="d-flex flex-row justify-content-left header-noprogress">
          <a href={process.env.REACT_APP_MAIN_PAGE_URL}><img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/></a>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex justify-content-center text-big">
            <p>Sign In</p>
          </div>
          <div className="d-flex justify-content-center">{this.state.message}</div>
             <div className="main-noprogress">
                {components.input_type_1(this.update_email.bind(this), "Email Address")}
                {components.input_password_type_1(this.update_password.bind(this), "Password")}
                {components.confirm_button_type_1(this.sign_in_handler.bind(this), "Get started with online visit")}
                {components.confirm_button_type_2(this.state_update_handler.bind(this), "I don't have an account.")}
              </div>  
          </div>
      </div> 
   );
  }
}

const mapStateToProps = (state) => ({
  login_info : state.global_reducer.current_user,
  patient_reducer: state.patient_reducer,
  api_middleware: state.api_middleware
})

export default connect(mapStateToProps, {set_visit, set_patient, update_patient_state, sign_in,set_profile_question, move_patient_sign_up},)(SignIn)
