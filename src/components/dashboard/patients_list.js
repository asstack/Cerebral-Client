import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class PatientsList extends Component {

  constructor(props){
    super(props) 
    this.state = {
    }
  }

  view= () => (
    <div className="main-content-wide-card">
      <div className="patients-list-item-container-nb">
        <div className="d-flex flex-row justify-content-between search-bar-holder">
          <input type="text" placeholder="Search patient list"/>
          <div className="d-flex align-items-center">
            <img className="search-img" src={process.env.PUBLIC_URL + '/img/search.png'}/>
          </div>
        </div>
      </div> 
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-start table-item-head">
          <div className="d-flex justify-content-center align-items-center table-item-col-1">c</div>
          <div className="d-flex justify-content-center align-items-center table-item-col-2">Name</div>
          <div className="d-flex justify-content-start align-items-center table-item-col-3">Referred for</div> 
          <div className="d-flex justify-content-start align-items-center table-item-col-4">Prescription status</div>
          <div className="d-flex justify-content-center align-items-center table-item-col-5"></div>
        </div> 
      </div>
    </div> 
  )
  

  render(){
    return this.view() 
  }


}


export default PatientsList
