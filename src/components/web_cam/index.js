import React, {Component} from 'react'
import Webcam from "react-webcam"

class WebcamComponent extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			screenshot:null,
			cam_state:'camera'
		}
	}


	screenshot_handler = () => {
		const screenshot = this.refs.webcam.getScreenshot()
		this.setState({screenshot:screenshot, cam_state:'display'})
	}

	camera_turn_on_hanlder = () => {
		this.setState({screenshot:null, cam_state:'camera'})
	}

	//TODO: make action for confirm and Continue to Shopping, need api and s3 call to save image
	confirm_handler = () => {
		//const {submit_id_photo} = this.props
		//submit_id_photo(this.screenshot)
    this.props.submit_action(this.state.screenshot, "image/jpeg")
	}

	map_state_to_component = state => {

		if(state==="camera"){
			return (
				<div>
					<div className = "d-flex justify-content-center text-big">
						<p>Take a photo of yourself.</p>
					</div>
          <Webcam className = {"d-flex justify-content-center p-2"} width={'100%'} 
            height={'100%'} ref='webcam' screenshotFormat="image/jpeg"/>
					<div className = "d-flex justify-content-center p-2">	
						<input className="col btn-confirm text-btn" type="button" value="Take the picture" onClick={this.screenshot_handler}/>
					</div>
				</div>		
			)
		}else{
			return (
				<div>
					<div className = "d-flex justify-content-center text-big">
						<p>Review your image.</p>
					</div>
					<div className="d-flex justify-content-center p-2">
						{this.state.screenshot ? <img src={this.state.screenshot} /> : null}
					</div>
					<div className = "d-flex justify-content-center p-2">	
						<input className="col btn-confirm text-btn" onClick={this.confirm_handler} type="button" 
							value="Confirm and Continue to Shopping"/>	
					</div>
				
					<div className = "d-flex justify-content-center p-2">	
						<input className="col btn-confirm text-btn" type="button" value="Try Again" 
							onClick={this.camera_turn_on_hanlder}/>	
					</div>
				</div>			
			)
		}
	}
	

  render() {
    return (
			this.map_state_to_component(this.state.cam_state)
			/*
			<div>
				<Webcam className = {"d-flex justify-content-center p-2"} width={'100%'} height={'100%'}  ref='webcam' />
				<div className = "d-flex justify-content-center p-2">	
					<input className="col btn-confirm text-btn"type="button" value="Take the pickture" onClick={this.screenshot_handler}/>
				</div>
				<div>
					{this.state.screenshot ? <img src={this.state.screenshot} /> : null}
				</div>
				
			</div>
			*/
		)
  }
}


export default WebcamComponent
