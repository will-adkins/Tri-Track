import React from 'react'
import { equals } from 'ramda'
import {
  withStyles,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Paper,
  Typography
} from '@material-ui/core'
import {
  CalendarToday,
  Terrain,
  AccessTime,
  Timer,
  Whatshot,
  Waves
} from '@material-ui/icons'

import MotivationWellnessIcon from './motivationWellnessIcon'
import dateDisplayParser from '../lib/dateDisplayParser'
import secToMin from '../lib/secToMin'

const styles = theme => ({
  workout: {
    paddingTop: '10%',
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  data: {
    margin: 16
  },
  lowerRow: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 152,
    paddingLeft: '3%'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  icon: { alignSelf: 'flex-end', marginRight: 8 },
  info: { alignSelf: 'flex-end', marginRight: '-3%' }
})

const WorkoutData = props => {
  const { classes } = props
  const {
    category,
    dateTime,
    distanceMi,
    durationSec,
    paceSecPerMi,
    calories,
    motivation,
    wellness,
    stroke
  } = props.workout

  const DateStroke = () =>
    equals('Swim', category) ? (
      <div className={classes.row}>
        <FormControl className={classes.data}>
          <InputLabel>Date</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={dateDisplayParser(dateTime)}
            startAdornment={
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={classes.data}>
          <InputLabel>Stroke</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={stroke}
            startAdornment={
              <InputAdornment position="start">
                <Waves />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl className={classes.data}>
          <InputLabel>Date</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={dateDisplayParser(dateTime)}
            startAdornment={
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    )
  return (
    <div className={classes.workout}>
      {<DateStroke />}
      <div className={classes.row}>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption">Distance</Typography>
            <div className={classes.icon}>
              {equals(category, 'Swim') ? <Waves /> : <Terrain />}
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${distanceMi} miles`}</Typography>
          </div>
        </Paper>

        {/* <FormControl className={classes.data}>
          <InputLabel>Distance</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={`${distanceMi} miles`}
            startAdornment={
              <InputAdornment position="start">
                <Terrain />
              </InputAdornment>
            }
          />
        </FormControl> */}

        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption">Duration</Typography>
            <div className={classes.icon}>
              <AccessTime />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${secToMin(
              durationSec
            )}`}</Typography>
          </div>
        </Paper>
      </div>

      {/* <FormControl className={classes.data}>
          <InputLabel>Duration</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={secToMin(durationSec)}
            startAdornment={
              <InputAdornment position="start">
                <AccessTime />
              </InputAdornment>
            }
          />
        </FormControl>
      </div> */}
      <div className={classes.row}>
        <FormControl className={classes.data}>
          <InputLabel>Pace</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={`${secToMin(paceSecPerMi)}  min / mile`}
            startAdornment={
              <InputAdornment position="start">
                <Timer />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={classes.data}>
          <InputLabel>Calories</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={calories}
            startAdornment={
              <InputAdornment position="start">
                <Whatshot />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl className={classes.data}>
          <InputLabel>Motivation</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={`${motivation}`}
            startAdornment={
              <InputAdornment position="start">
                <MotivationWellnessIcon type="motivation" value={motivation} />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={classes.data}>
          <InputLabel>Wellness</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={`${wellness}`}
            startAdornment={
              <InputAdornment position="start">
                <MotivationWellnessIcon type="wellness" value={wellness} />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  )
}

export default withStyles(styles)(WorkoutData)
