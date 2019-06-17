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
      thread:null,
      user:this.props.user,
    }
  }

  componentWillReceiveProps = (next_props) => { 
    this.setState({user:next_props.user, view_type:next_props.view_type}) 
  }

  //messenger -> better to get initial data in here to get all data before rendering the view and get correct scroll position
  update_state_handler = (state,thread=null) => {
    this.setState({view_type:state, thread:thread})
  }

  default_view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title">MESSAGE CENTER</div>
        <div className="d-flex flex-column main-content-row">
           <div className="align-self-start main-content-wide-card">
            <div className="d-flex flex-column card-items-container">
              <div className="d-flex flex-column justify-content-center wide-card-item">
                <input className="wide-card-selector align-self-center" type="button" value="Support Inbox" onClick={e=>this.update_state_handler('support')}/>
                <input className="wide-card-selector align-self-center" type="button" value="Doctor Inbox" onClick={e=>this.update_state_handler('inbox')}/>
              </div>
            </div> 
          </div>           
        </div>
      </div> 
    ) 
  }


  //TODO: update url based on the type
  type_to_view = () => {
    const type=this.state.view_type;
    if(type==='support'){
      return <div>support</div> 
    }else if(type==='inbox'){
      return <MessageList user={this.state.user} update_state_handler = {this.update_state_handler}/>
    }else if(type==='messenger'){
      return <Messenger user={this.state.user} back_btn_handler = {this.update_state_handler} prv_state="inbox" thread={this.state.thread}/> 
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

