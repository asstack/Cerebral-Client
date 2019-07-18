import React from 'react'
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
    const current_dosage = this.props.answers['current_dosage']?JSON.parse(this.props.answers['current_dosage']):null
    const medications = this.props.answers['medication_preference']?JSON.parse(this.props.answers['medication_preference']):null
    
    get_current_answer_by_name('medication_preference').then((resp) => {
      let med_data = JSON.parse(resp.response) 
      if (!med_data.name) {
        this.props.set_dosage({name: null, id: 0, dosage: null})
      }
      else {
        let parsed_resp = JSON.parse(resp.response)
        get_treatment_by_name(parsed_resp.name).then((med_pref_resp) => {
          let rec = []
          let list =[]
          med_pref_resp.dosages.forEach(dosage => {
            //{answer: "mg20", medication: "escitalopram", with_brand: "Escitalopram (Lexapro)"}
            let item = { 
              ...dosage,
              title: `${this.capitalize(med_pref_resp.name)} ${dosage.dosage} milligrams`,
              image: `/img/${med_pref_resp.service_line.name}/blue/${med_pref_resp.name}.png`,
              recommended_image: `/img/${med_pref_resp.service_line.name}/purple/${med_pref_resp.name}.png`
            }

            if(current_dosage && med_pref_resp.name === current_dosage.medication && dosage.name === current_dosage.answer){
              rec.push(item)
            }else{
              list.push(item)
            }
          })

          let label="";
          if(rec.length===0){
            rec.push(list[0]);
            list = list.splice(1)
            label = "Most common selection for new patients"
          }else{
            label = "Because you've taken this before"
          }
 
          const prv_answer = this.props.prv_answer?JSON.parse(this.props.prv_answer):null
          let prv_idx=null
          if(prv_answer && prv_answer.name===null){
            prv_idx=rec.length+list.length
          }else if(prv_answer && rec[0].name === prv_answer.name){
            prv_idx=0;
          }else if(prv_answer){
            list.forEach((item,idx)=>{
              if(item.name === prv_answer.name){
                prv_idx = idx+rec.length
              }
            })
          }

          this.setState({
            ...this.state,
            is_ready:true,
            recommendation:rec,
            rec_label:label,
            selected_index:prv_idx,
            list:list,
            options: [],
          });
      })
    }
    })
  }

  submit_btn_handler = e => {
    let selected_dosage = null;

    if(this.state.recommendation.length===0){
      selected_dosage = this.state.list[this.state.selected_index]
    }else{
      selected_dosage = this.state.selected_index===0?this.state.recommendation[0]:this.state.list[this.state.selected_index-1]
    }

    //TODO: not sure why it is null and id=0. I think there is no id=0 
    if (!selected_dosage) {
      selected_dosage = {name: null, id: 0, dosage: null}
    }
    this.props.set_dosage(selected_dosage) 
    this.props.submit_action(JSON.stringify(selected_dosage), this.props.question)
  }

  draw_checkbox_description = (item, is_recommended) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      <div className='text-recommendation' 
        style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', display: 'table', height: '42px', 
          paddingTop:'10px', paddingLeft:'10px', paddingRight:'10px'}}>{this.state.rec_label||'Our Recommendation'}</div>
      <div className='text-left' style={{position: 'relative', left: '10%', top: '15%', fontWeight: 'bold'}}>{item.title}</div>
      
      <div className='text-left' style={{position: 'relative', left: '10%', top: '25%'}}>Dosage</div>
      <div className='text-small text-left' style={{position: 'relative', left: '10%', top: '27%', color:'#444444'}}>{item.dosage} milligrams</div>

      <div className='text-left' style={{position: 'relative', left: '10%', top: '35%'}}>Price</div>
      <div className='text-small text-left' style={{position: 'relative', left: '10%', top: '37%', color:'#444444'}}>$45 per 30 days</div>
      </div>
    )
  }

  get_image_for_item = (item, is_recommended) => {
    return is_recommended ? item.recommended_image : item.image
  }
}

export default connect(null, {...prop_methods, get_treatment_dosages, get_current_answer_by_name, get_treatment_by_name, set_dosage}) (DosagePreference)
