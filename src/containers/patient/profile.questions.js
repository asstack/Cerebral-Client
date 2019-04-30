import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionsComponent extends Component {

    constructor(props){
      super(props)
    }

    componentDidMount(){
      //api call to get questions
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
