import { merge, mergeDeepRight } from 'ramda'
import {
  SET_WORKOUTS,
  SET_CURRENT_WORKOUT,
  CURRENT_WORKOUT_LOADING_FAILED,
  EDIT_WORKOUT_LOADED,
  EDIT_WORKOUT_SAVE_STARTED,
  EDIT_WORKOUT_SAVE_SUCCEEDED,
  EDIT_WORKOUT_SAVE_FAILED,
  EDIT_WORKOUT_FORM_TOGGLE,
  EDIT_WORKOUT_FORM_UPDATED
} from '../constants'

export const workouts = (state = [], action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.payload
    default:
      return state
  }
}

const now = new Date()

const initialCurrentWorkout = {
  data: {
    _id: '',
    _rev: '',
    dateTime: now.toISOString(),
    profileId: '',
    category: '',
    distanceMi: 0,
    durationSec: 0,
    motivation: 0,
    wellness: 0,
    calories: 0,
    paceSecPerMi: 0,
    type: 'workout'
  },
  isError: false,
  errMsg: ''
}

export const currentWorkout = (state = initialCurrentWorkout, action) => {
  switch (action.type) {
    case SET_CURRENT_WORKOUT:
      return mergeDeepRight(state, {
        data: action.payload,
        isError: false,
        errMsg: ''
      })
    case CURRENT_WORKOUT_LOADING_FAILED:
      return merge(state, { isError: true, errMsg: action.payload })
    default:
      return state
  }
}

const initialEditWorkout = {
  data: {
    _id: '',
    _rev: '',
    dateTime: now.toISOString(),
    profileId: '',
    category: '',
    distanceMi: 0,
    durationSec: 0,
    motivation: 0,
    wellness: 0,
    calories: 0,
    paceSecPerMi: 0,
    type: 'workout'
  },
  isSaving: false,
  isError: false,
  errMsg: '',
  isFirstForm: true
}

export const editWorkout = (state = initialEditWorkout, action) => {
  switch (action.type) {
    case EDIT_WORKOUT_LOADED:
      return mergeDeepRight(state, { data: action.payload })
    case EDIT_WORKOUT_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload })
    case EDIT_WORKOUT_FORM_TOGGLE:
      return merge(state, { isFirstForm: !state.isFirstForm })
    case EDIT_WORKOUT_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMsg: '' })
    case EDIT_WORKOUT_SAVE_SUCCEEDED:
      return initialEditWorkout
    case EDIT_WORKOUT_SAVE_FAILED:
      return merge(state, {
        isSaving: false,
        isError: true,
        errMsg: action.payload
      })
    default:
      return state
  }
}
