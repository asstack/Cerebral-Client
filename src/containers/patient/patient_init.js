import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { update_patient_questions, move_next_step } from '../../actions/patient_action'
import * as components from '../../components/question_components'

//patient/initial_step

class PatientInit extends Component{
  //in here, will call componentDidMount and route for [profile, assessment, treatment, verification and shipping]
  //route will state/number or state/ for init assessment
  constructor(props){
    super(props)
    this.state = {
      step: 0,
      title: ''
    }
  }

  componentDidMount(){
    var header = {'Content-Type': 'application/json'}
    const {update_patient_questions} = this.props
    axios.get("http://localhost:3000/api/question_banks/0/questions")
      .then(function(resp){
        update_patient_questions(resp.data, 0)
        console.log("resp: ", resp)
      }).catch(function(err){
        console.log("err", err)
      })


      axios.get("http://localhost:3000/api/question_banks")
        .then(function(resp){
          update_patient_questions(resp.data, 0)
          console.log("banktype checking: ", resp)
        }).catch(function(err){
          console.log("err", err)
        })
  }

  componentDidUpdate(){
    console.log("chk did update:", this.props.question_step)
  }

  next_step_handler=(e)=>{
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_selector_handler=(e)=>{
    console.log("set value check: ", e.target.value)
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_bank_selector_handler=(e)=>{
    console.log("set value check: ", e.target.value)
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  map_type_to_component = (questions, step) => {

    if(!questions[step]) {return <div> loading </div>}

    switch(questions[step].question_type) {
      case 'selector':
        return components.question_selector(this.set_selector_handler.bind(this), questions[step])
      case 'bank_selector':
        return components.question_selector(this.set_bank_selector_handler.bind(this), questions[step])
      default:
        return <input type="button" onClick={this.next_step_handler.bind(this)} value="Next"/>
    }

  }

  display_title = (questions, step) =>{
    if(questions[step]){
      return questions[step].title
    }
  }
  //Todo: update dynamic bounding by state
  //state global: patient local: profile/register profile/sign_in profile/questions
  render(){
    return(
      <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="p-2">
              <div className="btn-arrow link-type1">
              Cerebral
              </div>
            </div>
          </div>

          <div className="d-flex flex-column question-container">
            <div className="d-flex justify-content-center text-big">
              <p>{this.display_title(this.props.questions, this.props.question_step)}</p>
            </div>
              {this.map_type_to_component(this.props.questions, this.props.question_step)}
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const{
    global_reducer: {app_state, current_user},
    patient_reducer: {patient_state, step, question_bank_type, questions, branch_questions, branch_step, branch_option}
  } = state

  return {
    patient_state: patient_state,
    question_step: step,
    question_bank_type: question_bank_type,
    questions: questions,
    branch_questions: branch_questions,
    branch_step: branch_step,
    branch_option: branch_option
  }
}

export default withRouter(connect(mapStateToProps,{update_patient_questions, move_next_step}) (PatientInit))
