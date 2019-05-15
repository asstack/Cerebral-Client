import React, {Component} from 'react'
import * as components from '../question_components/components'

class TextArea extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:''
    }
  }

  update_text_handler = e => { 
    this.setState({text:e.target.value})
  }

  submit_btn_handler = e => {
    if(this.state.text){ 
      this.props.submit_action(this.state.text) 
    }else{
      this.setState({msg:"Please answer the question. If not applicable, please input N/A"})
    }
  }

  render(){ 
    return(
      <div>
        <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div>
        <div className="form-group">
          <textarea onChange={this.update_text_handler} className="form-control" rows="5" />
        </div>
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm your answer")}  
      </div>
    )
  }
}

export default TextArea

