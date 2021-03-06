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
  EDIT_WORKOUT_FORM_UPDATED,
  EDIT_WORKOUT_ERROR_CLEAR,
  NEW_WORKOUT_FORM_UPDATED,
  NEW_WORKOUT_FORM_TOGGLE,
  NEW_WORKOUT_SAVE_STARTED,
  NEW_WORKOUT_SAVE_SUCCEEDED,
  NEW_WORKOUT_SAVE_FAILED,
  NEW_WORKOUT_ERROR_CLEAR,
  CURRENT_WORKOUT_DELETING_STARTED,
  CURRENT_WORKOUT_DELETING_SUCCEEDED,
  CURRENT_WORKOUT_DELETING_FAILED,
  CURRENT_WORKOUT_DELETING_CANCELED,
  CURRENT_WORKOUT_DELETE_CONFIRMATION_STARTED,
  CURRENT_WORKOUT_DELETE_CONFIRMATION_ENDED,
  NEW_WORKOUT_FORM_CLEAR
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
    motivation: 3,
    wellness: 3,
    calories: 0,
    paceSecPerMi: 0,
    type: 'workout'
  },
  isError: false,
  isConfirmingDelete: false,
  isDeleting: false,
  errMsg: ''
}

export const currentWorkout = (state = initialCurrentWorkout, action) => {
  switch (action.type) {
    case SET_CURRENT_WORKOUT:
      return mergeDeepRight(state, {
        data: action.payload,
        isError: false,
        isDeleting: false,
        errMsg: ''
      })
    case CURRENT_WORKOUT_DELETE_CONFIRMATION_STARTED:
      return merge(state, { isConfirmingDelete: true })
    case CURRENT_WORKOUT_DELETE_CONFIRMATION_ENDED:
      return merge(state, { isConfirmingDelete: false })
    case CURRENT_WORKOUT_DELETING_STARTED:
      return merge(state, { isDeleting: true, isError: false, errMsg: '' })
    case CURRENT_WORKOUT_DELETING_CANCELED:
      return merge(state, { isDeleting: false, isError: false, errMsg: '' })
    case CURRENT_WORKOUT_DELETING_SUCCEEDED:
      return initialCurrentWorkout
    case CURRENT_WORKOUT_DELETING_FAILED:
      return merge(state, {
        isDeleting: false,
        isError: true,
        errMsg: action.payload
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
    stroke: 'Freestyle',
    distanceMi: 0,
    durationSec: 0,
    motivation: 3,
    wellness: 3,
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
    case EDIT_WORKOUT_ERROR_CLEAR:
      return merge(state, {
        isSaving: false,
        isError: false,
        errMsg: ''
      })
    default:
      return state
  }
}

const initialNewWorkout = {
  data: {
    dateTime: now.toISOString(),
    profileId: '',
    category: 'Run',
    stroke: 'Freestyle',
    distanceMi: 0,
    hr: 0,
    min: 0,
    sec: 0,
    durationSec: 0,
    motivation: 3,
    wellness: 3,
    calories: 0,
    paceSecPerMi: 0,
    type: 'workout'
  },
  isSaving: false,
  isError: false,
  errMsg: '',
  isFirstForm: true
}

export const newWorkout = (state = initialNewWorkout, action) => {
  switch (action.type) {
    case NEW_WORKOUT_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload })
    case NEW_WORKOUT_FORM_TOGGLE:
      return merge(state, { isFirstForm: !state.isFirstForm })
    case NEW_WORKOUT_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMsg: '' })
    case NEW_WORKOUT_SAVE_SUCCEEDED:
      return initialNewWorkout
    case NEW_WORKOUT_SAVE_FAILED:
      return merge(state, {
        isSaving: false,
        isError: true,
        errMsg: action.payload
      })
    case NEW_WORKOUT_ERROR_CLEAR:
      return merge(state, {
        isSaving: false,
        isError: false,
        errMsg: ''
      })
    case NEW_WORKOUT_FORM_CLEAR:
      return initialNewWorkout
    default:
      return state
  }
}
