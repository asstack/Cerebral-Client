import React, {Component} from 'react'
import * as components from '../question_components/components'

class StateSelector extends Component {
	constructor(props){
		super(props)
		this.state = {
			state:''
		}
	}

  state_selector_handler = e => {
    this.setState({state: e.target.value}) 
  }

  //TODO: Need to update database for state select but still not sure if we use them or not. So, I am using hardcode for answer
  confirm_btn_handler = e => {
    if(!this.state.state){
      alert("Please select state")
      return
    }

    let answer={}
    if(this.state.state==="CA"|| this.state.state==="OH"){ 
      answer = {title:this.state.state, immediate:true, question_bank_names:["profile"]} 
    }else{
      answer = {title:this.state.state, immediate:false, question_bank_names:[]} 
    }
    this.props.submit_action(answer)
  }

	render(){	
		return(
      <div>
        <select className = "form-control form-control-lg state-selector" 
          onChange={this.state_selector_handler}>
          <option value="">States</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>	
        <div className="d-flex flex-row justify-content-center">
          {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm")}
        </div>
      </div>
		)
	}
}

export default StateSelector
