import React, {Component} from 'react';
import * as components from '../question_components/components'

class PatientShipping extends Component {

  constructor(props){
    super(props)
    this.state = {
      address_1:'',
      address_2:'',
      city:'',
      region:'',
      postal_code:''
    }
  }

  update_handler = (e) => { 
    this.props.submit_action(JSON.stringify(this.state)) 
   }

  update_property = (e, key) => {
    this.setState({[key]:e.target.value})
  }

  set_view_type_handler = (e, type) => {
    this.setState({validation_method:type})
  }
  
  render(){
    return (
      <div className="patient_shipping">
        {components.input_type_autocomplete(this.update_property, "Shipping Address 1", 'shipping street-address','address_1')}
        {components.input_type_autocomplete(this.update_property, "Shipping Address 2", '', 'adress_2')}
        {components.input_type_autocomplete(this.update_property, "City", 'shipping locality','city')}
        {components.input_type_autocomplete(this.update_property, "State", 'shipping region','region')}
        {components.input_type_autocomplete(this.update_property, "ZIP", 'shipping postal-code','postal_code')}
        {components.confirm_button_type_1(this.update_handler.bind(this), "Confirm Shipping Address >")}
      </div>
    );
  }
}

export default PatientShipping
