import React from 'react'
import * as components from '../question_components/components'

class TextArea extends Component {
	constructor(props){
		super(props)
		this.state = {
			text:''
		}
	}

	render(){	
		return(
			<div>
        <div className="form-group">
          <textarea className="form-control" rows="5" />
        </div>
        {components.btn_selector(this.props.confirm_btn_handler, "Confirm your answer")}	
			</div>
		)
	}
}

export default TextArea

