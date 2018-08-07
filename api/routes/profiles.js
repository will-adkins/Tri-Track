const NodeHTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { pathOr, propOr, isEmpty, not } = require('ramda')

const { listProfiles, getProfile, addProfile } = require('../dal')
const checkReqFields = require('../lib/checkReqFields')
const missingFieldsMsg = require('../lib/missingFieldsMsg')
const cleanObj = require('../lib/cleanObj')

const reqFields = ['email', 'firstName', 'lastName', 'heightIn', 'weightLbs']

module.exports = app => {
  app.get('/profiles', (req, res, next) => {
    listProfiles()
      .then(profiles => res.status(200).send(profiles))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.get('/profiles/:id', (req, res, next) => {
    const profileId = pathOr('', ['params', 'id'], req)

    getProfile(profileId)
      .then(profile => res.status(200).send(profile))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })

  app.post('/profiles', bodyParser.json(), (req, res, next) => {
    const newProfile = propOr({}, 'body', req)

    if (isEmpty(newProfile)) {
      res
        .status(400)
        .send('Please provide a valid JSON document in the request body.')
      return
    }

    const missingFields = checkReqFields(reqFields, newProfile)

    if (not(isEmpty(missingFields))) {
      res.status(400).send(missingFieldsMsg(missingFields))
      return
    }

    const cleanProfile = cleanObj(reqFields, newProfile)

    addProfile(cleanProfile)
      .then(postResponse => res.status(200).send(postResponse))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
}
