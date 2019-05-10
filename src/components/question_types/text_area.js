import React, {Component} from 'react'
import * as components from '../question_components/components'

class TextArea extends Component {
	constructor(props){
		super(props)
		this.state = {
			text:''
		}
	}

  update_text_handler = e => { 
    this.setState({selected_item:e.target.value})
  }

  submit_btn_handler = e => {
    this.props.submit_action(this.state) 
  }

	render(){	
		return(
			<div>
        <div className="form-group">
          <textarea onChange={this.update_text_handler} className="form-control" rows="5" />
        </div>
        {components.btn_selector(this.submit_btn_handler, "Confirm your answer")}	
			</div>
		)
	}
}

export default TextArea

