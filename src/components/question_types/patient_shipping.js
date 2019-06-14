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

   update_property = (which, e) => {
       this.state[which] = e.target.value
   }

  set_view_type_handler = (e, type) => {
    this.setState({validation_method:type})
  }
  
  render(){
    return (
      <div className="patient_shipping">
        {components.input_type_autocomplete(this.update_property.bind(this, 'address_1'), "Shipping Address 1", 'shipping street-address')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'address_2'), "Shipping Address 2", '')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'city'), "City", 'shipping locality')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'region'), "State", 'shipping region')}
        {components.input_type_autocomplete(this.update_property.bind(this, 'postal_code'), "ZIP", 'shipping postal-code')}
        {components.confirm_button_type_1(this.update_handler.bind(this), "Confirm Shipping Address >")}
      </div>
    );
  }
}

export default PatientShipping
