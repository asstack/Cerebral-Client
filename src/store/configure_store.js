import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

//createStore(reducer, [preloadedState], [enhancer])
//Todo: preloadedState
const configure_store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default configure_store
