import {} from 'ramda'
import { SET_WORKOUTS } from '../constants'

export const workouts = (state = [], action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.payload
    default:
      return state
  }
}
