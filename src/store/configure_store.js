import {createStore,applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers'
import thunk from 'redux-thunk'

//createStore(reducer, [preloadedState], [enhancer])
//Todo: preloadedState

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}

