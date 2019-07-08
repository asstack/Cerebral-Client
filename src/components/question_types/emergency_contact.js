import React, {Component} from 'react';
import * as components from '../question_components/components'

class EmergencyContact extends Component {

  constructor(props){
    super(props)
    this.state = {
      phone:'',
      first_name:'',
      last_name:'',
    }
  }

  update_handler = e => { 
    const {first_name, last_name, phone} = this.state
    if(phone && first_name && last_name){
      let ans = "first_name: "+first_name+" last_name: "+last_name+" phone: "+phone
      this.props.submit_action(ans) 
    }else{
      if(!phone || !first_name || !last_name){ 
        this.setState({msg:"Please fill all the fields"}) 
      }    
    }
   }

  skip_btn_handler = e => {
    this.props.submit_action("N/A")
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
          {components.input_type_half(this.update_firstname.bind(this), "First Name")}
          {components.input_type_half(this.update_lastname.bind(this), "Last Name")}
        </div>
        {components.input_type_1(this.update_phone.bind(this), "Phone #")}
        <div className = "d-flex flex-row justify-content-between">
          {components.confirm_button_type_1(this.update_handler.bind(this), btn_wording)}
          {components.skip_button_type_1(this.skip_btn_handler.bind(this), "Skip >")}
        </div>
      </div>
    );
  }
}

export default EmergencyContact
