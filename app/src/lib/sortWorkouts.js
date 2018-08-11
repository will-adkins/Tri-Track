import { sort, not, equals, descend, ascend, prop } from 'ramda'

export default (sortKey, workouts) => {
  const sortPredicateFn = not(equals(sortKey, 'paceSecPerMi'))
    ? descend(prop(sortKey))
    : ascend(prop(sortKey))

  return sort(sortPredicateFn, workouts)
}
