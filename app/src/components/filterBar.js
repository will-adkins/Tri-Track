import React from 'react'
import {
  withStyles,
  IconButton,
  Card,
  Typography,
  CardContent
} from '@material-ui/core'
import { connect } from 'react-redux'
import {
  DirectionsRun,
  Pool,
  DirectionsBike,
  Mood,
  MoodBad,
  SentimentSatisfied
} from '@material-ui/icons'
import { propEq } from 'ramda'

import { FILTER_KEYS_UPDATED } from '../constants'
import MotivationWellnessIcon from './motivationWellnessIcon'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selected: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  unselected: {
    margin: theme.spacing.unit
  }
})

const CategoryButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <center>
        <Typography variant="caption">Categories</Typography>
      </center>

      <div className={classes.row}>
        <IconButton
          onClick={
            propEq('category', 'Swim', filter)
              ? filterNullClick('category')
              : filterClick('category', 'Swim')
          }
          className={
            propEq('category', 'Swim', filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <Pool color="secondary" />
        </IconButton>
        <IconButton
          onClick={
            propEq('category', 'Bike', filter)
              ? filterNullClick('category')
              : filterClick('category', 'Bike')
          }
          className={
            propEq('category', 'Bike', filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <DirectionsBike color="secondary" />
        </IconButton>
        <IconButton
          onClick={
            propEq('category', 'Run', filter)
              ? filterNullClick('category')
              : filterClick('category', 'Run')
          }
          className={
            propEq('category', 'Run', filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <DirectionsRun color="secondary" />
        </IconButton>
      </div>
    </div>
  )
}
const MotivationButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <center>
        <Typography variant="caption">Motivation</Typography>
      </center>
      <div className={classes.row}>
        <IconButton
          onClick={
            propEq('motivation', 1, filter)
              ? filterNullClick('motivation')
              : filterClick('motivation', 1)
          }
          className={
            propEq('motivation', 1, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="motivation" value={1} />
        </IconButton>
        <IconButton
          onClick={
            propEq('motivation', 2, filter)
              ? filterNullClick('motivation')
              : filterClick('motivation', 2)
          }
          className={
            propEq('motivation', 2, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="motivation" value={2} />
        </IconButton>
        <IconButton
          onClick={
            propEq('motivation', 3, filter)
              ? filterNullClick('motivation')
              : filterClick('motivation', 3)
          }
          className={
            propEq('motivation', 3, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="motivation" value={3} />
        </IconButton>
      </div>
    </div>
  )
}

const WellnessButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <center>
        <Typography variant="caption">Wellness</Typography>
      </center>
      <div className={classes.row}>
        <IconButton
          onClick={
            propEq('wellness', 1, filter)
              ? filterNullClick('wellness')
              : filterClick('wellness', 1)
          }
          className={
            propEq('wellness', 1, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="wellness" value={1} />
        </IconButton>
        <IconButton
          onClick={
            propEq('wellness', 2, filter)
              ? filterNullClick('wellness')
              : filterClick('wellness', 2)
          }
          className={
            propEq('wellness', 2, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="wellness" value={2} />
        </IconButton>
        <IconButton
          onClick={
            propEq('wellness', 3, filter)
              ? filterNullClick('wellness')
              : filterClick('wellness', 3)
          }
          className={
            propEq('wellness', 3, filter)
              ? classes.selected
              : classes.unselected
          }
        >
          <MotivationWellnessIcon type="wellness" value={3} />
        </IconButton>
      </div>
    </div>
  )
}
const FilterBar = props => {
  return (
    <Card>
      <CardContent style={{ marginBottom: -8 }}>
        <center>
          <Typography
            color="secondary"
            variant="title"
            style={{ marginBottom: 12 }}
          >
            Filter Workouts
          </Typography>
          <hr style={{ borderColor: '#802BB1', width: '75%' }} />
        </center>
      </CardContent>
      <CategoryButtons {...props} />
      <MotivationButtons {...props} />
      <WellnessButtons {...props} />
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    listOptions: state.listOptions
  }
}

const mapActionsToProps = dispatch => ({
  filterClick: (field, value) => e =>
    dispatch({ type: FILTER_KEYS_UPDATED, payload: { [field]: value } }),
  filterNullClick: field => e =>
    dispatch({ type: FILTER_KEYS_UPDATED, payload: { [field]: null } })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(FilterBar))
