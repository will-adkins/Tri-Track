import fetch from 'isomorphic-fetch'
import { isNil, not, isEmpty, equals } from 'ramda'

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
  SET_CURRENT_PROFILE,
  EDIT_PROFILE_SAVE_STARTED,
  EDIT_PROFILE_SAVE_FAILED,
  EDIT_PROFILE_SAVE_SUCCEEDED,
  EDIT_PROFILE_ERROR_CLEAR
} from '../constants'
import findProfile from '../lib/findProfile'

const url = process.env.REACT_APP_BASE_URL + 'profiles'

export const setProfiles = async (dispatch, getState) => {
  const profiles = await fetch(url).then(res => res.json())

  dispatch({ type: SET_PROFILES, payload: profiles })
}

export const setCurrentProfile = type => async (dispatch, getState) => {
  const profiles = getState().profiles
  const login = equals(type, 'new')
    ? getState().newProfile.data
    : getState().editProfile.data

  const foundProfile = findProfile(profiles, login)

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
    await dispatch(setCurrentProfile('new'))
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

export const updateProfile = history => async (dispatch, getState) => {
  dispatch({ type: EDIT_PROFILE_SAVE_STARTED })

  const profile = getState().editProfile.data

  const putResult = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(profile)
  })
    .then(res => res.json())
    .catch(err =>
      dispatch({
        type: EDIT_PROFILE_SAVE_FAILED,
        payload:
          'Failed to update profile. Please refresh Tri-Track and try again.'
      })
    )

  if (putResult.ok) {
    await dispatch(setProfiles)
    await dispatch(setCurrentProfile('edit'))
    history.push('/home')
    dispatch({ type: EDIT_PROFILE_SAVE_SUCCEEDED })
  } else {
    dispatch({ type: EDIT_PROFILE_ERROR_CLEAR })
    dispatch({
      type: EDIT_PROFILE_SAVE_FAILED,
      payload:
        'Failed to update profile in database. Please refresh Tri-Track and try again.'
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
  if (isNil(window.localStorage.getItem('cacheProfile'))) {
    return
  }
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
