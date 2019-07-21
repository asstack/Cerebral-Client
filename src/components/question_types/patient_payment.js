import React, {Component} from 'react';
import { connect } from 'react-redux'
import { create_payment, validate_referral_code } from '../../actions/patient_action'
import {Elements, StripeProvider} from 'react-stripe-elements'
import PaymentElements from './payment_elements'

class PatientPayment extends Component {

  constructor(props){
    super(props)
    this.state = {
      code:"",
      is_available:false,
      ins_checked:false,
      upload_modal:false,
    }
  }

  componentDidMount = () => {
  }

  submit_payment = (payment_full_name, token) => {
    this.props.create_payment(payment_full_name, token).then((resp) => {     

      console.log("create payment resp:", resp)
      // DO NOT SEND PAYMENT INFORMATION to submit_action here IT WILL END UP IN THE DATABASE
      return this.props.submit_action(resp.transaction_code) 
    }).catch((err) => {
      //return this.props.submit_action("temp") 
      console.log("err, please try again:", err)
    })
  }

  //TODO: If we have info for therapist company, they will generate their own code and will check by validate_referral_code api
  update_code_handler = (e) => {
    let code = e.target.value
    if(code == "Cerebralpartner" ){
      this.setState({is_available:true, code:code})
      /*
      this.props.validate_referral_code(this.props.user.patient.id, code).then(resp=>{
        let is_valid = resp.data.length===1?true:false
        this.setState({is_available:is_valid, code:code})
      })
      */
    }else{
      this.setState({is_available:false, code:code})
    }
  }
  check_insurance_handler = type => {
    if(type==='ins'){
      this.setState({ins_checked:true})
    }else{
      this.setState({ins_checked:false})
    }
  }

  upload_ins_card = type => {
    this.setState({upload_modal:true})
  }


  img_upload_modal = () => {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  ins_card_view = () => {
    return (
      <div className = "d-flex flex-column payment-info-item">
        <span className="payment-plain-text">Insurance Card Information:</span>
        <div className="d-flex flex-row justify-content-center align-items-center ins-card-btn-holder">
          <div className = {"d-flex flex-column align-items-center ins-card"} onClick={e=>this.upload_ins_card()}>
            <div className="title"> Front </div>
          </div>
          <div className = {"d-flex flex-column align-items-center ins-card"}  onClick={e=>this.upload_ins_card()}>
            <div className="title"> Back </div>
          </div>
        </div>
      </div>
    )
  }

  main_view =() => {
    let ins_checked = this.state.ins_checked?"-checked":"";
    let no_ins_checked = !this.state.ins_checked?"-checked":""; 
    return (
      <div className = "d-flex flex-column">
        {this.state.upload_modal?this.img_upload_modal():null}
        <div className = "d-flex flex-column payment-info">
          <div className = "d-flex flex-column payment-info-item">
            <h1>Your treatment if prescribed:</h1>
            <div className = "d-flex flex-row justify-content-between">
              <span className = "payment-plain-text">Medication Subscription</span>
              <span className = "payment-plain-text">$45.00/mo</span>
            </div>
          </div>
          <div className = "d-flex flex-column payment-info-item">
            <span className="payment-plain-text">How would you like to pay for your medictation?</span>
            <div className="d-flex flex-row justify-content-between insurance-btn-holder">
              <div className = {"d-flex flex-column align-items-center insurance-btn"+ins_checked} onClick={e=>this.check_insurance_handler("ins")}>
                <div className="title"> With Insurance </div>
                <div className="description"> As little as $17/mo </div>
              </div>
              <div className = {"d-flex flex-column align-items-center insurance-btn"+no_ins_checked} onClick={e=>this.check_insurance_handler("no_ins")}>
                <div className="title">No Insurance </div> 
                <div className="description">As little as $45/mo</div>
              </div>
            </div>
          </div>
          {this.state.ins_checked?
           this.ins_card_view()
           :null
          }
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
            <span className = "payment-bold-text">{!this.state.is_available?"$45.00/mo":"$38.00/mo"}</span>
          </div>
        </div>

        <StripeProvider apiKey="pk_test_UARvRgKLIpQAbSeJrjRdd45K003KBuhOEM">
          <Elements>
        <PaymentElements submit_payment = {this.submit_payment.bind(this)} />
        </Elements>
        </StripeProvider>
      </div>
    )
  }

  
  render(){
    console.log("modal: ",this.state.upload_modal)
    return this.main_view()
  }
}

export default connect(null, {create_payment, validate_referral_code}) (PatientPayment)
