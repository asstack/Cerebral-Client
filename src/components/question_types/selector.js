import React from 'react'
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


//TODO: move to components after all fixed
const selector_items = (event_handler, options, class_type) => {
  return options.map((item, index) => (
    <input key={uuidv1()} className = {class_type} onClick={e=>event_handler(e, item)} 
      type="button" value={item.title}/> 
  ))
}

export const selector = (event_handler, question) =>{
    const class_type = question.options.length>2? "button-multi-selector":"button-two-selector";
    return (
      <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
        {
          selector_items(event_handler, question.options, class_type)
        }
      </div>
    )
}
