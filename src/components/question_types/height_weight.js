import React from 'react'
import * as components from '../question_components/components'

export const height_weight = (event_handler) => {
	return (
		<div>
			{components.input_type_1(null, "Weight lbs")}
			<div className = "input-group input-type1 height_weight">
				<div className="input-group-prepend">
    			<span className="input-group-text">Height</span>
  			</div>
				<input type="text" placeholder="Ft" className="form-control" />
				<input type="text" placeholder="In" className="form-control"/>
			</div>
			{components.confirm_button_type_1(event_handler, "Confirm weight and height")}

		</div>
	)
}
