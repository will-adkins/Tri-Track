require('dotenv').config()
const PORT = process.env.PORT

const profileRoutes = require('./routes/profiles')
const workoutRoutes = require('./routes/workouts')
const raceRoutes = require('./routes/races')

const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({ credentials: true }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to the Tri-Track API.')
})
profileRoutes(app)
workoutRoutes(app)
raceRoutes(app)

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
  console.log('ERROR: ', err)
})

app.listen(PORT || 5000, () =>
  console.log('Tri-Track API Server is up on', PORT || 5000)
)
