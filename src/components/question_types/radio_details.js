import React, {Component} from 'react';
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


class RadioDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      ref_id:this.props.ref_id,
      q_id:this.props.q_id, 
      active:false,   
      details:"", 
    }
  }
 
  componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id, q_id:next_props.q_id, active:false, details:""})
    this.forceUpdate() 
  }

  shouldComponentUpdate=()=>{
    return false
  }

  set_option_handler = option => { 
    this.setState({active:option}) 
    const ans = option?"NO":"YES"
    if(this.state.details) ans=ans+", "+this.state.details 
    this.props.submit_action(ans, this.state.q_id)

    this.forceUpdate();
  } 

  update_text_handler = e => {
    this.setState({details:e.target.value}) 
    const ans = (this.state.active?"YES, ":"NO, ")+e.target.value
    this.props.submit_action(ans, this.props.q_id)
  }
  
  textarea_view = () => {
    return (
      <div className="d-flex flex-column patient-info-textarea">    
        <textarea onChange={this.update_text_handler} className="form-control" rows="5" defaultValue={this.state.details}/>
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
              <input className ="checkbox-type-small" type="radio"  onChange={e => this.set_option_handler(true) } checked={this.state.active}/>
              <div className="d-flex align-items-start checkbox-small-text">
                Yes
              </div>
            </div>
            <div className="d-flex flex-row">
              <input className ="checkbox-type-small" type="radio" onChange={e => this.set_option_handler(false)} checked={!this.state.active}/>
              <div className="d-flex align-items-start checkbox-small-text" checked={!this.state.active}>
                No
              </div>
            </div>
          </div>
        </div>
        {(this.state.active||this.state.q_id===3)?this.textarea_view():null}
      </div>
    );
  }
}

export default RadioDetails
