import React, {Component} from 'react'
import moment from 'moment'
import * as components from '../question_components/components'


class Date extends Component {
  constructor(props){
    super(props)
    this.state = {
      birth_date : '',
      msg:''
    }
  }

  input_update_handler = e =>{
    this.setState({birth_date:e.target.value}) 
  }
  //moment("05/22/2012", 'MM/DD/YYYY',true).isValid() 
  confirm_btn_handler = e => {
    const date = this.state.birth_date;
    if(date && moment(date, 'MM/DD/YY', true).isValid()){
      this.props.submit_action(this.state.birth_date) 
    }else{
      this.setState({msg:"Please input the date of birth (mm/dd/yy)"}) 
    }
  }

  render(){
    return(
    	<div>
        {this.state.msg? <div className = "d-flex justify-content-start p-2 text-small-red">{this.state.msg}</div>
: null} 
        {components.input_type_1(this.input_update_handler, "Date of Birth (mm/dd/yy)")}
			  {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm date of birth")}
		  </div>
	
    )
  }

}
export default Date


