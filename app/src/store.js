import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { profiles, newProfile, currentProfile } from './reducers/profiles'
import {
  workouts,
  currentWorkout,
  editWorkout,
  newWorkout
} from './reducers/workouts'
import { drawer } from './reducers/drawer'
import { listOptions } from './reducers/listOptions'

export default createStore(
  combineReducers({
    profiles,
    newProfile,
    currentProfile,
    workouts,
    currentWorkout,
    newWorkout,
    editWorkout,
    drawer,
    listOptions
  }),
  applyMiddleware(thunk)
)
