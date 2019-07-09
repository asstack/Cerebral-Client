import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'
import TextArea from './text_area'

class CommunicationPreference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      checked_options:[],
      answers:{},
      single_option:'',
      msg:'',
      details:false,
      default_detail:"",
      type:'checkbox',
      is_ready:false
    }
  }

  componentDidMount(){
    //initalize item
    const arr = new Array(3).fill(false);     
    let options = [{type:"text/email", value:"Text/Email"}, {type:"video", value:"Video Call"},{type:"phone", value:"Phone Call"}]
    if(this.props.prv_answer){
      let prv_answer = JSON.parse(this.props.prv_answer)
      for (var key in prv_answer) {
        arr[key]=true      
      }
      this.setState({answers:prv_answer})
    }
    this.setState({details:this.props.details , options: options, checked_options:arr, is_ready:true, is_rerender:true})
  }

  shouldComponentUpdate(next_props, next_state){
    return next_state.is_rerender;
  }

  //NOTE: exception for None apply is hardcorded. 
  check_box_handler = (e, idx, item) => {
    let list = this.state.checked_options
    list[idx]=e.target.checked
    let answers = this.state.answers
    if(e.target.checked){
      answers[idx]={detail:"", answer:item.type} 
    }else{
      delete answers[idx]
    }

    this.setState({checked_options:list, answers:answers, is_rerender:true})
  }

  //{idx:{answer:"phone", detail: text}}
  update_answer_handler = (e, idx)=>{
    let answers = this.state.answers;
    answers[idx].detail = e.target.value
    this.setState({answers:answers, is_rerender:false})
  }

  submit_btn_handler = () => {
    if(Object.keys(this.state.answers).length > 0){ 
      this.props.submit_action(JSON.stringify(this.state.answers), this.props.question.id)
    }else{
      this.setState({msg:"Please select at least one communication option"})
    }
  }

  placeholder_wording = (type)=>{
    if(type==='text/email'){
      return "Your doctor might need to call you regardless, depending on your assessment answers. Please indicate your general availability if a phone call is needed."
    }else if(type==="video"){
      return "Please indicate your general availability for a phone call, in case your doctor feels the need to get in touch before your scheduled video call."
    }else{
      return "Please indicate your general availability for a phone call."

    }

  } 

  //{item.type: text} 
  //{(e) => this.check_box_handler(e,item.option_name)}
  map_data_to_checkbox = (item,index) => {
    const last_item_style = index===2?" last-item":"";
    return(
      <div className={"d-flex flex-column group-expandable-checkobx"+last_item_style} key={uuidv1()}>
        <div className="d-flex flex-row expandable-checkbox-holder">
          <div className="input-group-prepend">
            <div className="input-group-text expandable-checkbox">
              <input type="checkbox" onChange={(e) => {this.check_box_handler(e, index, item)}} name={item.type} checked={this.state.checked_options[index]}/>
            </div>
          </div>
          <div className="d-flex justify-content-center form-control expandable-checkbox-text">
            <span className="align-self-center">{item.value}</span>
          </div>
        </div>
        {this.state.checked_options[index]? 
        <div className = "d-flex justify-content-center expandable-textarea-holder">
          <textarea className="expandable-textarea" defaultValue={this.state.answers[index]? this.state.answers[index].detail:""} onChange={e=>this.update_answer_handler(e, index)} placeholder={this.placeholder_wording(item.type)}>
          </textarea>
        </div>
        :null}
      </div>
      )
    }

  view_by_type=()=>{
    if(!this.state.is_ready) return null;
    else return (
        <div className="check-box-question">    
        {this.state.msg? <div className = "d-flex justify-content-start p-2 text-small-red">{this.state.msg}</div>:null}
        <div className="check-box-container">
            {this.state.options.map((item, index)=>(
              this.map_data_to_checkbox(item, index))
            )}
        </div>
        <div className="d-flex flex-row justify-content-center">
          {components.confirm_button_type_1(this.submit_btn_handler, "Confirm >")}  
        </div>
      </div> 
      )
  }

  render(){
    return (
      this.view_by_type()
   )
  }
}

export default CommunicationPreference



