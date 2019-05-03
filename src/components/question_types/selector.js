import React, {Component} from 'react'
import * as components from '../question_components/components'


const selector_items = (event_handler, options) => {
  return options.map((item, index) => (
    components.btn_selector(event_handler, item)
  ))
}

export const selector = (event_handler, question) =>{
    return (
      <div className="d-flex flex-row justify-content-center">
        {selector_items(event_handler, question.options)}
      </div>
    )
}
