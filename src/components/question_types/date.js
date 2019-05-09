import React, {Component} from 'react'
import * as components from '../question_components/components'


class Date extends Component {
  constructor(props){
    super(props)
    this.state = {
      birth_date : ''
    }
  }

  input_update_handler = e =>{
    this.setState({birth_date:e.target.value}) 
  }

  confirm_btn_handler = e => {
    console.log("check hanlder value", this.state.birth_date) 
    this.props.submit_action() 
  }

  render(){
    return(
    	<div>
			  {components.input_type_1(this.input_update_handler, "Date of Birth (mm/dd/yy)")}
			  {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm date of birth")}
		  </div>
	
    )
  }

}
export default Date


