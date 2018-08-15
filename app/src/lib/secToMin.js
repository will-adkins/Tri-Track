import {} from 'ramda'

export default sec => {
  const hours = `${Math.floor(sec / 3600)}`

  let minutes

  if (hours > 0) {
    if (Math.floor((sec - 3600 * hours) / 60) < 10) {
      minutes = `0${Math.floor((sec - 3600 * hours) / 60)}`
    } else {
      minutes = `${Math.floor((sec - 3600 * hours) / 60)}`
    }
  } else {
    minutes = `${Math.floor(sec / 60)}`
  }
  const remainder = sec % 60
  const seconds =
    remainder < 10 ? `0${Math.floor(remainder)}` : `${Math.floor(remainder)}`

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}
