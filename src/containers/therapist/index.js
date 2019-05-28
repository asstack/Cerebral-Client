import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Account from './account'
import PatientsRefer from '../../components/question_types/patients_refer' 
import PatientInfo from '../../components/question_types/patient_info' 

class Therapist extends Component{
  constructor(props){
    super(props) 
    this.state = {
      view_type:null, 
    }
  }

  type_change_handler = (type) => {
    this.setState({view_type:type}) 
  }

  cover_page = () => {  
    return (
      <div>
        <input type='button' value='refer patient' onClick={e=>this.type_change_handler('refer')}/>
        <input type='button' value='login for patient'/>
        <input type='button' value='temp refer component' onClick={e=>this.type_change_handler('temp_refer')} />
        <input type='button' value='temp refer component' onClick={e=>this.type_change_handler('temp_info')} />

      </div>
    )
  }


  //TODO: structure and url design - register/signin, [patient_refer, patient_details] (should consider progress menu)
  type_to_view = () => {
    switch(this.state.view_type){
      case 'refer':
        return <Account /> 
      case 'temp_refer':
        return <PatientsRefer />
      case 'temp_info':
        return <PatientInfo />
      default: 
        return this.cover_page() 
    }
  }

  render(){
    return(
      <div>
        {this.type_to_view()}
      </div> 
    )
  }
}

export default Therapist
