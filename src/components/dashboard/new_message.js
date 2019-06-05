import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class NewMessage extends Component {
  constructor(props){
    super(props) 
    this.state = {

    }
  }

   

  //input 3 ea, texteara 1, btn 2
  //back btn => go back to inbox, submit btn => confirm menu
  view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title">Message</div>
          <div className="d-flex flex-column main-content-row">
            <div className="align-self-start main-content-wide-card">
              <div className="d-flex flex-column card-items-container">
                <div className="wide-card-title">MY MESSAGES</div>
                <div className="wide-card-description">You have no new messages</div>
              </div> 
            </div>           
          </div>
        </div> 
    ) 
  }

  render(){
    return this.view() 
  }

}

export default NewMessage
