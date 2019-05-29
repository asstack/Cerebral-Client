import React, {Component} from 'react';
import uuidv1 from 'uuid'
import * as components from '../question_components/components'

class CustomSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      ref_id:this.props.ref_id,
      p_id:this.props.p_id, 
      active:false, 
      items:this.props.items,
      selected:"",
      option_index:null
    }
  }

  activate_options_handler = () => {
    this.setState({active:!this.state.active}) 
  }


  componentWillReceiveProps = (next_props) => { 
    this.setState({ref_id:next_props.ref_id, p_id:next_props.p_id, active:false, items:next_props.items, selected:"", option_index:null})}


  
  update_selected_item = (item, index) => {
    this.setState({selected:item, option_index:index})
    //this.props.submit_action(item, this.props.q_index)  
  }
  
  select_option = (item, index) => {
    const style = index === this.state.option_index? "option-selected":"option-not-selected" 
    return(
      <div className={"d-flex justify-content-center align-items-center "+style} onClick={e => this.update_selected_item(item.title, index)}>{item.title}</div>      
    )  
  }
  
  select_option_view = () => {
    if(this.state.active){
      return (
        <div className="d-flex flex-column custom-options-holder">   
          {this.props.question.options.map((item, index) => this.select_option(item, index))}
        </div>
      )
    }else return null
  }

  render(){  
    return (
      <div key={uuidv1()} className="d-flex flex-column justify-content-start patient-info-items-holder">
        <div className="d-flex justify-content-center align-items-center custom-selector" onClick = {e=>this.activate_options_handler()}>
          {this.state.selected?this.state.selected:this.props.question.title}
        </div>
        {this.select_option_view()}
      </div>
    );
  }
}

export default CustomSelector
