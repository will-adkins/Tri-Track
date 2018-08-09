import fetch from 'isomorphic-fetch'
import { find, equals, prop, isNil, not, isEmpty } from 'ramda'

import {
  NEW_PROFILE_SAVE_STARTED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_SAVE_SUCCEEDED,
  SET_PROFILES,
  CURRENT_PROFILE_LOGIN_FAILED,
  CURRENT_PROFILE_LOGIN_SUCCEEDED,
  CURRENT_PROFILE_LOGIN_STARTED,
  CURRENT_PROFILE_ERROR_CLEAR,
  NEW_PROFILE_ERROR_CLEAR
} from '../constants'
const url = process.env.REACT_APP_BASE_URL + 'profiles'

export const setProfiles = async (dispatch, getState) => {
  const profiles = await fetch(url).then(res => res.json())

  dispatch({ type: SET_PROFILES, payload: profiles })
}

export const addProfile = history => async (dispatch, getState) => {
  dispatch({ type: NEW_PROFILE_SAVE_STARTED })
  const profile = getState().newProfile.data

  if (isEmpty(profile.email) || isEmpty(profile.password)) {
    dispatch({ type: NEW_PROFILE_ERROR_CLEAR })
    dispatch({
      type: NEW_PROFILE_SAVE_FAILED,
      payload: 'Remember to fill in the email and password fields!'
    })
    return
  }

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
    dispatch({ type: NEW_PROFILE_ERROR_CLEAR })
    dispatch({
      type: NEW_PROFILE_SAVE_FAILED,
      payload: 'Failed to save profile to database.'
    })
  }
}

export const checkLogin = history => (dispatch, getState) => {
  dispatch({ type: CURRENT_PROFILE_LOGIN_STARTED })

  const login = getState().currentProfile.data

  const profiles = getState().profiles

  const isExistingProfile = profile =>
    equals(prop('email', profile), prop('email', login)) &&
    equals(prop('password', profile), prop('password', login))

  const foundProfile = find(isExistingProfile, profiles)

  if (not(isNil(foundProfile))) {
    dispatch({ type: CURRENT_PROFILE_LOGIN_SUCCEEDED, payload: foundProfile })

    window.localStorage.setItem('cacheProfile', JSON.stringify(foundProfile))

    history.push('/home')
  } else {
    dispatch({ type: CURRENT_PROFILE_ERROR_CLEAR })
    dispatch({
      type: CURRENT_PROFILE_LOGIN_FAILED,
      payload: 'User Name and/or Password not found. Please try again.'
    })
  }
}

export const cacheLoginCheck = history => async (dispatch, getState) => {
  const cacheProfile =
    JSON.parse(window.localStorage.getItem('cacheProfile')) || {}

  const profiles = await dispatch(setProfiles).then(res => getState().profiles)

  if (not(isEmpty(cacheProfile))) {
    const isExistingProfile = profile =>
      equals(prop('email', profile), prop('email', cacheProfile)) &&
      equals(prop('password', profile), prop('password', cacheProfile))
    const foundProfile = find(isExistingProfile, profiles)

    if (not(isEmpty(foundProfile))) {
      dispatch({ type: CURRENT_PROFILE_LOGIN_SUCCEEDED, payload: foundProfile })
      history.push('/home')
    }
  }
}
