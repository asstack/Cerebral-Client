import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Patient from './containers/patient'


class App extends Component{

  //Todo: get state before compoenet mounting
  //Routing : [/, patinet, therapist]
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Route path="/patient" component={Patient}/>
        </div>
      </Router>
    );
  }
}

export default App
