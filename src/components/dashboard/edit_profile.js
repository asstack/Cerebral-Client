import React, {Component} from 'react';
import { connect } from 'react-redux'
import {update_user_information} from '../../actions/user_auth_action' 
    
//not sure patient and therapist can share this component
class EditProfile extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      email:this.props.attr.email,
      first_name:this.props.attr.first_name,
      last_name:this.props.attr.last_name,
      new_email:'',
      new_first_name:'',
      new_last_name:''
    }
  }

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write'}) 
    else this.setState({type:'read'})
  } 

  submit_btn_handler=()=>{
    let new_email = this.state.new_email||this.state.email
    let new_first_name = this.state.new_first_name||this.state.first_name
    let new_last_name = this.state.new_last_name||this.state.last_name
    this.props.update_user_information({email:new_email, first_name:new_first_name, last_name:new_last_name}).then(resp=>{
      alert("Your information has been changed successfully")
      this.setState({first_name:new_first_name, last_name:new_last_name, email:new_email, type:'read'})
    })
    
  }

  update_user_info_handler = (type, val) => {
    this.setState({[type]:val})
  }
  
  //TODO: practics: california -> where get and set this info
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>
        <div className="small-card-item">{this.state.first_name}</div>
        <div className="small-card-item">{this.state.last_name}</div>
        <div className="small-card-item">{this.state.email}</div>
        <div className = "d-flex flex-row justify-content-start">
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
        </div>
      </div> 
    </div> 
  ) 

  write_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>

        <div className="small-card-item">
          <input type="text" placeholder="First Name" defaultValue={this.state.first_name} onChange={e=>this.update_user_info_handler("new_first_name",e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='Last Name' defaultValue={this.state.last_name} onChange={e=>this.update_user_info_handler("new_last_name",e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="email" placeholder='Email' defaultValue={this.state.email} onChange={e=>this.update_user_info_handler("new_email",e.target.value)}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.submit_btn_handler('write')}>Save changes</div>
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

export default connect(null, {update_user_information}) (EditProfile)
