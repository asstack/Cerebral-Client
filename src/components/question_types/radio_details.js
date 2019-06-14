import React, {Component} from 'react';
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


class RadioDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      ref_id:this.props.ref_id,
      q_id:this.props.q_id, 
      yes_active:false,   
      no_active:false,   
      details:"", 
    }
  }
 
  componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id, q_id:next_props.q_id, yes_active:false,no_active:false, details:""})
    this.forceUpdate() 
  }

  shouldComponentUpdate=()=>{
    return false
  }

  set_option_handler = (option) => { 
    if(option === 'yes'){
      this.setState({yes_active:!this.state.yes_active, no_active:false, details:""})  
    }else{ 
      this.setState({no_active:!this.state.no_active, yes_active:false, details:""})  
    }
    this.props.submit_action(option, this.state.q_id)
    this.forceUpdate();
  } 

  update_text_handler = e => {
    this.setState({details:e.target.value}) 
    let ans=""
    if(this.state.yes_active){
      ans = "Yes, "+e.target.value 
    }else if(this.state.no_active){
      ans = "No, "+e.target.value 
    }
    this.props.submit_action(ans, this.props.q_id)
  }
  
  textarea_view = () => {
    return (
      <div className="d-flex flex-column patient-info-textarea">    
        <textarea placeholder="Please elaborate your answer" onChange={this.update_text_handler} className="form-control" rows="5" defaultValue={this.state.details}/>
      </div>
    )
  }

  render(){  
    return (
      <div key={uuidv1()} className="d-flex flex-column justify-content-start patient-info-items-holder">
       <div className="d-flex flex-row justify-content-between">
          <div className="d-flex align-content-start align-items-center patient-info-radio-item">
            <span>{this.props.question.title}</span>
          </div>
          <div className="d-flex flex-row justify-content-between radio-holder">
            <div className="d-flex flex-row">
              <input className ="checkbox-type-small" type="radio"  onClick={e => this.set_option_handler('yes') } checked={this.state.yes_active}/>
              <div className="d-flex align-items-start checkbox-small-text">
                Yes
              </div>
            </div>
            <div className="d-flex flex-row">
              <input className ="checkbox-type-small" type="radio" onClick={e => this.set_option_handler('no')} checked={this.state.no_active}/>
              <div className="d-flex align-items-start checkbox-small-text">
                No
              </div>
            </div>
          </div>
        </div>
        {(this.state.yes_active||(this.state.yes_active || this.state.no_active) &&this.state.q_id===3)?this.textarea_view():null}
      </div>
    );
  }
}

export default RadioDetails
