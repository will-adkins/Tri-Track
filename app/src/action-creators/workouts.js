import fetch from 'isomorphic-fetch'
import { filter, propEq, prop, equals, isEmpty, merge } from 'ramda'
import {
  SET_WORKOUTS,
  SET_CURRENT_WORKOUT,
  CURRENT_WORKOUT_LOADING_FAILED,
  EDIT_WORKOUT_SAVE_STARTED,
  EDIT_WORKOUT_SAVE_SUCCEEDED,
  EDIT_WORKOUT_SAVE_FAILED,
  EDIT_WORKOUT_FORM_UPDATED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_WORKOUT_SAVE_FAILED,
  NEW_WORKOUT_ERROR_CLEAR,
  NEW_WORKOUT_FORM_UPDATED,
  NEW_WORKOUT_SAVE_STARTED,
  CURRENT_WORKOUT_DELETING_STARTED,
  CURRENT_WORKOUT_DELETING_SUCCEEDED,
  CURRENT_WORKOUT_DELETING_FAILED,
  NEW_WORKOUT_SAVE_SUCCEEDED
} from '../constants'
import caloriesBurned from '../lib/caloriesBurned'

const url = process.env.REACT_APP_BASE_URL + 'workouts'

export const setWorkouts = async (dispatch, getState) => {
  const profile = getState().currentProfile.data

  const workouts = await fetch(url).then(res => res.json())

  const currentWorkouts = filter(
    propEq('profileId', prop('_id', profile)),
    workouts
  )

  dispatch({ type: SET_WORKOUTS, payload: currentWorkouts })
}

export const setCurrentWorkout = id => async (dispatch, getState) => {
  const workout = await fetch(url + '/' + id)
    .then(res => res.json())
    .catch(err =>
      dispatch({
        type: CURRENT_WORKOUT_LOADING_FAILED,
        payload:
          'Failed to load workout. Please navigate back to the workout list and try again.'
      })
    )
  dispatch({ type: SET_CURRENT_WORKOUT, payload: workout })
}

export const updateWorkout = (id, history) => async (dispatch, getState) => {
  dispatch({ type: EDIT_WORKOUT_SAVE_STARTED })
  const putResult = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(getState().editWorkout.data)
  })
    .then(res => res.json())
    .catch(err =>
      dispatch({
        type: EDIT_WORKOUT_SAVE_FAILED,
        payload:
          'We apologize, there was an internal Server Error in saving your workout. Please try again later.'
      })
    )

  if (putResult.ok) {
    await dispatch(setWorkouts)
    dispatch({ type: EDIT_WORKOUT_SAVE_SUCCEEDED })
    history.push(`/workouts/${id}`)
  } else {
    dispatch({
      type: EDIT_WORKOUT_SAVE_FAILED,
      payload:
        'Failed to update workout. Please refresh Tri-Track and try again.'
    })
  }
}

export const editWorkoutFormUpdate = (field, value) => (dispatch, getState) => {
  dispatch({ type: EDIT_WORKOUT_FORM_UPDATED, payload: { [field]: value } })

  const category = getState().editWorkout.data.category

  if (
    equals(field, 'distanceMi') ||
    equals(field, 'durationSec') ||
    equals(field, 'category') ||
    equals(field, 'stroke')
  ) {
    const duration = getState().editWorkout.data.durationSec
    const distance = getState().editWorkout.data.distanceMi
    const newPace = duration / distance
    dispatch({
      type: EDIT_WORKOUT_FORM_UPDATED,
      payload: { paceSecPerMi: newPace }
    })

    if (equals(category, 'Swim')) {
      const stroke = getState().editWorkout.data.stroke
      const newCalories = dispatch(
        caloriesBurned(category, distance, duration, stroke)
      )

      dispatch({
        type: EDIT_WORKOUT_FORM_UPDATED,
        payload: { calories: newCalories }
      })
      return
    }

    const newCalories = dispatch(caloriesBurned(category, distance, duration))

    dispatch({
      type: EDIT_WORKOUT_FORM_UPDATED,
      payload: { calories: newCalories }
    })
  }
}

export const addWorkout = history => async (dispatch, getState) => {
  dispatch({ type: NEW_WORKOUT_SAVE_STARTED })
  const workout = getState().newWorkout.data

  if (
    isEmpty(workout.category) ||
    equals(workout.wellness, 0) ||
    equals(workout.motivation, 0)
  ) {
    dispatch({ type: NEW_WORKOUT_ERROR_CLEAR })
    dispatch({
      type: NEW_WORKOUT_SAVE_FAILED,
      payload: 'Remember to fill in the first page!'
    })
    return
  }

  const id = getState().currentProfile.data._id
  const newWorkout = merge(workout, { profileId: id })

  const postResult = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newWorkout)
  })
    .then(res => res.json())
    .catch(err =>
      dispatch({
        type: NEW_WORKOUT_SAVE_FAILED,
        payload:
          'Failed to save workout. Please refresh Tri-Track and try again.'
      })
    )

  if (postResult.ok) {
    await dispatch(setWorkouts)
    dispatch({ type: NEW_WORKOUT_SAVE_SUCCEEDED })
    history.push(`/workouts`)
  } else {
    dispatch({
      type: NEW_PROFILE_SAVE_FAILED,
      payload:
        'Failed to update workout. Please refresh Tri-Track and try again.'
    })
  }
}

export const newWorkoutFormUpdate = (field, value) => (dispatch, getState) => {
  dispatch({ type: NEW_WORKOUT_FORM_UPDATED, payload: { [field]: value } })

  const category = getState().newWorkout.data.category

  if (
    equals(field, 'distanceMi') ||
    equals(field, 'durationSec') ||
    equals(field, 'category') ||
    equals(field, 'stroke')
  ) {
    const duration = getState().newWorkout.data.durationSec
    const distance = getState().newWorkout.data.distanceMi
    const newPace = duration / distance
    dispatch({
      type: NEW_WORKOUT_FORM_UPDATED,
      payload: { paceSecPerMi: newPace }
    })

    if (equals(category, 'Swim')) {
      const stroke = getState().newWorkout.data.stroke
      const newCalories = dispatch(
        caloriesBurned(category, distance, duration, stroke)
      )

      dispatch({
        type: NEW_WORKOUT_FORM_UPDATED,
        payload: { calories: newCalories }
      })
      return
    }

    const newCalories = dispatch(caloriesBurned(category, distance, duration))

    dispatch({
      type: NEW_WORKOUT_FORM_UPDATED,
      payload: { calories: newCalories }
    })
  }
}

export const deleteWorkout = history => async (dispatch, getState) => {
  dispatch({ type: CURRENT_WORKOUT_DELETING_STARTED })

  const workoutId = getState().currentWorkout.data._id

  const deleteResult = await fetch(url + '/' + workoutId, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE'
  }).then(res => res.json())

  if (deleteResult.ok) {
    await dispatch(setWorkouts)
    dispatch({ type: CURRENT_WORKOUT_DELETING_SUCCEEDED })
    history.push('/workouts')
  } else {
    dispatch({ type: CURRENT_WORKOUT_DELETING_FAILED })
  }
}
