import React, {Component} from 'react'
import * as components from '../question_components/components'
import PropTypes from 'prop-types'

class HeightWeight extends Component {
  constructor(props){
    super(props)
    this.state = {
      weight:'',
      inch:'',
      ft:'',
      msg:''
    }
  }
  
  update_height_ft_handler = e => {
    this.setState({ft:e.target.value}) 
  }

  update_height_in_handler = e => {
    this.setState({inch:e.target.value}) 
  }

  update_weight_handler = e => {
    this.setState({weight:e.target.value}) 
  }
  
  submit_btn_handler = e => {
    const {weight, inch, ft} = this.state
    if(weight && inch && ft && !isNaN(weight) && !isNaN(inch) && !isNaN(ft)){ 
      this.props.submit_action(`${weight}lb ${ft}ft ${inch}in`)
    }else{
      this.setState({msg: "Please input valid information"})
    }
  }

  render(){
     return (
      <div>
        <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div>
        {components.input_type_1(this.update_weight_handler, "Weight lbs")}
        <div className = "p-2">
           <div className = "input-group input-type1">
             <div className ="input-group-prepend text_field_height_weight">
               <span className = "input-group-text span_height_weight">Height</span>
             </div>
             <input type="text" placeholder="Ft" onChange = {this.update_height_ft_handler} 
               className="form-control input_height_weight"/>
             <input type="text" placeholder="In" onChange = {this.update_height_in_handler} 
               className="form-control input_height_weight"/>
           </div>
         </div>
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm weight and height")}
      </div>
    )
  }
}

export default HeightWeight
