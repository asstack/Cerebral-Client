import React, {Component} from 'react';
import uuidv1 from 'uuid'


//TODO: required indicator is hardcoded. we need to add an option in question
class CustomSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      ref_id:this.props.ref_id,
      q_id:this.props.q_id, 
      active:false, 
      items:this.props.items,
      selected:"Duration",
      option_index:0
    }
  }

  activate_options_handler = () => {
    this.setState({active:!this.state.active}) 
  }

  componentDidMount = () => {
  }

  componentWillReceiveProps = (next_props) => { 
   
    this.setState({ref_id:next_props.ref_id, q_id:next_props.q_id, active:false, items:next_props.items, selected:"Duration", option_index:0})}

  
  update_selected_item = (item, index) => {
    this.setState({selected:item, option_index:index, active:false})
    this.props.submit_action(item, this.state.q_id)  
  }
  
  select_option = (item, index) => {
    const style = index === this.state.option_index? "option-selected":"option-not-selected" 
    return(
      <div key={uuidv1()} className={"d-flex justify-content-center align-items-center "+style} onClick={e => this.update_selected_item(item.title, index)}>{item.title}</div>      
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
  //this.props.question.title
  render(){  
    return (
      <div key={uuidv1()} className="d-flex flex-column justify-content-start patient-info-items-selector-holder">
          <div className="d-flex align-content-start align-items-center patient-info-select-item">
            <span>{"*" + this.props.question.title}</span>
          </div> 
        <div className="d-flex justify-content-between align-items-center custom-selector" onClick = {e=>this.activate_options_handler()}>
          <div className="custom-selector-side"></div>
          <div>{this.state.selected}</div>
          <div className="custom-selector-side"><img alt="dropdown and select duration" src={process.env.PUBLIC_URL + '/img/dropdown_icon.png'} /></div>
        </div>
        {this.select_option_view()}
      </div>
    );
  }
}

export default CustomSelector
