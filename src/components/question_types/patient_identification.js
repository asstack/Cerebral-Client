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

  set_type_handler = (e, type) => {
    this.setState({view_type:type})
    this.props.set_subcomp(true)
  }

  view = () => {
    if(this.state.view_type === 'file'){
      return <FileUploader question={this.props.question} file_name={this.props.file_name} submit_action = {this.props.submit_action} /> 
    }else if(this.state.view_type === 'webcam'){
      return <WebcamComponent question={this.props.question} file_name={this.props.file_name} submit_action = {this.props.submit_action}/> 
    }else{
      return (
       <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
          {components.btn_selector(this.set_type_handler, "Take a photo with my webcam" ,"webcam")} 
          {components.btn_selector(this.set_type_handler, "Upload a photo", "file")} 
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
