import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { sign_in } from '../../actions/user_auth_action'
import { move_patient_sign_up, set_profile_question } from '../../actions/patient_action'
import * as components from '../../components/question_components'


class SignIn extends Component {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        name:'',
        password:''
      }
    }

    //TODO: implement middleware to call api. action function must be plain object
    sign_in_handler = (e) => {
      e.preventDefault()

      const {email, password} = this.state
      const {sign_in, set_profile_question, login_info} = this.props

      var header = {'Content-Type': 'application/json'}
      if(email && password){
        axios.post("/api/auth/sign_in" ,{email:email, password:password}, header)
          .then(function(resp){
            console.info(resp)
            var attr = {attributes: { id: resp.data.data.id,
                                      uid:resp.data.data.uid,
                                      email:resp.data.data.email,
                                      first_name:resp.data.data.first_name,
                                      last_name:resp.data.data.last_name
                                    }}
            //TODO: NEVER use the dispatches like here. will move to action with err handling
            sign_in(attr)
            set_profile_question()
          }).catch(function(err){
            console.log("err", err)
          })
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

    state_update_handler = e => {
      const {move_patient_sign_up}=this.props
      move_patient_sign_up()
    }

    render(){
      return (
        <div className="patient_signin">
          {components.input_type_1(this.update_email.bind(this), "Email Address")}
          {components.input_password_type_1(this.update_password.bind(this), "Password")}
          {components.confirm_button_type_1(this.sign_in_handler.bind(this), "Get started with online visit")}
          {components.text_button_type_1(this.state_update_handler.bind(this), "I don't have an account.")}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
    login_info : state.currentUser
})

export default connect(mapStateToProps, {sign_in,set_profile_question, move_patient_sign_up},)(SignIn)
