import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'

class CheckBoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isselected:'',
      selected_item:''
    }
  }

  //TODO: Save multiple values from selected boxes
  check_box_handler = (e,item) => {
    //update local state in here
    this.setState({selected_item:item})
  }

  submit_handler = () => {
    //call action from parents with this.state.selected 
    if(this.state.selected_item){
      this.submit_action(this.state.selected_item)
    }
  }
  
  map_data_to_checkbox = item => {
    return(
      <div className="input-group mb-3" key={uuidv1()}>
        <div className="input-group-prepend">
          <div className="input-group-text group-checkbox">
            <input type="checkbox" onClick={(e) => this.check_box_handler(e,item)}/>
          </div>
        </div>
        <div className="d-flex justify-content-center form-control group-checkbox-text">
          <p className="text-small">{item}</p>
        </div>
      </div>
      )
    }

  render(){
    return (
      <div>
        {this.props.items.map((item, index) => (this.map_data_to_checkbox(item)))}
        {components.btn_selector(this.props.confirm_btn_handler, "Confirm")}  
      </div>
    )
  }
}

export default CheckBoxComponent
