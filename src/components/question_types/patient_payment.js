import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as components from '../question_components/components'
import { create_payment } from '../../actions/patient_action'
import {CardElement, Elements, StripeProvider} from 'react-stripe-elements'
import PaymentElements from './payment_elements'

class PatientPayment extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount = () => {
  }

  submit_payment = (payment_full_name, token) => {
    this.props.create_payment(payment_full_name, token).then((resp) => {
        
      // DO NOT SEND PAYMENT INFORMATION to submit_action here IT WILL END UP IN THE DATABASE
      return this.props.submit_action(resp.transaction_code) 
  })
  }
  
  render(){
    return (
      <StripeProvider apiKey="pk_test_UARvRgKLIpQAbSeJrjRdd45K003KBuhOEM">
        <Elements>
      <PaymentElements submit_payment = {this.submit_payment.bind(this)} />
      </Elements>
      </StripeProvider>
    );
  }
}

export default connect(null, {create_payment}) (PatientPayment)
