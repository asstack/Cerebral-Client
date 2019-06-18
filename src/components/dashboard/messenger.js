import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {get_patient_details, get_patients_for_therapist} from "../../actions/therapist_action"
import {create_message_thread, create_message, get_messages_for_thread, get_message_threads_for_current_user} from "../../actions/user_auth_action"
import uuidv1 from 'uuid'

//not sure patient and therapist can share this component
class Messenger extends Component {
  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user,
      thread:this.props.thread,
      msg:"",
      messages:[],
      //for new messages
      to_lists:[],
      is_last:false,
      target:null,
      update_scroll:false,
    }
  }

  //we will get initial data in message_process_manager
  componentDidMount=()=>{
    this.set_scroll_bottom() 
    //means it's new message  
    if(!this.state.thread){ 
      //if therapists -> will get patients list and doctors list
      if(this.state.user.attributes.therapist){
        this.props.get_patients_for_therapist().then((resp) => {
          this.setState({to_lists:resp.data})
        }) 
      }else if(this.state.user.attributes.patient){
        //will get therapist and doctor list 
      }
    }else{
      //exists thread 
      this.props.get_messages_for_thread(this.state.thread.id).then(resp => {
        console.log("get message data:", resp.data) 
        this.props.get_patient_details(this.state.thread.recipient_id).then(patient => {
          console.log("get patient data: ", patient.data) 
          this.setState({messages:resp.data,target:patient.data}) 
        })
      })
    }
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

    if(e.target.scrollTop===0 && !this.state.is_last){
      //get more message 
    }
  }
 
  update_msg_handler=(e)=>{
    const text = e.target.value.trim()
    this.setState({msg:text})
  }

  create_message_helper = (user_id, thread_id, r_id, msg) => {
    let msg_object = {message:msg, user_id: user_id}
    let msgs = this.state.messages;
    this.props.create_message(thread_id,r_id, msg).then((resp) => {
      msgs.push(msg_object)
      this.setState({messages:msgs, msg:"", update_scroll:true})
      this.refs.msg_input.value="" 
      }) 
  }

  send_msg_handler=(e)=>{
    //send msg and if success, good, not option to resend it 
    let msg = this.state.msg;
    let thread_id = this.state.thread?this.state.thread.id:null;
    let user_id = this.state.user.attributes.id
    console.log("send_message",this.state.thread)
    if(!thread_id && msg && this.state.target){
      let recipient_id = this.state.target.user.id
      this.props.create_message_thread(recipient_id).then((resp) => {
        this.setState({thread:resp.data}) 
        thread_id = resp.data.id 
        this.create_message_helper(user_id, thread_id, recipient_id, msg)
      })  
    }else if(msg && thread_id){
      this.create_message_helper(user_id,thread_id,this.state.thread.recipient_id,msg)
    }  
    
  }

  set_to_target = (e) => {
    let index = e.target.value; 
    this.setState({target:this.state.to_lists[index]}) 
  }

  received_message_item = (val, idx) => {
    return(
      <div key={uuidv1()} className="d-flex justify-content-start message-item-holder">
        <div className="message-item-left">{val.message} </div>
      </div> 
    )  
  }

  sent_message_item = (val, idx) => {
    return(
      <div key={uuidv1()} className="d-flex justify-content-end message-item-holder">
        <div className="message-item-right"> {val.message} </div>
      </div> 
    ) 
  }

  mount_message_item = (item, idx)=>{
    if(item.user_id===this.state.user.attributes.id) return this.sent_message_item(item, idx) 
    else return this.received_message_item(item, idx)
  }

  to_option =(val, index)=>{
    return(
      <option key={uuidv1()} value={index}>{val.user.first_name + " "+val.user.last_name}</option>
    )
  }

  to_list= () => {
    return(
      <select onChange = {this.set_to_target}>
        <option value={null}>{this.state.target?this.state.target.user.first_name+" "+this.state.target.user.last_name:'Select from list'}</option>
        {this.state.to_lists.map((val,index)=>this.to_option(val,index))} 
      </select>   
    )
  }

  view= () => {
    console.log("target: ", this.state.target)
    console.log("thread: ", this.state.thread)
    return (
      <div className="main-content-wide-card">
        <div className="d-flex flex-row justify-content-between  patients-list-item-container-nb">
          <div className="d-flex flex-row message-button-holder">
            <div className="message-button" onClick={e=>this.back_btn_handler()}>
              {"< Back to Inbox"}
            </div>
          </div>
        </div> 
        <div className="d-flex flex-column">
          <div className="align-self-start main-content-wide-card">
            <div className="d-flex flex-column">
              <div className="d-flex flex-column message-header-area">
                 <div className="d-flex message-title"> 
                  <div className="message-title-left">Dr Anh</div> 
                </div>
                <div className="d-flex message-title message-title-end">
                  <div className="message-title-left">Patient:</div> 
                  {this.state.thread && this.state.target?this.state.target.user.first_name + " " + this.state.target.user.last_name:this.to_list()}
                </div>
                {this.state.user.attributes.therapist && this.state.target==='doctor' 
                    ?<div className="d-flex message-title"> Patient Name:</div>
                    :null}
               
              </div>
              <div ref="chatbox" onScroll={(e)=>this.on_scroll(e)} className="d-flex flex-column message-item-area">
                {this.state.messages.map((val,idx)=>this.mount_message_item(val,idx))}
              </div>
            </div> 
            <div className="d-flex flex-row align-items-center message-input-area">
              <input ref="msg_input" className="col message-input" onChange={this.update_msg_handler} type='text' placeholder='Type message here' defaultValue=""/> 
              <img onClick={e=>this.send_msg_handler()} alt='send message' src={process.env.PUBLIC_URL + '/img/input_arrow.svg'} className="message-submit"/>
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

export default connect(null, {get_patient_details, create_message_thread, create_message, get_messages_for_thread, get_message_threads_for_current_user, get_patients_for_therapist}) (Messenger)

