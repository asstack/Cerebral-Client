import React, {Component} from 'react'
import { register_user, sign_in } from '../../actions/user_auth_action'
import { move_patient_sign_in, set_profile_question } from '../../actions/patient_action'
import { connect } from 'react-redux'
import axios from 'axios'


class Register extends Component {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        password_confirm:''
      }
    }

    register_handler = (e) => {
      e.preventDefault()

      const {first_name, last_name, email, password, password_confirm} = this.state
      const {sign_in, set_profile_question}=this.props
      var header = {'Content-Type': 'application/json'}

      axios.post("http://localhost:3000/api/users",
        {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm}, header)
        .then(function(resp){
          var attr = {attributes: { id: resp.data.id,
                                    uid:resp.data.uid,
                                    email:resp.data.email,
                                    first_name:resp.data.first_name,
                                    last_name:resp.data.last_name
                                  }}
          //TODO: NEVER use the dispatches like here. will move to action with err handling
          sign_in(attr)
          set_profile_question()

        }).catch(function(err){
          console.log("err", err)
        })
    }

    state_update_handler = e => {
      const {move_patient_sign_in}=this.props
      move_patient_sign_in()
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


    render(){
      return (
        <div className="patient_register">
          <form onSubmit={this.register_handler.bind(this)} method='POST'>
            <label>email</label>
            <input type="email" name="email" onChange={this.update_email.bind(this)} />
            <label>first name</label>
            <input type="text" name="first_name" onChange={this.update_firstname.bind(this)}  />
            <label>last name</label>
            <input type="text" name="last_name" onChange={this.update_lastname.bind(this)}  />
            <label>password</label>
            <input type="password" name="pwd" onChange={this.update_password.bind(this)}  />
            <label>password (confirm)</label>
            <input type="password" name="pwd_confirm" onChange={this.update_password_confirm.bind(this)}  />
            <input type="submit" value="button"/>
          </form>

          <input type="button" value="sign in" onClick={this.state_update_handler.bind(this)}/>
        </div>
      );
    }
}

export default connect(null,{sign_in, move_patient_sign_in, set_profile_question}) (Register)
