import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

//createStore(reducer, [preloadedState], [enhancer])
const configureStore = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default configureStore
