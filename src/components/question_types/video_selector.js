import React, {Component} from 'react';
import * as components from '../question_components/components'
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
    console.log(type)
    this.setState({view_type:type})
  }
  

  view = () => {
    if(this.state.view_type === 'video'){
      return <VideoRecorderComponent submit_action = {this.props.submit_video_action} /> 
    }else if(this.state.view_type === 'text'){
      return <TextArea submit_action = {this.props.submit_text_action}/> 
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
