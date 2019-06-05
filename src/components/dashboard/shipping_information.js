import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class ShippingInformation extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      street:this.props.attr.street,
      city:this.props.attr.city,
      zipcode:this.props.attr.zipcode,
      new_street:'',
      new_city:'',
      new_zipcode:''
    }
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
        <div className="small-card-item">{this.state.street}</div>
        <div className="small-card-item">{this.state.city}</div>
        <div className="small-card-item">{this.state.zipcode}</div>
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

export default ShippingInformation
