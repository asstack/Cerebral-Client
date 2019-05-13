import React, {Component} from 'react';
import * as components from '../question_components/components'
import {} from '../web_cam'
import WebcamComponent from '../web_cam'
import FileUploader from '../file_uploader' 

class Identification extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:''
    }
  }

  update_handler = e => { 
    this.props.submit_action(this.state) 
   }

  set_type_handler = (e, type) => {
    console.log(type)
    this.setState({view_type:type})
  }

  view = () => {
    if(this.state.view_type === 'file'){
      return <FileUploader submit_action = {this.props.submit_action} /> 
    }else if(this.state.view_type === 'webcam'){
      return <WebcamComponent submit_action = {this.props.submit_action}/> 
    }else{
      return (
        <div className="d-flex flex-row justify-contnet-center">
          <div className="p-2 selector-holder"> 
            <input className ="col btn-selector" onClick = {(e) => this.set_type_handler(e,'webcam')} 
            type="button" value="Take a photo with my webcam"/> 
          </div>
          <div className="p-2 selector-holder"> 
          <input className ="col btn-selector" onClick = {(e) => this.set_type_handler(e,'file')} 
            type="button" value="Upload a photo of myself"/>
          </div>
        </div> 
      )
    } 
  }
  
  render(){
    return (
      this.view(this.state.view_type)
    );
  }
}

export default Identification
