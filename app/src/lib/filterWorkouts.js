import { always, isNil, propEq, compose, filter } from 'ramda'
import {
  FILTER_KEYS_UPDATED,
  WORKOUTS_FILTERED,
  FILTERED_WORKOUTS_SHOWN,
  FILTERED_WORKOUTS_HIDDEN
} from '../constants'

export default ({ wellness, motivation, category }, workouts) => {
  const wellnessPredicateFn = isNil(wellness)
    ? always(true)
    : propEq('wellness', wellness)
  const motivationPredicateFn = isNil(motivation)
    ? always(true)
    : propEq('motivation', motivation)
  const categoryPredicateFn = isNil(category)
    ? always(true)
    : propEq('category', category)

  const filteredWorkouts = compose(
    filter(wellnessPredicateFn),
    filter(motivationPredicateFn),
    filter(categoryPredicateFn)
  )(workouts)

  return filteredWorkouts
}
