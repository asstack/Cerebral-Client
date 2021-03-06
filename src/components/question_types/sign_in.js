import React, {Component} from 'react'
import * as components from '../../components/question_components/components'


class SignIn extends Component {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        password:''
      }
    }

  componentDidMount = () => {
        
    if(this.props.title_ref && this.props.title_ref.current){
      this.props.title_ref.current.innerText = "Sign in to your account" 
    }
  }


 		update_email = (e) => {
      const em = e.target.value
      this.setState({email:em})
    }
    update_password = (e) => {
      const pwd = e.target.value
      this.setState({password:pwd})
    }

			
    sign_in_handler = e => {
      if(this.state.password && this.state.email){
        this.props.submit_action(this.state)
      }
   }

  //check: Please input your email address ex) yourname@example.com 
    
    render(){
      let btn_wording = this.props.user_type==='therapist'?'Start referring patients':'Get started with online visit'
      return (
        <div className="patient_signin">
          {components.input_type_1(this.update_email.bind(this), "Email Address")}
          {components.input_password_type_1(this.update_password.bind(this), "Password")}
          {components.confirm_button_type_1(this.sign_in_handler.bind(this), btn_wording)}
          {components.confirm_button_type_2(this.props.state_update, "I don't have an account.", 'signin')}
        </div>
      );
    }
}


export default SignIn 
