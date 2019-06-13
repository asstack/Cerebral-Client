import React, {Component} from 'react'
import * as components from '../question_components/components'

class MentalHealthCover extends Component {


  //TODO: simple
  constructor(props){
    super(props)
    this.state = {
    
    }
  }
  
  view = () => {
    return (
      <div className ="d-flex flex-column justify-content-start">  
        <div className = "mental-health-cover-text">
          Please answer as honestly and accurately as possible. This will allow the doctor to determine the best course of treatment for you. 
        </div>
        <div className = "mental-health-cover-subtext">
          *All information is confidential and stored in accordance to HIPAA guidelines
        </div>
        {components.confirm_button_type_1(this.props.submit_action, 'Start my mental health assessment')}
      </div>
    )
  }

  render(){
    return this.view() 
  }

}

export default MentalHealthCover

