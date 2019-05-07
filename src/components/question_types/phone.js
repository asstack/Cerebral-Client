import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class Phone extends Component {
	constructor(props){
		super(props)
		this.state = {
			notification:true
		}
	}

	render(){
	
		return(
			<div>
				{components.input_type_1(null, "Phone number")}
				<div className="d-flex flex-row justify-content-center">
					{components.btn_selector(null, "Skip")}	
					{components.btn_selector(this.props.confirm_btn_handler, "Confirm Phone Number")}	
				</div>
			</div>
		)

	}


}

export default Phone
