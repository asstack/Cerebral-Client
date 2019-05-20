import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import './setup_tests'
import Date from '../components/question_types/date'
import PatientsRefer from '../components/question_types/patients_refer'

describe('Patient Refer testing', () => {

  let component = null;
  let number_items = 3;
  let result_data = null;
  
  const test_action = data => {
    result_data=data
  }
  
  it('render correctly', () => {
    component=shallow(<PatientsRefer submit_action= {test_action}/>)
  })
  
  it('matches snapshot', ()=>{
    expect(component).toMatchSnapshot(); 
  })

  it('component check', ()=> {
    //expect(component.find('input').length()).toBe(number_items+2); 
    expect(component.find('input').exists()).toBe(true);; 
  })

  it('simulate input update item', () => {
    const mocked_event = {
      target : {value:'taejun song'} 
    }
    component.find('[type="text"]').at(0).simulate('change', mocked_event); 
    expect(component.state().items[0]["name"]).toBe("taejun song");
  })

  it('simulate input update item', () => {
    const mocked_event = {
      target : {value:'taejun@getCerebral.com'} 
    }
    component.find('[type="email"]').at(0).simulate('change', mocked_event); 
    expect(component.state().items[0]["email"]).toBe("taejun@getCerebral.com");
  })

  it('submit refer', () => {

    component.find('#submit_refer').simulate('click') 
    
    expect(result_data).toEqual([{name:"taejun song", email:"taejun@getCerebral.com"},
      {name:"taejun song", email:"taejun@getCerebral.com"},
      {name:"taejun song", email:"taejun@getCerebral.com"}])}) 

  it('add patient', ()=> {
    component.find('#add_patient').simulate('click') 
    expect(component.state().total_items).toBe(4)
    expect(component.state().items.length).toBe(4)
  })


})

describe('Date Component testing', () => {
  let component = null;
  let check_date = null;
  const test_action = data => {
    check_date = data;
  }

  it('renders correctly', () => {
    component = shallow(<Date submit_action= {test_action} />); 
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('componet check', () => {
    expect(component.find('input').exists()).toBe(true);
  });
 
  it('simulates input update date', () => {
    const mocked_event = {
      target: {
        value: '11/03/87'
      }
    };
    component.find('input').at(0).simulate('change', mocked_event); 
    expect(component.state().birth_date).toBe('11/03/87');
    });

  it('simulates input invalid date format', () => {
    const mocked_event = {
      target: {value:'11/03/1987'} 
    } 

    component.find('input').at(0).simulate('change', mocked_event);   
    component.find('input').at(1).simulate('click', mocked_event);
    expect(check_date).toBe(null);
  })
   
  it('simulate submit date', () => {
    const mocked_event = {
      target: {value:'11/03/87'} 
    }; 
    component.find('input').at(0).simulate('change', mocked_event); 
    component.find('input').at(1).simulate('click', mocked_event);
    expect(check_date).toBe('11/03/87');
  })

});




