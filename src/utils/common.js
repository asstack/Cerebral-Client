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

export const map_type_to_component = (questions, step, handlers) => {
  
	if(!questions || !questions[step]) {return <div> Loading </div>}
	
	ReactGA.event({
		category: 'Questions',
		action: questions[step].question_type
	});

		switch(questions[step].question_type) {
			case 'selector':
				return selector(handlers.set_selector_handler.bind(this), questions[step])
			case 'create_profile':
				return <Route path='' render={(props) =>
						    <CreateProfile
							    submit_action = {handlers.did_create_patient.bind(this)}/>}/>
			case 'sign_up':
				return <Route path='' render={(props) =>
						    <CreateProfile
							    submit_action = {handlers.did_create_patient.bind(this)}/>}/>	
			case 'bank_selector':
        return selector(handlers.set_bank_selector_handler.bind(this), 
          questions[step])
			case 'phone':
				return <Route path='' render={(props) => 
						    <Phone skip_action = {handlers.next_step_handler}
							         submit_action = {handlers.submit_answer_and_next_step}/>}/>
			case 'checkboxes':
				return <Route path='' render={(props) => 
                <CheckBoxComponent options = {questions[step].options} 
                                   submit_action = {handlers.submit_answer_and_next_step}/>}/>
			case 'date':
        return <Route path='' render={(props) =>
                <Date submit_action = {handlers.submit_answer_and_next_step}/>}/>   
			case 'height_weight':
        return <Route path='' render={(props) =>
                <HeightWeight submit_action = {handlers.submit_answer_and_next_step}/>}/>   
			case 'state_selector':
        return <Route path='' render={(props) =>
                <StateSelector submit_action = {handlers.submit_answer_and_next_step}/>}/>   	
			case 'yes_no_details':
        return <Route path='' render={(props) =>
                <YesNoDetails
                  description = {questions[step].options} 
                  submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'patient_identification':
				return <Route path='' render={(props) =>
								<Identification submit_action = {handlers.submit_and_upload_data}/>}/>  
			case 'patient_shipping':
        return <Route path='' render={(props) =>
								<PatientShipping submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'patient_payment':
        return <Route path='' render={(props) =>
								<PatientPayment submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'side_effects':
				return <Route path='' render={(props) =>
							<SideEffects submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'medication_preference':
				return <Route path='' render={(props) =>
							<MedicationPreference submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'dosage_preference':
				return <Route path='' render={(props) =>
							<DosagePreference submit_action = {handlers.submit_answer_and_next_step}/>}/>  
			case 'patient_video':
				return <Route path='' render={(props) =>
							<VideoSelector submit_action = {handlers.submit_and_upload_data}/>}/>  
			default:
				return(
					<div>
					<div className='pb-5 d-flex flex-row justify-content-center'>
						<img src='https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408060__340.png'/>
					</div>
					<div className='d-flex flex-row justify-content-center'>
						<input className ="col btn-confirm text-btn" type="button" onClick={handlers.next_step_handler.bind(this)} value="Next"/>
					</div>
				</div>
				)
		}
 }


