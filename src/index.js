import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Todo: setting reducers in redux
//Todo: setting react router, react-router
//import rootReducer from './reducers'
////import {BrowserRouter as Router} from 'react-router-dom';
//const store = createStore(rootReducer)


render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
