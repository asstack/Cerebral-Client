import React, {Component} from 'react'
import uuidv1 from 'uuid'

class SelectorComponent extends Component {
  constructor(props){
    super(props)  
    this.state={
      question:null,
      is_ready:false,
    }
  }
  
  componentDidMount(){
    this.setState({question:this.props.question, is_ready:true}) 
  }
 


  submit_btn_handler = (item, index) => {
    if(this.props.type ==='bank_selector'){
      this.props.submit_action(item) 
    }else{
      let ans = ""
      if(this.props.question.assessment_type!==null){
        ans = JSON.stringify({score: this.state.question.options.length-index-1, answer:item.name})
      }else{
        ans = item.name
      }
      console.log("answer:", ans)
      this.props.submit_action(ans) 
    }
  }



  selector_items = (options, class_type) => {
    return options.map((item, index) => (
      <input key={uuidv1()} className = {class_type} onClick={e=>this.submit_btn_handler(item, index)} 
        type="button" value={item.title}/>
  ))}

  selector = () => {
    const class_type = this.props.question.options.length>2? "button-multi-selector":"button-two-selector";
    return (
      <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
        {this.selector_items(this.state.question.options, class_type)}
      </div>
    )
  }

  render(){
    if(this.state.is_ready) return this.selector()  
    else return null
  }

}

export default SelectorComponent
