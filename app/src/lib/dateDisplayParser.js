export default date => {
  const dateObj = new Date(date)
  return `${dateObj.getMonth() +
    1}/${dateObj.getUTCDate()}/${dateObj.getFullYear()}`
}
