import React from 'react'
import uuidv1 from 'uuid'

//TODO: replace the components name after get all componenets. some will reuse in different pages
export const input_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center p-2">
			<input className="col input-type1" onChange={event_handler} defaultValue=""
				type="text" placeholder={text}/>
    </div>
  )
}

export const input_type_autocomplete = (event_handler, text, autocomplete_value) => {
  return(
    <div className="d-flex justify-content-center p-2">
			<input className="col input-type1" onChange={event_handler} defaultValue=""
				type="text" placeholder={text} autoComplete={autocomplete_value}/>
    </div>
  )
}

export const input_password_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center p-2">
			<input className="col input-type1" type="password" defaultValue="" 
				onChange={event_handler} placeholder={text}/>
    </div>
  )
}

export const checkbox_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className ="checkbox-type1" type="checkbox" onClick={event_handler}/>
      <label className="text-small">
        {description}
      </label>
    </div>
  )
}

export const confirm_button_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className ="col btn-confirm text-btn" onClick={event_handler} type="button" value={description}/>
    </div>
  )
}

export const confirm_button_type_2 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className ="col btn-link btn" onClick={event_handler} type="button" value={description}/>
    </div>
  )
}

export const text_button_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
       <div className="text-btn2"><div className ="link-type1" onClick={event_handler}>{description}</div></div>
    </div>
  )
}

export const text_big_type_1 = text => {
  return(
    <div className="d-flex justify-content-center text-big">
      <p>{text}</p>
    </div>
  )
}

export const btn_selector = (event_handler, item)=>{
  return(
    <div className="p-2 selector-holder" key={uuidv1()}>
      <input className ="col btn-selector" onClick={event_handler} type="button" value={item}/>
    </div>
  )
}

export const patient_refer_inputs = (event_handler,item, index, total) => {
  return(
    <div key={uuidv1()} className="d-flex flex-row align-content-left">
      <div className="d-flex align-content-center flex-between">
        <span>{"Patient"+(index+1)}</span>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center p-2">
          <input className="col input-type1" onChange={(e)=> event_handler.update(index, 'name', e)} defaultValue={item.name} type="text" placeholder="name"/>
        </div>
        <div className="d-flex justify-content-center p-2">
          <input className="col input-type1" onChange={(e)=> event_handler.update(index, 'email', e)} defaultValue={item.email} type="email" placeholder="email"/>
        </div>
      </div>
      <div className="d-flex align-content-center flex-between">
        {(total>3 && index+1==total)?<input onClick={event_handler.remove} type='button' value='remove'/>:<div></div>}
       </div>
    </div>
  )
}


