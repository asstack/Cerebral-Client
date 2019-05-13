import React, {Component} from 'react';
import * as components from '../question_components/components'

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
      this.props.submit_action(this.state) 
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

export default PatientPayment
