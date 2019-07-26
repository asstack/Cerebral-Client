import React, {Component} from 'react'
import VideoRecorder from 'react-video-recorder'

class VideoRecorderComponent extends Component {

	constructor(props){
		super(props)
    this.state={}
	}

	componentDidMount(){
		console.log("com mount: ", this.refs.recorder)
		
	}

	componentDidUpdate(){
		console.log("com update: ", this.refs.recorder)
	}

	//TODO: make action for submit video, call api and update into s3
	submit_btn_handler = (e) => {

		const type ='video/webm;codecs=vp8'
    if(this.refs.recorder.recordedBlobs){
		  var blob = new Blob(this.refs.recorder.recordedBlobs, {type : type});
		  this.props.submit_action(blob, type, "ansycn_video", this.props.question)
    }else{
      alert("Please record and sumbit the video")
    }
	}
  
  render() {
    return (
			<div>
				<div className = "video-cam-holder">
          <VideoRecorder ref='recorder'/>
				</div>
				<div className = "d-flex justify-content-center">	
          <input className="col btn-confirm text-btn" type="button" onClick={this.submit_btn_handler} value="Submit Video"/>
				</div>
		
			</div>
		)
  }
}


export default VideoRecorderComponent
