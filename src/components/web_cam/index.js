import React, {Component} from 'react'
import Webcam from "react-webcam"

class WebcamComponent extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			screenshot:null
		}
	}
	screenshot_handler = () => {

		const screenshot = this.refs.webcam.getScreenshot()

		this.setState({screenshot})
	}

  render() {
    return (
			<div>
				<Webcam ref='webcam' />
				<input type="button" value="capture image" onClick={this.screenshot_handler}/>
				<div>
					{this.state.screenshot ? <img src={this.state.screenshot} /> : null}
				</div>
			</div>
		)
  }
}


export default WebcamComponent
