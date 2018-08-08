import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { profiles, newProfile, currentProfile } from './reducers/profiles'

export default createStore(
  combineReducers({ profiles, newProfile, currentProfile }),
  applyMiddleware(thunk)
)
