import React, {Component} from 'react'
import {connect} from 'react-redux'
import {update_app_state} from '../actions'

class MainPage extends Component{

  constructor(props){
    super(props)
  }

  app_state_update_handler = e => {
    const {update_app_state}=this.props
    update_app_state('patient/initial_step')
  }

  app_state_register_handler = e => {
    const {update_app_state}=this.props
    update_app_state('patient')
  }

  render(){
    return(
      <div>
        <h1> main page </h1>
        <input type='button' value='Get start' onClick={this.app_state_update_handler.bind(this)}/>
        <input type='button' value='Patient register page' onClick={this.app_state_register_handler.bind(this)}/>
      </div>
    )
  }
}



export default connect(null, {update_app_state}) (MainPage)
