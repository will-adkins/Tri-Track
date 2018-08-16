import React from 'react'
import { equals } from 'ramda'
import {
  withStyles,
  ListItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  CardContent
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
    paddingTop: '10%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
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
      <React.Fragment>
        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>
        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>
      </React.Fragment>
    ) : (
      <center style={{ paddingBottom: '5%' }}>
        <FormControl className={classes.margin}>
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
      </center>
    )
  return (
    <CardContent className={classes.workout}>
      <div className={classes.row}>{<DateStroke />}</div>
      <div className={classes.row}>
        <ListItem>
          <FormControl className={classes.margin}>
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
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>
      </div>
      <div className={classes.row}>
        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>

        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>
      </div>
      <div className={classes.row}>
        <ListItem>
          <FormControl className={classes.margin}>
            <InputLabel>Motivation</InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={`${motivation}`}
              startAdornment={
                <InputAdornment position="start">
                  <MotivationWellnessIcon
                    type="motivation"
                    value={motivation}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl className={classes.margin}>
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
        </ListItem>
      </div>
    </CardContent>
  )
}

export default withStyles(styles)(WorkoutData)
