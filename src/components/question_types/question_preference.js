import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import {Router, Route, withRouter} from 'react-router-dom'
import * as components from '../question_components/components'

import { get_treatments } from '../../actions/patient_action'

export class QuestionPreference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }

  componentDidMount = () => {
    this.props.get_treatments().then((resp) => {
      // TODO: update global store with patient information
      console.log("get_treatments resp: ", resp)
      this.setState({
        ...this.state,
        options: resp.data
      });
    })
  }

  //TODO: Save multiple values from selected boxes
  check_box_handler = (e,item) => {
    //update local state in here
    //this.setState({selected_item:item})
  }

  submit_btn_handler = () => {
    //call action from parents with this.state.selected 
    this.props.submit_action()
  }

  get_image_for_item = (item, is_recommended) => {
    let color = is_recommended ? 'purple' : 'blue'
    return `/img/${item.service_line.name}/${color}/${item.name}.png`
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
  draw_image_checkbox = (item, backStyle, draw_text_f) => {
    
    return(
      <div className="input-group mb-1" key={uuidv1()}>
        <div className="input-group-prepend" >
          <div className="input-group-text group-checkbox">
            <input type="checkbox" name={item.name}/>
          </div>
        </div>
        <div className="form-control group-checkbox-text" style={backStyle}>
          {
            draw_text_f(item)
            }
        </div>
      </div>
      )
  }
  
  //{(e) => this.check_box_handler(e,item.option_name)}
  map_data_to_checkbox = item => {
    let is_recommended = item.id == 1
    var checkStyle = 
    {
      backgroundImage: `url(${this.get_image_for_item(item, is_recommended)})`,
      height: '340px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center left',
    }
    return this.draw_image_checkbox(item, checkStyle, (item) => {
      return(
          <div style={{width: '100%', height: '100%'}}>
          <div className='text-recommendation' 
            style={{visibility: is_recommended ? 'visible' : 'hidden', position: 'relative', left: '10%', top: '8%', width: '200px'}}>Our Recommendation</div>
          <div className='text-middle' style={{position: 'relative', left: '10%', top: '15%', fontWeight: 'bold'}}>{this.capitalize(item.name)}</div>
          
          <div className='text-middle' style={{position: 'relative', left: '10%', top: '25%'}}>Used To Treat</div>
          <div className='text-small' style={{position: 'relative', left: '10%', top: '27%'}}>{item.service_line.title}</div>

          <div className='text-middle'style={{position: 'relative', left: '10%', top: '35%'}}>Side Effects</div>
          <div className='text-small'style={{position: 'relative', left: '10%', top: '37%'}}>{item.side_effects.map(e => e.title).join(", ")}</div>
          </div>
      )
    })
    }

    default_option = () => {
      let item = {
        name: 'default'
      }
      return this.draw_image_checkbox(item, {
        backgroundImage: `url('/img/Doctor.png')`,
        height: '340px',
        backgroundSize: '200px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '70% 40%',
      }, (item) => {
        return(
          <div style={{width: '100%', height: '100%'}}>
          <div className='text-recommendation' style={{ position: 'relative', left: '10%', top: '8%', width: '200px'}}>No Preference</div>          
          <div className='text-middle'style={{position: 'relative', left: '10%', top: '35%'}}>I don't have a preference</div>
          <div className='text-small'style={{position: 'relative', left: '10%', top: '37%'}}>Your doctor will decide on a treatment plan based on your online visit answers.</div>
          </div>
      )
      })
    }

  render(){
    // TODO: figure out which treatment was recommended
    return (
      <div>    
        {
          this.state.options.map((item, index) => (this.map_data_to_checkbox(item)))
        }
        {
          this.default_option()
        }
        <div className="d-flex flex-row justify-content-center">
        {components.confirm_button_type_1(this.submit_btn_handler, "Confirm")}  
        </div>
      </div>
    )
  }
}

const prop_methods = {get_treatments}

export {prop_methods}