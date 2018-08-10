import { merge, mergeDeepRight } from 'ramda'
import {
  FILTER_BAR_TOGGLED,
  SORT_DRAWER_TOGGLED,
  LIST_OPTIONS_CLEARED,
  FILTER_KEYS_UPDATED,
  FILTERED_WORKOUTS_SHOWN,
  FILTERED_WORKOUTS_HIDDEN,
  SORT_OPTION_TOGGLED
} from '../constants'

const initialListOptions = {
  filter: {
    wellness: null,
    motivation: null,
    category: null
  },
  sort: 'dateTime',
  showFilterBar: false,
  showSortDrawer: false,
  showFilteredWorkouts: false
}

export const listOptions = (state = initialListOptions, action) => {
  switch (action.type) {
    case FILTER_BAR_TOGGLED:
      return merge(state, {
        showFilterBar: !state.showFilterBar,
        showSortDrawer: false
      })
    case FILTER_KEYS_UPDATED:
      return mergeDeepRight(state, { filter: action.payload })
    case FILTERED_WORKOUTS_SHOWN:
      return merge(state, { showFilteredWorkouts: true })
    case FILTERED_WORKOUTS_HIDDEN:
      return merge(state, { showFilteredWorkouts: false })
    case SORT_DRAWER_TOGGLED:
      return merge(state, {
        showSortDrawer: !state.showSortDrawer,
        showFilterBar: false
      })
    case SORT_OPTION_TOGGLED:
      console.log('sort key:', action.payload)
      return mergeDeepRight(state, { sort: action.payload })
    case LIST_OPTIONS_CLEARED:
      return initialListOptions
    default:
      return state
  }
}
