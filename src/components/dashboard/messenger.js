import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class Messenger extends Component {
  constructor(props){
    super(props) 
    this.state = {
    
    }
  }

  back_btn_handler = () => {  
    if(this.props.back_btn_handler){
      this.props.back_btn_handler(this.props.prv_state);
    }
  }
  
  on_scroll(el) {
    let offsetTop  = el.getBoundingClientRect();
    console.log("scroll event:", offsetTop)
  }


  view= () => {
    return (
      <div className="main-content-wide-card">
        <div className="d-flex flex-row justify-content-between  patients-list-item-container-nb">
          <div>
            <input className="dashboard-side-btn text-btn-2" onClick={e=>this.back_btn_handler()} type="button" value="< Back to Inbox"/>
          </div>
        </div> 
        <div className="d-flex flex-column">
          <div className="align-self-start main-content-wide-card">
            <div className="d-flex flex-column card-items-container">
              <div className="wide-card-title"> Dr Name: Message Subject-Line</div>
              <div className="wide-card-title"> Patient name</div>
              <div className="d-flex flex-column message-item-area">
                <div ref={(el)=>this.on_scroll(el)} className="d-flex justify-content-start message-item-holder">
                  <div className="message-item-left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </div>
                </div>
                <div className="d-flex justify-content-end message-item-holder">
                  <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
                       <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

                 <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

                 <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

                 <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

                 <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>

                 <div className="message-item-right">Hi Kyle, 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>



                </div>
              </div>
              <div className="d-flex flex-row chat-input-area"><input type='text' value='Type message here'/> <input type='button' value='send'/></div>
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

export default Messenger
