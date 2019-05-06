import React, {Component} from 'react'
import VideoRecorder from 'react-video-recorder'

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

	//TODO: make actio for submit video, call api and update into s3
	submit_handler = () => {
		const  data= this.refs.recorder
		const {submit_video} = this.props
		console.log(this.refs.recorder.mediaRecorder)
		//submit_video({data})
	}

  render() {
    return (
			<div>
				<div className = "d-flex justify-content-center text-big">
					<p>Tell me us more about why you're seeking out a prescription for antidepressants</p>
				</div>	
				<div className = "d-flex justify-content-center text-small">
					<p>(approximately 2 minutes)</p>
				</div>
				<div className = "video_cam_holder">
					<VideoRecorder ref='recorder' timeLimit='120000'/>
				</div>
				<div className = "d-flex justify-content-center p-2">	
					<input className="col btn-confirm text-btn" type="button" value="Submit Video" 
						onClick={this.submit_hanlder}/>	
				</div>
		
			</div>
		)
  }
}


export default VideoRecorderComponent
