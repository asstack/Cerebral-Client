import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'

class TherapistPatientsInfo extends Component{

  constructor(props){
    super(props)
    this.state={
      ref_id:this.props.ref_id,
      first_name:this.props.patient.first_name,
      last_name:this.props.patient.last_name,
      email:this.props.patient.email,
      q_id:this.props.q_id,
      phone:null
    } 
  }
    
  shouldComponentUpdate=()=>{
    return false
  }
 
  componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id, q_id:next_props.q_id, fisrt_name:next_props.patient.first_name, last_name:next_props.patient.last_name, email:next_props.patient.email, phone:null})
    this.forceUpdate()
  }


  update_info_handler = e =>{ 
    this.setState({phone: e.target.value})
    this.props.submit_action(e.target.value, this.state.q_id) 
  }

  render(){
    return(
      <div key={uuidv1()}>
        {components.patient_info_text("Patient Full Name:", this.state.first_name+" "+this.state.last_name)}
        {components.patient_info_text("Patient Email:", this.state.email)}
        {components.patient_info_input("Patient Telephone #:","Telephone #", this.update_info_handler)}
      </div> 
    ) 
  }
}

export default TherapistPatientsInfo


