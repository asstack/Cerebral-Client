import React, {Component} from 'react';
import * as components from '../question_components/components'

class EmergencyContact extends Component {

  constructor(props){
    super(props)
    this.state = {
      phone:'',
      first_name:'',
      last_name:'',
      prv_answer:{}
    }
  }

  componentDidMount = ()=> {
    if(this.props.prv_answer && this.props.prv_answer!=="N/A"){
      let prv_answer =JSON.parse(this.props.prv_answer)
      this.setState({prv_answer:prv_answer, first_name:prv_answer["first_name"], last_name:prv_answer["last_name"], phone:prv_answer["phone"]})
    }
  }

  update_handler = e => { 
    const {first_name, last_name, phone} = this.state
    if(phone && first_name && last_name){
      let ans = JSON.stringify({phone:phone, first_name:first_name, last_name:last_name})
      this.props.submit_action(ans, this.props.question.id) 
    }else{
      if(!phone || !first_name || !last_name){ 
        this.setState({msg:"Please fill all the fields"}) 
      }    
    }
   }

  skip_btn_handler = e => {
    this.props.submit_action("N/A", this.props.question.id)
  }
  
  update_phone = (e) => {
    const ph = e.target.value
    this.setState({phone:ph})
  }

  update_firstname = (e) => {
    const fname = e.target.value
    this.setState({first_name:fname})
  }

  update_lastname = (e) => {
    const lname = e.target.value
    this.setState({last_name:lname})
  }
  
  render(){
    let btn_wording = 'Confirm contact information >'
    return (
      <div>
        {this.state.msg? <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div> : null}
        <div className = "d-flex flex-row justify-content-between">
          {components.input_type_half(this.update_firstname.bind(this), "First Name", this.state.prv_answer["first_name"])}
          {components.input_type_half(this.update_lastname.bind(this), "Last Name", this.state.prv_answer["last_name"])}
        </div>
        {components.input_type_1(this.update_phone.bind(this), "Phone #", this.state.prv_answer["phone"])}
        <div className = "d-flex flex-row justify-content-between">
          {components.confirm_button_type_1(this.update_handler.bind(this), btn_wording)}
          {components.skip_button_type_1(this.skip_btn_handler.bind(this), "Skip >")}
        </div>
      </div>
    );
  }
}

export default EmergencyContact
