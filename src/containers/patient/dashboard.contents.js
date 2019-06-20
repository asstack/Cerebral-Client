import React, {Component} from 'react';
import {Route, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import * as components from '../../components/question_components/components'
import EditProfile from '../../components/dashboard/edit_profile'
import EditPassword from '../../components/dashboard/edit_password'
import ShippingInformation from '../../components/dashboard/shipping_information'
import PaymentInformation from '../../components/dashboard/payment_information'
import MessageProcessManager from '../../components/dashboard/message_process_manager'

import {get_patient_shipping_address} from '../../actions/patient_action'


//TODO: will use it as wrapper 
class DashboardContents extends Component{

  constructor(props){
    super(props)
    this.state = {
      user:this.props.user,
      type:this.props.type,
      patients_list:this.props.patients_list,
      shipping_address: {address_1: null, address_2: null, city: null, region: null, postal_code: null},

    }
  }

  componentDidMount = () => {
    this.props.get_patient_shipping_address().then((data) => {
      this.setState({shipping_address: data[0]})
    })
  }  


  componentWillReceiveProps = (next_props) => { 
    this.setState({user:next_props.user, type:next_props.type, patient_list:next_props.patient_list}) 
  }


  //move xxx_view into common area and pass as parameter
  patient_info_view = () =>(
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title">Profile Information</div>
        <div className="d-flex flex-column main-content-column">
          <div className="d-flex flex-row justify-content-between main-content-row flex-wrap">
            <EditProfile attr={this.state.user.attributes}/>
            <ShippingInformation attr={this.state.shipping_address}/>
          </div>
          <div className="d-flex flex-row justify-content-between main-content-row flex-wrap">
            <EditPassword attr={this.state.user.attributes}/>
            <PaymentInformation attr={{provider:"visa", number:"1111-1111-1111-1111", cvc:"111", exp:"11/11"}}/>
          </div>
        
        </div>
      </div>
  )


  type_to_view = (type) => {
    switch(type){
      case 'profile_info':
        return this.patient_info_view()
      case 'subscription_info':
        return <div>subscription info</div>
      case 'message':
        return <MessageProcessManager user={this.state.user} view_type="message_box"/>
      case 'result':
        return <div> message under the construction </div>
      default:
        return "Invalid url"
    } 
  }
  
  render(){
    return (
      this.type_to_view(this.state.type)
    )
  }
}

export default withRouter(connect(null, {get_patient_shipping_address}) (DashboardContents))

