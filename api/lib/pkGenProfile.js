const { toLower, replace, compose, concat } = require('ramda')

module.exports = (prefix, obj) => {
  const firstName = replace(/ /g, '-', obj.firstName)
  const lastName = replace(/ /g, '-', obj.lastName)
  const name = compose(
    concat(firstName),
    concat('-')
  )(lastName)

  return compose(
    concat(prefix),
    toLower
  )(name)
}
