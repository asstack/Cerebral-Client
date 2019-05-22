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
    if(type=="NO"){
      this.setState({view_type:type})
    }else{
      this.props.submit_action(type)
    } 
  }

  submit_description_action =(data) => {
    this.props.submit_action(data) 
  }
  
  view = () => {
    if(this.state.view_type === 'YES'){
      return( 
        <div>
			    <div className = "d-flex justify-content-start text-small">
            <p>{this.props.description[0].title}</p>
				  </div>	
          <TextArea submit_action = {this.submit_description_action}/> 
        </div>
      )
    }else{
      return ( 
       <div className="d-flex flex-row justify-content-between yes-no-component">

          {components.button_half_size(this.set_type_handler, "YES")} 
          {components.button_half_size(this.set_type_handler, "NO")} 
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
