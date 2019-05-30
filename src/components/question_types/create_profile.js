import React, {Component} from 'react';
import * as components from '../question_components/components'

class CreateProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      email:'',
      first_name:'',
      last_name:'',
      password:'',
      password_confirm:'',
      msg:'',
      is_consent:false,
      state:null
    }
  }

  update_handler = e => { 
    const {is_consent, email, first_name, 
      last_name, password, password_confirm} = this.state
    if(is_consent && email && first_name && last_name && password.length >= 6 &&(password===password_confirm)){
      this.props.submit_action(this.state) 
    }else{
      if(!email || !first_name || !last_name || !password || !password_confirm){ 
        this.setState({msg:"Please fill all the fields"}) 
      }else if(!is_consent){
        this.setState({msg:"Please agree to the terms and conditions"})
      }else if(password!==password_confirm){
        this.setState({msg:"Please check your password"}) 
      }else if(password.length < 6){ 
        this.setState({msg:"Password should be at least 6 characters"}) 
      }else { 
        this.setState({msg:"Please input valid email"}) 
      }
    }
   }

  login_handler = e => {
    this.setState({state:'sign_in'}) 
  }

  update_email = (e) => {
    const em = e.target.value
    this.setState({email:em})
  }

  update_firstname = (e) => {
    const fname = e.target.value
    this.setState({first_name:fname})
  }

  update_lastname = (e) => {
    const lname = e.target.value
    this.setState({last_name:lname})
  }

  update_password = (e) => {
    const pwd = e.target.value
    this.setState({password:pwd})
  }

  update_password_confirm = (e) => {
    const pwd_confirm = e.target.value
    this.setState({password_confirm:pwd_confirm})
  }

  set_concensus = e => {
    this.setState({is_consent:!this.state.is_consent})
  }

  render(){
    return (
      <div>
        {this.state.msg? <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div> : null}
        {components.input_type_1(this.update_email.bind(this), "Email Address")}
        {components.input_type_1(this.update_firstname.bind(this), "First Name")}
        {components.input_type_1(this.update_lastname.bind(this), "Last Name")}
        {components.input_password_type_1(this.update_password.bind(this), "Create Password")}
        {components.input_password_type_1(this.update_password_confirm.bind(this), "Retype Password")}
        <div className="d-flex flex-row justify-content-start">
        {components.checkbox_type_1(this.set_concensus.bind(this), 'I consent to Telehealth, terms and privacy policy. All information is strictly confidential and is used to help our professionals provide the best care for you.')}
        </div>
        {components.confirm_button_type_1(this.update_handler.bind(this), "Sign up for Cerebral Updates")}
        {components.confirm_button_type_2(this.props.state_update, "I already have a Cerebral account", 'create')}
      </div>
    );
  }
}

export default CreateProfile
