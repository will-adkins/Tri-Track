import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import { map } from 'ramda'

import { LIST_OPTIONS_CLEARED } from '../../constants'
import MenuAppBar from '../../components/menuAppBar'
import withDrawer from '../../components/withDrawer'
import workoutListItem from '../../components/workoutListItem'
import FilterBar from '../../components/filterBar'

import sortWorkouts from '../../lib/sortWorkouts'
import filterWorkouts from '../../lib/filterWorkouts'

const styles = theme => ({
  root: {}
})

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
