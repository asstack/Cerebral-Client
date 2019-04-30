import React, {Component} from 'react'
import { connect } from 'react-redux'
import { sign_in } from '../../actions/user_auth_action'
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

    //TODO: implement middleware to call api. action function must be plain object
    sign_in_handler = (e) => {
      e.preventDefault()

      const {login_info} = this.props
      console.log("check login_info: ", login_info)
      const {email, password} = this.state
      const {sign_in} = this.props

      var header = {'Content-Type': 'application/json'}
      if(email && password){
        axios.post("http://localhost:3000/api/auth/sign_in" ,{email:email, password:password}, header)
          .then(function(resp){
            var attr = {attributes: { id: resp.data.data.id,
                                      uid:resp.data.data.uid,
                                      email:resp.data.data.email,
                                      first_name:resp.data.data.first_name,
                                      last_name:resp.data.data.last_name
                                    }}
            console.log("resp", resp)
            sign_in(attr)
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

    render(){

      return (
        <div className="App">
          <form onSubmit={this.sign_in_handler.bind(this)} method='POST'>
            <label>email</label>
            <input type="email" name="email" onChange={this.update_email.bind(this)} />
            <label>pwd</label>
            <input type="password" name="pwd" onChange={this.update_password.bind(this)}  />
            <input type="submit" value="button"/>
          </form>
        </div>
      );
    }
}
const mapStateToProps = (state) => ({
    login_info : state.currentUser
})

export default connect(mapStateToProps, {sign_in},)(SignIn)
