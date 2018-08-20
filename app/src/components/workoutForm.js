import React from 'react'

import { equals, not, gt } from 'ramda'
import { withRouter } from 'react-router'
import {
  Grid,
  TextField,
  CardActions,
  Button,
  withStyles,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core'
import {
  Pool,
  DirectionsBike,
  DirectionsRun,
  Waves,
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
import { DateTimePicker } from 'material-ui-pickers'
import DecimalTextField from '../components/decimalTextField'

const styles = theme => ({
  workout: {
    paddingTop: '10%'
  },
  row: { display: 'flex', flexDirection: 'row' },
  lowerRow: { display: 'flex', flexDirection: 'row', paddingTop: '5%' },
  icon: { alignSelf: 'flex-end', marginRight: 8 },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  tabs: {
    width: '0 auto',
    marginTop: '5%'
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
    alignItems: 'center',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const WorkoutForm = props => {
  const {
    classes,
    history,
    onChange,
    onSubmit,
    toggleForm,
    isFirstForm
  } = props
  const {
    category,
    dateTime,
    stroke,
    wellness,
    motivation,
    distanceMi,
    hr,
    min,
    sec,
    durationSec,
    paceSecPerMi,
    calories
  } = props.workout
  // const hr = `${Math.floor(durationSec / 3600)}`
  // const min = gt(hr, 0)
  //   ? `${durationSec % 3600}`
  //   : `${Math.floor(durationSec / 60)}`
  // const sec = `${durationSec % 60}`
  console.log('hr', hr, 'min', min, 'sec', sec)
  const SoftForm = (
    <center>
      <form>
        {/* 
        //style=
        {{ marginLeft: '25%' }} */}
        <div className={classes.center}>
          <div className={classes.row}>
            <div className={classes.icon}>
              <CalendarToday />
            </div>
            <DateTimePicker
              label="Date"
              value={new Date(dateTime)}
              onChange={date => onChange(date.toISOString())}
              disableFuture
            />
          </div>

          <Paper className={classes.tabs}>
            <Typography variant="caption">Category</Typography>
            <Tabs
              value={category}
              onChange={(e, v) => onChange('category', v)}
              fullWidth
              indicatorColor="primary"
              textColor="secondary"
              centered
            >
              <Tab icon={<Pool />} value="Swim" />
              <Tab icon={<DirectionsBike />} value="Bike" />
              <Tab icon={<DirectionsRun />} value="Run" />
            </Tabs>
          </Paper>
          {/* <Grid item>
              <WorkoutIcon category={category} />
            </Grid> */}
          {/* <CustomSelect
              label="Workout Category"
              field="category"
              value={category}
              onSelect={onChange}
            /> */}

          {equals('Swim', category) && (
            <Paper className={classes.tabs}>
              <Typography variant="caption">Stroke</Typography>
              <Tabs
                value={stroke}
                onChange={(e, v) => onChange('stroke', v)}
                fullWidth
                indicatorColor="primary"
                textColor="secondary"
                centered
              >
                <Tab label="Free" value="Freestyle" />
                <Tab label="Back" value="Backstroke" />
                <Tab label="Breast" value="Breaststroke" />
                <Tab label="Fly" value="Butterfly" />
              </Tabs>
            </Paper>

            // <Grid container spacing={8} alignItems="flex-end">
            //   <Grid item>
            //     <Waves />
            //   </Grid>
            //   <CustomSelect
            //     label="Swim Stroke"
            //     field="stroke"
            //     value={stroke}
            //     onSelect={onChange}
            //   />
            // </Grid>
          )}

          {/* <TextField
                id="dateTime"
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
              /> */}
          <Paper className={classes.tabs}>
            <Typography variant="caption">Motivation</Typography>
            <Tabs
              value={motivation}
              onChange={(e, v) => onChange('motivation', v)}
              fullWidth
              indicatorColor="primary"
              textColor="secondary"
              centered
            >
              <Tab
                icon={<MotivationWellnessIcon type={'motivation'} value={1} />}
                value={1}
              />
              <Tab
                icon={<MotivationWellnessIcon type={'motivation'} value={2} />}
                value={2}
              />
              <Tab
                icon={<MotivationWellnessIcon type={'motivation'} value={3} />}
                value={3}
              />
            </Tabs>
          </Paper>

          <Paper className={classes.tabs}>
            <Typography variant="caption">Wellness</Typography>
            <Tabs
              value={wellness}
              onChange={(e, v) => onChange('wellness', v)}
              fullWidth
              indicatorColor="primary"
              textColor="secondary"
              centered
            >
              <Tab
                icon={<MotivationWellnessIcon type={'wellness'} value={1} />}
                value={1}
              />
              <Tab
                icon={<MotivationWellnessIcon type={'wellness'} value={2} />}
                value={2}
              />
              <Tab
                icon={<MotivationWellnessIcon type={'wellness'} value={3} />}
                value={3}
              />
            </Tabs>
          </Paper>
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
      <form onSubmit={onSubmit}>
        <div className={classes.center}>
          <div className={classes.lowerRow}>
            <div className={classes.icon}>
              {equals(category, 'Swim') ? <Waves /> : <Terrain />}
            </div>
            <DecimalTextField
              onChange={onChange}
              label="Distance (miles)"
              field="distanceMi"
              value={distanceMi}
            />
          </div>
          <div className={classes.lowerRow} style={{ width: '50%' }}>
            <div className={classes.icon}>
              <AccessTime />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              <TextField
                id="duration"
                label="Hr"
                value={hr}
                onChange={e => onChange('hr', Number(e.target.value))}
                style={{ width: 24, marginRight: 8 }}
                inputProps={{ maxLength: 2 }}
              />

              <TextField
                id="duration"
                label="Min"
                value={min}
                onChange={e => onChange('min', Number(e.target.value))}
                style={{ width: 24, marginRight: 8 }}
                inputProps={{ maxLength: 2 }}
              />

              <TextField
                id="duration"
                label="Sec"
                value={sec}
                onChange={e => onChange('sec', Number(e.target.value))}
                style={{ width: 24 }}
                required
                inputProps={{ maxLength: 2 }}
              />
            </div>
          </div>

          <div className={classes.lowerRow}>
            <div className={classes.icon}>
              <Timer />
            </div>
            <TextField
              id="pace"
              label="Pace (min/mile)"
              value={secToMin(paceSecPerMi)}
              onChange={e => onChange('paceSecPerMi', Number(e.target.value))}
              className={classes.textfield}
              disabled
            />
          </div>

          <div className={classes.lowerRow}>
            <div className={classes.icon}>
              <Whatshot />
            </div>
            <TextField
              id="calories"
              label="Calories Burned"
              value={calories}
              onChange={e => onChange('calories', Number(e.target.value))}
              className={classes.textfield}
              disabled
            />
          </div>
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
