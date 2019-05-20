import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class PatientsRefer extends Component {
	constructor(props){
		super(props)
		this.state = {
      update:false,
      total_items:3,
      items: [{email:null, name:null}, {email:null, name:null}, {email:null, name:null}]
		}
	}
 
  shouldComponentUpdate=()=>{
    return this.state.update
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
    new_items.push({email:null, name:null});
    this.setState({total_items: this.state.total_items+1,
                   items: new_items}); 
    this.forceUpdate();
  }

  update_item_handler = (index, type, e) => {
    var new_items = this.state.items;
    new_items[index][type] = e.target.value;
    this.setState({items: new_items});
  }

  submit_item_handler = () => {
    this.props.submit_action(this.state.items); 
  } 

	render(){	
    const event_handlers = {update:this.update_item_handler.bind(this), 
                      remove:this.remove_item_handler.bind(this)}
		return(
			<div>
        {[...Array(this.state.total_items)].map((e, index) => (components.patient_refer_inputs(event_handlers, this.state.items[index], index, this.state.total_items)))}  
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
