import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


//this container is designed for one question bank. 
export const questions_wrapper = (WrappedComponent, questions, props) => {
  return class extends Component{
    constructor(props){
      super(props)
      this.state = {
        step:props.question_step, 
        questions:questions,
        bank_name:props.bank_name
      }
    }
    
    componentDidUpdate(){
      if(this.state.step!=this.props.question_step){
        this.setState({step:this.props.question_step}) 
      }     
      if(this.state.bank_name!=this.props.bank_name){
          this.setSate({bank_name:this.props.bank_name,
                        questions:this.props.questions})
      }
    }
 
    render(){ 
      const question = this.state.questions[this.state.step]  
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

