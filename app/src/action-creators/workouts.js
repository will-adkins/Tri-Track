import fetch from 'isomorphic-fetch'
import { filter, propEq, prop } from 'ramda'
import {
  SET_WORKOUTS,
  SET_CURRENT_WORKOUT,
  CURRENT_WORKOUT_LOADING_FAILED,
  EDIT_WORKOUT_SAVE_STARTED,
  EDIT_WORKOUT_SAVE_SUCCEEDED,
  EDIT_WORKOUT_SAVE_FAILED
} from '../constants'

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
  const putResult = await fetch(url + '/' + id, {
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
      payload: 'Failed to update workout.'
    })
  }
}
