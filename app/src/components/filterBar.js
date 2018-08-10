import React from 'react'
import {
  withStyles,
  SvgIcon,
  IconButton,
  Card,
  Typography
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

import filterWorkouts from '../lib/filterWorkouts'
import { FILTER_KEYS_UPDATED } from '../constants'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
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

function handleDelete() {}

const CategoryButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <Typography variant="caption">Categories: </Typography>
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
        <Pool />
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
        <DirectionsBike />
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
        <DirectionsRun />
      </IconButton>
    </div>
  )
}
const MotivationButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <Typography variant="caption">Motivation: </Typography>
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
        <MoodBad />
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
        <SentimentSatisfied />
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
        <Mood />
      </IconButton>
    </div>
  )
}

const WellnessButtons = props => {
  const { classes, filterClick, filterNullClick } = props
  const { filter } = props.listOptions
  return (
    <div className={classes.root}>
      <Typography variant="caption">Wellness: </Typography>
      <IconButton
        onClick={
          propEq('wellness', 1, filter)
            ? filterNullClick('wellness')
            : filterClick('wellness', 1)
        }
        className={
          propEq('wellness', 1, filter) ? classes.selected : classes.unselected
        }
      >
        <MoodBad />
      </IconButton>
      <IconButton
        onClick={
          propEq('wellness', 2, filter)
            ? filterNullClick('wellness')
            : filterClick('wellness', 2)
        }
        className={
          propEq('wellness', 2, filter) ? classes.selected : classes.unselected
        }
      >
        <SentimentSatisfied />
      </IconButton>
      <IconButton
        onClick={
          propEq('wellness', 3, filter)
            ? filterNullClick('wellness')
            : filterClick('wellness', 3)
        }
        className={
          propEq('wellness', 3, filter) ? classes.selected : classes.unselected
        }
      >
        <Mood />
      </IconButton>
    </div>
  )
}
const FilterBar = props => {
  return (
    <Card>
      <CategoryButtons {...props} />
      <MotivationButtons {...props} />
      <WellnessButtons {...props} />
    </Card>
  )
}

const mapStateToProps = state => {
  console.log(JSON.stringify(state.listOptions.filter))
  return {
    listOptions: state.listOptions
  }
}

const mapActionsToProps = dispatch => ({
  //   filterCategoryClick: value => e => {
  //     dispatch({ type: FILTER_KEYS_UPDATED, payload: { category: value } })
  //   },
  //   filterMotivationClick: value => filterFn => e => {
  //     dispatch({ type: FILTER_KEYS_UPDATED, payload: { motivation: value } })
  //   },
  //   filterWellnessClick: value => filterFn => e => {
  //     dispatch({ type: FILTER_KEYS_UPDATED, payload: { wellness: value }
  //      })
  //   },
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
