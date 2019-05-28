import React, {Component} from 'react';
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


class CustomSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      active:false, 
      items:this.props.items,
      selected:"",
      option_index:null
    }
  }

  activate_options_handler = () => {
    this.setState({active:!this.state.active}) 
  }
  
  update_selected_item = (item, index) => {
    this.setState({selected:item, option_index:index})
    //this.props.update_answer(item, this.props.q_index)  
  }
  
  select_option = (item, index) => {
    const style = index === this.state.option_index? "option-selected":"option-not-selected" 
    return(
      <div className={"d-flex justify-content-center align-items-center option-not-selected"+style} onClick={e => this.update_selected_item(item, index)}>item</div>      
    )  
  }
  
  select_option_view = (items) => {
    if(this.state.active){
      return (
        <div className="d-flex flex-column custom-options-holder">   
          {items.map((item, index) => this.select_option(item, index))}
        </div>
      )
    }else return null
  }

  render(){  
    return (
      <div key={uuidv1()} className="d-flex flex-column justify-content-start patient-info-items-holder">
        <div className="d-flex justify-content-center align-items-center custom-selector" onClick = {e=>this.activate_options_handler()}>
          {this.state.selected?this.state.selected:"*How long has the patient been in your care?"}
        </div>
        {this.state.items?this.select_option_view(this.state.items):null}
      </div>
    );
  }
}

export default CustomSelector
