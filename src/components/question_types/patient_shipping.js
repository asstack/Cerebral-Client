import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import * as components from '../question_components/components'
import {get_patient_shipping_address} from '../../actions/patient_action'

class PatientShipping extends Component {

  constructor(props){
    super(props)
    this.state = {
      address_1:'',
      address_2:'',
      city:'',
      region:'',
      postal_code:'',
      prv_address:{},
      is_ready:false
    }
  }

  componentDidMount = () => {
    if(this.props.prv_answer){
      let prv_answer = JSON.parse(this.props.prv_answer)
      this.setState({is_ready:true, prv_address:prv_answer, address_1:prv_answer["address_1"], 
                    address_2:prv_answer["address_2"], city:prv_answer["city"], region:prv_answer["region"], postal_code:prv_answer["postal_code"]})
    }else{
      this.props.get_patient_shipping_address().then(data=> {
        if(data){
          let saved_addr = data[0]
          this.setState({prv_address:saved_addr, address_1:saved_addr["address_1"], 
                    address_2:saved_addr["address_2"], city:saved_addr["city"], region:saved_addr["region"], postal_code:saved_addr["postal_code"]})
        }      
        this.setState({is_ready:true})
      })
        .catch(err=>
          this.setState({is_ready:true})
        )
    }
  } 

  update_handler = (e) => { 
    let address = {address_1:this.state.address_1, address_2:this.state.address_2, city:this.state.city, region:this.state.region, postal_code:this.state.postal_code}
    if(!address.address_1 || !address.city || !address.region || !address.postal_code){
      return
    }
    let valid_state = address.region.toLowerCase() 
    const address_set = new Set(["ca", "california", "ohio", "oh"]);
    if(address_set.has(valid_state)){
      this.props.submit_action(JSON.stringify(address), this.props.question.id) 
    }else{
      alert("Unfortunately Cerebral is not yet active in this state. We are available in California and Ohio.")
    }
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
        {components.input_type_autocomplete(this.update_property, "Shipping Address 1", 'shipping street-address','address_1', this.state.prv_address["address_1"])}
        {components.input_type_autocomplete(this.update_property, "Shipping Address 2", '', 'adress_2', this.state.prv_address["address_2"])}
        {components.input_type_autocomplete(this.update_property, "City", 'shipping locality','city', this.state.prv_address["city"])}
        <div className="d-flex flex-row justify-content-between">
          {components.input_type_autocomplete(this.update_property, "State", 'shipping region','region', this.state.prv_address["region"])}
          <div></div>
          {components.input_type_autocomplete(this.update_property, "ZIP", 'shipping postal-code','postal_code', this.state.prv_address["postal_code"])}
        </div>
        {components.confirm_button_type_1(this.update_handler.bind(this), "Confirm Shipping Address >")}
      </div>
    );
  }
}

export default connect(null, {get_patient_shipping_address})(PatientShipping)
