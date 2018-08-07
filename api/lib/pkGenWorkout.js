const { compose, concat, replace, split, last } = require('ramda')

module.exports = (prefix, obj) => {
  const dateTime = concat('_', obj.dateTime)
  const person = last(split('_', obj.profileId))

  return compose(
    concat(prefix),
    concat(person)
  )(dateTime)
}
