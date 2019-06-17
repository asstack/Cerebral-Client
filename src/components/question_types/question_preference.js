import React, {Component} from 'react'
import uuidv1 from  'uuid/v1';
import {Router, Route, withRouter} from 'react-router-dom'
import * as components from '../question_components/components'

export class QuestionPreference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      selected_index: null
    }
  }

  //TODO: Save multiple values from selected boxes
  check_box_handler = (e, selected_index) => {
    console.log(`check_box_handler: selected_index=${selected_index}`)
    this.setState({...this.state, selected_index:selected_index})
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
  draw_image_checkbox = (item, index, backStyle, draw_text_f) => {
    
    return(
      <div className="input-group mb-1" key={uuidv1()}>
        <div className="input-group-prepend" >
          <div className="input-group-text group-checkbox">
          <input type="checkbox" onChange={(e) => {this.check_box_handler(e, index)}} index={index} name={item.title} checked={index == this.state.selected_index} />
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
  
  map_data_to_checkbox = (item, index) => {
    let is_recommended = false  // no recommendations!
    var checkStyle = 
    {
      backgroundImage: `url(${this.get_image_for_item(item, is_recommended)})`,
      height: '340px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center left',
      padding:'0',
    }

      return this.draw_image_checkbox(item, index, checkStyle, (item) => {
        return this.draw_checkbox_description(item, is_recommended)
      })
    
    }

    default_option = (index) => {
      let item = {
        name: 'default'
      }
      return this.draw_image_checkbox(item, index, {
        backgroundImage: `url('/img/Doctor.png')`,
        height: '340px',
        backgroundSize: '200px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '90% 50%',
      }, (item) => {
        return(
          <div style={{width: '100%', height: '100%'}}>
          <div className='text-recommendation' style={{ position: 'relative', left: '0', top: '8%', width: '245px', height:'42px',paddingTop:'10px'}}>No Preference</div>          
          <div className='text-pref-title' style={{position: 'relative', left: '0', top: '28%', paddingBottom:'30px' }}>I don't have a preference</div>
          <div className='text-small text-pref-left' style={{position: 'relative', left: '0', top: '25%', width:'344px'}}>Your doctor will decide on a treatment plan based on your online visit answers.</div>
          </div>
      )
      })
    }

  render(){
    // TODO: figure out which treatment was recommended
    return (
      <div>    
        {
          this.state.options.map((item, index) => (this.map_data_to_checkbox(item, index)))
        }
        {
          this.default_option(this.state.options.length)
        }
        <div className="d-flex flex-row justify-content-center">
          {components.confirm_button_type_1(this.submit_btn_handler, "Confirm >")}  
        </div>
      </div>
    )
  }
}

// As you use new methods, add their signature here so that they will be merged with sub classes
const prop_methods = {}

export {prop_methods}
