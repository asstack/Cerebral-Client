import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { sign_in } from '../../actions/user_auth_action'
import { set_visit, get_patient_most_recent_visits, update_patient_state, move_patient_sign_up, set_profile_question, set_patient } from '../../actions/patient_action'
import * as components from '../../components/question_components/components'
import RegisterManager from '../../components/question_types/register_manager'


class Account extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    if(this.props.login_info.attributes['access-token']){    
      this.page_update_handler()
    } 
  } 
  componentDidUpdate(){
    if(this.props.login_info.attributes['access-token']){    
      this.page_update_handler()
    } 
  }

  //if got something from parent, go there
  page_update_handler = () => {
    if(this.props.next_url){
      this.props.history.push(this.props.next_url) 
    }else{
      this.props.history.push('/therapist/dashboard')
    } 
  }

  sign_in_handler = user_info => {
    //api call 
  }
  
  register_hanlder = user_info => {
    //api call 
  }

  render(){
    return (
      <div className="d-flex flex-column container-noprogress">
        <div className="d-flex flex-row justify-content-left header-noprogress">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex flex-column main-noprogress">
            <div className="description_noprogress">
              <h1>Create or Sign in an account to refer patient</h1>
            </div>
            <RegisterManager signin_submit_action = {this.sign_in_handler} register_submit_action = {this.register_handler} view_type='register'/>
          </div> 
        </div> 
       </div> 
   );
  }
}


const mapStateToProps = (state) => ({
  login_info : state.global_reducer.current_user
})

export default connect(mapStateToProps, null)(Account) 
