import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { update_patient_questions } from '../../actions/patient_action'


class QuestionsComponent extends Component {

    constructor(props){
      super(props)

    }

    componentDidMount(){
      //api call to get questions
      var header = {'Content-Type': 'application/json'}
      const {update_patient_questions} = this.props
      axios.get("http://localhost:3000/api/question_banks/0/questions")
        .then(function(resp){
          update_patient_questions(resp.data,0)
          console.log("resp: ", resp)
        }).catch(function(err){
          console.log("err", err)
        })
    }

    //TODO: implement middleware to call api. action function must be plain object

    render(){
      return (
        <div className="patinet_questions">
          <p> components for profile questions </p>
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
    step: step,
    question_bank_type: question_bank_type,
    questions: questions,
    branch_questions: branch_questions,
    branch_step: branch_step,
    branch_option: branch_option
  }
}


export default connect(mapStateToProps,{update_patient_questions}) (QuestionsComponent)
