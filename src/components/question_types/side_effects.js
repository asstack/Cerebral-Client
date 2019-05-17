import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../question_components/components'
import { get_side_effects } from '../../actions/patient_action';

class SideEffects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isselected:'',
      selected_items:{},
      options: []
    }
  }

  componentDidMount = () => {
    this.props.get_side_effects(this.props.service_line.id).then((resp) => {
      // TODO: update global store with patient information
      console.log("get_side_effects resp: ", resp)
      this.setState({
        ...this.state,
        options: resp.data
      });
    })
  }

  //TODO: Save multiple values from selected boxes
  check_box_handler = (e,item) => {
    //update local state in here
    //this.setState({selected_item:item})
  }

  submit_btn_handler = () => {
    //call action from parents with this.state.selected 
    this.props.submit_action()
  }
  
  //{(e) => this.check_box_handler(e,item.option_name)}
  map_data_to_checkbox = item => {
    return(
      <div className="input-group mb-3" key={uuidv1()}>
        <div className="input-group-prepend">
          <div className="input-group-text group-checkbox">
            <input type="checkbox" name={item.name}/>
          </div>
        </div>
        <div className="d-flex justify-content-center form-control group-checkbox-text">
          <p className="text-small">{item.title}</p>
        </div>
      </div>
      )
    }

  render(){
    return (
      <div>    
        {
          this.state.options.map((item, index) => (this.map_data_to_checkbox(item)))
        }
        <div className="d-flex flex-row justify-content-center">
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm")}  
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

	return {
    service_line: state.patient_reducer.service_line
	}
}

export default connect(mapStateToProps, {get_side_effects}) (SideEffects)