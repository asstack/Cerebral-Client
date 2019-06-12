import React, {Component} from 'react'
import * as components from '../question_components/components'
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

	camera_turn_on_handler = (e, type) => {
		this.setState({screenshot:null, cam_state:type})
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
          <Webcam className = {"d-flex justify-content-center p-2"} width={'100%'} 
            height={'100%'} ref='webcam' screenshotFormat="image/jpeg"/>
          
          {components.confirm_button_type_1(this.screenshot_handler, 'Take the picture')}
				</div>		
			)
		}else{
			return (
				<div>
					<div className = "d-flex justify-content-start">
						<h2>Review your image.</h2>
					</div>
					<div className="d-flex justify-content-center">
						{this.state.screenshot ? <img src={this.state.screenshot} /> : null}
					</div>
          {components.confirm_button_type_1(this.confirm_handler, 'Confirm image')}

          {components.confirm_button_type_2(this.camera_turn_on_handler, "Try Again", 'camera')}
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
