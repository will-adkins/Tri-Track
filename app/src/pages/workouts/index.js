import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import { map } from 'ramda'

import {} from '../../constants'
import MenuAppBar from '../../components/menuAppBar'
import withDrawer from '../../components/withDrawer'
import workoutListItem from '../../components/workoutListItem'

const styles = theme => ({
  root: {}
})

const Workouts = props => {
  const { workouts } = props
  return (
    <div>
      <MenuAppBar highLevel listOptions />
      {map(workoutListItem, workouts)}
    </div>
  )
}

const mapStateToProps = state => ({
  workouts: state.workouts
})

const mapActionsToProps = dispatch => ({})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default withDrawer(connector(withStyles(styles)(Workouts)))
