import React, {Component} from 'react'
import * as components from '../question_components/components'

class IdentificationCover extends Component {


  //use ref to change the question 0 of n to Identity Verification
  constructor(props){
    super(props)
    this.state = {
    
    }
  }

  componentDidMount=()=>{
    if(this.props.q_number_ref){
      // this.props.q_number_ref.current.innerText="Identity Verification"      
    } 
  }

  confirm_btn_handler = e => {
    this.props.submit_action("submit") 
  }
     
  view = () => {
    return (
      <div className ="d-flex flex-column"> 
        <div className="id-title">For the next step, you’ll need to: </div>
        <div className="d-flex flex-row justify-content-between id-item-holder"> 
          <div className="col d-flex flex-column justify-content-center">
            <div className="d-flex align-self-center"><h2>1.</h2></div> 
            <img alt="take yourself" className="d-flex align-self-center id-photo" src={process.env.PUBLIC_URL + '/img/photo.png'}/>
            <div className="id-description">Upload or capture a picture of your face.</div>
          </div>
          <div className="id-item-divider"></div>
          <div className="col d-flex flex-column id-item justify-content-center">
            <div className="d-flex align-self-center"><h2>2.</h2></div> 
            <img alt="id card" className="d-flex align-self-center id-photo" src={process.env.PUBLIC_URL + '/img/id_card.png'}/>
            <div className="id-description"> Upload or capture a picture of your valid photo ID.</div> 
          </div>
        </div> 
        {components.confirm_button_type_1(this.confirm_btn_handler, 'Start verification >')}
      </div>
    )
  }

  render(){
    return this.view() 
  }

}

export default IdentificationCover


