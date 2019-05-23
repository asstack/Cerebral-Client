import React, {Component} from 'react'
import VideoRecorder from 'react-video-recorder'
import ConcatenateBlobs from 'concatenateblobs/ConcatenateBlobs'

class VideoRecorderComponent extends Component {

	constructor(props){
		super(props)
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

		var blob = new Blob(this.refs.recorder.recordedBlobs, {type : type});
		this.props.submit_action(blob, type)
	}
  
  render() {
    return (
			<div>
			  <div className = "d-flex justify-content-center text-small">
					<p>(approximately 2 minutes)</p>
				</div>
				<div className = "video-cam-holder">
          <VideoRecorder ref='recorder' timeLimit={120000}/>
				</div>
				<div className = "d-flex justify-content-center p-2">	

          <input className="col btn-confirm text-btn" type="button" onClick={this.submit_btn_handler} value="Submit Video"/>
				</div>
		
			</div>
		)
  }
}


export default VideoRecorderComponent
