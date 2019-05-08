import React from 'react'
import * as components from '../question_components/components'

export const height_weight = (event_handler) => {
  return (
    <div>
      {components.input_type_1(null, "Weight lbs")}
      <div className = "p-2">
         <div className = "input-group input-type1">
           <div className ="input-group-prepend text_field_height_weight">
             <span className = "input-group-text span_height_weight">Height</span>
           </div>
           <input type="text" placeholder="Ft" className="form-control input_height_weight"/>
           <input type="text" placeholder="In" className="form-control input_height_weight"/>
         </div>
       </div>
      {components.confirm_button_type_1(event_handler, "Confirm weight and height")}

    </div>
  )
}
