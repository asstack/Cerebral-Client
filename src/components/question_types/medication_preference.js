import React, {Component} from 'react'
import {QuestionPreference, prop_methods} from './question_preference'
import { connect } from 'react-redux'
import { get_treatments, set_treatment } from '../../actions/patient_action'


class MedicationPreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {

    // TODO: get the selected medication so we can load dosages

    this.props.get_treatments(this.props.service_line.id).then((resp) => {
      console.log("get_treatments resp: ", resp)
      this.setState({
        ...this.state,
        options: resp
      });
    })
  }

  submit_btn_handler = e => {
    var selected_treatment = this.state.options[this.state.selected_index]

     
    if (!selected_treatment) {
      selected_treatment = {name: null, id: 0}
    }

    this.props.set_treatment(selected_treatment)
    this.props.submit_action(selected_treatment.name)
  }

  get_image_for_item = (item, is_recommended) => {
    let color = is_recommended ? 'purple' : 'blue'
    return `/img/${item.service_line.name}/${color}/${item.name}.png`
  }

  draw_checkbox_description = (item, is_recommended) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      <div className='text-recommendation' 
        style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', width: '245px', height:'42px', paddingTop:'10px', fontSize:'20px'}}>Our Recommendation</div>
      <div className='text-left' style={{position: 'relative', left: '10%', top: '15%', fontWeight: 'bold', fontSize: '18px'}}>{this.capitalize(item.name+" ("+item.brand_name+")")}</div>
      
      <div className='text-left' style={{position: 'relative', left: '10%', top: '25%'}}>Used To Treat</div>
      <div className='text-small text-left' style={{position: 'relative', left: '10%', top: '27%', fontWeight:'500', color:'#444444'}}>{item.service_line.title}</div>

      <div className='text-left' style={{position: 'relative', left: '10%', top: '35%'}}>Possible side effects could include:</div>
      <div className='text-small text-left' style={{position: 'relative', left: '10%', top: '37%', fontWeight:'500', color:'#444444'}}>{item.side_effects.map(e => e.title).join(", ")}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

	return {
    service_line: state.patient_reducer.service_line
	}
}

export default connect(mapStateToProps, {...prop_methods, get_treatments, set_treatment}) (MedicationPreference)
