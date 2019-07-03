import React, {Component} from 'react';
import * as components from '../question_components/components'
import {injectStripe} from 'react-stripe-elements'
import {Elements, StripeProvider, InjectedCheckoutForm} from 'react-stripe-elements'
import { CardNumberElement, CardExpiryElement, CardCVCElement, CardElement} from 'react-stripe-elements'

class PaymentElements extends Component {

  constructor(props){
    super(props) 
    this.state = {
      new_provider:"",
      new_number:"",
      new_exp:"",
      new_cvc:""
    }
  }

 test_handler = (e) =>{
    console.log("update:", e)
  }

 submit_handler = () => {
   this.props.stripe
     .createToken({type:'card', name: this.state.full_name})
     .then(rst => {
       if(rst){
         this.props.update_payment_info(this.state.full_name, rst.token, this.props.patient.id).then(resp => {
          console.log("update card info :", resp)
          this.props.update_state(rst.token.card)
         })
         }else{

         }
     })
 }

  update_property=(which, e)=>{
    this.setState({full_name:e.target.value})
  }

  element_options = () => {
      return {
        style: {
          base: {
          fontSize: '16px',
          height: '60px',
          width:  '500px',
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

  elementClasses =()=> {
    return (
      {focus: 'focused',
      empty: 'empty',
      invalid: 'invalid'}
    )
  };
  
  stripe_view = () => {
    return(
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">Payment Information</div>
        <div className="small-card-item">
          <input type="text" placeholder="Card holder name" autoComplete="ccname" onChange={e=>this.update_property('payment_full_name', e)} />
        </div>
        <div className="small-card-item">
          <CardNumberElement placeholder="Card number" onChange={this.test_handler} style={{base: {fontSize: '18px',color:'#250044','::placeholder':{}}}}/>
        </div>
        <div className="small-card-item">
          <CardExpiryElement onChange={this.test_handler}  style={{base: {fontSize: '18px', color:'#250044'}}}/>
        </div>
        <div className="small-card-item">
          <CardCVCElement onChange={this.test_handler}  style={{base: {fontSize: '18px', color:'#250044'}}}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.submit_handler()}>Submit</div>
          <div className="small-card-btn" onClick={e=>this.props.update_state()}>Cancel</div>
        </div>
      </div> 
   )
  }

  render(){
    return this.stripe_view()
  }

}


export default injectStripe(PaymentElements)
