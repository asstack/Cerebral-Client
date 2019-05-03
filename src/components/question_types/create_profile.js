import React, {Component} from 'react'
import * as components from '../question_components/components'


export const create_profile = (event_handlers, question) =>{
    return (
      <div>
        {components.text_big_type_1(question.title)}
        {components.input_type_1(event_handlers.update_email.bind(this), "Email Address")}
        {components.input_type_1(event_handlers.update_firstname.bind(this), "First Name")}
        {components.input_type_1(event_handlers.update_lastname.bind(this), "Last Name")}
        {components.input_password_type_1(event_handlers.update_password.bind(this), "Create Password")}
        {components.input_password_type_1(event_handlers.update_password_confirm.bind(this), "Retype Password")}
        {components.checkbox_type_1(null, 'I already have an account I consent to Telehealth, terms and privacy policy. All information is strictly confidential and is used to help our professionals provide the best care for you.')}
        {components.confirm_button_type_1(event_handlers.register_handler.bind(this), "Get started with online visit")}
        {components.text_button_type_1(event_handlers.state_update_handler.bind(this), "I already have an account.")}
      </div>
    )
}
