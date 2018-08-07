import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { newProfile } from './reducers/profiles'

export default createStore(
  combineReducers({ newProfile }),
  applyMiddleware(thunk)
)
