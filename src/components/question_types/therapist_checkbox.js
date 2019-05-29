import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';

class TherapistCheckbox extends Component{

  constructor(props){
    super(props)
    this.state={
      ref_id:this.props.ref_id,
      p_id:this.props.p_id,
      index:null,
      value:null
    }
  
  }


 componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id, p_id:next_props.p_id, index:null, value:null})}


  update_info_handler = (index, value) =>{ 
    if(index!== this.state.index){
      this.setState({index:index, value:value})
      this.props.submit_action(this.state.value, this.state.p_id) 
    }
  }
  


  checkbox_view = (val, index) => {
    return(
      <div className="d-flex flex-row checkbox-vertical-holder">
        <input className ="checkbox-type-small" type="checkbox" checked={index===this.state.index}
          onChange={e => this.update_info_handler(index, val.name)}/>
        <div className="d-flex align-items-start checkbox-small-text">
          {val.title}
        </div>
      </div>    
    )  
  }

  render(){
    return(
       <div key={uuidv1()} className="d-flex flex-row justify-content-start patient-info-items-holder">
          <div className="d-flex align-content-start align-items-start patient-info-left-item">
            <span>{this.props.question.title}</span>
          </div>
          <div className="d-flex flex-column patient-info-text-item"> 
            {this.props.question.options.map((val, index) => (this.checkbox_view(val,index)))} 
          </div>
        </div>
    ) 
  }
}

export default TherapistCheckbox

