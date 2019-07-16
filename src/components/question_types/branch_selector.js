import React, {Component} from 'react';
import * as components from '../question_components/components'
import TextArea from './text_area'

//TODO: it is temp name, may update to proper name
class BranchSelector extends Component {

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
      this.props.submit_action(JSON.stringify({answer:type}),type, this.props.question.id)
    }else{
      this.props.submit_action(JSON.stringify({answer:type}),type,this.props.question.id)
    } 
  }

  view = () => {
  
      let prv_answer = this.state.prv_answer?this.state.prv_answer['answer']:null;
    console.log("check question:", this.props.question)
      return ( 
       <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
          {components.btn_selector(this.set_type_handler, "Yes", "yes", 'yes'===prv_answer)} 
          {components.btn_selector(this.set_type_handler, "No", "no", 'no'===prv_answer)} 
        </div> 
      )
  }
  
  render(){
    return ( 
      this.view(this.state.view_type)
    );
  }
}

export default BranchSelector
