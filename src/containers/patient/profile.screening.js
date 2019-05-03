import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { update_patient_questions, move_next_step } from '../../actions/patient_action'
import * as components from '../../components/question_components/components'
import {selector} from '../../components/question_types/selector'
import CreateProfile from '../../components/question_types/create_profile'


class QuestionsComponent extends Component {

    constructor(props){
      super(props)

    }

    componentDidMount(){
      //api call to get questions
      var header = {'Content-Type': 'application/json'}
      const {update_patient_questions} = this.props
      axios.get("/api/question_banks/3/questions")
        .then(function(resp){
          update_patient_questions(resp.data,0)
          console.log("resp: ", resp)
        }).catch(function(err){
          console.log("err", err)
        })
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

    display_title = (questions, step) =>{
      if(questions[step]){
        return questions[step].title
      }
    }

    render(){
      return (
        <div className="patinet_questions">
          <p> {this.display_title(this.props.questions, this.props.question_step)} </p>
          {this.map_type_to_component(this.props.questions, this.props.question_step)}
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const{
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


export default connect(mapStateToProps,{update_patient_questions, move_next_step}) (QuestionsComponent)
