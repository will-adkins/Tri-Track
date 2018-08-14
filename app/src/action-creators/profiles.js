import fetch from 'isomorphic-fetch'
import { isNil, not, isEmpty } from 'ramda'

import {
  NEW_PROFILE_SAVE_STARTED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_SAVE_SUCCEEDED,
  SET_PROFILES,
  CURRENT_PROFILE_LOGIN_FAILED,
  CURRENT_PROFILE_LOGIN_SUCCEEDED,
  CURRENT_PROFILE_LOGIN_STARTED,
  CURRENT_PROFILE_ERROR_CLEAR,
  NEW_PROFILE_ERROR_CLEAR,
  SET_CURRENT_PROFILE
} from '../constants'
import findProfile from '../lib/findProfile'

const url = process.env.REACT_APP_BASE_URL + 'profiles'

export const setProfiles = async (dispatch, getState) => {
  const profiles = await fetch(url).then(res => res.json())

  dispatch({ type: SET_PROFILES, payload: profiles })
}

export const setCurrentProfile = async (dispatch, getState) => {
  const profiles = getState().profiles
  const login = getState().newProfile.data
  console.log(JSON.stringify(login))
  const foundProfile = findProfile(profiles, login)
  console.log(JSON.stringify(foundProfile))
  window.localStorage.setItem('cacheProfile', JSON.stringify(foundProfile))

  dispatch({ type: SET_CURRENT_PROFILE, payload: foundProfile })
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
    await dispatch(setProfiles)
    await dispatch(setCurrentProfile)
    history.push('/home')
    dispatch({ type: NEW_PROFILE_SAVE_SUCCEEDED })
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

  const foundProfile = findProfile(profiles, login)

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
    const foundProfile = findProfile(profiles, cacheProfile)

    if (not(isEmpty(foundProfile))) {
      dispatch({ type: CURRENT_PROFILE_LOGIN_SUCCEEDED, payload: foundProfile })
      history.push('/home')
    }
  }
}
