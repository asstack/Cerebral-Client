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

  componentDidMount = () => {
    if(this.props.subscript_ref && this.props.subscript_ref.current){
      this.props.subscript_ref.current.innerText = ""
      this.props.subscript_ref.current.style.padding = "0"
    }
    if(this.props.title_ref && this.props.title_ref.current){
      this.props.title_ref.current.innerText = this.props.flag_title||"Please elaborate on your answer. " 
    }
    if(this.props.default_detail){
      this.setState({text:this.props.default_detail})
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
    let default_value=this.props.default_detail?this.props.default_detail:""
    return(
      <div>
        {this.state.msg?<div className = "d-flex justify-content-start text-small-red">{this.state.msg}</div>:null}
        <div className="form-group">
          <textarea defaultValue={default_value} onChange={this.update_text_handler} className="q-textarea form-control" rows="5">
          </textarea>
        </div>
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm your answer >")}  
      </div>
    )
  }
}

export default TextArea

