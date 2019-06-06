import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class MessageList extends Component {

  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user
    }
  }
 
  new_msg_handler = () => {
    if(this.props.update_state_handler){
      this.props.update_state_handler("write_message")
    } 
  }
  

  row_item = (css_style) => (
    <div className={"d-flex flex-row justify-content-start "+css_style}>
      <div className="d-flex justify-content-center align-items-center message-item-col-1"> <input type='checkbox'/> </div>
      <div className="d-flex justify-content-start align-items-center message-item-col-2">Doctor's Name</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-3">{this.state.user.attributes.patient?"Prescription Status":"Patient name"}</div> 
      <div className="d-flex justify-content-start align-items-center message-item-col-4">Message Subject</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-5">Date</div>
      <div className="d-flex justify-content-center align-items-center message-item-col-6"> 
        <img className="detail-btn" src={process.env.PUBLIC_URL + '/img/trashcan.png'}/>
      </div>
    </div> 
  )

  row_header = () => (
   <div className="d-flex flex-row justify-content-start table-item-head">
     <div className="d-flex justify-content-center align-items-center message-item-col-1"><input type='checkbox'/> </div>
      <div className="d-flex justify-content-start align-items-center message-item-col-2">Doctor's name</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-3"> {this.state.user.attributes.patient?"Prescription Status":"Patient name"}</div> 
      <div className="d-flex justify-content-start align-items-center message-item-col-4">Message Subject</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-5">Date</div>
      <div className="d-flex justify-content-center align-items-center message-item-col-6"></div>
    </div> 
  )

  view= () => (
    <div className="main-content-wide-card">
      <div className="d-flex flex-row justify-content-between  patients-list-item-container-nb">
        <div className="d-flex flex-row justify-content-between search-bar-holder">
          <input type="text" placeholder="Search Message"/>
          <div className="d-flex align-items-center">
            <img className="search-img" src={process.env.PUBLIC_URL + '/img/search.png'}/>
          </div> 
        </div>
        <div>
          <input className="dashboard-side-btn text-btn-2" onClick={e=>this.new_msg_handler()} type="button" value="New Message"/>
        </div>
      </div> 
      <div className="d-flex flex-column">
        {this.row_header()}
        {this.row_item("table-item")}
        {this.row_item("table-item-last")}
      </div>
    </div> 
  )
  
  render(){
    return this.view() 
  }
}


export default MessageList
