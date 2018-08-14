import { equals, prop, find } from 'ramda'

export default (profiles, login) => {
  const isExistingProfile = profile =>
    equals(prop('email', profile), prop('email', login)) &&
    equals(prop('password', profile), prop('password', login))

  return find(isExistingProfile, profiles)
}
