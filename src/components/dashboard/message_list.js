import React, {Component} from 'react';
import { connect } from 'react-redux'
import {get_message_threads_for_current_user} from "../../actions/user_auth_action"
import uuidv1 from 'uuid'

class MessageList extends Component {

  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user,
      threads:[]
    }
  }
 
  componentDidMount=()=>{
    this.props.get_message_threads_for_current_user().then((resp)=>{
      this.setState({threads:resp.data}) 
    }) 
  }

  new_msg_handler = (e, item) => {
    e.stopPropagation() 
    if(this.props.update_state_handler){
      //it should pass the id of message
      this.props.update_state_handler("messenger", item)
    } 
  }

  delete_msg_handler = (e) => {
    e.stopPropagation() 
  }

  search_item = (word) => {
  
  }

  row_item = (item, index) => {
    let css_style = index===this.state.threads-1?"table-item-last":"table-item"
    console.log("thread item:", item)
    return(
      <div  key={uuidv1()} className={"d-flex flex-row justify-content-start "+css_style} onClick={e=>this.new_msg_handler(e, item)}>
        <div className="d-flex justify-content-center align-items-center message-item-col-1"> <input type='checkbox'/> </div>
        <div className="d-flex justify-content-start align-items-center message-item-col-2">Dr Anh</div>
        <div className="d-flex justify-content-start align-items-center message-item-col-3">{this.state.user.attributes.patient?"Prescription Status":"Patient name"}</div> 
        <div className="d-flex justify-content-start align-items-center message-item-col-4">Message Subject</div>
        <div className="d-flex justify-content-start align-items-center message-item-col-5">Date</div>
        <div className="d-flex justify-content-center align-items-center message-item-col-6"> 
          <img className="detail-btn" alt='delete msg' onClick={this.delete_msg_handler} src={process.env.PUBLIC_URL + '/img/trashcan.png'}/>
        </div>
      </div> 
    )
  }
  row_header = () => (
   <div className="d-flex flex-row justify-content-start table-item-head">
     <div className="d-flex justify-content-center align-items-center message-item-col-1"><input type='checkbox'/> </div>
      <div className="d-flex justify-content-start align-items-center message-item-col-2">Doctor's Name</div>
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
            <img className="search-img" alt='search' src={process.env.PUBLIC_URL + '/img/search.png'}/>
          </div> 
        </div>
        <div className="d-flex flex-row align-items-center message-button-holder" onClick={e=>this.new_msg_handler(e,null)} >
          <img className="remove-button" alt='remove' src={process.env.PUBLIC_URL+'/img/add_patient.png'}/> 
          <div className="d-flex new-message-button">New Message</div>
        </div>
      </div> 
      <div className="d-flex flex-column">
        {this.row_header()}
        {this.state.threads.map((item, index)=> this.row_item(item, index))}
      </div>
    </div> 
  )
  
  render(){
    return this.view() 
  }
}


export default connect(null, {get_message_threads_for_current_user}) (MessageList)
