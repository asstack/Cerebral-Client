import React, {Component} from 'react';
import { connect } from 'react-redux'
import uuidv1 from 'uuid'

class Assessment extends Component {

  constructor(props){
    super(props)
    this.state={
    
    }
  }
  
  componentDidMount = () => {
    
  }

  default_view = () => {
    let history = this.state.history.slice(1)
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
          <div> Assessment Results</div>
          <div className="d-flex justify-content-end text-main-title"> </div>
        </div>
        <div className="d-flex flex-column main-content-row">
          "here assessment"
        </div>
      </div> 
    ) 
  }




  render(){
  
  }


}


