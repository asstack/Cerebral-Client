import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import * as components from '../question_components/components'
import {get_payment_info, update_payment_info} from "../../actions/patient_action"
import PaymentElements from './payment_elements'
import {Elements, StripeProvider, InjectedCheckoutForm} from 'react-stripe-elements'
import { CardNumberElement, CardExpiryElement, CardCVCElement, CardElement} from 'react-stripe-elements'


//get_payment_info
class PaymentInformation extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      external_id:'',
      provider:'',
      last4:'',
      exp_month:'',
      exp_year:'',
      cvc:'',
    }
  }


  componentDidMount = () => {
    this.props.get_payment_info(this.props.patient.id).then(resp => {
      let methods = resp.data.sources.data
      if(methods.length>0){
        let card = methods[0]
        this.setState({provider:card.brand,exp_month:card.exp_month, 
                        exp_year:card.exp_year, last4:card.last4})
      }
   })     
  }

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write'}) 
    else this.setState({type:'read'})
  } 

  
  update_card_info=(card)=>{
    if(card){
      this.setState({type:'read', provider:card.brand,exp_month:card.exp_month,
                    exp_year:card.exp_year, last4:card.last4})
    }else this.setState({type:'read'})

  }

  //TODO: practics: california -> where get and set this info
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">PAYMENT INFORMATION</div>
        <div className="small-card-item">{this.state.provider?this.state.provider + " card":null}</div>
        <div className="small-card-item">{this.state.last4?"****-****-****-"+this.state.last4:null}</div>
        <div className="small-card-item">{this.state.exp_month?this.state.exp_month+'/'+this.state.exp_year:null}</div>
        <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
      </div> 
    </div> 
  ) 

  write_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>

        <div className="small-card-item">
          <input type="text" placeholder='Provider' defaultValue={this.state.provider}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='Card Number' defaultValue={this.state.number}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='Exp Month/Year' defaultValue={this.state.exp}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='cvc' defaultValue={this.state.cvc}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Submit</div>
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Cancel</div>
        </div>
      </div> 
    </div> 
  ) 

  stripe_view = () => {
    return(
      <div className="align-self-start main-content-small-card">
        <StripeProvider apiKey="pk_test_UARvRgKLIpQAbSeJrjRdd45K003KBuhOEM">
          <Elements>
            <PaymentElements patient={this.props.patient} update_payment_info={this.props.update_payment_info} update_state={this.update_card_info}/> 
          </Elements>
        </StripeProvider> 
      </div> 
    )
  }

  render(){
    let view = this.state.type==='read'?this.read_view():this.stripe_view()
    return view 
  }
}


export default connect(null, {get_payment_info, update_payment_info}) (PaymentInformation)
