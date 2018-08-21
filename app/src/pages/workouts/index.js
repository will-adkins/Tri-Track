import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  withStyles,
  Typography,
  Card,
  Button,
  Tooltip
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

import { map, isEmpty } from 'ramda'

import { LIST_OPTIONS_CLEARED } from '../../constants'
import MenuAppBar from '../../components/menuAppBar'
import withDrawer from '../../components/withDrawer'
import workoutListItem from '../../components/workoutListItem'
import FilterBar from '../../components/filterBar'

import sortWorkouts from '../../lib/sortWorkouts'
import filterWorkouts from '../../lib/filterWorkouts'

const styles = theme => ({
  placeholder: { margin: 16, marginBottom: '10%', padding: 16 },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '10%'
  }
})

const NoWorkouts = props => {
  const { classes } = props
  return (
    <center>
      <div className={classes.row}>
        <Typography variant="headline" color="secondary">
          No Workouts Recorded
        </Typography>
      </div>
      <Card className={classes.placeholder}>
        <Typography variant="subheading">
          Click the <Add color="secondary" style={{ marginBottom: '-1%' }} />{' '}
          icon below to get started!
        </Typography>
      </Card>
      <div>
        <Link to="/workouts/new">
          <Tooltip title="Add a Workout">
            <Button
              variant="extendedFab"
              size="large"
              type="button"
              color="primary"
            >
              <Add style={{ color: 'white' }} className="svg_icon" />
            </Button>
          </Tooltip>
        </Link>
      </div>
    </center>
  )
}

class Workouts extends React.Component {
  componentDidMount() {
    const { clearFilter } = this.props
    clearFilter()
  }

  render() {
    const { workouts, showFilterBar, sortKey, filterKey } = this.props
    return (
      <div>
        <MenuAppBar highLevel listOptions />
        {showFilterBar && <FilterBar />}
        <div className="overlay">
          {map(
            workoutListItem,
            sortWorkouts(sortKey, filterWorkouts(filterKey, workouts))
          )}
          {isEmpty(workouts) && <NoWorkouts {...this.props} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.workouts,
  showFilterBar: state.listOptions.showFilterBar,
  showSortDrawer: state.listOptions.showSortDrawer,
  sortKey: state.listOptions.sort,
  filterKey: state.listOptions.filter
})

const mapActionsToProps = dispatch => ({
  clearFilter: () => dispatch({ type: LIST_OPTIONS_CLEARED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default withDrawer(connector(withStyles(styles)(Workouts)))
