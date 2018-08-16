import { CALENDAR_TOGGLED, CALENDAR_RESET } from '../constants'

export const calendar = (state = false, action) => {
  switch (action.type) {
    case CALENDAR_TOGGLED:
      return !state
    case CALENDAR_RESET:
      return false
    default:
      return state
  }
}
