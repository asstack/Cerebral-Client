import React, {Component} from 'react';
import * as components from '../question_components/components'
import {connect} from 'react-redux'
import {Route, withRouter } from "react-router-dom"

import {get_patient_shipping_address} from '../../actions/patient_action'

//not sure patient and therapist can share this component
class ShippingInformation extends Component {

  // {address_1: null, address_2: null, city: null, region: null, postal_code: null}

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      address_1:this.props.attr.address_1,
      address_2:this.props.attr.address_2,
      city:this.props.attr.city,
      region:this.props.attr.region,
      postal_code:this.props.attr.postal_code,
      new_street:'',
      new_city:'',
      new_zipcode:''
    }
  }

  componentDidMount = () => {
    this.props.get_patient_shipping_address().then((data) => {
      if (data && data.length > 0) {
        this.setState({
          address_1: data[0].address_1,
          address_2: data[0].address_2,
          city: data[0].city,
          region: data[0].region,
          postal_code: data[0].postal_code
        })
      }
    })
  }  

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write'}) 
    else this.setState({type:'read'})
  } 

  //TODO: Need address validation 
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">SHIPPING INFORMATION</div>
        <div className="small-card-item">{this.state.address_1}</div>
        <div className="small-card-item">{this.state.city}, {this.state.region}</div>
        <div className="small-card-item">{this.state.postal_code}</div>
        <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
      </div> 
    </div> 
  ) 

  write_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">SHIPPING INFORMATION</div>

        <div className="small-card-item">
          <input type="text" placeholder="street" defaultValue={this.state.first_name}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='city' defaultValue={this.state.last_name}/>
        </div>
        <div className="small-card-item">
          <input type="email" placeholder='zipcode' defaultValue={this.state.email}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Submit</div>
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Cancel</div>
        </div>
      </div> 
    </div> 
  ) 

  render(){
    let view = this.state.type==='read'?this.read_view():this.write_view()
    return view 
  }


}

export default withRouter(connect(null, {get_patient_shipping_address}) (ShippingInformation))
