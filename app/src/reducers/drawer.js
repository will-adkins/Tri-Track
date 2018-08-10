import { DRAWER_TOGGLED } from '../constants'

export const drawer = (state = false, action) => {
  switch (action.type) {
    case DRAWER_TOGGLED:
      return !state
    default:
      return state
  }
}
