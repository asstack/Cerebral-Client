import React, {Component} from 'react';
import * as components from '../question_components/components'

class PaymentInformation extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      provider:this.props.attr.provider,
      number:this.props.attr.number,
      exp:this.props.attr.exp,
      cvc:this.props.attr.number,
      new_provider:"",
      new_number:"",
      new_exp:"",
      new_cvc:""
    }
  }

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write'}) 
    else this.setState({type:'read'})
  } 

  //TODO: practics: california -> where get and set this info
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">PAYMENT INFORMATION</div>
        <div className="small-card-item">{this.state.provider + " card"}</div>
        <div className="small-card-item">{this.state.number}</div>
        <div className="small-card-item">{this.state.exp}</div>
        <div className="small-card-item">{this.state.cvc}</div>
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

  render(){
    let view = this.state.type==='read'?this.read_view():this.write_view()
    return view 
  }


}


export default PaymentInformation
