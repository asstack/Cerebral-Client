import React, {Component} from 'react';
import * as components from '../question_components/components'
import TextArea from './text_area'

//TODO: it is temp name, may update to proper name
class QuestionSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:''
    }
  }

  componentDidMount = () => {
    if(this.props.prv_answer){
      this.setState({prv_answer:JSON.parse(this.props.prv_answer)})
    }
  }

  set_type_handler = (e, type) => {
    if(type==="yes"){
      this.props.submit_action(JSON.stringify({answer:type}), this.props.question.id, type)
    }else{
      this.setState({type:"detail"})
    } 
  }
  submit_description_action =(data)=> {
      this.props.submit_action(JSON.stringify({answer:"no", detail:data}), this.props.question.id, 'done')
  }

  text_area_view = () => {
    let default_answer = this.state.prv_answer?this.state.prv_answer['detail']:null;
    return (         
      <div>
        <div className = "d-flex justify-content-start text-small">
          <p>{this.props.title}</p>
        </div>	
        <TextArea title_ref = {this.props.title_ref} default_detail={default_answer} subscript_ref = {this.props.subscript_ref} flag_title={this.props.flag_title} submit_action = {this.submit_description_action}/> 
      </div>
    )}

  view = () => {
    let prv_answer = this.state.prv_answer?this.state.prv_answer['answer']:null;
    if(this.state.type==="detail"){
      return this.text_area_view()
    }else{ 
      return ( 
       <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
          {components.btn_selector(this.set_type_handler, "Yes", "yes", 'yes'===prv_answer)} 
          {components.btn_selector(this.set_type_handler, "No", "no", 'no'===prv_answer)} 
        </div> 
      )
    }
  }
  
  render(){
    return ( 
      this.view(this.state.view_type)
    );
  }
}

export default QuestionSelector
