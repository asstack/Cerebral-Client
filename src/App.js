import React, {Component} from 'react';
import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'


class App extends Component{

  constructor(){
    super()
    this.state = {
      email:'',
      name:'',
      pwd:''
    }
  }

  registerUser = function(e){
    //call api and pass this.state
    var temp = e.currentTarget.elements
    console.log("log: ", temp.item(0).value)
    e.preventDefault()
  }

  render(){
    return (
      <div className="App">
        <form onSubmit={this.registerUser} method='POST'>
          <lable>email</lable>
          <input type="email" name="email" />
          <lable>name</lable>
          <input type="text" name="uname" />
          <lable>pwd</lable>
          <input type="password" name="pwd" />
          <input type="submit" value="button"/>
        </form>
      </div>
    );
  }
}
export default App;
