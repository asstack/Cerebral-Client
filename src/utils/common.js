import React from 'react'
import {Route} from 'react-router-dom'
import {selector} from '../components/question_types/selector'
import Date from '../components/question_types/date'
import HeightWeight from '../components/question_types/height_weight'
import CreateProfile from '../components/question_types/create_profile'
import Phone from '../components/question_types/phone'
import CheckBoxComponent from '../components/question_types/checkbox'
import StateSelector from '../components/question_types/state_selector' 
import TextArea from '../components/question_types/text_area' 
import Identification from '../components/question_types/patient_identification'
import PatientPayment from '../components/question_types/patient_payment' 
import PatientShipping from '../components/question_types/patient_shipping' 
import YesNoDetails from '../components/question_types/yes_no_details' 
import VideoSelector from "../components/question_types/video_selector"

import ReactGA from 'react-ga'
import SideEffects from '../components/question_types/side_effects';
import MedicationPreference from '../components/question_types/medication_preference';
import DosagePreference from '../components/question_types/dosage_preference';
import RegisterManager from '../components/question_types/register_manager'



export const email_validation = email => {
  let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(format)){
    return true;
  }else{
    return false;
  }
}

export const map_type_to_component = (question, handlers, user) => {
  if(!question) return null

  switch(question.question_type) {
    case 'selector':
      return selector(handlers.set_selector_handler, question)
    case 'create_profile':
      return <RegisterManager
                type = 'register'
                user = {user} 
                signin_submit_action = {handlers.patient_sign_in}
                register_submit_action = {handlers.did_create_patient} 
                skip_action = {handlers.next_step_handler}/>
    case 'sign_up':
      return <CreateProfile
                submit_action = {handlers.did_create_patient}/> 
    case 'bank_selector':
      return selector(handlers.set_bank_selector_handler, 
        question)
    case 'phone':
      return <Phone skip_action = {handlers.next_step_handler}
                     submit_action = {handlers.submit_answer_and_next_step}/>
    case 'checkboxes':
      return <CheckBoxComponent options = {question.options} 
                submit_action = {handlers.submit_answer_and_next_step}
                details = 'false'/>
    case 'checkbox_details':
      return <CheckBoxComponent options = {question.options} 
                submit_action = {handlers.submit_answer_and_next_step}
                details = 'true'/> 
    case 'date':
      return <Date submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'height_weight':
      return <HeightWeight submit_action = {handlers.submit_answer_and_next_step}/>   
    case 'state_selector':
      return <StateSelector submit_action = {handlers.submit_answer_and_next_step}/>    
    case 'yes_no_details':
      return <YesNoDetails
                description = {question.options} 
                submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'patient_identification':
      return <Identification submit_action = {handlers.submit_and_upload_data}/>  
    case 'patient_shipping':
      return <PatientShipping submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'patient_payment':
      return <PatientPayment submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'side_effects':
      return <SideEffects submit_action = {handlers.submit_answer_and_next_step}/>  
    case 'medication_preference':
      return <MedicationPreference submit_action = {handlers.submit_answer_and_next_step}/>  
    case 'dosage_preference':
      return <DosagePreference submit_action = {handlers.submit_answer_and_next_step}/>  
    case 'patient_video':
      return <VideoSelector 
              submit_text_action = {handlers.submit_answer_and_next_step}
              submit_video_action = {handlers.submit_and_upload_data}/>  
    default:
      return(
        <div>
        <div className='pb-5 d-flex flex-row justify-content-center'>
          <img src='https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408060__340.png'/>
        </div>
        <div className='d-flex flex-row justify-content-center'>
          <input className ="col btn-confirm text-btn" type="button" onClick={handlers.next_step_handler.bind(this)} value="Next"/>
        </div>
      </div>)
   }
 }

