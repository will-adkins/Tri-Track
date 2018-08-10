import { sort, not, equals, descend, ascend, prop } from 'ramda'
import {
  SORT_OPTION_TOGGLED,
  SET_WORKOUTS,
  WORKOUTS_FILTERED
} from '../constants'

export default (sortKey, workouts) => {
  const sortPredicateFn = not(equals(sortKey, 'paceSecPerMi'))
    ? descend(prop(sortKey))
    : ascend(prop(sortKey))

  const sortedWorkouts = sort(sortPredicateFn, workouts)

  return sort(sortPredicateFn, workouts)
}
