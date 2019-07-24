import React, {Component} from 'react';
import { connect } from 'react-redux'
import { upload_object_for_current_question, create_payment, validate_referral_code } from '../../actions/patient_action'
import {Elements, StripeProvider} from 'react-stripe-elements'
import PaymentElements from './payment_elements'
import Dropzone from 'react-dropzone'
import { Modal } from 'react-bootstrap'
import Webcam from "react-webcam"
import * as util from '../../utils/common'

class PatientPayment extends Component {

  constructor(props){
    super(props)
    this.state = {
      code:"",
      is_available:false,
      ins_checked:false,
      upload_modal:false,
      cam_state:'camera',
      screenchot_type:null,
      back_card:null,
      front_card:null
    }
  }

  componentDidMount = () => {

  }

  submit_payment = (payment_full_name, token) => {

    //TODO: have to send referral code 
    if(this.state.ins_checked && (!this.state.back_card || !this.state.front_card)){
      alert("Please upload your insurance card"); 
      return;
    } 
    

    if(this.state.ins_checked){
      const front_card = util.imgtoBlob(this.state.front_card, "image/jpeg")
      const back_card = util.imgtoBlob(this.state.back_card, "image/jpeg")
      this.props.upload_object_for_current_question(front_card, "image/jpeg", "ins_card_front").then((resp1)=>{
        this.props.upload_object_for_current_question(back_card, "image/jpeg", "ins_card_back").then((resp2)=>{
          this.props.create_payment(payment_full_name, token).then((resp) => {       
            let answer = {transaction_code: resp.transaction_code, content_type:["image/jpeg", "image/jpeg"], file_name:["ins_card_front, ins_card_back"]};
            return this.props.submit_action({answer:JSON.stringify(answer)}, this.props.question); 
          }).catch((err) => {
            console.log("err, please try again:", err)
          })

        })
      }) 
    }else{
      this.props.create_payment(payment_full_name, token).then((resp) => {       
        return this.props.submit_action(JSON.stringify({transaction_code:resp.transaction_code}), this.props.question);
      }).catch((err) => {
        console.log("err, please try again:", err)
      })
    }
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

  upload_ins_card = (type) => {
    this.setState({cam_state:"camera", upload_modal:true, screenshot_type:type})   
  }

  set_photo_handler = (is_save, type) => {
    if(!is_save){ 
      this.setState({cam_state:"camera", upload_modal:false, [type]:null})   
    }else{
      this.setState({cam_state:"camera", upload_modal:false}) 
    } 
  }

	screenshot_handler = (type) => {
    if(this.state.cam_state==="camera"){
		  const screenshot = this.refs.webcam.getScreenshot()
		  this.setState({[type]:screenshot, cam_state:"display"})
    }else{
      this.setState({[type]:null, cam_state:"camera"})
    }
	}

  img_upload_modal = ({open, close, message}) => {
    let ss_type = this.state.screenshot_type
    return (
      <Modal className="ins-card-modal" show={this.state.upload_modal} onHide={() => this.set_photo_handler(false, ss_type)}>
        <Modal.Body>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column justify-content-center"> 
                {this.state.cam_state==="camera"?<Webcam className ={"d-flex justify-content-center ins-webcam-holder"} width={'100%'} height={'100%'} ref='webcam' screenshotForma="image/jpeg"/>:<img alt="insurance card" src={this.state[ss_type]}/>}               
              <div className ="d-flex justify-content-center">

                <div className = "d-flex justify-content-center align-items-center ins_card_camera_btn" onClick={() => this.screenshot_handler(ss_type)}>
                    {this.state.cam_state==="camera"?"Take photo with Webcam":"Take again"}
                </div>               
            </div>
            </div> 
            <div className="d-flex flex-row justify-content-center">
              <div className="d-flex justify-content-center align-items-center ins-modal-btn" onClick={() => this.set_photo_handler(true, ss_type)}>
                Upload Photo
              </div>
              <div className="d-flex justify-content-center align-items-center ins-modal-btn" onClick={() => this.set_photo_handler(false, ss_type)}>
                Cancel
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  

  ins_card_view = () => {
    return (
      <div className = "d-flex flex-column payment-info-item">
        <span className="payment-plain-text">Insurance Card Information:</span>
        <div className="d-flex flex-row justify-content-center align-items-center ins-card-btn-holder">
          <div className = "d-flex flex-column align-items-center ins-card" onClick={e=>this.upload_ins_card("front_card")}>
            <img className="ins-display-photo" src= {this.state.front_card?this.state.front_card:process.env.PUBLIC_URL + '/img/ins_card.png'}/>
            <img className="abs-photo-icon" src= {process.env.PUBLIC_URL + '/img/take_photo.png'}/>
            <div className="title"> Front </div>
          </div>
          <div className = "d-flex flex-column align-items-center ins-card"  onClick={e=>this.upload_ins_card("back_card")}>
            <img className="ins-display-photo" src= {this.state.back_card?this.state.back_card:process.env.PUBLIC_URL + '/img/ins_card.png'}/>
            <img className="abs-photo-icon" src= {process.env.PUBLIC_URL + '/img/take_photo.png'}/>
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
    return (
      <div>
          {this.state.upload_modal?this.img_upload_modal({open:true}):null}
          {this.main_view()}
      </div>
    )
  }
}

export default connect(null, { upload_object_for_current_question, create_payment, validate_referral_code}) (PatientPayment)
