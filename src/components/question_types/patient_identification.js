import React, {Component} from 'react';
import * as components from '../question_components/components'

class Identification extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:''
    }
  }

  update_handler = e => { 
    const {is_consent, email, first_name, 
      last_name, password, password_confirm} = this.state
      this.props.submit_action(this.state) 
   }

  set_view_type_handler = (e, type) => {
    this.setState({validation_method:type})
  }

  view = () => {
  
    if(this.state.view_type === 'file_upload'){
      return <div>"for file uploader"</div> 
    }else if(this.state.view_type === 'picture'){
      return <div>"for picture"</div> 
    }else{
      return <div>
        <input className ="col btn-selector" onClick = {(e) => event_handler(e,item)} 
        type="button" value="Take a photo with my webcam"/> 
       <input className ="col btn-selector" onClick = {(e) => event_handler(e,item)} 
        type="button" value="Upload a photo of myself"/>
        {components.confirm_button_type_1(this.update_handler.bind(this), "Sign up for Cerebral Updates")}
      </div> 
    } 
  }
  
  render(){
    return (
      this.view(this.state.view_type)
    );
  }
}

export default Identification
