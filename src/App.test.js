import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {shallow} from 'enzyme'
import './test/setup_tests'
import {CompleteProcess} from './components/static_components/complete_patient_process'

describe('CompleteProcess', () => {
  let component = null;
  it('renders correctlry', () => {
    component = shallow(<CompleteProcess />); 
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
