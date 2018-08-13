import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { profiles, newProfile, currentProfile } from './reducers/profiles'
import { workouts, currentWorkout } from './reducers/workouts'
import { drawer } from './reducers/drawer'
import { listOptions } from './reducers/listOptions'

export default createStore(
  combineReducers({
    profiles,
    newProfile,
    currentProfile,
    workouts,
    currentWorkout,
    drawer,
    listOptions
  }),
  applyMiddleware(thunk)
)
