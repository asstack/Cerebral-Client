import React from 'react'
import * as components from '../question_components/components'

export const date = (event_handler) => {
	return (
		<div>
			{components.input_type_1(null, "Date of Birth (mm/dd/yy)")}
			{components.confirm_button_type_1(event_handler, "Confirm date of birth")}
		</div>
	)
}
