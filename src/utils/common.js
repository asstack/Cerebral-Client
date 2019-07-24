import React from 'react'
import SelectorComponent from '../components/question_types/selector'
import Date from '../components/question_types/date'
import HeightWeight from '../components/question_types/height_weight'
import CreateProfile from '../components/question_types/create_profile'
import Phone from '../components/question_types/phone'
import CheckBoxComponent from '../components/question_types/checkbox'
import StateSelector from '../components/question_types/state_selector' 
import DosageSelector from '../components/question_types/dosage_selector' 
import Identification from '../components/question_types/patient_identification'
import PatientPayment from '../components/question_types/patient_payment' 
import PatientShipping from '../components/question_types/patient_shipping' 
import YesNoDetails from '../components/question_types/yes_no_details' 
import VideoSelector from "../components/question_types/video_selector"
import BranchSelector from "../components/question_types/branch_selector"
import QuestionSelector from "../components/question_types/question_selector"
import BranchCheckBox from '../components/question_types/branch_checkbox'
import EmergencyContact from "../components/question_types/emergency_contact"

import SideEffects from '../components/question_types/side_effects';
import MedicationPreference from '../components/question_types/medication_preference';
import DosagePreference from '../components/question_types/dosage_preference';
import CommunicationPreferene from '../components/question_types/communication_preference';
import RegisterManager from '../components/question_types/register_manager'
import IdentificationCover from '../components/question_types/identification_cover'
import MentalHealthCover from '../components/question_types/mental_health_cover'
import InsomniaCover from '../components/question_types/insomnia_cover'


export const imgtoBlob = (img, contentType='', sliceSize=512) => {
    const b64Data = img.replace(/^data:image\/\w+;base64,/, "")

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }



export const email_validation = email => {
  let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(format)){
    return true;
  }else{
    return false;
  }
}

