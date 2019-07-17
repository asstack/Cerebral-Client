import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'
import TextArea from './text_area'

class BranchCheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      checked_options:[],
      single_option:'',
      msg:'',
      details:false,
      default_detail:"",
      type:'checkbox',
      is_ready:false
    }
  }

  componentDidMount(){
    const arr = new Array(this.props.options.length).fill(false);     

    if(this.props.prv_answer){
      let prv_answer = JSON.parse(this.props.prv_answer)
      prv_answer.option.map((val, index)=> {
        arr[val]=true
      })
      this.setState({default_detail:prv_answer.detail})
    }
    this.setState({details:this.props.details , options: this.props.options, checked_options:arr, is_ready:true})
  }


  check_box_handler = (e, idx) => {
    let option_name = this.state.options[idx].name
    let list = new Array(this.props.options.length).fill(false) 
    list[idx]=e.target.checked

    this.setState({checked_options:list}) 
 }

  submit_btn_handler = () => {
    let answer ={option:[], name:[], detail:""}
    this.state.checked_options.forEach((val, idx)=>{
      if(val){
        answer.option.push(idx)
        answer.name.push(this.state.options[idx].name)
      }
    }) 
    if(answer.option.length > 0){ 
      if(this.state.details==='true' && answer.name[0]==='Other'){
        this.setState({answer:answer, type:'details'}) 
        if(this.props.set_subcomp!==null){ 
          this.props.set_subcomp(true)
        }
      }else{
        this.props.submit_action(JSON.stringify(answer), this.props.question)
      }
    }else{
      this.setState({msg:"Please select at least one item"})
    }
  }
  
  
  //in this case, only submit one with text
  submit_with_text_handler = (text) => {
    let answer = this.state.answer
    answer["detail"]=text
    this.props.submit_action(JSON.stringify(answer), this.props.question, 'done')  
  }
  
  //{(e) => this.check_box_handler(e,item.option_name)}
  map_data_to_checkbox = (item,index) => {
    const last_item_style = index+1===this.state.options.length?" last-item":"";
    return(
      <div className={"input-group group-check-box-item"+last_item_style} key={uuidv1()}>
        <div className="input-group-prepend">
          <div className="input-group-text group-checkbox">
            <input type="radio" onChange={(e) => {this.check_box_handler(e,index)}} name={item.title} checked={this.state.checked_options[index]}/>
          </div>
        </div>
        <div className="d-flex justify-content-center form-control group-checkbox-text">
          <span className="align-self-center">{item.title}</span>
        </div>
      </div>
    )
  }

  view_by_type=()=>{
    if(!this.state.is_ready) return null;
    if(this.state.type==='checkbox'){
      return (
        <div className="check-box-question">    
        {this.state.msg? <div className = "d-flex justify-content-start p-2 text-small-red">{this.state.msg}</div>:null}
        <div className="check-box-container">
          {this.state.options.map((item, index) => (this.map_data_to_checkbox(item, index)))}
        </div>
        <div className="d-flex flex-row justify-content-center">
          {components.confirm_button_type_1(this.submit_btn_handler, "Confirm >")}  
        </div>
      </div> 
      )
    }else{
      return <TextArea default_detail={this.state.default_detail} title_ref = {this.props.title_ref} subscript_ref = {this.props.subscript_ref} flag_title={this.props.flag_title} submit_action = {this.submit_with_text_handler}/> 
    } 
  }

  render(){
    return (
      this.view_by_type()
   )
  }
}

export default BranchCheckBox
