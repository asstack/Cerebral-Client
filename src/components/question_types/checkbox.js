import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'

class CheckBoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items:[],
      msg:''
    }
  }

  componentDidMount(){
    //initalize item
    if(this.props.items && this.props.items.options){
      const arr = new Array(this.props.items.options.length).fill(false);     
      this.setState({items:arr})
    }
  }


  //TODO: Save multiple values from selected boxes
  check_box_handler = (e, idx) => {
    var list = this.state.items
    list[idx]=e.target.checked
    this.setState({items:list})
  }

  submit_btn_handler = () => {
    //call action from parents with this.state.selected 
    var info=''
    this.state.items.forEach((val, idx)=>{
      if(val) info+=this.props.items.options[idx].option_name+" ,"
    }) 
    console.log("rst: ", info.slice(0,-1)) 
    if(info){ 
      this.props.submit_action(info.slice(0, -1))
    }else{
      this.setState({msg:"Please select at least one item"})
    }
  }
  
  //{(e) => this.check_box_handler(e,item.option_name)}
  map_data_to_checkbox = (item,index) => {
    return(
      <div className="input-group mb-3" key={uuidv1()}>
        <div className="input-group-prepend">
          <div className="input-group-text group-checkbox">
            <input type="checkbox" onChange={(e) => {this.check_box_handler(e,index)}} name={item.option_name} checked={this.state.items[index]}/>
          </div>
        </div>
        <div className="d-flex justify-content-center form-control group-checkbox-text">
          <p className="text-small">{item.option_name}</p>
        </div>
      </div>
      )
    }

  render(){
    return (
      <div>    

        <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div>
        {this.props.items.options.map((item, index) => (this.map_data_to_checkbox(item, index)))}
        <div className="d-flex flex-row justify-content-center">
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm")}  
        </div>
      </div>
    )
  }
}

export default CheckBoxComponent
