import React, {Component} from 'react'
import { connect } from 'react-redux'
import {QuestionPreference, prop_methods} from './question_preference'
import { get_treatment_dosages, get_current_answer_by_name, get_treatment_by_name, set_dosage } from '../../actions/patient_action'

class DosagePreference extends QuestionPreference {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      selected_index: null
    }
  }

  componentDidMount = () => {

    const {get_current_answer_by_name, get_treatment_by_name} = this.props

    get_current_answer_by_name('medication_preference').then((resp) => {
      get_treatment_by_name(resp.response).then((med_pref_resp) => {
        // TODO: update global store with patient information
        console.log("get_treatment_dosages resp: ", med_pref_resp)

        var dosages_with_title = med_pref_resp.dosages.map((dosage) => {
          return{
            ...dosage,
          title: `${med_pref_resp.name} ${dosage.dosage}mg`}
        })

        this.setState({
          ...this.state,
          options: dosages_with_title
        });
    })
    })
  }

  submit_btn_handler = e => {
    var selected_dosage = this.state.options[this.state.selected_index]
    //call action from parents with this.state.selected 
    this.props.set_dosage(selected_dosage)
    this.props.submit_action(selected_dosage.name)
  }

  draw_checkbox_description = (item, is_recommended) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      <div className='text-recommendation' 
        style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', width: '200px'}}>Our Recommendation</div>
      <div className='text-middle' style={{position: 'relative', left: '10%', top: '15%', fontWeight: 'bold'}}>{item.title}</div>
      
      <div className='text-middle' style={{position: 'relative', left: '10%', top: '25%'}}>Blah</div>
      <div className='text-small' style={{position: 'relative', left: '10%', top: '27%'}}>Blah blah blah</div>

      <div className='text-middle'style={{position: 'relative', left: '10%', top: '35%'}}>Shah</div>
      <div className='text-small'style={{position: 'relative', left: '10%', top: '37%'}}>Shah</div>
      </div>
  )
  }

  get_image_for_item = (item, is_recommended) => {
    let color = is_recommended ? 'purple' : 'blue'
    return `/img/dep_anx/${color}/${item.name}.png`
  }
}

export default connect(null, {...prop_methods, get_treatment_dosages, get_current_answer_by_name, get_treatment_by_name, set_dosage}) (DosagePreference)