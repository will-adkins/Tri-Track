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
    justifyContent: 'space-around',
    marginTop: 24
  },
  data: {
    margin: 16
  },
  lowerRow: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 160,
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
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption" style={{ marginLeft: -8 }}>
              Date
            </Typography>
            <div className={classes.icon} style={{ marginLeft: 8 }}>
              <CalendarToday />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">
              {dateDisplayParser(dateTime)}
            </Typography>
          </div>
        </Paper>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption" style={{ marginLeft: -8 }}>
              Stroke
            </Typography>
            <div className={classes.icon} style={{ marginLeft: 8 }}>
              <Waves />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${stroke}`}</Typography>
          </div>
        </Paper>
      </div>
    ) : (
      <div className={classes.row}>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption" style={{ marginLeft: -8 }}>
              Date
            </Typography>
            <div className={classes.icon} style={{ marginLeft: 8 }}>
              <CalendarToday />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">
              {dateDisplayParser(dateTime)}
            </Typography>
          </div>
        </Paper>
      </div>
    )
  {
    /* <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div> */
  }

  return (
    <div className={classes.workout}>
      {<DateStroke />}
      <div className={classes.row}>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption">Distance</Typography>
            <div className={classes.icon}>
              <Terrain />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${distanceMi} miles`}</Typography>
          </div>
        </Paper>
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

      <div className={classes.row}>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption" style={{ marginLeft: -8 }}>
              Pace
            </Typography>
            <div className={classes.icon} style={{ marginLeft: 7 }}>
              <Timer />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${secToMin(
              paceSecPerMi
            )}  min / mile`}</Typography>
          </div>
        </Paper>
        <Paper className={classes.lowerRow}>
          <div className={classes.label}>
            <Typography variant="caption">Calories</Typography>
            <div className={classes.icon}>
              <Whatshot />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${calories} Cal`}</Typography>
          </div>
        </Paper>
      </div>

      <div className={classes.row}>
        <Paper className={classes.lowerRow} style={{ height: 44 }}>
          <div className={classes.label}>
            <Typography variant="caption">Motivation</Typography>
            <div className={classes.icon} style={{ marginLeft: -8 }}>
              <MotivationWellnessIcon type="motivation" value={motivation} />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${motivation}`}</Typography>
          </div>
        </Paper>
        <Paper className={classes.lowerRow} style={{ height: 44 }}>
          <div className={classes.label}>
            <Typography variant="caption">Wellness</Typography>
            <div className={classes.icon}>
              <MotivationWellnessIcon type="wellness" value={wellness} />
            </div>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{`${wellness}`}</Typography>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(styles)(WorkoutData)
