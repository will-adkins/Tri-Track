import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  profiles,
  newProfile,
  editProfile,
  currentProfile
} from './reducers/profiles'
import {
  workouts,
  currentWorkout,
  editWorkout,
  newWorkout
} from './reducers/workouts'
import { drawer } from './reducers/drawer'
import { calendar } from './reducers/calendar'
import { listOptions } from './reducers/listOptions'

export default createStore(
  combineReducers({
    profiles,
    newProfile,
    editProfile,
    currentProfile,
    workouts,
    currentWorkout,
    newWorkout,
    editWorkout,
    drawer,
    calendar,
    listOptions
  }),
  applyMiddleware(thunk)
)
