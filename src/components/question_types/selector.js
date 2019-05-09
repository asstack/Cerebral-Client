import React from 'react'
import uuidv1 from 'uuid'
import * as components from '../question_components/components'


//TODO: move to components after all fixed
const selector_items = (event_handler, options) => {
  return options.map((item, index) => (
    <div className="p-2 selector-holder" key={uuidv1()}>
      <input className ="col btn-selector" onClick = {(e) => event_handler(e,item)} 
        type="button" value={item.option_name}/>
    </div>

    //components.btn_selector(event_handler, item)
  ))
}

export const selector = (event_handler, question) =>{
    return (
      <div className="d-flex flex-row justify-content-center">
        {
          selector_items(event_handler, question.options)
        }
      </div>
    )
}
