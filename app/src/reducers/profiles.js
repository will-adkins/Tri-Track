import { merge, mergeDeepRight } from 'ramda'
import {
  NEW_PROFILE_FORM_TOGGLED,
  NEW_PROFILE_FORM_CLEAR,
  NEW_PROFILE_SAVE_STARTED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_SAVE_SUCCEEDED,
  NEW_PROFILE_FORM_UPDATED,
  NEW_PROFILE_ERROR_CLEAR,
  CURRENT_PROFILE_FORM_UPDATE,
  SET_PROFILES,
  CURRENT_PROFILE_LOGIN_STARTED,
  CURRENT_PROFILE_LOGIN_SUCCEEDED,
  CURRENT_PROFILE_LOGIN_FAILED,
  CURRENT_PROFILE_FORM_CLEAR,
  CURRENT_PROFILE_ERROR_CLEAR,
  CURRENT_PROFILE_LOGGED_OUT,
  SET_CURRENT_PROFILE
} from '../constants'

export const profiles = (state = [], action) => {
  switch (action.type) {
    case SET_PROFILES:
      return action.payload
    default:
      return state
  }
}

const initialNewProfile = {
  data: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    heightIn: '',
    weightLbs: ''
  },
  isDetailsForm: false,
  isSaving: false,
  isError: false,
  errMsg: ''
}

export const newProfile = (state = initialNewProfile, action) => {
  switch (action.type) {
    case NEW_PROFILE_FORM_TOGGLED:
      return merge(state, { isDetailsForm: !state.isDetailsForm })
    case NEW_PROFILE_FORM_CLEAR:
      return initialNewProfile
    case NEW_PROFILE_ERROR_CLEAR:
      return merge(state, { isError: false, errMsg: '' })
    case NEW_PROFILE_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMsg: '' })
    case NEW_PROFILE_SAVE_FAILED:
      return merge(state, {
        isSaving: false,
        isError: true,
        errMsg: action.payload
      })
    case NEW_PROFILE_SAVE_SUCCEEDED:
      return initialNewProfile
    case NEW_PROFILE_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload })
    default:
      return state
  }
}

const initialCurrentProfile = {
  data: {
    _id: '',
    _rev: '',
    type: 'profile',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    heightIn: '',
    weightLbs: ''
  },
  isAuthenticating: false,
  isError: false,
  errMsg: ''
}

export const currentProfile = (state = initialCurrentProfile, action) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return mergeDeepRight(state, { data: action.payload })
    case CURRENT_PROFILE_FORM_UPDATE:
      return mergeDeepRight(state, { data: action.payload })
    case CURRENT_PROFILE_FORM_CLEAR:
      return initialCurrentProfile
    case CURRENT_PROFILE_LOGIN_STARTED:
      return merge(state, {
        isAuthenticating: true,
        isError: false,
        errMsg: ''
      })
    case CURRENT_PROFILE_LOGIN_SUCCEEDED:
      return mergeDeepRight(state, {
        data: action.payload,
        isAuthenticating: false,
        isError: false,
        errMsg: ''
      })
    case CURRENT_PROFILE_LOGIN_FAILED:
      return merge(state, {
        isAuthenticating: false,
        isError: true,
        errMsg: action.payload
      })
    case CURRENT_PROFILE_ERROR_CLEAR:
      return merge(state, {
        isAuthenticating: false,
        isError: false,
        errMsg: ''
      })
    case CURRENT_PROFILE_LOGGED_OUT:
      window.localStorage.clear()
      return initialCurrentProfile
    default:
      return state
  }
}
