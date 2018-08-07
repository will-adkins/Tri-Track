import { merge } from 'ramda'
import { NEW_PROFILE_FORM_TOGGLED } from '../constants'

const initialNewProfile = {
  data: {
    email: 'mary@gmail.com',
    firstName: 'Mary',
    lastName: 'Smith',
    heightIn: 52,
    weightLbs: 123
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
    default:
      return state
  }
}
