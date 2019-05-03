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
	record_handler = () => {
				const screenshot = this.refs.recorder
				console.log(this.refs.recorder.mediaRecorder)
				//this.setState({screenshot})
	}

  render() {
    return (
			<div>
				<VideoRecorder ref='recorder'/>
				<input type="button" value="capture image" onClick={this.record_handler}/>
			</div>
		)
  }
}


export default VideoRecorderComponent
