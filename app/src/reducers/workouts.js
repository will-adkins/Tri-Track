import { merge, mergeDeepRight } from 'ramda'
import {
  SET_WORKOUTS,
  SET_CURRENT_WORKOUT,
  CURRENT_WORKOUT_LOADING_FAILED
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
