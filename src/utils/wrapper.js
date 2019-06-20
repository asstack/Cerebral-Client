import React, {Component} from 'react'


//this container is designed for one question bank. 
export const questions_wrapper = (WrappedComponent, question, p_props, subscript_ref, title_ref) => {
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
            {(question && question.description)?<div className="d-flex justify-content-left text_description"> {question.description}</div>:null} 
            <h1 ref={title_ref}>{question?question.title:null}</h1>
            {(question && question.subscript)?<div ref={subscript_ref}className="d-flex justify-content-left text-subscript"> {question.subscript}</div>:null} 
          </div>
          {WrappedComponent} 
       </div> 
      );
    } 
  }
}

