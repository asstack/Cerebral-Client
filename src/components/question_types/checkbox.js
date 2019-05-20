import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import * as components from '../question_components/components'

class CheckBoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      checked_options:[],
      msg:''
    }
  }

  componentDidMount(){
    //initalize item
    const arr = new Array(this.props.options.length).fill(false);     
    this.setState({options: this.props.options, checked_options:arr})
  }


  //TODO: Save multiple values from selected boxes
  check_box_handler = (e, idx) => {
    var list = this.state.checked_options
    list[idx]=e.target.checked
    this.setState({checked_options:list})
  }

  submit_btn_handler = () => {
    //call action from parents with this.state.selected 
    var info=''
    this.state.checked_options.forEach((val, idx)=>{
      if(val) info+=this.state.options[idx].name+" ,"
    }) 
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
            <input type="checkbox" onChange={(e) => {this.check_box_handler(e,index)}} name={item.title} checked={this.state.checked_options[index]}/>
          </div>
        </div>
        <div className="d-flex justify-content-center form-control group-checkbox-text">
          <p className="text-small">{item.title}</p>
        </div>
      </div>
      )
    }

  render(){
    return (
      <div>    

        <div className = "d-flex justify-content-center p-2 text-small-red">{this.state.msg}</div>
        {this.state.options.map((item, index) => (this.map_data_to_checkbox(item, index)))}
        <div className="d-flex flex-row justify-content-center">
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm")}  
        </div>
      </div>
    )
  }
}

export default CheckBoxComponent
