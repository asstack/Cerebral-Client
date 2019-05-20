import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class PatientsRefer extends Component {
	constructor(props){
		super(props)
		this.state = {
      total_items:3,
      items: new Array(3).fill({email:null, name:null})
		}
	}

  init_item = {email:null, name:null} 

  remove_item_handler = e => {
    if(this.total_items>3){
      this.setState({total_items: this.state.total_items-1,
                     items:items.slice(0,-1)})
    } 
  }

  add_item_handler = ()  =>{
    const new_items = this.state.items;
    new_items.push(this.init_item)
    this.setState({total_items: this.state.total_items+1,
                   items: new_items}); 
  }

  update_item_handler = (index, type, value) => {
    const new_items = this.state.items; 
    new_items[index][type]=value; 
    this.setState({items: new_items})
  }

  submit_item_handler = () => {
    console.log("checkout data:", this.state.items)
    this.props.submit_action(this.state.items) 
  } 

	render(){	
    const event_handlers = {update:this.update_item_handler, 
                      remove:this.remove_item_handler}
		return(
			<div>
        {this.state.items.map((item, index) => (components.patient_refer_inputs(event_handlers, item, index, this.state.total_items)))}  
        <div className="d-flex justify-content-end">
          <input id='add_patient' onClick={this.add_item_handler} type='button' value='+ Add patient'/>
        </div>
        <div className="d-flex justify-content-center">
          <input id='submit_refer' onClick={this.submit_item_handler} type='button' value='Submit and continue'/>
        </div>
      </div>
		)
	}
}

export default PatientsRefer
