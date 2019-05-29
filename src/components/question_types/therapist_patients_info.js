import React, {Component} from 'react'
import * as components from '../question_components/components'

class TherapistPatientsInfo extends Component{

  constructor(props){
    super(props)
    this.state={
      ref_id:this.props.ref_id,
      name:this.props.patient.name,
      email:this.props.patient.email,
      p_id:this.props.p_id,
      phone:null
    } 
  }
    
  shouldComponentUpdate=()=>{
    return false
  }

   componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id,p_id:next_props.p_id, name:next_props.patient.name, email:next_props.patient.email, phone:null})
    this.forceUpdate()
  }


  update_info_handler = phone_number =>{ 
    this.setState({phone:phone_number})
    this.props.submit_action({name:this.state.name, email:this.state.email, phone:this.state.phone}, this.state.p_id) 
  }

  render(){
    return(
      <div>
        {components.patient_info_text("Patient Full Name:", this.state.name)}
        {components.patient_info_text("Patient Email:", this.state.email)}
        {components.patient_info_input("Patient Telephone #:","Telephone #", this.update_info_handler)}
      </div> 
    ) 
  }
}

export default TherapistPatientsInfo


