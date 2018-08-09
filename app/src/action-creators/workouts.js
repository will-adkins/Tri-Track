import fetch from 'isomorphic-fetch'
import { filter, propEq, prop } from 'ramda'
import { SET_WORKOUTS } from '../constants'

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
