const NodeHTTPError = require('node-http-error')
const { pathOr, propOr, isEmpty, not, concat } = require('ramda')
const bodyParser = require('body-parser')

const {
  listWorkouts,
  getWorkout,
  addWorkout,
  updateWorkout,
  deleteWorkout
} = require('../dal')

const checkReqFields = require('../lib/checkReqFields')
const missingFieldsMsg = require('../lib/missingFieldsMsg')
const cleanObj = require('../lib/cleanObj')

const reqFields = [
  'dateTime',
  'profileId',
  'category',
  'distanceMi',
  'durationSec',
  'motivation',
  'wellness',
  'calories',
  'paceSecPerMi'
]
const allowedFields = concat(reqFields, ['stroke'])

module.exports = app => {
  app.get('/workouts', (req, res, next) => {
    listWorkouts()
      .then(workouts => res.status(200).send(workouts))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.get('/workouts/:id', (req, res, next) => {
    const workoutId = pathOr('', ['params', 'id'], req)

    getWorkout(workoutId)
      .then(workout => res.status(200).send(workout))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.post('/workouts', bodyParser.json(), (req, res, next) => {
    const newWorkout = propOr({}, 'body', req)

    if (isEmpty(newWorkout)) {
      res
        .status(400)
        .send('Please provide a valid JSON document in the request body.')
      return
    }

    const missingFields = checkReqFields(reqFields, newWorkout)

    if (not(isEmpty(missingFields))) {
      res.status(400).send(missingFieldsMsg(missingFields))
      return
    }

    const cleanWorkout = cleanObj(allowedFields, newWorkout)

    addWorkout(cleanWorkout)
      .then(postResponse => res.status(200).send(postResponse))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.put('/workouts', bodyParser.json(), (req, res, next) => {
    const updatedWorkout = propOr({}, 'body', req)

    if (isEmpty(updatedWorkout)) {
      res
        .status(400)
        .send('Please provide a valid JSON document in the request body.')
      return
    }

    const missingFields = checkReqFields(
      concat(reqFields, ['_id', '_rev', 'type']),
      updatedWorkout
    )

    if (not(isEmpty(missingFields))) {
      res.status(400).send(missingFieldsMsg(missingFields))
      return
    }

    const cleanWorkout = cleanObj(
      concat(allowedFields, ['_id', '_rev', 'type']),
      updatedWorkout
    )

    updateWorkout(cleanWorkout)
      .then(postResponse => res.status(200).send(postResponse))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.delete('/workouts/:id', (req, res, next) => {
    const workoutId = pathOr('', ['params', 'id'], req)

    deleteWorkout(workoutId)
      .then(deleteResponse => res.status(200).send(deleteResponse))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
}
