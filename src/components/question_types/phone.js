import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class Phone extends Component {
	constructor(props){
		super(props)
		this.state = {
      phone_number:'',
      msg:'',
      notification:false
		}
	}

  componentDidMount = () => {
    this.setState({phone_number:this.props.prv_answer})
  }

	phone_number_handler = e => {	
		this.setState({phone_number:e.target.value})
	}

  skip_btn_handler = e => {
    this.props.skip_action()
  }

  notification_handler = e =>{
    this.setState({notification: e.target.checked})
  }

  confirm_btn_handler = e => {
    const number = this.state.phone_number;
    
    if(number && number.match(/\d/g) && number.match(/\d/g).length===10){
      this.props.submit_action(this.state.phone_number, this.props.question)
    }else{
      this.setState({msg:"Please input the 10 digit of phone number"})  
    }
  }

	render(){	
		return(
			<div>
        {this.state.msg? <div className = "d-flex justify-content-start text-small-red">{this.state.msg}</div>:null} 
				{components.input_type_1(this.phone_number_handler, "Phone number", this.props.prv_answer)}
				<div className="d-flex flex-row justify-content-start">	
					{components.checkbox_type_1(this.notification_handler, "I consent to text updates about my prescription deliveries and notifications from my doctor.")}	
				</div>
				<div className="d-flex flex-row justify-content-center">	

          {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm phone number >")}	
					</div>
			</div>
		)
	}
}

export default Phone
