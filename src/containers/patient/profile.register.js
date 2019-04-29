import React, {Component} from 'react'
import { registerUser } from '../../actions'
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
      const { registerUser } = this.props
      const {first_name, last_name, email, password, password_confirm} = this.state

      var header = {'Content-Type': 'application/json'}

      axios.post("http://localhost:3000/api/users",
        {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm}, header)
        .then(function(resp){
          console.log("resp", resp)
        }).catch(function(err){
          console.log("err", err)
        })
        /*
      registerUser({ first_name, last_name, email, password, password_confirm })
        .then(function(resp){
          console.log("resp", resp)
        }).catch(function(err){
          console.log("err", err)
        })
        */
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
        <div className="App">
          <form onSubmit={this.register_handler.bind(this)} method='POST'>
            <lable>email</lable>
            <input type="email" name="email" onChange={this.update_email.bind(this)} />
            <lable>first name</lable>
            <input type="text" name="first_name" onChange={this.update_firstname.bind(this)}  />
            <lable>last name</lable>
            <input type="text" name="last_name" onChange={this.update_lastname.bind(this)}  />
            <lable>password</lable>
            <input type="password" name="pwd" onChange={this.update_password.bind(this)}  />
            <lable>password (confirm)</lable>
            <input type="password" name="pwd_confirm" onChange={this.update_password_confirm.bind(this)}  />
            <input type="submit" value="button"/>
          </form>
        </div>
      );
    }
}

export default connect(
  null,
  {registerUser},
)(Register)
