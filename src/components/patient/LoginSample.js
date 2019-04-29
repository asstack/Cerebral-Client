import React, {Component} from 'react'

/*
class FormComponent extends Component {
  constructor () {
    this.state = {
      email: ''
    }
  }

  changeHandler = event => {
    this.setState({
      email: event.target.value
    });
  }

  render () {
    return (
      <form>
          <input type="email"
                 name="email"
                 value={this.state.email}
                 onChange={this.changeHandler}
          />
      </form>
    );
  }
}


*/

class LoginSample extends React.Component {
  render() {
    return (
      <form>
        <input type="email" name="email" />
        <input type="text" name="uname" />
        <input type="password" name="pwd" />
      </form>)
  }
}
