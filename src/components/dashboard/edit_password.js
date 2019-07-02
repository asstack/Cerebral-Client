import React, {Component} from 'react';
import { connect } from 'react-redux'
import {update_password} from '../../actions/user_auth_action' 
import uuidv1 from 'uuid'

//not sure patient and therapist can share this component
class EditPassword extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      password:'',
      new_password:'',
      new_password_confirm:'',
    }
  }

  shouldComponentUpdate(next_props, next_state){
    return ((this.state.type!==next_state.type)||(this.state.password===next_state.password 
      && this.state.new_password === next_state.new_password 
      && this.state.new_password_confirm === next_state.new_password_confirm 
    ))
  }

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write', password:"",new_password:"",new_password_confirm:""}) 
    else this.setState({type:'read', password:"", new_password:"",new_password_confirm:""})
  } 

  update_password_handler=(type, value)=>{
     this.setState({[type]:value}) 
  }

  
  submit_btn_handler = () => {
    if(this.state.new_password === this.state.new_password_confirm){
      this.props.update_password(this.state.new_password, this.state.new_password_confirm, this.state.password).then(resp=>{
        this.setState({type:'read', password:'', new_password:'', new_password_confirm:''})
        alert("Your password has been changed successfully")
      }).catch(err => {
        alert("Current password is not correct")
      }) 
    }else {
        alert("Password confirmation doesn't match Password")
    }
  }

  //TODO: practics: california -> where get and set this info
  read_view = (uuid) =>(
    <div className="align-self-start main-content-small-card" key={uuid}>
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">Change password</div>
        <div className="small-card-item">
          <input type="password" default_value="" placeholder="Password" disabled={true}/>
        </div>
        <div className = "d-flex flex-row justify-content-start">
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
        </div>
      </div> 
    </div> 
  ) 

  write_view = (uuid) =>(
    <div className="align-self-start main-content-small-card" key={uuid}>
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">Change password</div>

        <div className="small-card-item">
          <input type="password" default_value="" placeholder="Password" onChange={e=>this.update_password_handler("password", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="password" default_value="" placeholder='New password' onChange={e=>this.update_password_handler("new_password", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="password" default_value="" placeholder='New password (confirm)'  onChange={e=>this.update_password_handler("new_password_confirm", e.target.value)}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.submit_btn_handler()}>Submit</div>
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Cancel</div>
        </div>
      </div> 
    </div> 
  ) 

  render(){

    let uuid = uuidv1()
    let view = this.state.type==='read'?this.read_view(uuid):this.write_view(uuid)
    return view 
  }
}


export default connect(null, {update_password}) (EditPassword)
