import React, {Component} from 'react';
import { connect } from 'react-redux'
import { create_payment } from '../../actions/patient_action'
import {Elements, StripeProvider} from 'react-stripe-elements'
import PaymentElements from './payment_elements'

class PatientPayment extends Component {

  constructor(props){
    super(props)
    this.state = {
      code:"",
    }
  }

  componentDidMount = () => {
  }

  submit_payment = (payment_full_name, token) => {
    this.props.create_payment(payment_full_name, token).then((resp) => {     
      // DO NOT SEND PAYMENT INFORMATION to submit_action here IT WILL END UP IN THE DATABASE
      return this.props.submit_action(resp.transaction_code) 
    }).catch((err) => {
      console.log("payment:", err)
      //return this.props.submit_action("temp") 
    })
  }

  update_code_handler = (e) => {
    this.setState({code:e.target.value}) 
  }
  
  render(){
    return (
      <div className = "d-flex flex-column">
        <div className = "d-flex flex-column payment-info">
          <div className = "d-flex flex-column payment-info-item">
            <h1>Your treatment if prescribed:</h1>
            <div className = "d-flex flex-row justify-content-between">
              <span className = "payment-plain-text">Medication Subscription</span>
              <span className = "payment-plain-text">$45.00/mo</span>
            </div>
          </div>
          <div className = "d-flex flex-column payment-info-item">
            <div className = "d-flex flex-row justify-content-between">
              <span className="payment-plain-text" >Online Doctor’s visit</span>
              <div className="d-flex flex-row justify-content-between">  
                <span className = "payment-plain-text text-green">FREE</span>
                <span className="payment-plain-text text-disable">$15.00/visit</span>
              </div>
            </div>
            <span className = "payment-plain-text payment-left-text">Your first visit is free</span>
          </div>
          <div className = "d-flex flex-row justify-content-between align-items-center payment-info-item">
            <span className = "payment-plain-text">Referral code (-$7.00)</span>
            <div className = "d-flex flex-row align-items-center payment-input-holder">
              <input type='text' onChange={this.update_code_handler} placeholder='Enter your therapist referral code here'/>
            </div>
          </div>
          <div className = "d-flex flex-row justify-content-between payment-info-item-total">
            <span className = "payment-bold-text">Order Total</span>
            <span className = "payment-bold-text">{this.state.code !=='Wellspace01'?"$45.00/mo":"$38.00/mo"}</span>
          </div>
        </div>

        <StripeProvider apiKey="pk_test_UARvRgKLIpQAbSeJrjRdd45K003KBuhOEM">
          <Elements>
        <PaymentElements submit_payment = {this.submit_payment.bind(this)} />
        </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default connect(null, {create_payment}) (PatientPayment)
