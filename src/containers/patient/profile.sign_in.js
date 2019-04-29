import React, {Component} from 'react'
import { signInUser } from '../../actions'
import { connect } from 'react-redux'
import axios from 'axios'


class SignIn extends Component {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        name:'',
        password:''
      }
    }

    sign_in_handler = (e) => {
      e.preventDefault()
      const { signInUser } = this.props
      const {email, password} = this.state
      console.log("log: ", this.state, "email: ", email)

      var header = {'Content-Type': 'application/json'}
      /*
      axios.post("http://localhost:3000/api/auth/sign_in" ,{email:email, password:password}, header)
        .then(function(resp){
          console.log("resp", resp)
        }).catch(function(err){
          console.log("err", err)
        })
      */
      signInUser({ email, password })
        .then(function(resp){
          console.log("resp", resp)
        }).catch(function(err){
          console.log("err", err)
        })
    }

    update_email = (e) => {
      const em = e.target.value
      this.setState({email:em})
    }
    update_password = (e) => {
      const pwd = e.target.value
      this.setState({password:pwd})
    }

    render(){
      return (
        <div className="App">
          <form onSubmit={this.sign_in_handler.bind(this)} method='POST'>
            <lable>email</lable>
            <input type="email" name="email" onChange={this.update_email.bind(this)} />
            <lable>pwd</lable>
            <input type="password" name="pwd" onChange={this.update_password.bind(this)}  />
            <input type="submit" value="button"/>
          </form>
        </div>
      );
    }
}

export default connect(
  null,
  {signInUser},
)(SignIn)
