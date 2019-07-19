import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'
import * as components from '../question_components/components'

class PaymentElements extends Component {

  constructor(props){
    super(props)
    this.state = {
        payment_full_name: ''
      }
  }

  update_handler = (e) => { 

    // Handle result.error or result.token
    this.props.stripe.createToken({name: this.state.payment_full_name}).then((result) => {
      console.log("create token: ", result)
      this.props.submit_payment(this.state.payment_full_name, result.token)
    }).catch(err => {  
      //this.props.submit_payment(this.state.payment_full_name, "")
      alert("Please input valid credit card information")
    })
    }

    update_property = (which, e) => {
      this.setState({[which]:e.target.value})
    }

  
  render(){
    const createOptions = (fontSize) => {
        return {
          style: {
            base: {
            fontSize: `${fontSize}px`,
            height: '60px',
            width:  '500px',
            'border-radius': '2px',
            'border-style': 'solid',
            'border-width': '2px',
            'border-color': 'rgba(37, 0, 68, 1.0)',
            color: '#868e96',
            fontFamily: 'ProximaNova-Bold", Helvetica, Arial',
            '::placeholder': {
                color: "#868e96",
            },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        };
      }
    return (
      <div className="patient_shipping">
        {components.input_type_payment(this.update_property.bind(this, 'payment_full_name'), "Card holder name", 'cc-name')}
        <CardElement className = "form-control" {...createOptions(20)}/>
        {components.confirm_button_type_1(this.update_handler, "Confirm payment information >")}
        <div className="d-flex justify-content-center confirm-btn-holder"> 
          <div className = "d-flex justify-content-center payment-warning">*Cancel at any time (cancellation policy) </div>
        </div>

      </div>
    );
  }
}

export default injectStripe(PaymentElements);
