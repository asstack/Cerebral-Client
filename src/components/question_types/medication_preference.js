import React from 'react'
import {QuestionPreference, prop_methods} from './question_preference'
import { connect } from 'react-redux'
import { get_treatments, set_treatment } from '../../actions/patient_action'


class MedicationPreference extends QuestionPreference {

  componentDidMount = () => {

    // TODO: get the selected medication so we can load dosages

    this.props.get_treatments(this.props.service_line.id).then((resp) => {

      const dosage = this.props.answers['current_dosage']?JSON.parse(this.props.answers['current_dosage']):null
      const prev_med = this.props.service_line.name === "ins"? this.props.answers['ins_hh_med']:this.props.answers['anx_hh_med']  
      const prev_med_name = prev_med? JSON.parse(prev_med).name[0].split(" ")[0].toLowerCase():null
      const side_effects = this.props.answers['side_effects']?JSON.parse(this.props.answers['side_effects']):null
      const same_med = this.props.answers['same_med']?JSON.parse(this.props.answers['same_med']):{answer: "no"};

      let {recommendation, label} = this.props.service_line.name==="ins"
        ?this.get_ins_recommendation(resp, dosage, prev_med_name, side_effects, same_med)
        :this.get_dep_recommendation(resp, dosage,prev_med_name, side_effects, same_med);

      let list = recommendation.length===0?resp:resp.filter(item=>{return item.name!=recommendation[0].name}) 
      
      const prv_answer = this.props.prv_answer?JSON.parse(this.props.prv_answer):null
      let prv_idx=null
      if(prv_answer && prv_answer.name===null){
        prv_idx = recommendation.length + list.length
      }else if(prv_answer &&  recommendation[0].name === prv_answer.name){
        prv_idx=0;
      }else if(prv_answer){
        list.forEach((item, idx) => {
          if(item.name === prv_answer.name){
            prv_idx=idx+recommendation.length
          }
        })
      }
      this.setState({
        ...this.state,
        options: resp,
        list:list,
        selected_index:prv_idx,
        recommendation:recommendation,
        rec_label:label,
        is_ready:true
      });
    })
  }

  get_ins_recommendation = (items, dosage, prev_med_name, side_effects, same_med) => {
    let recommendation = []
    let cand1=null
    let cand2=null
    let label=""

    //it is only for depression and anxiety, so we need to make this as a function for insomnia
    items.forEach(item => {   
      if(dosage && item.name===dosage.medication && dosage.medication===prev_med_name && same_med.answer==="yes") recommendation.push(item)
      if(item.name==="mirtazapine") cand1=item
      if(item.name==="trazodone") cand2=item
    })

    if(recommendation.length == 0){
      //side effects checking
      if(side_effects.name.includes('weight')){
        if(cand2.name!==prev_med_name){
          label="Most common selection based on side effect concerns"
          recommendation.push(cand2)
        }
      }else{
        if(cand1.name!==prev_med_name){ 
          label="Most common selection for new patients"
          recommendation.push(cand1)
        }
      }
    }else{
      label="Because you've taken this before"
    }
    return {recommendation, label}
  }
  

  get_dep_recommendation = (items, dosage, prev_med_name, side_effects, same_med) => {
    let recommendation = []
    let cand1=null
    let cand2=null
    let label = ""
    //it is only for depression and anxiety, so we need to make this as a function for insomnia
    items.forEach(item => {   
      if(dosage && item.name===dosage.medication && dosage.medication===prev_med_name && same_med.answer==="yes") recommendation.push(item)
      if(item.name==="sertraline") cand1=item
      if(item.name==="bupropion") cand2=item
    })

    if(recommendation.length == 0){
      //side effects checking
      if(side_effects.name.includes('weight') || side_effects.name.includes('sexual')){
        if(cand2.name!==prev_med_name){
          recommendation.push(cand2)
          label="Most common selection based on side effect concerns"
        }
      }else{
        if(cand1.name!==prev_med_name){ 
          recommendation.push(cand1)
          label="Most common selection for new patients"
        }
      }
    }else{
      label="Because you've taken this before"
    }
    return {recommendation, label}
  }

  submit_btn_handler = e => {
    let selected_treatment = null
    if(this.state.recommendation===0){ 
      selected_treatment = this.state.list[this.state.selected_index]
    }else{
      selected_treatment = this.state.selected_index==0?this.state.recommendation[0]:this.state.list[this.state.selected_index-1];
    }
 
    if (!selected_treatment) {
      selected_treatment = {brand_name:null, name: null, id: 0}
    }

    let obj = {name:selected_treatment.name, brand_name:selected_treatment.brand_name}
    this.props.set_treatment(selected_treatment) 
    console.log("medication:", obj)
    this.props.submit_action(JSON.stringify(obj), this.props.question)
  }

  get_image_for_item = (item, is_recommended) => {
    let color = is_recommended ? 'purple' : 'blue'
    return `/img/${item.service_line.name}/${color}/${item.name}.png`
  }

  draw_checkbox_description = (item, is_recommended) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      <div className='text-recommendation' 
        style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', display: 'table',paddingLeft:'10px',paddingRight:'10px', height:'42px', paddingTop:'10px', fontSize:'16px'}}>{this.state.rec_label||"Our Recommendation"}</div>
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
