import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


//this container is designed for one question bank. 
export const questions_wrapper = (WrappedComponent, question, p_props) => {
  return class extends Component{
    constructor(props){
      super(props)
      this.state = {
        question:question,
      }
    } 
    
    render(){ 
      const question = this.state.question 
      return(
        <div className="d-flex flex-column main-noprogress">
          <div className="description_noprogress">
            <h1>{question?question.title:null}</h1>
            {(question && question.description)?<div className="d-flex justify-content-left text_description"> {question.description}</div>:null} 
          </div>
          {WrappedComponent}
       </div> 
      );
    } 
  }
}

