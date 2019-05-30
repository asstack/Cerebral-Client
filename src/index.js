import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import * as serviceWorker from './serviceWorker'
import configure_store from './store/configure_store'
import { PersistGate } from 'redux-persist/integration/react'


//import {BrowserRouter as Router} from 'react-router-dom';

const {store, persistor} = configure_store()

render(
  // https://react-redux.js.org/introduction/basic-tutorial#providing-the-store
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App env={process.env}/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