export const map_type_to_component = (question, handlers, user, answer, subscript_ref, title_ref, service_line, answers=null) => {
  if(!question) return null

  switch(question.question_type) {
    case 'insomnia_cover': 
      return <InsomniaCover submit_action = {handlers.submit_answer_and_next_step} />
    case 'mental_health_cover':
      return <MentalHealthCover submit_action = {handlers.submit_answer_and_next_step} />
    case 'identification_cover':
      return <IdentificationCover submit_action = {handlers.submit_answer_and_next_step} />
    case 'selector':
      return <SelectorComponent submit_action = {handlers.submit_answer_and_next_step} question={question} prv_answer={answer} type="selector"/>
    case 'emergency_contact':
      return <EmergencyContact submit_action = {handlers.submit_answer_and_next_step} question={question} prv_answer={answer}/>
    case 'branch_selector':
      return <BranchSelector submit_action = {handlers.submit_branch_answer} question={question} prv_answer={answer}/>
    case 'question_selector':
      return <QuestionSelector 
              flag_title = {question.flag_title}
              subscript_ref = {subscript_ref}
              title_ref = {title_ref}
              set_subcomp = {handlers.set_subcomp} submit_action = {handlers.submit_and_next_branch_question} question={question} prv_answer={answer}/>
    case 'dosage_selector':
      return <DosageSelector submit_action = {handlers.submit_and_next_branch_question} service_line={service_line} question={question} prv_answer={answer}/> 
    case 'branch_checkbox_details':
      return <BranchCheckBox 
                options = {question.options} 
                flag_title = {question.flag_title}
                subscript_ref = {subscript_ref}
                title_ref = {title_ref}
                submit_action = {handlers.submit_and_next_branch_question} 
                question={question} 
                set_subcomp = {handlers.set_subcomp} 
                prv_answer={answer}
                details='true'/>
    case 'create_profile':
      return <RegisterManager
                view_type = 'register'
                user = {user} 
                set_subcomp = {handlers.set_subcomp}
                signin_submit_action = {handlers.patient_sign_in}
                register_submit_action = {handlers.did_create_patient} 
                title_ref = {title_ref}
                skip_action = {handlers.next_step_handler}/>
    case 'sign_up':
      return <CreateProfile
                submit_action = {handlers.did_create_patient}/> 
    case 'bank_selector':
      return <SelectorComponent
              prv_answer={answer}
              submit_action = {handlers.set_bank_selector_handler} question={question} type="bank_selector"/>
    case 'phone':
      return <Phone skip_action = {handlers.next_step_handler}
                    question={question}
                    submit_action = {handlers.submit_answer_and_next_step}
                    prv_answer={answer}/>
    case 'checkboxes':
      return <CheckBoxComponent options = {question.options} 
                question={question}
                prv_answer={answer}
                submit_action = {handlers.submit_answer_and_next_step}
                details = 'false'/>
    case 'checkbox_details':
      return <CheckBoxComponent 
                options = {question.options} 
                flag_title = {question.flag_title}
                subscript_ref = {subscript_ref}
                title_ref = {title_ref}
                submit_action = {handlers.submit_answer_and_next_step}
                question={question}
                set_subcomp = {handlers.set_subcomp} 
                prv_answer={answer}
                details = 'true'/> 
    case 'date':
      return <Date question={question} submit_action = {handlers.submit_answer_and_next_step} prv_answer = {answer}/> 
    case 'height_weight':
      return <HeightWeight question={question} submit_action = {handlers.submit_answer_and_next_step} prv_answer = {answer}/>   
    case 'state_selector':
      return <StateSelector question={question} submit_action = {handlers.set_bank_selector_handler} prv_answer = {answer}/>    
    case 'yes_no_details':
      return <YesNoDetails
                prv_answer = {answer}
                question={question}
                flag_title = {question.flag_title}
                subscript_ref = {subscript_ref}
                title_ref = {title_ref}
                description = {question.options} 
                set_subcomp = {handlers.set_subcomp} 
                submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'patient_identification':
      return <Identification 
              
                question = {question}
                flag_title = {question.flag_title}
                file_name = {question.name}
                set_subcomp = {handlers.set_subcomp} 
                submit_action = {handlers.submit_and_upload_data}/>  
    case 'patient_shipping':
      return <PatientShipping  
              prv_answer={answer}
              question = {question}
              submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'patient_payment':
      return <PatientPayment 
              user = {user} 
              question = {question}
              submit_action = {handlers.submit_answer_and_next_step}/> 
    case 'side_effects':
      return <SideEffects submit_action = {handlers.submit_answer_and_next_step} question={question} prv_answer = {answer}/>  
    case 'medication_preference':
      return <MedicationPreference submit_action = {handlers.submit_answer_and_next_step} question={question} prv_answer={answer} answers={answers}/>  
    case 'dosage_preference':
      return <DosagePreference submit_action = {handlers.submit_answer_and_next_step} prv_answer={answer} question={question} skip_action = {handlers.next_step_handler} answers={answers}/>  
    case 'communication_preference':
      return <CommunicationPreferene submit_action = {handlers.submit_answer_and_next_step} prv_answer={answer} question={question}/>
    case 'patient_video':
      return <VideoSelector 
              question = {question}
              flag_title = {question.flag_title}
              subscript_ref = {subscript_ref}
              title_ref = {title_ref}
              set_subcomp = {handlers.set_subcomp} 
              submit_text_action = {handlers.submit_answer_and_next_step}
              submit_video_action = {handlers.submit_and_upload_data}/>  
    default:
      return(
        <div>
        <div className='pb-5 d-flex flex-row justify-content-center'>
          <img alt="under construction" src='https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408060__340.png'/>
        </div>
        <div className='d-flex flex-row justify-content-center'>
          <input className ="col btn-confirm text-btn" type="button" onClick={handlers.next_step_handler.bind(this)} value="Next"/>
        </div>
      </div>)
   }
 }

