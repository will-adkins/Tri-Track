import { always, isNil, propEq, compose, filter } from 'ramda'

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
