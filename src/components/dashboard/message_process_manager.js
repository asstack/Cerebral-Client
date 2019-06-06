import React, {Component} from 'react';
import * as components from '../question_components/components'
import MessageList from './message_list'
import Messenger from './messenger'


//shared by patient and therapist, need to pass proper function to send message
//use data in props if we already got data in parent

class MessageProcessManager extends Component {

  constructor(props){
    super(props) 
    this.state = {
      view_type:props.view_type,
      user:this.props.user,
    }
  }

  componentWillReceiveProps = (next_props) => { 
    this.setState({user:next_props.user, view_type:next_props.view_type}) 
  }


  update_state_handler = state => {
    this.setState({view_type:state})
  }

  default_view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title">INBOX</div>
        <div className="d-flex flex-column main-content-row">
           <div className="align-self-start main-content-wide-card">
            <div className="d-flex flex-column card-items-container">
              <div className="wide-card-title">MY MESSAGES</div>
              <div className="wide-card-description">You have no new messages</div>
              <div className="d-flex flex-column justify-content-center wide-card-item">
                <input className="wide-card-selector align-self-center" type="button" value="Message support" onClick={e=>this.update_state_handler('support')}/>
                <input className="wide-card-selector align-self-center" type="button" value="Message the doctor" onClick={e=>this.update_state_handler('inbox')}/>
              </div>
            </div> 
          </div>           
        </div>
      </div> 
    ) 
  }


  //temp: view_type -> default, list, new, done
  type_to_view = () => {
    const type=this.state.view_type;
    if(type==='support'){
      return <div>support</div> 
    }else if(type==='inbox'){
      return <MessageList user={this.state.user} update_state_handler = {this.update_state_handler}/>
    }else if(type==='write_message'){
      return <Messenger user={this.state.user} back_btn_handler = {this.update_state_handler} prv_state="inbox" /> 
    }else if(type==="messenger"){
      return <div></div>
    }else{
      return this.default_view()
    }      
  }

  render(){
    return(
      this.type_to_view()
    ) 
  }
  
}

export default MessageProcessManager

