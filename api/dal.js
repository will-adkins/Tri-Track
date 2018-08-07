const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const { map, propOr, merge } = require('ramda')
const pkGenProfile = require('./lib/pkGenProfile')
const pkGenWorkout = require('./lib/pkGenWorkout')

const COUCHDB_SERVER = process.env.COUCHDB_SERVER
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`

const db = new PouchDB(DB_URL)

///////////////////////
// Profile Routes
///////////////////////

const listProfiles = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: 'profile_',
      endkey: 'profile_\ufff0'
    })
    .then(metaDoc =>
      map(row => propOr({}, 'doc', row), propOr([], 'rows', metaDoc))
    )

const getProfile = id => db.get(id)

const addProfile = doc => {
  const modifiedDoc = merge(doc, {
    _id: pkGenProfile('profile_', doc),
    type: 'profile'
  })
  return db.put(modifiedDoc)
}

///////////////////////
// Workout Routes
///////////////////////

const listWorkouts = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: 'workout_',
      endkey: 'workout_\ufff0'
    })
    .then(metaDoc =>
      map(row => propOr({}, 'doc', row), propOr([], 'rows', metaDoc))
    )

const getWorkout = id => db.get(id)

const addWorkout = doc => {
  const modifiedDoc = merge(doc, {
    _id: pkGenWorkout('workout_', doc),
    type: 'workout'
  })
  return db.put(modifiedDoc)
}

module.exports = {
  listProfiles,
  getProfile,
  addProfile,
  listWorkouts,
  getWorkout,
  addWorkout
}
