import React, {Component} from 'react'
import * as components from '../question_components/components'

class InsomniaCover extends Component {


  //TODO: simple
  constructor(props){
    super(props)
    this.state = {
    
    }
  }

  componentDidMount = () => { 
    if(this.props.q_number_ref){
      console.log("q ref:", this.props.q_number_ref)
      //this.props.q_number_ref.current.innerText=""
    }      
  }


  confirm_btn_handler = e => {
    this.props.submit_action("submit") 
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
        {components.confirm_button_type_1(this.confirm_btn_handler, 'Start your insomnia assessment >')}
      </div>
    )
  }

  render(){
    return this.view() 
  }

}

export default InsomniaCover

