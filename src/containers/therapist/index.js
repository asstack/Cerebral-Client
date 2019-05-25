import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

class Therapist extends Component{
  constructor(props){
    super(props) 
    this.state = {
     
    }
  }
  render(){
    return(
      <div>Therapists</div>
    )
  }
}

export default Therapist
