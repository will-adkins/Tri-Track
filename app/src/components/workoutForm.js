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
  row: { display: 'flex', flexDirection: 'row', padding: '5%' },
  lowerRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5%',
    margin: '5%'
  },
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
    formClear,
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
          <div>
            <Paper
              className={classes.row}
              style={{ minWidth: 198, marginLeft: -20 }}
            >
              <div className={classes.icon}>
                <CalendarToday />
              </div>
              <div>
                <DateTimePicker
                  label="Date"
                  value={new Date(dateTime)}
                  onChange={date => onChange(date.toISOString())}
                  disableFuture
                />
              </div>
            </Paper>
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
          <Button
            type="button"
            onClick={e => {
              history.goBack()
              formClear()
            }}
          >
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
          <div>
            <Paper className={classes.lowerRow}>
              <div className={classes.icon}>
                {equals(category, 'Swim') ? <Waves /> : <Terrain />}
              </div>

              <DecimalTextField
                onChange={onChange}
                label="Distance (miles)"
                field="distanceMi"
                value={distanceMi}
              />
            </Paper>
          </div>
          <div>
            <Paper
              className={classes.lowerRow}
              style={{ width: 162, marginLeft: '-5%' }}
            >
              <div
                style={{
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <AccessTime />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '90%'
                }}
              >
                <TextField
                  id="duration"
                  label="Duration"
                  value={hr}
                  onChange={e => onChange('hr', Number(e.target.value))}
                  style={{ width: 28 }}
                  inputProps={{ maxLength: 2 }}
                  helperText="Hr"
                />

                <TextField
                  id="duration"
                  label=" "
                  value={min}
                  onChange={e => onChange('min', Number(e.target.value))}
                  style={{ width: 28 }}
                  inputProps={{ maxLength: 2 }}
                  helperText="Min"
                />

                <TextField
                  id="duration"
                  label=" "
                  value={sec}
                  onChange={e => onChange('sec', Number(e.target.value))}
                  style={{ width: 28 }}
                  inputProps={{ maxLength: 2 }}
                  helperText="Sec"
                />
              </div>
            </Paper>
          </div>

          <div>
            <Paper className={classes.lowerRow}>
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
            </Paper>
          </div>

          <div>
            <Paper className={classes.lowerRow}>
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
            </Paper>
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
