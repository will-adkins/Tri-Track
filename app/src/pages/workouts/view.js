import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CircularProgress,
  withStyles,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Tooltip
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { setCurrentWorkout } from '../../action-creators/workouts'
import { CURRENT_WORKOUT_DELETE_CONFIRMATION_STARTED } from '../../constants'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutData from '../../components/workoutData'
import WorkoutIcon from '../../components/workoutIcon'
import AlertDialog from '../../components/customAlertDialog'

const styles = theme => ({
  card: {
    paddingTop: '15%'
  },
  actions: { justifyContent: 'flex-end' }
})

class ViewWorkout extends React.Component {
  componentDidMount() {
    const { setWorkout, match } = this.props
    setWorkout(match.params.id)
  }

  render() {
    const {
      classes,
      match,
      isError,
      errMsg,
      workout,
      confirmDelete,
      isDeleting,
      isConfirm
    } = this.props
    const { _id, category } = this.props.workout

    if (_id !== match.params.id) {
      return (
        <center>
          <MenuAppBar back title="View Workout" />
          <CenterLogo title="Loading Your Workout..." />
          {!isError && <CircularProgress />}
          {isError && <SnackBar type="error" msg={errMsg} />}
        </center>
      )
    }

    return (
      <div>
        <MenuAppBar back backURL="/workouts" title="View Workout" />
        <center>
          <div>
            <CardContent className={classes.card}>
              <WorkoutIcon category={category} large />
            </CardContent>
            <WorkoutData workout={workout} />
            <CardActions className={classes.actions}>
              <Link to={`/workouts/${_id}/edit`} className="router-link">
                <Tooltip title="Edit Workout">
                  <Button variant="fab" size="small" color="primary">
                    <Edit color="inherit" />
                  </Button>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Workout">
                <IconButton color="primary" onClick={confirmDelete}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </CardActions>
            {isDeleting && (
              <SnackBar type="warning" msg="Deleting Workout..." />
            )}
            {isConfirm && <AlertDialog />}
          </div>
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workout: state.currentWorkout.data,
  isDeleting: state.currentWorkout.isDeleting,
  isError: state.currentWorkout.isError,
  errMsg: state.currentWorkout.errMsg,
  isConfirm: state.currentWorkout.isConfirmingDelete
})

const mapActionsToProps = dispatch => ({
  setWorkout: id => dispatch(setCurrentWorkout(id)),
  confirmDelete: e =>
    dispatch({ type: CURRENT_WORKOUT_DELETE_CONFIRMATION_STARTED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(ViewWorkout))
