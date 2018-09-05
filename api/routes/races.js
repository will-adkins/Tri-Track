const NodeHTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { pathOr, propOr, isEmpty, not, concat } = require('ramda')

const checkReqFields = require('../lib/checkReqFields')
const missingFieldsMsg = require('../lib/missingFieldsMsg')
const cleanObj = require('../lib/cleanObj')

const { listRaces, getRace, deleteRace } = require('../dal')
const reqFields = []

module.exports = app => {
  app.get('/races', (req, res, next) => {
    listRaces()
      .then(getResult => res.status(200).send(getResult))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
  app.get('/races/:id', (req, res, next) => {
    const raceId = pathOr('', ['params', 'id'], req)

    getRace(raceId)
      .then(getResult => res.status(200).send(getResult))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
  app.delete('/races/:id', (req, res, next) => {
    const raceId = pathOr('', ['params', 'id'], req)

    deleteRace(raceId)
      .then(deleteResult => res.status(200).send(deleteResult))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
}
