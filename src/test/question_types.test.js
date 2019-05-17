import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import './setup_tests'
import YesNoDetails from '../components/question_types/yes_no_details'
import Date from '../components/question_types/date'

describe('Yes No Component testing', () => {
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
  
  it('simulates input change', () => {
    const mockedEvent = {
      target: {
        value: '11/03/87'
      }
    };
    component.find('input').first.simulate('onChange', mockedEvent); 
    expect(component.state().birth_date).toBe('11/03/87');
    });
  
  /*
  it('event check', () => {
    const mockedEvent = {
      preventDefault: () => null 
    }; 
    component.find('button').simulate('onClick', mockedEvent);
  })
  */
});
