import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter } from "react-router-dom"
import {get_patient_shipping_address, update_patient_shipping_address} from '../../actions/patient_action'

//not sure patient and therapist can share this component
class ShippingInformation extends Component {

  // {address_1: null, address_2: null, city: null, region: null, postal_code: null}

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      address_1:'',
      address_2:'',
      city:'',
      region:'',
      postal_code:'',
      new_address_1:'',
      new_address_2:'',
      new_city:'',
      new_region:'',
      new_poastal_code:'',
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

  update_address_handler = (type, value) => {
    this.setState({[type]:value})
  }


  submit_btn_handler = () =>{
    const {new_address_1, new_address_2, new_city, new_region, new_postal_code} = this.state
    if(new_address_1 && new_city && new_region && new_postal_code){
      const addr = {address_1:new_address_1, address_2:new_address_2, city:new_city, region:new_region, postal_code:new_postal_code}
      this.props.update_patient_shipping_address(addr).then(resp => {
        alert("Your shipping information has been updated successfully")
        this.setState(
          {
            type:'read',
            address_1:new_address_1,
            address_2:new_address_2,
            city:new_city,
            region:new_region,
            postal_code:new_postal_code,
            new_address_1:'',
            new_address_2:'',
            new_city:'',
            new_region:'',
            new_poastal_code:'',
          }
        ) 
      }) 
    }else{
      alert("Please input valid address")
    }
  }

 
  //TODO: Need address validation 
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">SHIPPING INFORMATION</div>
        <div className="small-card-item">{this.state.address_1}</div>
        <div className="small-card-item">{this.state.city?this.state.city+","+this.state.region:null}</div>
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
          <input type="text" placeholder="address_1" onChange={e=>this.update_address_handler("new_address_1", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='address_2' onChange={e=>this.update_address_handler("new_address_2", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='city' onChange={e=>this.update_address_handler("new_city", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='region' onChange={e=>this.update_address_handler("new_region", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='postal_code' onChange={e=>this.update_address_handler("new_postal_code", e.target.value)}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.submit_btn_handler()}>Submit</div>
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

export default withRouter(connect(null, {update_patient_shipping_address, get_patient_shipping_address}) (ShippingInformation))
