import React, {Component} from 'react';
import * as components from '../question_components/components'

class MessageList extends Component {

  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user
    }
  }
 
  new_msg_handler = (e) => {

    e.stopPropagation() 
    if(this.props.update_state_handler){
      //it should pass the id of message
      this.props.update_state_handler("messenger")
    } 
  }

  delete_msg_handler = (e) => {
    e.stopPropagation() 
    console.log("delete message here")
  }

  search_item = (word) => {
  
  }

  row_item = (css_style) => (
    <div className={"d-flex flex-row justify-content-start "+css_style} onClick={this.new_msg_handler}>
      <div className="d-flex justify-content-center align-items-center message-item-col-1"> <input type='checkbox'/> </div>
      <div className="d-flex justify-content-start align-items-center message-item-col-2">Doctor's Name</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-3">{this.state.user.attributes.patient?"Prescription Status":"Patient name"}</div> 
      <div className="d-flex justify-content-start align-items-center message-item-col-4">Message Subject</div>
      <div className="d-flex justify-content-start align-items-center message-item-col-5">Date</div>
      <div className="d-flex justify-content-center align-items-center message-item-col-6"> 
        <img className="detail-btn" onClick={this.delete_msg_handler} src={process.env.PUBLIC_URL + '/img/trashcan.png'}/>
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
        <div className="d-flex flex-row align-items-center message-button-holder">
          <img className="remove-button" src={process.env.PUBLIC_URL+'/img/add_patient.png'}/> 
          <div className="d-flex new-message-button" onClick={this.new_msg_handler}>New Message</div>
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
    console.log("patient: ",this.state.user.attributes)
    return this.view() 
  }
}


export default MessageList
