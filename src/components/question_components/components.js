import React from 'react'
import uuidv1 from 'uuid'

//TODO: replace the components name after get all componenets. some will reuse in different pages
export const input_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center input-holder">
			<input className="col input-type1" onChange={event_handler} defaultValue=""
				type="text" placeholder={text}/>
    </div>
  )
}

export const input_type_autocomplete = (event_handler, text, autocomplete_value) => {
  return(
    <div className="d-flex justify-content-center input-holder">
			<input className="col input-type1" onChange={event_handler} defaultValue=""
				type="text" placeholder={text} autoComplete={autocomplete_value}/>
    </div>
  )
}

export const input_password_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center input-holder">
			<input className="col input-type1" type="password" defaultValue="" 
				onChange={event_handler} placeholder={text}/>
    </div>
  )
}

export const checkbox_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center agree-holder">
      <input className ="checkbox-type1" type="checkbox" onClick={event_handler}/>
      <span className="checkbox-text">
        {description}
      </span>
    </div>
  )
}

export const confirm_button_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center confirm-btn-holder">
      <input className ="col btn-confirm text-btn" onClick={event_handler} type="button" value={description}/>
    </div>
  )
}

export const confirm_button_type_2 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center link-btn-holder">
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

export const btn_selector = (event_handler, item, type)=>{
  return(
    <input className ="button-two-selector" onClick={e=>event_handler(e, type) } type="button" value={item}/>
  )
}

export const button_half_size = (event_handler, item) => {
  return(
    <input key={uuidv1()} className = "button_two_selector" onClick={e=>event_handler(e, item)} 
      type="button" value={item}/>
  )
}

export const patient_refer_inputs = (event_handler,item, index, total) => {
  return(
    <div key={uuidv1()} className="d-flex flex-row justify-content-left patient-refer-items-holder">
      <div className="d-flex align-content-center flex-between patient-refer-left-item">
        <span>{"Patient"+ (index+1)}</span>
      </div>
      <div className="d-flex flex-column patient-refer-input-holder">
        <div className="d-flex justify-content-center patient-refer-input-item ">
          <input className="col patient-refer-input" onChange={(e)=>event_handler.update(index, "name", e)} defaultValue={item.name} type="text" placeholder="name"/>
        </div>
        <div className="d-flex justify-content-center patient-refer-input-item ">
          <input className="col patient-refer-input" onChange={(e)=>event_handler.update(index, "email", e)} defaultValue={item.email} type="email" placeholder="email"/>
        </div>
      </div>
      <div className="d-flex align-content-center flex-between patient-refer-right-item">
        {(total>3 && index+1===total)?<image onClick={event_handler.remove}className="remove-button" src='/img/patient_remove.png' />:<div></div>}
      </div>
    </div>
  )
}

