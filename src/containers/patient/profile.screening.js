import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

class QuestionsComponent extends Component {

    constructor(props){
      super(props)
    }

    componentDidMount(){
      //api call to get questions
      var header = {'Content-Type': 'application/json'}
      axios.get("http://localhost:3000/api/question_banks/1/questions")
        .then(function(resp){
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


export default QuestionsComponent
