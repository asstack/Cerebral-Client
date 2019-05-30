import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import RegisterManager from '../../components/question_types/register_manager'

class ReferralComplete extends Component {

  constructor(props){
    super(props)
    this.state = {
    
    }
  }
 
  render(){
    return (
      <div className="d-flex flex-column container-noprogress">
        complete!
      </div> 
   );
  }
}

export default ReferralComplete
