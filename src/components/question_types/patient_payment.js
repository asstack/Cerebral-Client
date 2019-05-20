import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as components from '../question_components/components'
import { create_payment } from '../../actions/patient_action'

class PatientPayment extends Component {

  constructor(props){
    super(props)
    this.state = {
      payment_full_name: '',
      payment_card_number:'',
      payment_exp_month:'',
      payment_exp_year:'',
      payment_cc:''
    }
  }

  update_handler = (e) => { 

    create_payment(this.state.payment_full_name, this.state.payment_card_number, this.state.payment_exp_month, this.state.payment_exp_year, this.state.payment_cc).then((resp) => {
      
      // DO NOT SEND PAYMENT INFORMATION to submit_action here IT WILL END UP IN THE DATABASE
      this.props.submit_action(resp.transaction_code) 
    })
   }

   update_property = (which, e) => {
       this.state[which] = e.target.value
   }
  
  render(){
    return (
      <div className="patient_shipping">
        {components.input_type_autocomplete(this.update_property.bind(this, 'payment_full_name'), "Card Holder Name", 'cc-name')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'payment_card_number'), "Card Number", 'cc-number')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'payment_exp_year'), "Expiration MM-YYYY", 'cc-exp')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'payment_cvc'), "CC", 'cc-csc')}
        {components.confirm_button_type_1(this.update_handler.bind(this), "Confirm Payment Information")}
      </div>
    );
  }
}

export default connect(null, {create_payment}) (PatientPayment)
