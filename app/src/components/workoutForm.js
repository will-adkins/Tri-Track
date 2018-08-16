import React from 'react'

import { equals, not } from 'ramda'
import { withRouter } from 'react-router'
import {
  Grid,
  TextField,
  CardActions,
  Button,
  withStyles,
  InputAdornment
} from '@material-ui/core'
import {
  Terrain,
  AccessTime,
  Timer,
  Whatshot,
  CalendarToday
} from '@material-ui/icons'

import secToMin from '../lib/secToMin'
import dateParser from '../lib/dateDisplayParser'

import WorkoutIcon from '../components/workoutIcon'
import MotivationWellnessIcon from '../components/motivationWellnessIcon'
import CustomSelect from '../components/customSelect'
import CustomCalendar from '../components/customCalendar'

const styles = theme => ({
  workout: {
    paddingTop: '10%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    width: '50%'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actions: { justifyContent: 'flex-end', width: '50%' }
})

const WorkoutForm = props => {
  const {
    classes,
    history,
    onChange,
    onSubmit,
    toggleForm,
    toggleCalendar,
    calendarOpen,
    isFirstForm
  } = props
  const {
    category,
    dateTime,
    stroke,
    wellness,
    motivation,
    distanceMi,
    durationSec,
    paceSecPerMi,
    calories
  } = props.workout

  const SoftForm = (
    <center>
      <form style={{ marginLeft: '25%' }}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <WorkoutIcon category={category} />
            </Grid>
            <CustomSelect
              label="Workout Category"
              field="category"
              value={category}
              onSelect={onChange}
            />
          </Grid>
          {equals('Swim', category) && (
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <img src="/static/stroke.png" alt="Swim Stroke Icon" />
              </Grid>
              <CustomSelect
                label="Swim Stroke"
                field="stroke"
                value={stroke}
                onSelect={onChange}
              />
            </Grid>
          )}

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <CalendarToday />
            </Grid>
            <Grid item>
              <TextField
                id="distance"
                label="Date"
                value={dateParser(dateTime)}
                className={classes.textfield}
                style={{ width: 160, marginLeft: 8 }}
                required
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomCalendar
                        dateTime={dateTime}
                        onChange={onChange}
                        className="overlay"
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <MotivationWellnessIcon type="motivation" value={motivation} />
            </Grid>
            <CustomSelect
              label="Motivation"
              field="motivation"
              value={motivation}
              onSelect={onChange}
            />
          </Grid>
          <Grid
            container
            spacing={equals(wellness, 3) ? 0 : 8}
            alignItems="flex-end"
          >
            <Grid item>
              <MotivationWellnessIcon type="wellness" value={wellness} />
            </Grid>
            <CustomSelect
              label="Wellness"
              field="wellness"
              value={wellness}
              onSelect={onChange}
            />
          </Grid>
        </div>
        <CardActions className={classes.actions} style={{ paddingTop: 16 }}>
          <Button variant="extendedFab" color="primary" onClick={toggleForm}>
            Next
          </Button>
          <Button type="button" onClick={e => history.goBack()}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </center>
  )

  const HardForm = (
    <center>
      <form style={{ marginLeft: '25%' }} onSubmit={onSubmit}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Terrain />
            </Grid>
            <Grid item>
              <TextField
                id="distance"
                label="Distance (miles)"
                value={distanceMi}
                onChange={e => onChange('distanceMi', Number(e.target.value))}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AccessTime />
            </Grid>
            <Grid item>
              <TextField
                id="duration"
                label="Duration (seconds)"
                value={durationSec}
                onChange={e => onChange('durationSec', Number(e.target.value))}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Timer />
            </Grid>
            <Grid item>
              <TextField
                id="pace"
                label="Pace (min/mile)"
                value={secToMin(paceSecPerMi)}
                onChange={e => onChange('paceSecPerMi', Number(e.target.value))}
                className={classes.textfield}
                disabled
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Whatshot />
            </Grid>
            <Grid item>
              <TextField
                id="calories"
                label="Calories Burned"
                value={calories}
                onChange={e => onChange('calories', Number(e.target.value))}
                className={classes.textfield}
                disabled
              />
            </Grid>
          </Grid>
        </div>
        <CardActions className={classes.actions} style={{ paddingTop: 16 }}>
          <Button type="submit" variant="extendedFab" color="primary">
            Submit
          </Button>
          <Button type="button" onClick={toggleForm}>
            Go Back
          </Button>
        </CardActions>
      </form>
    </center>
  )

  return (
    <React.Fragment>
      {isFirstForm && SoftForm}
      {not(isFirstForm) && HardForm}
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(WorkoutForm))
