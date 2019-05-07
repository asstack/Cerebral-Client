import React, {Component} from 'react'


class CheckBoxComponents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected:''
		}
	}

	check_box_handler = e => {
		//update local state in here
	}

	submit_handler = () => {
		//call action from parents with this.state.selected 

	}

	map_data_to_checkbox = item => {
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<div className="input-group-text group-checkbox">
					<input type="checkbox">
				</div>
			</div>
			<div className="d-flex justify-content-center form-control group-checkbox-text">
				<p className="text-small">{item}</p>
			</div>
		</div>
}

	render(){
		return options.map((item, index) => (
			map_item_to_checkbox(item)
		))
	}
}

