import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { update_patient_questions, move_next_step } from '../../actions/patient_action'
import * as components from '../../components/question_components/components'
import {selector} from '../../components/question_types/selector'
import CreateProfile from '../../components/question_types/create_profile'


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
    axios.get("/api/question_banks/0/questions")
      .then(function(resp){
        update_patient_questions(resp.data, 0)
        console.log("resp: ", resp)
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

  create_profile_handler = (e) => {
    e.preventDefault()
    const {first_name, last_name, email, password, password_confirm} = this.state
    const {sign_in, set_profile_question}=this.props
    var header = {'Content-Type': 'application/json'}
    if(first_name && last_name && email && (password && password_confirm)){
      axios.post("/api/users",
        {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirm}, header)
        .then(function(resp){
          var attr = {attributes: { id: resp.data.id,
                                    uid:resp.data.uid,
                                    email:resp.data.email,
                                    first_name:resp.data.first_name,
                                    last_name:resp.data.last_name
                                  }}
          //TODO: NEVER use the dispatches like here. will move to action with err handling
          sign_in(attr)
        }).catch(function(err){
          console.log("err", err)
        })
    }
  }

  display_title = (questions, step) =>{
    if(questions[step]){
      return questions[step].title
    }
  }

  map_type_to_component = (questions, step) => {
//<Route path="/greeting/:name" render={(props) => <Greeting text="Hello, " {...props} />} />
    if(!questions[step]) {return <div> loading </div>}
    switch(questions[step].question_type) {
      case 'selector':
        return selector(this.set_selector_handler.bind(this), questions[step])
      case 'create_profile':
        return <Route path='' render={(props) =>
            <CreateProfile
              next_step_handler = {this.next_step_handler}
              create_profile_handler={this.create_profile_handler} />} />
      case 'bank_selector':
        return selector(this.set_bank_selector_handler.bind(this), questions[step])
      default:
        return( 
          <div>
          <div className='d-flex flex-row justify-content-center'>
            <img src='https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408060__340.png'/>
            </div>
          <div className='d-flex flex-row justify-content-center'>
            <input type="button" onClick={this.next_step_handler.bind(this)} value="Next"/>
          </div>
        </div>
        )
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
