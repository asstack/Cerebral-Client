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
          title: `${this.capitalize(med_pref_resp.name)} ${dosage.dosage} milligrams`,
          image: `/img/${med_pref_resp.service_line.name}/blue/${med_pref_resp.name}.png`,
          recommended_image: `/img/${med_pref_resp.service_line.name}/purple/${med_pref_resp.name}.png` }
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
    if (!selected_dosage) {
      selected_dosage = this.state.options[0]
    }
    this.props.set_dosage(selected_dosage)
    this.props.submit_action(selected_dosage.name)
  }

  draw_checkbox_description = (item, is_recommended) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      <div className='text-recommendation' 
        style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', width: '200px'}}>Our Recommendation</div>
      <div className='text-left' style={{position: 'relative', left: '10%', top: '15%', fontWeight: 'bold'}}>{item.title}</div>
      
      <div className='text-left' style={{position: 'relative', left: '10%', top: '25%'}}>Dosage</div>
      <div className='text-small text-left' style={{position: 'relative', left: '10%', top: '27%'}}>{item.dosage} milligrams</div>

      <div className='text-left'style={{position: 'relative', left: '10%', top: '35%'}}>Price</div>
      <div className='text-small text-left'style={{position: 'relative', left: '10%', top: '37%'}}>${item.price} per 30 days</div>
      </div>
  )
  }

  get_image_for_item = (item, is_recommended) => {
    let color = is_recommended ? 'purple' : 'blue'
    return is_recommended ? item.recommended_image : item.image
  }
}

export default connect(null, {...prop_methods, get_treatment_dosages, get_current_answer_by_name, get_treatment_by_name, set_dosage}) (DosagePreference)
