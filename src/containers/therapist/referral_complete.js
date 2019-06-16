import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'

class ReferralComplete extends Component {

  constructor(props){
    super(props)
    this.state = {
    
    }
  }

  btn_handler = () => { 
    this.props.history.push("/therapist/dashboard") 
  }
    /*
 <div className="d-flex flex-row justify-content-between align-items-center therapist-header">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
 
 */

  //TODO: reuse component in components/static_components/ change name and pass the function to move proper url 
  render(){
    return (
      <div className="d-flex flex-column therapist-noprogress">
        <div className="d-flex flex-row justify-content-between align-items-center therapist-header">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
 
        <div className="d-flex flex-column justify-content-center container-noprogress align-items-center">
         
          <div className="description_noprogress">
            <h1>Thanks for choosing Cerebral. </h1>
          </div>
          <div className="d-flex justify-content-center text-mid-title">
            <p>What happens now?</p>
          </div>

          <div className="d-flex justify-content-center image-holder">
            <img src={process.env.PUBLIC_URL + '/img/connect_message.png'} />
          </div>

          <div className="d-flex justify-content-center complete-message-holder text-small-2">
            A referral link will be sent to your patient(s). Once the patient follows through, you’ll be notified via email and a notification on your account.  You now have access to our secure messaging portal for follow-ups with the prescribing doctor from your member profile.
          </div>
          {components.confirm_button_type_1(this.btn_handler, "Go to your profile >")}
        </div>
      </div>
   );
  }
}

export default withRouter(ReferralComplete)
