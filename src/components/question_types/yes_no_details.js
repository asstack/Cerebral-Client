import React, {Component} from 'react';
import * as components from '../question_components/components'
import TextArea from './text_area'

//TODO: it is temp name, may update to proper name
class YesNoDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      view_type:''
    }
  }

  set_type_handler = (e, type) => {
    if(type==="yes"){
      this.setState({view_type:type})
    }else{
      this.props.submit_action(type)
    } 
  }

  submit_description_action =(data) => {
    this.props.submit_action(data) 
  }
  
  view = () => {
    if(this.state.view_type === 'yes'){
      return( 
        <div>
			    <div className = "d-flex justify-content-start text-small">
            <p>{this.props.title}</p>
				  </div>	
          <TextArea submit_action = {this.submit_description_action}/> 
        </div>
      )
    }else{
      return ( 
       <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
          {components.btn_selector(this.set_type_handler, "YES", "yes")} 
          {components.btn_selector(this.set_type_handler, "NO", "no")} 
        </div> 
      )
    } 
  }
  
  render(){
    return ( 
      this.view(this.state.view_type)
    );
  }
}

export default YesNoDetails
