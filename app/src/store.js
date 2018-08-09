import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { profiles, newProfile, currentProfile } from './reducers/profiles'
import { workouts } from './reducers/workouts'
import { drawer } from './reducers/drawer'

export default createStore(
  combineReducers({ profiles, newProfile, currentProfile, workouts, drawer }),
  applyMiddleware(thunk)
)
