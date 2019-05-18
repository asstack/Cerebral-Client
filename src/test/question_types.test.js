import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import './setup_tests'
import Date from '../components/question_types/date'

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




