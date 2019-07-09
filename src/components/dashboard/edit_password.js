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
    return ((this.state.new_password === next_state.new_password 
      && this.state.new_password_confirm === next_state.new_password_confirm 
    ))
  }

  update_password_handler=(type, value)=>{
     this.setState({[type]:value}) 
  }
  
  submit_btn_handler = () => {
    if(this.state.new_password === this.state.new_password_confirm){
      this.props.update_password(this.state.new_password_confirm, this.state.new_password).then(resp=>{
        this.setState({new_password:'', new_password_confirm:''})
        alert("Your password has been changed successfully")
        this.forceUpdate()
      }).catch(err => {
        alert("your password should be at least 8 characters")
      }) 
    }else {
        alert("Password confirmation doesn't match Password")
    }
  }

  write_view = (uuid) =>(
    <div className="align-self-start main-content-small-card" key={uuid}>
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">Change password</div>

        <div className="small-card-item">
          <input type="password" default_value="" placeholder='New password' onChange={e=>this.update_password_handler("new_password", e.target.value)}/>
        </div>
        <div className="small-card-item">
          <input type="password" default_value="" placeholder='Confirm new password'  onChange={e=>this.update_password_handler("new_password_confirm", e.target.value)}/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.submit_btn_handler()}>Submit</div>
          <div></div>
        </div>
      </div> 
    </div> 
  ) 

  render(){
    let uuid = uuidv1()
    return this.write_view(uuid)
  }
}


export default connect(null, {update_password}) (EditPassword)
