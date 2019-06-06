import React, {Component} from 'react';
import * as components from '../question_components/components'
import ReactDOM from 'react-dom'

//not sure patient and therapist can share this component
class Messenger extends Component {
  constructor(props){
    super(props) 
    this.state = {
      user:this.props.user,
      msg:"",
      messages:[],
      is_last:false,
    }
  }

  componentDidMount=()=>{
    this.set_scroll_bottom() 
  }

  //TODO: when get more messages (from stocket or by request)
  componentWillReceiveProps = (next_props) => { 
  }

  set_scroll_bottom = () => {
    let dom = ReactDOM.findDOMNode(this.refs.chatbox)  
    dom.scrollTop = dom.getBoundingClientRect().height 
  }

  back_btn_handler = () => {  
    if(this.props.back_btn_handler){
      this.props.back_btn_handler(this.props.prv_state);
    }
  }
  
  //TODO: get more previous chat if got last item
  on_scroll(e) {
    const offsetTop  = e.target.getBoundingClientRect(); 
    if(offsetTop.height===e.target.scrollTop && !this.state.is_last){
      //get more message 
    }
  }


  received_message_item = () => {
    return(
      <div className="d-flex justify-content-start message-item-holder">
        <div className="message-item-left"> left item </div>
      </div> 
    )  
  }

  sent_message_item = () => {
    return(
      <div className="d-flex justify-content-end message-item-holder">
        <div className="message-item-right"> right item </div>
      </div> 
    ) 
  }

  update_msg_handler=(e)=>{
    const text = e.target.value
    this.setState({msg:text})
  }

  send_msg_handler=(e)=>{
    //send msg and if success, good, not option to resend it 
    this.setState({msg:""})
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
              
              
              </div>
            </div> 
            <div className="d-flex flex-row align-items-center message-input-area">
              <input className="col message-input" onChange={e=>this.update_msg_handler()} type='text' placeholder='Type message here'/> 
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
