import React from 'react'
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


//TODO: move to components after all fixed
const selector_items = (event_handler, options) => {
  return options.map((item, index) => (
    <input key={uuidv1()} className = "button_two_selector" onClick={e=>event_handler(e, item)} 
      type="button" value={item.title}/> 
  ))
}

export const selector = (event_handler, question) =>{
    return (
      <div className="d-flex flex-row justify-content-between yes-no-component">
        {
          selector_items(event_handler, question.options)
        }
      </div>
    )
}
