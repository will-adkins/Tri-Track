import fetch from 'isomorphic-fetch'
import {} from 'ramda'

import {
  NEW_PROFILE_SAVE_STARTED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_SAVE_SUCCEEDED
} from '../constants'
const url = process.env.REACT_APP_BASE_URL + '/profiles'

export const addProfile = history => async (dispatch, getState) => {
  console.log(process.env)
  dispatch({ type: NEW_PROFILE_SAVE_STARTED })
  const profile = getState().newProfile.data

  const postResult = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(profile)
  })
    .then(res => res.json())
    .catch(err =>
      dispatch({
        type: NEW_PROFILE_SAVE_FAILED,
        payload: 'Internal Server Error. Failed to save profile to database.'
      })
    )

  if (postResult.ok) {
    dispatch({ type: NEW_PROFILE_SAVE_SUCCEEDED })
    history.push('/home')
  } else {
    dispatch({
      type: NEW_PROFILE_SAVE_FAILED,
      payload: 'Failed to save profile to database.'
    })
  }
}
