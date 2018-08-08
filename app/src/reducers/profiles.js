import { merge, mergeDeepRight } from 'ramda'
import {
  NEW_PROFILE_FORM_TOGGLED,
  NEW_PROFILE_SAVE_STARTED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_SAVE_SUCCEEDED,
  NEW_PROFILE_FORM_UPDATED
} from '../constants'

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
