import * as patient_action_types from '../actions/patient_action'
import { handleActions } from 'redux-actions'

export const init_patient_state = {
  
  service_line: '',
  patient_state: '',

  // this is a cache of all of the question bank information, used so we can draw the correct
  // title for the question bank at the top of screen
  question_bank_objects: null,

  // all of the question_bank names for the current user
  question_banks: [],
  // which question bank the user is currently looking at 
  question_banks_step: 0,
  
  // equal to questions_banks[question_bank_step].id
  question_bank_id: '',

  // question bank name that for current questions
  current_bank_name:'',

  // questions from current question_bank_id
  questions: '',
  step:0,
  total_step:1,
  
  // branch question
  branch_questions:[],
  branch_question_bank:'',
  branch_question_step:0,
  branch_question_active:false,

  is_complete: false,
  // contains a copy of patient/visit information from the database
  patient_object: null,
  visit_object: null,
  treatment_object: null,
  dosage_object: null,
	is_valid_state: false
}

export const patient_reducer = handleActions({
  [patient_action_types.SET_BRANCH_QUESTION_ACTIVE]: (state, action) => {
    return{
      ...state,
      branch_question_active : action.is_active,
    }
  }, 
  [patient_action_types.SET_BRANCH_QUESTION_STEP]: (state, action) => {
    return{
      ...state,
      branch_question_step : action.step,
    }
  }, 
  [patient_action_types.SET_STEP]: (state, action) => {
    return{
      ...state,
      step : action.step,
      is_complete: action.is_complete
    }
  },
  [patient_action_types.SET_BRANCH_QUESTION]:(state, action) => {
    return{
      ...state,
      branch_questions:action.questions,
      branch_question_bank:action.bank_name,
      branch_question_step:0,
      branch_question_active:true,
    }
  },
  [patient_action_types.RESET_QUESTIONS_AND_VISIT]: (state, action) => {
    return{
      ...state,
      questions : '',
      step:0,
      question_banks:[],
      question_banks_step:0,
      current_bank_name:'',
      visit_object: null, 
      treatment_object: null,
      dosage_object: null,
    }
  }, 
  [patient_action_types.SET_PATIENT]: (state, action) => {
    return{
      ...state,
      patient_object: action.patient_object
    }
  },
  [patient_action_types.SET_VISIT]: (state, action) => {
    return{
      ...state,
      visit_object: action.visit_object
    } 
  },
  [patient_action_types.SET_TREATMENT]: (state, action) => {
    return{
      ...state,
      treatment_object: action.treatment_object
    } 
  },
  [patient_action_types.SET_DOSAGE]: (state, action) => {
    return{
      ...state,
      dosage_object: action.dosage_object
    } 
  },
  [patient_action_types.SET_STATE_WITH_STEP]:(state, action) => {
    return{
      ...state,
      step : action.new_step,
      patient_state : action.new_state
    }
  },
  [patient_action_types.SET_PATIENT_QUESTIONS]:(state, action) => {
    return{
      ...state,
      step:action.q_id,
      question_bank_id : action.bank_id,
      current_bank_name : action.bank_name,
      questions : action.questions,
      total_step : action.total_step,
      question_banks_step : action.bank_step
    }
  },
  [patient_action_types.SET_QUESTION_BANKS]: (state, action) => {
    return{
      ...state,
      question_banks : action.question_banks,
      question_banks_step : action.question_banks_step,
      question_bank_objects: action.question_bank_objects,
      step:0
    }
  },
  [patient_action_types.SET_QUESTION_BANKS_STEP]: (state, action) => {
    return{
      ...state,
      question_banks_step : action.question_banks_step
    }
  },
	[patient_action_types.SET_SERVICE_LINE]: (state, action) => {
    return{
      ...state,
      service_line : action.service_line
    }
  },
  [patient_action_types.REMOVE_PATIENT_QUESTIONS]: (state, action) => {
    return{
      ...state,
      questions: null,
      total_step:1,
      step: 0
    }
  },
  [patient_action_types.REMOVE_PATIENT_QUESTION_BANKS]: (state, action) => {
    return{
      ...state,
      question_banks: []
    }
  },
  [patient_action_types.SET_PATIENT_STATE]:(state, action) => {
    return{
      ...state,
      patient_state:action.patient_state
    }
  },
}, init_patient_state)


