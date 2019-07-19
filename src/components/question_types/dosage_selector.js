import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import { connect } from 'react-redux'
import * as components from '../question_components/components'
import { get_treatment_dosages, get_current_answer_by_name, get_treatment_by_name, set_dosage } from '../../actions/patient_action'
class DosageSelector extends Component {
	constructor(props){
		super(props)
		this.state = {
      dosages:[],
      current_dosage:"",
      med_name:"",
      med_brand:"",
      is_ready:false
		}
	}

  componentDidMount = () => {

    //here need to get something
    //ins_hh_med and anx_hh_med
    const line = this.props.service_line.name
    const prv_dosg = this.props.prv_answer?JSON.parse(this.props.prv_answer):null;
    let q_name=""
    if(line === 'ins'){
      q_name = "ins_hh_med"     
    }else{ 
      q_name = "anx_hh_med"     
    }
    this.props.get_current_answer_by_name(q_name).then(resp=>{
      const med = JSON.parse(resp.response) 
      const med_name = med.name[0].split(" ")[0].toLowerCase()
      this.props.get_treatment_by_name(med_name).then(med_resp => {
        const def_dsg = prv_dosg&&prv_dosg.medication === med_name?prv_dosg.answer:"";
        med_resp.dosages.splice(med_resp.dosages.length-1)
        this.setState({dosages:med_resp.dosages, med_name: med_name, is_ready:true, current_dosage:def_dsg, med_brand:med.name[0]})
      })
    })
  }

  dosage_selector_handler = e => {
    this.setState({current_dosage: e.target.value}) 
  }

  confirm_btn_handler = e => {

    let ans = {answer: this.state.current_dosage, medication: this.state.med_name, with_brand:this.state.med_brand}
    if(ans){
      this.props.submit_action(JSON.stringify(ans), this.props.question, 'done')
    }else{
      alert("Please select current medication dosage")
    }
  }

  select_option = (item, index) => {
    return (
      <option key ={uuidv1()} value = {item.name}> {item.name}</option>
    )
  }

	render(){	
    if(!this.state.is_ready) return null
		else return(
      <div>
        <select className = "form-control form-control-lg state-selector" 
          onChange={this.dosage_selector_handler}>
        <option value="">{this.state.current_dosage||"Medication dosage"}</option>
            {this.state.dosages.map((item, index)=>(
              this.select_option(item, index)))}
       </select>	
        <div className="d-flex flex-row justify-content-center">
          {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm")}
        </div>
      </div>
		)
	}
}

export default connect(null,{get_current_answer_by_name, get_treatment_by_name, get_treatment_dosages}) (DosageSelector)
