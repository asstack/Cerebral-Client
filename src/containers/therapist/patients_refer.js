import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import { createModal } from 'react-modal-promise'
import { Modal } from 'react-bootstrap'
import * as utils from '../../utils/common'

const MyModal = ({ open, close, message}) => (
  <Modal show={open} onHide={() => close()}>
    <Modal.Header closeButton>
      <Modal.Title>Resume Assessment</Modal.Title>
    </Modal.Header>
    <Modal.Body>It looks like you were in the process of completing an patient info when you were logged out. Would you like to begin where you left off?</Modal.Body>
    <Modal.Footer>
      <button variant="secondary" onClick={() => close(false)}>
        No
      </button>
      <button variant="primary" onClick={() => close(true)}>
        Yes
      </button>
    </Modal.Footer>
  </Modal>
)

const myPromiseModal = createModal(MyModal)

//get submit and skip handler
class PatientsRefer extends Component {
	constructor(props){
		super(props)
		this.state = {
      msg:null,
      update:false,
      total_items:3,
      items: [{email:null, first_name:null, last_name:null}, {email:null, first_name:null, last_name:null}, {email:null, first_name:null, last_name:null}],
      incomplete:[]
		}
	}
 
  shouldComponentUpdate=()=>{
    return this.state.update
  }

  componentDidMount(){
    const index =this.props.ref_index;
    const patients = this.props.ref_patients
   if(patients && index < patients.length){
     //this.props.submit_action(this.props.ref_patients, this.props.ref_index); 
     return myPromiseModal({open:true}).then(value=>{

      console.log("value:",value)
      if(value){ 
        this.props.submit_action(this.props.ref_patients, this.props.ref_index); 
      }
     })
      this.forceUpdate()   
    }
  }
  
  componentWillReceiveProps = (next_props) => { 
    if(next_props.ref_index && next_props.ref_patients && next_props.ref_index < next_props.ref_patients.length){
      this.props.submit_action(next_props.ref_patients, next_props.ref_index); 
      this.forceUpdate() 
    }
  }

 

  remove_item_handler = e => {
    
    if(this.state.total_items>3){
      const new_items = this.state.items.slice(0,-1);
      const new_num = this.state.total_items-1;
      this.setState({total_items: new_num,
                     items:new_items});
      this.forceUpdate();
    } 
  }

  //TODO: should find a way not to use forceUpdate
  add_item_handler = ()  =>{
    const new_items = this.state.items;
    new_items.push({email:null, first_name:null, last_name:null});
    this.setState({total_items: this.state.total_items+1,
                   items: new_items}); 
    this.forceUpdate();
  }

  update_item_handler = (index, type, e) => {
    var new_items = this.state.items;
    new_items[index][type] = e.target.value;
    this.setState({items: new_items});
  }


  //TODO: elaborate error message
  submit_item_handler = () => {
    let patients = []
    let incomplete = []
    let warning_msg=null
    const items = this.state.items

    let i;
    for(i=0; i < items.length;i++){ 
      if(items[i].email && items[i].first_name && items[i].last_name){
        if(utils.email_validation(items[i].email)){
          patients.push(items[i]) 
        }else{
          warning_msg="Please input valid email address" 
          break;
        }
      }else if(items[i].email || items[i].first_name || items[i].last_name){
        incomplete.push(i)
        warning_msg="Please fill missing field(s)"
      } 
    }

    if(incomplete.length==0 && patients.length>0){ 
      this.props.submit_action(patients); 
      this.props.update_ref_patients(patients)
    }else if(!warning_msg && patients.length==0){
      //warning msg no items 
      warning_msg="Please fill at least 1 patient information"
      this.setState({incomplete:incomplete, msg:warning_msg})
      this.forceUpdate();
    }else{
      this.setState({incomplete:incomplete, msg:warning_msg})
      this.forceUpdate();
    }
  } 



  view = (event_handlers) => {
    return (
      <div className="container-progress">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center flex-row menu-bar">
            <div className= "col d-flex justify-content-between solid-border-bottom__unselected text-small__unselected menu-bar-item-holder">
              <img src={process.env.PUBLIC_URL + '/img/arrow.png'} onClick={e=>this.props.update_type_handler('cover')} className="arrow-btn"/>
              <div className="align-self-end menu-item">  Therapist Information </div>
              <div></div>
            </div>      
            <div className= "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder">
              <div></div>
              <div className="align-self-end menu-item">  Patient Information </div>
              <div></div>
            </div>      
         
          </div>
          <div className="d-flex flex-column therapist-question-container">
            <div className="d-flex justify-content-start patient-refer-description">
              <span>Please enter patient/s contact information.</span>
            </div> 
            {[...Array(this.state.total_items)].map((e, index) => (components.patient_refer_inputs(event_handlers, this.state.items[index], index, this.state.total_items)))}  
            <div className="d-flex justify-content-end patient-refer-add-btn-holder">
              <div id='add_patient' className="add-patient-button" onClick={this.add_item_handler}>
                <img className="remove-button" src='/img/add_patient.png'/> <span className="add_patient_btn_text">Add patient</span>
              </div>
            </div>
            <div className="d-flex patient-refer-submit-btn-holder">
              <input id='submit_refer' className="patient-refer-submit-btn" onClick={this.submit_item_handler}  type="button" value="Submit and Continue"/>
            </div>
         </div>
       </div>    
     </div>
    )
  }


	render(){	
    const event_handlers = {update:this.update_item_handler.bind(this), 
                      remove:this.remove_item_handler.bind(this)}
    return(this.view(event_handlers))
	}
}


export default PatientsRefer

