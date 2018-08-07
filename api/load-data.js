require('dotenv').config()

const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const COUCHDB_SERVER = process.env.COUCHDB_SERVER
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME

const db = new PouchDB(`${COUCHDB_SERVER}${COUCHDB_DBNAME}`)

const data = [
  {
    _id: 'workout_john-smith_2018-07-26T07:40:23Z',
    dateTime: '2018-07-26T07:40:23Z',
    profileId: 'profile_john-smith',
    type: 'workout',
    category: 'Run',
    distanceMi: 5,
    durationSec: 900,
    motivation: 1,
    wellness: 1,
    calories: 120,
    paceSecPerMi: 600
  },
  {
    _id: 'workout_mary-smith_2018-07-26T07:40:23Z',
    dateTime: '2018-07-26T07:40:23Z',
    profileId: 'profile_mary-smith',
    type: 'workout',
    category: 'Bike',
    distanceMi: 5,
    durationSec: 900,
    motivation: 1,
    wellness: 1,
    calories: 520,
    paceSecPerMi: 400
  },
  {
    _id: 'workout_mary-smith_2018-07-27T07:40:23Z',
    dateTime: '2018-07-27T07:40:23Z',
    profileId: 'profile_mary-smith',
    type: 'workout',
    category: 'Run',
    distanceMi: 3,
    durationSec: 1200,
    motivation: 1,
    wellness: 1,
    calories: 360,
    paceSecPerMi: 800
  },
  {
    _id: 'workout_john-smith_2018-09-26T07:40:23Z',
    dateTime: '2018-09-26T07:40:23Z',
    profileId: 'profile_john-smith',
    type: 'workout',
    category: 'Swim',
    distanceMi: 2,
    durationSec: 900,
    stroke: 'Freestyle',
    motivation: 1,
    wellness: 1,
    calories: 120,
    paceSecPerMi: 600
  },
  {
    _id: 'workout_max-boettcher_2018-07-26T07:40:23Z',
    dateTime: '2018-07-26T07:40:23Z',
    profileId: 'profile_max-boettcher',
    type: 'workout',
    category: 'Bike',
    distanceMi: 10,
    durationSec: 900,
    motivation: 1,
    wellness: 1,
    calories: 120,
    paceSecPerMi: 600
  },
  {
    _id: 'profile_john-smith',
    email: 'john@gmail.com',
    firstName: 'Jeff',
    lastName: 'Smith',
    heightIn: 66,
    weightLbs: 234,
    type: 'profile'
  },
  {
    _id: 'profile_mary-smith',
    email: 'mary@gmail.com',
    firstName: 'Mary',
    lastName: 'Smith',
    heightIn: 52,
    weightLbs: 123,
    type: 'profile'
  },
  {
    _id: 'profile_max-boettcher',
    email: 'max@gmail.com',
    firstName: 'Max',
    lastName: 'Boettcher',
    heighIn: 72,
    weightLbs: 170,
    type: 'profile'
  }
]

db.bulkDocs(data)
  .then(result => console.log('success', JSON.stringify(result, null, 2)))
  .catch(err => console.log('err', err))
