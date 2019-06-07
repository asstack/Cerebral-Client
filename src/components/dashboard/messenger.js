import React, {Component} from 'react';
import * as components from '../question_components/components'
import ReactDOM from 'react-dom'
import uuidv1 from 'uuid'

//not sure patient and therapist can share this component
class Messenger extends Component {
  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user,
      msg_id:this.props.msg_id,
      msg:"",
      messages:[],
      is_last:false,
      update_scroll:false,
    }
  }

  //we will get initial data in message_process_manager
  componentDidMount=()=>{
    this.set_scroll_bottom() 
  }

  
  componentDidUpdate=(prevProps, prevState)=>{ 
    if(this.state.update_scroll){
      this.set_scroll_bottom() 
      this.setState({update_scroll:false})
    } 
  }

  //TODO: when get more messages (from stocket or by request with index?)
  componentWillReceiveProps = (next_props) => { 
    console.log("receive props") 
  }

  set_scroll_bottom = () => {
    let dom = ReactDOM.findDOMNode(this.refs.chatbox)  
    dom.scrollTop=dom.scrollHeight
  }

  back_btn_handler = () => {  
    if(this.props.back_btn_handler){
      this.props.back_btn_handler(this.props.prv_state);
    }
  }
  
  //TODO: get more previous chat if got last item
  on_scroll(e) {
    const offsetTop  = e.target.getBoundingClientRect(); 

    if(e.target.scrollTop===0 && !this.state.is_last){
      console.log("it is top")
      //get more message 
    }
  }
 
  update_msg_handler=(e)=>{
    const text = e.target.value.trim()
    this.setState({msg:text})
  }

  send_msg_handler=(e)=>{
    //send msg and if success, good, not option to resend it 
    let msgs = this.state.messages;
    if(this.state.msg){
      msgs.push({msg:this.state.msg, type:"sent"})
      this.setState({messages:msgs, msg:"", update_scroll:true})
      this.refs.msg_input.value=""
    } 
  }


  received_message_item = (val, idx) => {
    return(
      <div key={uuidv1()} className="d-flex justify-content-start message-item-holder">
        <div className="message-item-left">{val.msg} </div>
      </div> 
    )  
  }

  sent_message_item = (val, idx) => {
    return(
      <div key={uuidv1()} className="d-flex justify-content-end message-item-holder">
        <div className="message-item-right"> {val.msg} </div>
      </div> 
    ) 
  }

  mount_message_item = (val, idx)=>{
    if(val.type==='sent') return this.sent_message_item(val, idx) 
    else return this.received_message_item(val, idx)
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
            <div className="d-flex flex-column">
              <div className="d-flex flex-column message-header-area">
                <div className="d-flex message-title"> To:</div>
                {this.state.user.attributes.therapist?<div className="d-flex message-title"> Patient Name:</div>:null}
                <div className="d-flex message-title"> Subject: </div>
              </div>
              <div ref="chatbox" onScroll={(e)=>this.on_scroll(e)} className="d-flex flex-column message-item-area">
                {this.state.messages.map((val,idx)=>this.mount_message_item(val,idx))}
              </div>
            </div> 
            <div className="d-flex flex-row align-items-center message-input-area">
              <input ref="msg_input" className="col message-input" onChange={this.update_msg_handler} type='text' placeholder='Type message here' defaultValue=""/> 
              <img onClick={e=>this.send_msg_handler()}src={process.env.PUBLIC_URL + '/img/input_arrow.svg'} className="message-submit"/>
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
