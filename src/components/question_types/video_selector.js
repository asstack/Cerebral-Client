import React, {Component} from 'react';
import TextArea from './text_area'
import VideoRecorderComponent from '../video_recorder'

//TODO: it is temp name, may update to proper name
class VideoSelector extends Component {

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
    if(this.state.view_type === 'video'){
      return <VideoRecorderComponent question = {this.props.question} submit_action = {this.props.submit_video_action} /> 
    }else if(this.state.view_type === 'text'){
      return <TextArea title_ref = {this.props.title_ref} subscript_ref = {this.props.subscript_ref} flag_title={this.props.flag_title} submit_action = {this.props.submit_text_action}/> 
    }else{
      return (
        <div className="d-flex flex-row justify-contnet-center">
          <div className="p-2 selector-holder"> 
            <input className ="col btn-selector" onClick = {(e) => this.set_type_handler(e,'video')} 
            type="button" value="I prefer to answer with a VIDEO (2 MIN)"/> 
          </div>
          <div className="p-2 selector-holder"> 
          <input className ="col btn-selector" onClick = {(e) => this.set_type_handler(e,'text')} 
            type="button" value="I prefer to answer in WRITING"/>
          </div>
        </div> 
      )
    } 
  }
  
  render(){
    return (
      <div>	
      {this.view(this.state.view_type)}
      </div>
    );
  }
}

export default VideoSelector
