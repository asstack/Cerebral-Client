import React from 'react';
import uuidv1 from 'uuid';

// TODO: replace the components name after get all componenets. some will reuse in different pages
export const input_type_1 = (event_handler, text, default_value = '') => {
  return (
    <div className="d-flex justify-content-start input-holder">
      <input className="col input-type1" onChange={event_handler} defaultValue={default_value} type="text" placeholder={text} />
    </div>
  );
};

export const input_type_half = (event_handler, text, default_value = '') => {
  return (
    <div className="d-flex justify-content-start input-holder">
      <input className="col input-type1" onChange={event_handler} defaultValue={default_value} type="text" placeholder={text} />
    </div>
  );
};

export const input_type_no_border = (event_handler, text, default_value = '') => {
  return (
    <div className="d-flex justify-content-start input-no-border-holder">
      <input className="col input-no-border" onChange={event_handler} defaultValue={default_value} type="text" placeholder={text} />
    </div>
  );
};

export const input_type_autocomplete = (event_handler, text, autocomplete_value, key, default_value = '') => {
  return (
    <div className="d-flex justify-content-start input-holder">
      <input
        className="col input-type1"
        onChange={e => event_handler(e, key)}
        defaultValue={default_value}
        type="text"
        placeholder={text}
        autoComplete={autocomplete_value}
      />
    </div>
  );
};

export const input_type_payment = (event_handler, text, autocomplete_value) => {
  return (
    <div className="d-flex justify-content-start input-holder">
      <input className="col input-type-payment" onChange={event_handler} defaultValue="" type="text" placeholder={text} autoComplete={autocomplete_value} />
    </div>
  );
};

export const input_password_type_1 = (event_handler, text) => {
  return (
    <div className="d-flex justify-content-start input-holder">
      <input className="col input-type1" type="password" defaultValue="" onChange={event_handler} placeholder={text} />
    </div>
  );
};

export const checkbox_type_1 = (event_handler, description) => {
  return (
    <div className="d-flex justify-content-center agree-holder">
      <input className="checkbox-type1" type="checkbox" onClick={event_handler} />
      <span className="checkbox-text">{description}</span>
    </div>
  );
};

export const confirm_button_type_1 = (event_handler, description) => {
  return (
    <div className="d-flex justify-content-center confirm-btn-holder">
      <input className="col btn-confirm text-btn" onClick={event_handler} type="button" value={description} />
    </div>
  );
};

export const skip_button_type_1 = (event_handler, description) => {
  return (
    <div className="col d-flex justify-content-center confirm-btn-holder">
      <div className="d-flex align-items-center sub-btn-confirm" onClick={event_handler}>
        {description}
      </div>
    </div>
  );
};

export const confirm_button_type_2 = (event_handler, description, type) => {
  return (
    <div className="d-flex justify-content-center link-btn-holder">
      <input className="col btn-link btn" onClick={e => event_handler(e, type)} type="button" value={description} />
    </div>
  );
};

export const text_button_type_1 = (event_handler, description) => {
  return (
    <div className="d-flex justify-content-center p-2">
      <div className="text-btn2">
        <div className="link-type1" onClick={event_handler}>
          {description}
        </div>
      </div>
    </div>
  );
};

export const text_big_type_1 = text => {
  return (
    <div className="d-flex justify-content-center text-big">
      <p>{text}</p>
    </div>
  );
};

export const btn_selector = (event_handler, item, type, selected = false) => {
  const css = selected ? 'selected' : null;
  return <input className={`${'button-two-selector' + ' '}${css}`} onClick={e => event_handler(e, type)} type="button" value={item} />;
};

export const button_half_size = (event_handler, item) => {
  return <input key={uuidv1()} className="button_two_selector" onClick={e => event_handler(e, item)} type="button" value={item} />;
};

/* therapist components - one line label and item */
export const patient_refer_inputs = (event_handler, item, index, total) => {
  return (
    <div key={uuidv1()} className="d-flex flex-row justify-content-start patient-refer-items-holder">
      <div className="d-flex align-content-center flex-between patient-refer-left-item">
        <span>{`Patient ${index + 1}`}</span>
      </div>
      <div className="d-flex flex-column patient-refer-input-holder">
        <div className="d-flex justify-content-center patient-refer-input-item ">
          <input
            className="col patient-refer-input"
            name={`fname${index}`}
            onChange={e => event_handler.update(index, 'first_name', e)}
            defaultValue={item.first_name}
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="d-flex justify-content-center patient-refer-input-item ">
          <input
            className="col patient-refer-input"
            name={`lname${index}`}
            onChange={e => event_handler.update(index, 'last_name', e)}
            defaultValue={item.last_name}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="d-flex justify-content-center patient-refer-input-item ">
          <input
            className="col patient-refer-input"
            name={`email${index}`}
            onChange={e => event_handler.update(index, 'email', e)}
            defaultValue={item.email}
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="d-flex align-content-center flex-between patient-refer-right-item">
        {total > 2 && index + 1 === total ? (
          <img onClick={event_handler.remove} className="remove-button" src="/img/patient_remove.png" alt="remove patient" />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export const patient_info_text = (title, content) => {
  return (
    <div key={uuidv1()} className="d-flex fex-row justify-content-start patient-info-items-holder">
      <div className="d-flex align-content-start align-items-start patient-info-left-item">
        <span>{title}</span>
      </div>
      <div className="d-flex patient-info-text-item">
        <span>{content}</span>
      </div>
    </div>
  );
};

export const patient_info_input = (title, content, event_handler) => {
  return (
    <div key={uuidv1()} className="d-flex flex-row justify-content-start patient-info-items-holder">
      <div className="d-flex align-content-start align-items-center patient-info-left-item">
        <span>{title}</span>
      </div>
      <div className="d-flex patient-info-text-item">
        <input className="input-type1 small-holder" type="text" onChange={e => event_handler(e)} placeholder={content} />
      </div>
    </div>
  );
};
